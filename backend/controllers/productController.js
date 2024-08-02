// controllers/productController.js
const Product = require('../models/modelProduct');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-rating,price';
  req.query.fields = 'name,price,rating,description,category';
  next();
};

// Get all products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;

  // Get total number of documents for pagination
  const totalProducts = await Product.countDocuments();

  res.status(200).json({
    status: 'success',
    results: products.length,
    totalProducts,
    data: {
      products,
    },
  });
});

// Get a single product by ID
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError(`Hasn't found with that ID`, 404));
  }
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
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

// Update an existing product
exports.updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
  );
  if (!updatedProduct) {
    return next(new AppError(`Hasn't found with that ID`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      product: updatedProduct,
    },
  });
});

// Delete a product
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new AppError(`Hasn't found with that ID`, 404));
  }
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(204).json({ message: 'Product deleted successfully' });
});

exports.getProductStats = catchAsync(async (req, res, next) => {
  const stats = await Product.aggregate([
    { $match: { rating: { $gte: 4.5 } } },
    {
      $group: {
        _id: { $toUpper: '$category' },
        numTours: { $sum: 1 },
        avgRating: { $avg: '$rating' },
        numRatings: { $sum: '$ratingsNumber' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $min: '$price' },
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
