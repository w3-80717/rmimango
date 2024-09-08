import api from './api';

/**
 * 
 * @param {{ fullName:string, email:string, password:string, address:string} }credentials 
 * @returns 
 */
const registerUser = async (credentials) => {
  try {
    const response = await api.post('/api/auth/register', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};/*  */

/**
 * 
 * @param {{email:string, password:string}} credentials 
 * @returns 
 */
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