// routes/auth.js
const express = require('express');
const { createContactMessage, getAllMessages, deleteMessage } = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/us', createContactMessage);
router.get('/messages', authMiddleware(true), getAllMessages);
router.delete('/message/:id', authMiddleware(true), deleteMessage);

module.exports = router;
