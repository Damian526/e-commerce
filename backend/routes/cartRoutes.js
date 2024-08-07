const express = require('express');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.route('/').get(cartController.getCart).post(cartController.addToCart);
router
  .route('/item')
  .patch(cartController.updateCartItem)
  .delete(cartController.removeFromCart);

module.exports = router;
