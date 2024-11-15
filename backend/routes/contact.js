// routes/contact.js
const express = require('express');
const { createContactMessage, getAllMessages, deleteMessage } = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/us", createContactMessage);
router.get("/messages", authMiddleware({ requireAdmin: true }), getAllMessages);
router.delete(
  "/message/:id",
  authMiddleware({ requireAdmin: true }),
  deleteMessage,
);

module.exports = router;
