// API Configuration
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://localhost:7274',
  //BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://192.3.62.144:7001',
  ENDPOINTS: {
    USER_COMMENT: '/api/UserComment',
  },
  TIMEOUT: 30000, // 30 seconds
};

export default API_CONFIG;

