// controllers/favoriteController.js
const Favorite = require('../models/Favorite');
const Product = require('../models/Product');
exports.addToFavorites = async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user.userId;

  try {
    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create or update favorite item
    await Favorite.findOrCreate({
      where: { userId, productId },
    });

    // Retrieve all favorite items
    const favorites = await Favorite.findAll({ where: { userId }, include: Product });

    res.status(201).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add favorite' });
  }
};

exports.getFavorites = async (req, res, next) => {
  const userId = req.user.userId;
  const { page = 1, limit = 10 } = req.query;

  try {
    // Calculate offset
    const offset = (page - 1) * limit;

    // Retrieve favorite items with pagination
    const favorites = await Favorite.findAll({
      where: { userId },
      include: Product,
      limit,
      offset,
    });

    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve favorites' });
  }
};
exports.removeItem = async (req, res, next) => {
  // routes/favorite.js
  try {
    const productId = req.params.productId;
    const userId = req.user.userId;
    await Favorite.destroy({ where: { userId, productId } });
    res.json({ message: 'Item removed from favorites' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error removing item from favorites' });
  }
};

