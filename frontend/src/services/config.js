const config_urls = {
  local: 'http://localhost:3000',
  development: 'http://localhost:8000',
  production: 'https://tutuion-management.onrender.com',
};

export const BASE_URL = config_urls[import.meta.env.VITE_DEVELOPMENT_MODE || 'development'];
export const API_URL =
  config_urls[import.meta.env.VITE_DEVELOPMENT_MODE || 'development'] + '/api/v1';
export const public_url = 'https://www.eduexcellencetutorial.com';
