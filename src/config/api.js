// API Configuration
export const API_CONFIG = {
  // Development
  development: {
    baseURL: 'http://localhost:8000/api/v1',
    timeout: 10000,
  },
  
  // Production (update this with your actual production URL)
  production: {
    baseURL: 'https://your-production-domain.com/api/v1',
    timeout: 15000,
  },
  
  // Staging (if you have one)
  staging: {
    baseURL: 'https://your-staging-domain.com/api/v1',
    timeout: 12000,
  },
};

// Get current environment (you can change this based on your needs)
const getCurrentEnvironment = () => {
  // For development, you can change this to 'production' or 'staging'
  return 'development';
};

export const getApiConfig = () => {
  const env = getCurrentEnvironment();
  return API_CONFIG[env] || API_CONFIG.development;
};

// Export the current config for easy access
export const CURRENT_API_CONFIG = getApiConfig();
