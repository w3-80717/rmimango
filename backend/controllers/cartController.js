// controllers/cartController.js
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  // Validate quantity
  if (quantity <= 0) {
    return res.status(400).json({ message: 'Invalid quantity' });
  }

  // Check if product exists
  const product = await Product.findByPk(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Update cart item
  const [cartItem, created] = await Cart.findOrCreate({
    where: { userId, productId },
    defaults: { quantity },
  });

  if (!created) {
    cartItem.quantity += quantity;
    await cartItem.save();
  }

  const cart = await Cart.findAll({ where: { userId }, include: Product });
  res.status(201).json(cart);
};


exports.getCart = async (req, res, next) => {
  if (!req.user.userId) {
    return res.status(401).json({ message: 'User ID is required' });
  }

  const { page = 1, limit = 10 } = req.query; // Get page and limit from query params
  const offset = (page - 1) * limit; // Calculate offset

  try {
    const cart = await Cart.findAll({
      where: { userId: req.user.userId },
      include: Product,
      limit,
      offset,
    });
    res.status(200).json(cart);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: 'Failed to retrieve cart' });
  }
};

exports.removeItem = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.userId;
    const cartItem = await Cart.findOne({ where: { userId, productId } });
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    await Cart.destroy({ where: { userId, productId } });
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error removing item from cart' });
  }
};

exports.updateQuantity = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.userId;
    const quantity = req.body.quantity;
    const cartItem = await Cart.findOne({ where: { userId, productId } });
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    res.json({ message: 'Cart item quantity updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating cart item quantity' });
  }
};