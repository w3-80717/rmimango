// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password, address, mobile } = req.body;

  // Validate input formats
  if (!firstName || !lastName || !email || !password || !address || !mobile) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  if (!/^[a-zA-Z ]+$/.test(firstName)) {
    return res.status(400).json({ message: 'Invalid first name format, numbers are not allowed' });
  }
  if (!/^[a-zA-Z ]+$/.test(lastName)) {
    return res.status(400).json({ message: 'Invalid last name format, numbers are not allowed' });
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }

  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(mobile)) {
    return res.status(400).json({ message: 'Invalid mobile number. Please enter 10 digits.' });

  }

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    existingUser = await User.findOne({ where: { mobile } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = (await User.create({ firstName, lastName, mobile, address, email, password: hashedPassword })).dataValues;

    // Return new user without password
    const { password: _, ...user } = newUser;
    res.status(201).json({ ...user, success: true });
  } catch (error) {
    // Log error for debugging purposes
    console.error(error);

    // Return generic error message to user
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input formats
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '10h' });

    // Return token and user data (excluding password)
    const { password: _, ...userData } = user.dataValues;
    res.status(200).json({ token, user: userData, success: true });
  } catch (error) {
    next(error)
  }
};