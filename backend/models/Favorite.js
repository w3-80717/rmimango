// models/Favorite.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  }
});

Favorite.belongsTo(User, { foreignKey: 'userId',    onDelete: 'CASCADE',
onUpdate: 'CASCADE',
 });
Favorite.belongsTo(Product, { foreignKey: 'productId',    onDelete: 'CASCADE',
onUpdate: 'CASCADE',
 });


module.exports = Favorite;
