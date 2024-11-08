// server.js (updated)
require("dotenv").config();
const fs = require('fs');
const path = require('path');
const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser');
const sequelize = require("./config/database");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const favoriteRoutes = require("./routes/favorite");
const orderRoutes = require("./routes/order");
const contactRoutes = require("./routes/contact");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Uploads directory created');
} else {
  console.log('Uploads directory already exists');
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use(errorMiddleware);
const PORT = process.env.PORT || 3000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database & tables created!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Error: " + err));
