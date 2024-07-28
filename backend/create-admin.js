const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/User'); // Adjust the path as necessary

const createAdminUser = async () => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('admin_password', 10);

    // Create an admin user
    const adminUser = await User.create({
      fullName: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      isAdmin: true
    });

    console.log('Admin user created:', adminUser);
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Run the function
createAdminUser();
