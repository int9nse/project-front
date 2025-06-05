import React, { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw]       = useState('');
  const { login }         = useAuth();
  const nav               = useNavigate();

  const submit = async () => {
    try {
      const { data } = await api.post('/auth/login', { email, password: pw });
      login(data.token, data.role);
      nav(data.role === 'admin' ? '/admin' : '/');
    } catch {
      alert('Incorrect e‑mail or password');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {/* переключатель темы */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* сама карточка входа */}
      <div className="w-80 p-6 rounded shadow bg-white dark:bg-panel dark:border dark:border-line space-y-4">
        <h1 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100">
          Login
        </h1>

        <input
          className="w-full p-2 border rounded bg-white dark:bg-panel placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="e‑mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded bg-white dark:bg-panel"
          type="password"
          placeholder="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={submit}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Login;
