// src/utils/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `/api`, // Replace with your Fastify server URL
  timeout: 5000,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'},
});

export default axiosInstance;
