// controllers/orderController.js
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const OrderItem = require("../models/OrderItem");
const sequelize = require("../config/database");
const shortid = require("shortid");
const User = require("../models/User");
const crypto = require('crypto');
const OrderTransaction = require("../models/OrderTransaction");
const merchantKey = process.env.MERCHANT_KEY;
const salt = process.env.PAYU_SALT;
const payUPaymentEndpoint = process.env.PAYU_PAYMENT_ENDPOINT;

function sha512(str) {
  return crypto.createHash("sha512").update(str).digest("hex");
}

exports.checkout = async (req, res, next) => {
  const userId = req.user.userId;
  const { shippingAddress } = req.body;

  if (!shippingAddress) {
    return res
      .status(400)
      .json({ message: "Invalid shipping address" });
  }

   {
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

    // payu payload and url creation
    // 
    const user = await User.findByPk(req.user.userId);
    let callbackUrl = new URL(req.headers.referer);
    callbackUrl.pathname = "/api/orders/payment/callback";
    console.log(callbackUrl);
    const params = {
      key: merchantKey,
      txnid: "TXN" + Date.now(),
      amount: totalPrice,
      productinfo: cartItems.map(ci => ci.Product.title).join(';'),
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      phone: user.mobile,
      address: user.address,
      surl: callbackUrl,
      furl: callbackUrl,
      udf1: user.id
    };
    // Generate the hash
    console.log("params created, generating hash")
    const hashString = `${params.key}|${params.txnid}|${params.amount}|${params.productinfo}|${params.firstname}|${params.email}|${params.udf1}||||||||||${salt}`;
    const hash = sha512(hashString);
    console.log("hash generated");
    params.hash = hash;
    res.status(200).json({ url: payUPaymentEndpoint, payLoad: params });
    //--------------------------------------------
    // // Create a new order and order items in a transaction
    // const transaction = await sequelize.transaction();
    // try {
    // } catch (error) {
    //   // await transaction.rollback();
    //   console.error(error); // Log the error
    //   res.status(500).json({ message: error.message });
    // }
    //------------------------------
  }
};

exports.placeOrder = async (req, res, next) => {
  // payu will send the hash and verify it is correct
  const payResBody = req.body;
  console.log(payResBody);
  const hashString = `${salt}|${payResBody.status}||||||${payResBody.udf5}|${payResBody.udf4}|${payResBody.udf3}|${payResBody.udf2}|${payResBody.udf1}|${payResBody.email}|${payResBody.firstname}|${payResBody.productinfo}|${payResBody.amount}|${payResBody.txnid}|${payResBody.key}`;
  console.log(hashString);
  const hash = sha512(hashString);
  console.log(hash);
  if (hash !== payResBody.hash) {
    return res.status(401).json({ message: "Unauthorized request" });
  }
  // verified hash is correct
  // let's now create transaction object
  let orderTransaction = new OrderTransaction();
  orderTransaction.txnid = payResBody.txnid;
  orderTransaction.amount = payResBody.amount;
  orderTransaction.txndate = payResBody.addedon;
  orderTransaction.status = payResBody.status;
  orderTransaction.userId = payResBody.udf1;
  if (orderTransaction.status !== 'success') {
    orderTransaction.save();
    return res.status(400).json(orderTransaction);
  }
  const newOrder = await Order.create(
    { userId: orderTransaction.userId, totalPrice, status: "PAYMENT_SUCCESS", shippingAddress }
  );

  const orderItems = cartItems.map((item) => ({
    orderId: newOrder.id,
    productId: item.productId,
    quantity: item.quantity,
    price: item.Product.price,
  }));

  await OrderItem.bulkCreate(orderItems, { transaction });

  orderTransaction.orderId = newOrder.id;
  orderTransaction.save();
  await Cart.destroy({ where: { userId: orderTransaction.userId } });
  res.status(201).json({ ...newOrder, ...orderTransaction });
}

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
