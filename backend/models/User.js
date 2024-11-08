// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const mobileValidationRegex = /\d{10}/

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      validator: function (v) {
        return mobileValidationRegex.test(v);
      },
    }
  }
},
  {
    indexes: [
      {
        unique: true,
        fields: [
          'email'
        ]
      }
    ]
  }
);

module.exports = User;
