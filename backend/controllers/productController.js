// controllers/productController.js
const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  const { title, description, price, imageUrl } = req.body;
  try {
    const newProduct = await Product.create({ title, description, price, imageUrl });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'id', sortOrder = 'ASC' } = req.query;

  try {
    const products = await Product.findAll({
      offset: (page - 1) * limit,
      limit,
      order: [[sortBy, sortOrder.toUpperCase()]],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
