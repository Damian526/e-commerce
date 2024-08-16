// routes/productRoutes.js
const { protect, restrictTo } = require('./../controllers/authController');
const express = require('express');
const {
  getAllProducts,
  createProduct,
  aliasTopProducts,
  getProductStats,
  getCategories,
  getProductByIdOrSlug,
  updateProductByIdOrSlug,
  deleteProductByIdOrSlug,
} = require('../controllers/productController');
const router = express.Router();

router.route('/product-stats').get(getProductStats);
router.route('/categories').get(getCategories);
router.route('/top-5-cheap').get(aliasTopProducts, getAllProducts);
router.route('/').get(getAllProducts).post(createProduct);
router
  .route('/:identifier')
  .get(getProductByIdOrSlug)
  .patch(protect, restrictTo('seller', 'admin'), updateProductByIdOrSlug)
  .delete(protect, restrictTo('seller', 'admin'), deleteProductByIdOrSlug);

module.exports = router;
