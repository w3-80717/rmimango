// utils/mockPaymentGateway.js
const shortid = require('shortid');

exports.processPayment = async (amount, currency = 'INR') => {
  return {
    id: shortid.generate(),
    amount,
    currency,
    receipt: shortid.generate(),
    status: 'created',
  };
};
