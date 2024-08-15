const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/', authController.protect, orderController.placeOrder);
router.get('/history', authController.protect, orderController.getOrderHistory);

module.exports = router;
