import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface Auth {
  token: string | null;
  role: string | null;
  login: (t: string, r: string) => void;
  logout: () => void;
}

const AuthCtx = createContext<Auth>({
  token: null,
  role: null,
  login: () => {},
  logout: () => {},
});
export const useAuth = () => useContext(AuthCtx);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

  useEffect(() => {
    if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, [token]);

  const login = (t: string, r: string) => {
    setToken(t);
    setRole(r);
    localStorage.setItem('token', t);
    localStorage.setItem('role', r);
    api.defaults.headers.common['Authorization'] = `Bearer ${t}`;
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return <AuthCtx.Provider value={{ token, role, login, logout }}>{children}</AuthCtx.Provider>;
};
