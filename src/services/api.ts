import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://backend-ffsy.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
