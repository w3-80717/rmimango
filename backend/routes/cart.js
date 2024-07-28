const express = require('express');
const { addToCart, getCart, removeItem, updateQuantity } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware(), addToCart);
router.get('/', authMiddleware(), getCart);
router.delete('/:productId', authMiddleware(), removeItem);
router.patch('/:productId', authMiddleware(), updateQuantity);

module.exports = router;
