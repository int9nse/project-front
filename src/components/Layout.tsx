import React from 'react';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const TopBar: React.FC = () => {
  const { logout } = useAuth();
  const nav = useNavigate();
  return (
    <header className="h-12 flex items-center justify-between px-4 border-b bg-white dark:bg-surface dark:border-gray-700">
      <ThemeToggle />
      <button
        onClick={() => { logout(); nav('/login'); }}
        className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
};

const Layout: React.FC = () => (
  <div className="flex h-screen bg-gray-100 dark:bg-surface text-gray-900 dark:text-gray-100">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <TopBar />
      <main className="flex-1 p-4 overflow-y-auto">
        {/* Вот сюда будут вставляться все вложенные Routes */}
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;
