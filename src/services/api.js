import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CURRENT_API_CONFIG } from '../config/api';
import { extractErrorMessage } from '../utils/apiUtils';

// Base API configuration
const api = axios.create({
  baseURL: CURRENT_API_CONFIG.baseURL,
  timeout: CURRENT_API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      AsyncStorage.removeItem('userToken');
      AsyncStorage.removeItem('userData');
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Login failed'));
    }
  },

  signup: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Registration failed'));
    }
  },

  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Logout failed'));
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to get profile'));
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/me', profileData);
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to update profile'));
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to send password reset email'));
    }
  },

  resetPassword: async (data) => {
    try {
      const response = await api.post('/auth/reset-password', data);
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to reset password'));
    }
  },
};

// Shipment APIs
export const shipmentAPI = {
  trackShipment: async (trackingNumber) => {
    try {
      const response = await api.post('/shipments/track', { trackingNumber });
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to track shipment'));
    }
  },

  getRecentShipments: async () => {
    try {
      const response = await api.post('/shipments/recent');
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to get recent shipments'));
    }
  },
};

// News API
export const newsAPI = {
  getLatestNews: async () => {
    try {
      const response = await api.get('/news/latest');
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to get latest news'));
    }
  },
};

// Freight estimation API
export const freightAPI = {
  estimateFreight: async (data) => {
    try {
      const response = await api.post('/freight/estimate', data);
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to estimate freight'));
    }
  },
};

export default api; 