const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide a rating'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a product'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Prevent duplicate reviews by the same user for the same product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Populate user and product data
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name ',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
