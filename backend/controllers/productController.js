// controllers/productController.js
const { Op } = require('sequelize'); // Import Sequelize operators
const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

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

// Multer configuration for file upload
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});
const upload = multer({ storage: storage });

// Add Product (with file upload)
exports.addProduct = [
  upload.single('image'), // Handle file upload with multer
  async (req, res, next) => {
    const { title, description, price } = req.body;
    const imageUrl = req.file ?  '/api/products/image/'+req.file.filename : null; // Save only filename in the database
    try {
      const newProduct = await Product.create({ title, description, price, imageUrl });
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

// Update Product (with file upload)
exports.updateProduct = [
  upload.single('image'), // Handle file upload with multer
  async (req, res, next) => {
    const { productId } = req.params;
    const { title, description, price } = req.body;
    const imageUrl = req.file ? req.file.filename : null; // Handle new image upload
    
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      product.title = title;
      product.description = description;
      product.price = price;

      if (imageUrl) {
        product.imageUrl = '/api/products/image/'+imageUrl; // Update image only if a new file is uploaded
      }

      await product.save();
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

// Get Image API
exports.getProductImage = (req, res, next) => {
  const imageFile = path.join(__dirname, '../uploads/', req.params.filename);
  if (fs.existsSync(imageFile)) {
    res.sendFile(imageFile);
  } else {
    res.status(404).send('Image not found');
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
