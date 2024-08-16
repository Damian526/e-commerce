const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      trim: true,
      minlength: [
        2,
        'A product name must have more or equal then 2 characters',
      ],
      maxlength: [
        40,
        'A product name must have less or equal then 40 characters',
      ],
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'A product must have a description'],
      trim: true,
    },
    price: { type: Number, required: true },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation, not work for update
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    rating: {
      type: Number,
      default: 0,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsNumber: { type: Number, default: 0 },
    imageUrl: {
      type: String,
      required: [true, 'A product must have a cover image'],
    },
    category: {
      type: String,
      required: [true, 'A product must have a category'],
      enum: {
        values: [
          'Automotive',
          'Books',
          'Beauty',
          'Clothing',
          'Collections and art',
          'Culture and entertainment',
          'Electronics',
          'Food',
          'Health',
          'House and garden',
          'Sports and tourism',
          'Toys',
          'Other',
        ],
        message: 'Choose matching category to the product',
      },
    },
    stock: {
      type: Number,
      required: [true, 'A product must have a number of stock'],
    },
    addedAt: {
      type: Date,
      default: Date.now(),
      select: false, // excluding field during seeing results requests in api
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// document middleware: runs before .save() and .create()
productSchema.pre('save', async function (next) {
  if (!this.isModified('name')) return next();

  // Generate the initial slug
  this.slug = slugify(this.name, { lower: true });

  // Check if the slug is already in use
  const existingProduct = await Product.findOne({ slug: this.slug });
  if (
    existingProduct &&
    existingProduct._id.toString() !== this._id.toString()
  ) {
    // If a product with the same slug exists, append a unique identifier
    this.slug = `${this.slug}-${Date.now()}`;
  }

  next();
});
productSchema.index({ slug: 1 }, { unique: true });
// Static method to get all possible categories
productSchema.statics.getCategories = function () {
  return this.schema.path('category').enumValues;
};

// Creating text index
productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
