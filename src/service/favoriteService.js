import api from './api';

const addItemToFavorites = async (productId) => {
  try {
    const response = await api.post('/api/favorite', { productId });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getFavoriteItems = async () => {
  try {
    const response = await api.get('/api/favorite');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const removeItemFromFavorites = async (productId) => {
  try {
    const response = await api.delete(`/api/favorite/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { addItemToFavorites, getFavoriteItems, removeItemFromFavorites };