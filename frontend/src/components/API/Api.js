import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_API_BASE_URL}`  // Production URL
    : 'http://localhost:4003/api',  // Local Development URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});


// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

export default api;