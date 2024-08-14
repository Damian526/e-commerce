const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/modelProduct');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.placeOrder = catchAsync(async (req, res, next) => {
  // 1. Get the list of selected items from the request body
  const { selectedItems } = req.body;

  if (!selectedItems || selectedItems.length === 0) {
    return next(new AppError('No items selected for order', 400));
  }

  // 2. Find the user's cart
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    'items.product',
  );
  if (!cart || cart.items.length === 0) {
    return next(new AppError('Your cart is empty', 400));
  }

  // 3. Filter the cart items to match the selected items
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

  // 4. Calculate the total price of the order
  const total = orderItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );

  // 5. Create a new order with user information
  const order = new Order({
    user: req.user._id,
    userName: req.user.name, // assuming user's name is available
    userEmail: req.user.email, // assuming user's email is available
    items: orderItems,
    total,
  });
  
  // 6. Save the order
  await order.save();

  // 7. Update the product stock
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    product.stock -= item.quantity;
    if (product.stock < 0) {
      return next(new AppError(`Not enough stock for ${product.name}`, 400));
    }
    await product.save();
  }

  // 8. Remove the paid items from the cart
  cart.items = cart.items.filter(
    (item) => !selectedItems.includes(item.product._id.toString()),
  );

  // 9. Save the updated cart
  await cart.save();

  // 10. Send the response
  res.status(201).json({
    status: 'success',
    message: 'Order placed successfully',
    data: { order },
  });
});
