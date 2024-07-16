// controllers/productController.js
const Product = require('../models/modelProduct');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    console.log(req.query);
    //build query
    //1A) filtering
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // { category: 'Electronics', price {$gte: 200}}
    // { category: 'Electronics', price: { gte: '100' } }
    //gte, gt, lte,lt
    let query = Product.find(JSON.parse(queryStr));

    //2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else query = query.sort('addedAt');

    //3) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v'); //- excluding field __v to see in results of request
    }

    //4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    // page=2&limit=5 1-5 page 1, 6-10 page 2
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Product.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }

    //execute query
    const products = await query;

    //send response
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single product by ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({
      status: 'success',
      data: {
        product: updatedProduct,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
