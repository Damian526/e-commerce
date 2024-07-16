const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  addedAt: {
    type: Date,
    default: Date.now(),
    select: false, // excluding field during seeing results requests in api
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
