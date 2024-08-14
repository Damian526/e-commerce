const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/modelProduct');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.placeOrder = catchAsync(async (req, res, next) => {
  // 1. Find the user's cart
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    'items.product',
  );
  if (!cart || cart.items.length === 0) {
    return next(new AppError('Your cart is empty', 400));
  }

  // 2. Create order items from the cart items with additional product info
  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    productName: item.product.name,
    productDescription: item.product.description,
    category: item.product.category,
    imageUrl: item.product.imageUrl,
    quantity: item.quantity,
    price: item.product.price,
  }));

  // 3. Calculate the total price of the order
  const total = orderItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );

  // 4. Create a new order with user information
  const order = new Order({
    user: req.user._id,
    userName: req.user.name, // assuming user's name is available
    userEmail: req.user.email, // assuming user's email is available
    items: orderItems,
    total,
  });

  // 5. Save the order
  await order.save();

  // 6. Update the product stock
  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);
    product.stock -= item.quantity;
    if (product.stock < 0) {
      return next(new AppError(`Not enough stock for ${product.name}`, 400));
    }
    await product.save();
  }

  // 7. Clear the user's cart
  cart.items = [];
  cart.total = 0;
  await cart.save();

  // 8. Send the response
  res.status(201).json({
    status: 'success',
    message: 'Order placed successfully',
    data: { order },
  });
});
