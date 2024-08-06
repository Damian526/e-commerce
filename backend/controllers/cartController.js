const Cart = require('../models/cartModel');
const Product = require('../models/modelProduct');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    'items.product',
  );
  if (!cart) {
    return next(new AppError('No cart found for this user', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { cart },
  });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      items: [{ product: productId, quantity }],
    });
  } else {
    const existingProductIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );
    if (existingProductIndex > -1) {
      cart.items[existingProductIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
  }

  res.status(200).json({
    status: 'success',
    data: { cart },
  });
});

exports.updateCartItem = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new AppError('No cart found for this user', 404));
  }

  const item = cart.items.find((item) => item.product.toString() === productId);
  if (!item) {
    return next(new AppError('No product found in the cart with that ID', 404));
  }

  item.quantity = quantity;
  await cart.save();

  res.status(200).json({
    status: 'success',
    data: { cart },
  });
});

exports.removeFromCart = catchAsync(async (req, res, next) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new AppError('No cart found for this user', 404));
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );
  await cart.save();

  res.status(200).json({
    status: 'success',
    data: { cart },
  });
});
