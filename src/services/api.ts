// frontend/src/services/api.ts
import axios from 'axios';

export const api = axios.create({
  // Относительный путь: Vite проксирует /api → http://localhost:3001/api
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Автоподстановка JWT, если сохранён в localStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
