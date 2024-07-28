const express = require('express');
const { checkout, getOrder, updateOrderStatus, getAllOrders } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Admin routes
router.put('/:orderId', authMiddleware(true), updateOrderStatus);  // Admin required

// Authenticated routes
router.post('/checkout', authMiddleware(), checkout);
router.get('/:orderId', authMiddleware(), getOrder);
router.get('/', authMiddleware(), getOrder);
// routes/order.js
router.get('/', authMiddleware(true), getAllOrders);

module.exports = router;
