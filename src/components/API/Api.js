import axios from 'axios';

// Ensure environment variables are loaded
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL 
 ? `${process.env.REACT_APP_API_BASE_URL}/api`
 : 'http://localhost:4003/api';

const api = axios.create({
 baseURL: API_BASE_URL,
 timeout: 5000,
 headers: {
   'Content-Type': 'application/json'
 }
});

// Enhanced error interceptor
api.interceptors.response.use(
 response => response,
 error => {
   const errorDetails = {
     message: error.message,
     response: error.response?.data,
     status: error.response?.status,
     url: error.config?.url
   };

   // Log error details
   console.error('API Error:', errorDetails);

   // Optional: Send error to logging service
   // logErrorToService(errorDetails);

   return Promise.reject(error);
 }
);export default api;