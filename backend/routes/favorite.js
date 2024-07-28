// routes/favorite.js
const express = require('express');
const { addToFavorites, getFavorites, removeItem } = require('../controllers/favoriteController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware(), addToFavorites);
router.get('/', authMiddleware(), getFavorites);
// routes/favorite.js
router.delete('/:productId', authMiddleware(), removeItem);

module.exports = router;
