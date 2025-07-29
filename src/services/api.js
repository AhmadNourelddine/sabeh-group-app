import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base API configuration
const API_BASE_URL = 'https://api.sabehgroup.com'; // Replace with actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
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
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'demo@sabehgroup.com' && password === 'password') {
          resolve({
            success: true,
            data: {
              user: {
                id: 1,
                name: 'AHMAD NOUREDDINE',
                email: 'AHMAD.NOURELDINE@GMAIL.COM',
                accountManager: 'Ali',
                accountLevel: 'Normal',
                areaCode: '961',
                mobile: '71199876',
                shippingAddress: '',
              },
              token: 'dummy-jwt-token-12345',
            },
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  signup: async (userData) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password) {
          resolve({
            success: true,
            data: {
              user: {
                id: 2,
                name: userData.name,
                email: userData.email,
                accountManager: 'Ali',
                accountLevel: 'Normal',
                areaCode: '961',
                mobile: '',
                shippingAddress: '',
              },
              token: 'dummy-jwt-token-signup-12345',
            },
          });
        } else {
          reject(new Error('Invalid signup data'));
        }
      }, 1000);
    });
  },
};

// Shipment APIs
export const shipmentAPI = {
  trackShipment: async (trackingNumber) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockShipments = {
          'AIR5114': {
            id: 'AIR5114',
            status: 'Signed',
            pricePerKg: 9.50,
            totalDue: 83.60,
            departedFrom: 'GZ AIR',
            destination: 'LBN',
            shippingMark: 'NBD',
            totalCtn: 1,
            totalWeight: '8.80KG',
            totalCbm: '0.053',
            goodsDescription: 'TOY',
            shipmentType: 'Air shipment',
            eta: '2025-07-20',
            etd: '2025-07-14',
            inventoryNo: 'GZAIR25070163642',
            packedOrders: 'SF0284771033692',
            photos: [
              'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=Box+H4945',
              'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=Shipping+Label',
            ],
          },
          'AIR5076': {
            id: 'AIR5076',
            status: 'In Transit',
            pricePerKg: 12.00,
            totalDue: 120.00,
            departedFrom: 'GZ AIR',
            destination: 'LBN',
            shippingMark: 'NBD',
            totalCtn: 2,
            totalWeight: '10.00KG',
            totalCbm: '0.080',
            goodsDescription: 'ELECTRONICS',
            shipmentType: 'Air shipment',
            eta: '2025-07-25',
            etd: '2025-07-18',
            inventoryNo: 'GZAIR25070163643',
            packedOrders: 'SF0284771033693',
            photos: [
              'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=Electronics+Box',
            ],
          },
          'YW5023': {
            id: 'YW5023',
            status: 'Delivered',
            pricePerKg: 8.00,
            totalDue: 160.00,
            departedFrom: 'GZ SEA',
            destination: 'LBN',
            shippingMark: '大图-NBD',
            totalCtn: 3,
            totalWeight: '20.00KG',
            totalCbm: '0.150',
            goodsDescription: 'FURNITURE',
            shipmentType: 'Sea shipment',
            eta: '2025-07-10',
            etd: '2025-06-25',
            inventoryNo: 'GZSEA25060163644',
            packedOrders: 'SF0284771033694',
            photos: [
              'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=Furniture+Box',
            ],
          },
        };

        if (mockShipments[trackingNumber]) {
          resolve({
            success: true,
            data: mockShipments[trackingNumber],
          });
        } else {
          reject(new Error('Shipment not found'));
        }
      }, 1000);
    });
  },

  getRecentShipments: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 'AIR5114',
              status: 'Signed',
              shippingMark: 'NBD',
              total: '1CTN-0.053CBM-8.80KG',
              type: 'Air',
            },
            {
              id: 'AIR5076',
              status: 'In Transit',
              shippingMark: 'NBD',
              total: '2CTN-0.080CBM-10.00KG',
              type: 'Air',
            },
            {
              id: 'YW5023',
              status: 'Delivered',
              shippingMark: '大图-NBD',
              total: '3CTN-0.150CBM-20.00KG',
              type: 'Sea',
            },
          ],
        });
      }, 500);
    });
  },
};

// News API
export const newsAPI = {
  getLatestNews: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 1,
              title: 'عطلة ذكرى عاشوراء',
              content: 'سيتم إغلاق المكاتب يوم 4 يوليو 2025 بمناسبة عطلة ذكرى عاشوراء',
              date: '04/07/2025',
              time: '08:21 am',
            },
            {
              id: 2,
              title: 'عطلة رأس السنة الهجرية',
              content: 'سيتم إغلاق المكاتب يوم 25 يونيو 2025 بمناسبة عطلة رأس السنة الهجرية',
              date: '25/06/2025',
              time: '06:54 am',
            },
          ],
        });
      }, 500);
    });
  },
};

// Freight estimation API
export const freightAPI = {
  estimateFreight: async (data) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const { transportationType, weight, cbm } = data;
        let estimate = 0;

        if (transportationType === 'Sea Freight') {
          estimate = (weight * 5) + (cbm * 100);
        } else {
          estimate = (weight * 15) + (cbm * 200);
        }

        resolve({
          success: true,
          data: {
            estimate: estimate.toFixed(2),
            currency: 'USD',
            breakdown: {
              weight: weight,
              volume: cbm,
              baseRate: transportationType === 'Sea Freight' ? 5 : 15,
              volumeRate: transportationType === 'Sea Freight' ? 100 : 200,
            },
          },
        });
      }, 1000);
    });
  },
};

export default api; 