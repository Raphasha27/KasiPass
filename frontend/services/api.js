import axios from 'axios';
import { Platform } from 'react-native';

// IMPORTANT: For real devices, use your machine's local IP (e.g., 172.20.6.221)
// Your current machine IP (from Expo Go screenshot): 172.20.6.221
const BASE_URL = 'http://172.20.6.221:8000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
