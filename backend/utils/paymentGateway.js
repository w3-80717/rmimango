const Razorpay = require('razorpay');
const shortid = require('shortid');

let processPayment;

if (process.env.NODE_ENV === 'development') {
  processPayment = require('./mockPaymentGateway').processPayment;
} else {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  // Create order with Razorpay
  processPayment = async (amount, currency = 'INR') => {
    try {
      const orderOptions = {
        amount: amount * 100, // amount in paisa
        currency,
        receipt: shortid.generate(),
        payment_capture: 1, // Automatically capture payment
      };

      const order = await razorpay.orders.create(orderOptions);
      return order;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw new Error('Failed to create payment order');
    }
  };

  // Verify payment with Razorpay
  const verifyPayment = async (paymentId, orderId, signature) => {
    try {
      const crypto = require('crypto');
      const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      if (generatedSignature !== signature) {
        console.error('Invalid signature');
        throw new Error('Invalid signature');
      }

      // Here you can implement additional verification logic if needed
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new Error('Failed to verify payment');
    }
  };

  module.exports = {
    processPayment,
    verifyPayment,
  };
}