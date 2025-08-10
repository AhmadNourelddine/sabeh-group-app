// API Utility functions for consistent error handling and response processing

/**
 * Extract error message from API error response
 * @param {Error} error - The error object from API call
 * @param {string} defaultMessage - Default message if no error message found
 * @returns {string} The error message to display
 */
export const extractErrorMessage = (error, defaultMessage = 'An error occurred') => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return defaultMessage;
};

/**
 * Check if the error is a network error
 * @param {Error} error - The error object from API call
 * @returns {boolean} True if it's a network error
 */
export const isNetworkError = (error) => {
  return !error.response && error.request;
};

/**
 * Check if the error is an authentication error (401)
 * @param {Error} error - The error object from API call
 * @returns {boolean} True if it's an authentication error
 */
export const isAuthError = (error) => {
  return error.response?.status === 401;
};

/**
 * Check if the error is a server error (5xx)
 * @param {Error} error - The error object from API call
 * @returns {boolean} True if it's a server error
 */
export const isServerError = (error) => {
  return error.response?.status >= 500;
};

/**
 * Get appropriate error message based on error type
 * @param {Error} error - The error object from API call
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  if (isNetworkError(error)) {
    return 'Network error. Please check your internet connection.';
  }
  
  if (isServerError(error)) {
    return 'Server error. Please try again later.';
  }
  
  if (isAuthError(error)) {
    return 'Session expired. Please log in again.';
  }
  
  return extractErrorMessage(error);
};

/**
 * Validate API response data
 * @param {Object} response - The API response
 * @param {string} expectedField - The expected data field (default: 'data')
 * @returns {boolean} True if response is valid
 */
export const validateApiResponse = (response, expectedField = 'data') => {
  return response && response[expectedField] !== undefined;
};

/**
 * Safe API call wrapper with error handling
 * @param {Function} apiCall - The API function to call
 * @param {string} errorMessage - Custom error message
 * @returns {Promise} Promise that resolves with data or rejects with error
 */
export const safeApiCall = async (apiCall, errorMessage = 'API call failed') => {
  try {
    const response = await apiCall();
    return response;
  } catch (error) {
    const message = extractErrorMessage(error, errorMessage);
    throw new Error(message);
  }
};
