import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { getToken, clearSession } from '../utils/tokenUtils';

/**
 * Centralized Axios instance for all RoadCare API calls.
 * - baseURL points to Spring Boot backend
 * - Request interceptor automatically injects JWT Bearer token
 * - Response interceptor handles 401 (session expiry → redirect to login)
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// ===================== REQUEST INTERCEPTOR =====================
// Attach JWT token to every outgoing request that has one stored
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===================== RESPONSE INTERCEPTOR =====================
// Handle 401 globally: clear session and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear local session
      clearSession();
      // Only redirect if not already on a public page
      const publicPaths = ['/login', '/register', '/login', '/'];
      if (!publicPaths.includes(window.location.pathname)) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;