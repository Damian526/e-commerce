const Product = require('../models/modelProduct');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const { default: mongoose } = require('mongoose');

exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-rating,price';
  req.query.fields = 'name,price,rating,description,category';
  next();
};

exports.getAllProducts = catchAsync(async (req, res, next) => {
  // Create a copy of req.query to use for the filtered count query
  const queryObj = { ...req.query };

  // Exclude pagination parameters from the count query
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  // Create a separate query to count the total number of filtered products
  const countFeatures = new APIFeatures(Product.find(), queryObj)
    .filter()
    .search()
    .sort()
    .limitFields();

  const totalFilteredProducts = await countFeatures.query.countDocuments();

  // Apply pagination and other features to the main query
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  res.status(200).json({
    status: 'success',
    results: products.length,
    totalProducts: totalFilteredProducts, // Return the count of filtered products
    data: {
      products,
    },
  });
});

exports.getProductByIdOrSlug = catchAsync(async (req, res, next) => {
  const { identifier } = req.params;

  // Try finding by slug
  let product = await Product.findOne({ slug: identifier });

  // If not found by slug, try finding by ID
  if (!product) {
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      product = await Product.findById(identifier);
    }
  }

  if (!product) {
    return next(new AppError('Product not found with that ID or slug', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});
// Create a new product
exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      product: newProduct,
    },
  });
});

exports.updateProductByIdOrSlug = catchAsync(async (req, res, next) => {
  const { identifier } = req.params;

  // First try updating by slug
  let product = await Product.findOneAndUpdate({ slug: identifier }, req.body, {
    new: true,
    runValidators: true,
  });

  // If not found by slug, try updating by ID
  if (!product) {
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      product = await Product.findByIdAndUpdate(identifier, req.body, {
        new: true,
        runValidators: true,
      });
    }
  }

  if (!product) {
    return next(new AppError('No product found with that ID or slug', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.deleteProductByIdOrSlug = catchAsync(async (req, res, next) => {
  const { identifier } = req.params;

  // Try deleting by slug
  let product = await Product.findOneAndDelete({ slug: identifier });

  // If not found by slug, try deleting by ID
  if (!product) {
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      product = await Product.findByIdAndDelete(identifier);
    }
  }

  if (!product) {
    return next(new AppError('Product not found with that ID or slug', 404));
  }

  res.status(204).json({ message: 'Product deleted successfully' });
});

exports.getProductStats = catchAsync(async (req, res, next) => {
  const stats = await Product.aggregate([
    { $match: { rating: { $gte: 4.5 } } },
    {
      $group: {
        _id: { $toUpper: '$category' },
        numProducts: { $sum: 1 },
        avgRating: { $avg: '$rating' },
        numRatings: { $sum: '$ratingsNumber' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    { $sort: { avgPrice: 1 } },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = Product.getCategories();
  if (!categories) {
    return next(new AppError('Categories not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      categories,
    },
  });
});
