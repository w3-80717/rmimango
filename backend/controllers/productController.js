// controllers/productController.js
const { Op } = require('sequelize'); // Import Sequelize operators
const Product = require('../models/Product');

exports.addProduct = async (req, res, next) => {
  const { title, description, price, imageUrl } = req.body;
  try {
    const newProduct = await Product.create({ title, description, price, imageUrl });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getProducts = async (req, res, next) => {
  const { page = 1, limit = 10, sortBy = 'id', sortOrder = 'ASC', title, minPrice, maxPrice } = req.query;

  try {
    // Build the where clause conditionally
    const where = {};

    if (title) {
      where.title = { [Op.like]: `%${title}%` };  // Filter by title
    }

    if (minPrice) {
      where.price = { ...where.price, [Op.gte]: parseFloat(minPrice) };  // Minimum price filter
    }

    if (maxPrice) {
      where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };  // Maximum price filter
    }

    const products = await Product.findAll({
      where,  // Apply the filtering conditions
      offset: (page - 1) * limit,
      limit: parseInt(limit),  // Limit for pagination
      order: [[sortBy, sortOrder.toUpperCase()]],  // Sorting
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { title, description, price, imageUrl } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.title = title;
    product.description = description;
    product.price = price;
    product.imageUrl = imageUrl;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
