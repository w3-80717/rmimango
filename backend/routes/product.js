// routes/product.js
const express = require('express');
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Admin routes
router.post('/', authMiddleware(true), addProduct);  // Admin required
router.put('/:productId', authMiddleware(true), updateProduct);  // Admin required
router.delete('/:productId', authMiddleware(true), deleteProduct);  // Admin required

// Public route
router.get('/', getProducts);

module.exports = router;
