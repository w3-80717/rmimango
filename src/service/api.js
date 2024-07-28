import axios from 'axios';
import { apiBaseUrl } from '../config/apiConfig';

const api = axios.create({
  baseURL: apiBaseUrl,
});

export default api;