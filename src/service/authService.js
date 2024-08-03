import api from './api';

const registerUser = async (credentials) => {
  try {
    const response = await api.post('/api/auth/register', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};/*  */

const loginUser = async (credentials) => {
  try {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const logoutUser = async () => {
  try {
    const response = await api.post('/api/auth/logout');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { registerUser, loginUser, logoutUser };