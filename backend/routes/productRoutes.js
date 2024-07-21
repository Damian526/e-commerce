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
} = require('../controllers/productController');
const router = express.Router();

router.route('/product-stats').get(getProductStats);
router.route('/top-5-cheap').get(aliasTopProducts, getAllProducts);
router.route('/').get(protect, getAllProducts).post(createProduct);
router
  .route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(protect, restrictTo('seller', 'admin'), deleteProduct);

module.exports = router;
