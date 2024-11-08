// config/database.js
const { Sequelize } = require('sequelize');
const sequelizeOptions = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT,
  protocol: process.env.DB_PROTOCOL,
  ssl: process.env.DB_SSL,
};

if (sequelizeOptions.protocol === 'postgres') {
  sequelizeOptions.dialectOptions = {
    ssl: process.env.DB_SSL
  }
}
const sequelize = new Sequelize(sequelizeOptions);

module.exports = sequelize;
