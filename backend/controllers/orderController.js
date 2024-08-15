const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/modelProduct');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.placeOrder = catchAsync(async (req, res, next) => {
  const { selectedItems } = req.body;

  if (!selectedItems || selectedItems.length === 0) {
    return next(new AppError('No items selected for order', 400));
  }

  const cart = await Cart.findOne({ user: req.user.id }).populate(
    'items.product',
  );
  if (!cart || cart.items.length === 0) {
    return next(new AppError('Your cart is empty', 400));
  }

  const orderItems = cart.items
    .filter((item) => selectedItems.includes(item.product._id.toString()))
    .map((item) => ({
      product: item.product._id,
      productName: item.product.name,
      productDescription: item.product.description,
      category: item.product.category,
      imageUrl: item.product.imageUrl,
      quantity: item.quantity,
      price: item.product.price,
    }));

  if (orderItems.length === 0) {
    return next(
      new AppError('None of the selected items are in the cart', 400),
    );
  }

  const total = orderItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );

  // Create and save the order
  const order = new Order({
    user: req.user._id,
    userName: req.user.name,
    userEmail: req.user.email,
    items: orderItems,
    total,
    status: 'completed', // Mark order as completed
  });

  await order.save();

  // Update the stock for each product
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    product.stock -= item.quantity;
    if (product.stock < 0) {
      return next(new AppError(`Not enough stock for ${product.name}`, 400));
    }
    await product.save();
  }

  // Remove paid items from the cart
  cart.items = cart.items.filter(
    (item) => !selectedItems.includes(item.product._id.toString()),
  );
  await cart.save();

  // Send the response with the order details
  res.status(201).json({
    status: 'success',
    message: 'Order placed successfully',
    data: { order },
  });
});
exports.getOrderHistory = catchAsync(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user.id,
    status: 'completed',
  }).sort({ orderDate: -1 });

  if (!orders || orders.length === 0) {
    return next(new AppError('No order history found', 404));
  }

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: { orders },
  });
});
