import api from './api';

const addItemToCart = async (productId, quantity) => {
  try {
    const response = await api.post('/api/cart', { productId, quantity });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getCartItems = async () => {
  try {
    const response = await api.get('/api/cart');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const removeItemFromCart = async (productId) => {
  try {
    const response = await api.delete(`/api/cart/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateCartQuantity = async (productId, quantity) => {
  try {
    const response = await api.patch(`/api/cart/${productId}`, { quantity });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { addItemToCart, getCartItems, removeItemFromCart, updateCartQuantity };