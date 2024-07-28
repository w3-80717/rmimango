import api from './api';

const createNewOrder = async (totalPrice, status) => {
  try {
    const response = await api.post('/api/order/checkout', { totalPrice, status });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getOrderDetails = async (orderId) => {
  try {
    const response = await api.get(`/api/order/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getAllOrders = async () => {
  try {
    const response = await api.get('/api/order');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.put(`/api/order/${orderId}`, { status });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { createNewOrder, getOrderDetails, getAllOrders, updateOrderStatus };