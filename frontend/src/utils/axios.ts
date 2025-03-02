// src/utils/axios.js
import axios from 'axios';

const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' 
  ? `${import.meta.env.VITE_API_BASE_URL}/api` 
  : '/api';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'},
});

export default axiosInstance;
