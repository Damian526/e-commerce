// routes/productRoutes.js
const express = require('express');
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  aliasTopProducts,
} = require('../controllers/productController');
const router = express.Router();
router.route('/top-5-cheap').get(aliasTopProducts, getAllProducts);
router.route('/').get(getAllProducts).post(createProduct);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
