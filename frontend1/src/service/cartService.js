import api from './api';

const addItemToCart = async (productId, quantity) => {
  let token = api.getToken();
  try {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await api.post('/api/cart', { productId, quantity }, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCartItems = async () => {
  try {
    let token = api.getToken();
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await api.get('/api/cart', { headers });
    return response.data;
  } catch (error) {
    throw error.response.data;
    //throw error.response ? error.response.data : error;
  }
};

const removeItemFromCart = async (productId) => {
  try {
    let token = api.getToken();  // Get the token
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token  // Include the Authorization header
    };
    const response = await api.delete(`/api/cart/${productId}`, { headers }); // Pass headers
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateCartQuantity = async (productId, quantity) => {
  try {
    let token = api.getToken();
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await api.patch(`/api/cart/${productId}`, { quantity }, { headers });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { addItemToCart, getCartItems, removeItemFromCart, updateCartQuantity };
