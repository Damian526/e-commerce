const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Cart item must belong to a Product'],
  },
  quantity: {
    type: Number,
    required: [true, 'Cart item must have a quantity'],
    min: [1, 'Quantity must be at least 1'],
  },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Cart must belong to a user'],
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    default: 0,
  },
});

// Calculate total price before saving the cart
cartSchema.pre('save', function (next) {
  this.total = this.items.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  );
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
