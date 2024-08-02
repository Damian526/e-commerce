// routes/productRoutes.js
const { protect, restrictTo } = require('./../controllers/authController');
const express = require('express');
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  aliasTopProducts,
  getProductStats,
  getCategories,
} = require('../controllers/productController');
const router = express.Router();

router.route('/product-stats').get(getProductStats);
router.route('/categories').get(getCategories);
router.route('/top-5-cheap').get(aliasTopProducts, getAllProducts);
router.route('/').get(getAllProducts).post(createProduct);
router
  .route('/:id')
  .get(getProduct)
  .put(protect, restrictTo('seller', 'admin'), updateProduct)
  .delete(protect, restrictTo('seller', 'admin'), deleteProduct);

module.exports = router;
