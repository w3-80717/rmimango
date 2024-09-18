// controllers/orderController.js
const Razorpay = require("razorpay");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
// const { processPayment } = require("../utils/paymentGateway");
const OrderItem = require("../models/OrderItem");
const sequelize = require("../config/database");
// const Paytm = require("paytm-pg-node-sdk");
const shortid = require("shortid");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.checkout = async (req, res, next) => {
  const userId = req.user.userId;
  const { shippingAddress, paymentMethod } = req.body;

  // Validate shipping address and payment method
  if (!shippingAddress || !paymentMethod) {
    return res
      .status(400)
      .json({ message: "Invalid shipping address or payment method" });
  }

  try {
    // Fetch cart items and products for the user from the database
    const cartItems = await Cart.findAll({
      where: { userId },
      include: Product,
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "No items in the cart" });
    }

    // Calculate the total price
    let totalPrice = 0;
    for (const item of cartItems) {
      totalPrice += item.Product.price * item.quantity;
    }

    // Create a new order and order items in a transaction
    const transaction = await sequelize.transaction();
    try {
      const newOrder = await Order.create(
        { userId, totalPrice, status: "Payment Pending", shippingAddress },
        { transaction },
      );

      const orderItems = cartItems.map((item) => ({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.Product.price,
      }));

      await OrderItem.bulkCreate(orderItems, { transaction });
      // Process payment
      const options = {
        amount: totalPrice,
        currency: "INR",
        receipt: shortid.generate(),
      };

      const order = await razorpay.orders.create(options);
      console.log(order);
      await transaction.commit();
      return res.json(order);

      await Cart.destroy({ where: { userId } }, { transaction });


      res.status(201).json({ newOrder, paymentOrder });
    } catch (error) {
      await transaction.rollback();
      console.error(error); // Log the error
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: error.message });
  }
};

exports.getOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const userId = req.user.userId;
  const isAdmin = req.user.isAdmin;

  try {
    let order;
    if (isAdmin) {
      console.log(`Admin ${userId} retrieved order ${orderId}`);
      order = await Order.findByPk(orderId);
    } else {
      console.log(`Customer ${userId} retrieved order ${orderId}`);
      order = await Order.findOne({ where: { id: orderId, userId } });
    }

    if (!order) {
      console.error(
        `Order not found for user ${userId} and order ID ${orderId}`,
      ); // Log the error
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res, next) => {
  const userId = req.user.userId;
  const isAdmin = req.user.isAdmin;

  try {
    let orders;
    if (isAdmin) {
      console.log(`Admin ${userId} retrieved all orders`);
      orders = await Order.findAll();
      console.log(`Retrieved ${orders.length} orders`);
    } else {
      console.log(`Customer ${userId} retrieved orders`);
      orders = await Order.findAll({ where: { userId } });
    }

    if (orders === null || orders === undefined) {
      console.error(`Cannot get orders for the user ${userId}`); // Log the error
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;

  // Validate order status
  if (
    ![
      "Payment Pending",
      "Payment Successful",
      "Shipped",
      "Delivered",
      "Cancelled",
    ].includes(status)
  ) {
    return res.status(400).json({ message: "Invalid order status" });
  }
  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: error.message });
  }
};
