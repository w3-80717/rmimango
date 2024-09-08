import axios from 'axios';
import { apiBaseUrl } from '../config/apiConfig';

const api = axios.create({
  baseURL: apiBaseUrl,
});
api.getToken = () => {
  let token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not logged in! Please login');
  }
  return token;
}
export default api;