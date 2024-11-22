import axios from 'axios';

// Ensure environment variables are loaded
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL 
  ? `${process.env.REACT_APP_API_BASE_URL}/api`
  : 'http://localhost:4003/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Log the full URL on every request
api.interceptors.request.use(
  (config) => {
    // Log the full request URL
    console.log('Request URL:', `${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Enhanced error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorDetails = {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
    };

    // Log error details
    console.error('API Error:', errorDetails);

    return Promise.reject(error);
  }
);

export default api;
