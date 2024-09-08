import api from './api';

const getAllOrdersAdmin = async () => {
  try {
    const response = await api.get('/api/orders');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { getAllOrdersAdmin };