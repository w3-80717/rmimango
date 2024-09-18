const express = require("express");
const {
  checkout,
  getOrder,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Admin routes
router.put(
  "/:orderId",
  authMiddleware({ requireAdmin: true }),
  updateOrderStatus,
); // Admin required

// Authenticated routes
router.post("/checkout", authMiddleware(), checkout);
router.post("/payment/callback", authMiddleware(), checkout);
router.get("/:orderId", authMiddleware(), getOrder);
router.get("/", authMiddleware(), getAllOrders);

module.exports = router;
