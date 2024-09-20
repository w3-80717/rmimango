// routes/product.js
const express = require('express');
const { addProduct, getProducts, updateProduct, deleteProduct, getProductImage } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Admin routes
router.post("/", authMiddleware({ requireAdmin: true }), addProduct); // Admin required
router.put(
  "/:productId",
  authMiddleware({ requireAdmin: true }),
  updateProduct,
); // Admin required
router.delete(
  "/:productId",
  authMiddleware({ requireAdmin: true }),
  deleteProduct,
); // Admin required

// Public route
router.get("/", getProducts);
router.get('/image/:filename', getProductImage);

module.exports = router;
