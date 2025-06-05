import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login       from './pages/Login';
import AdminPanel  from './pages/AdminPanel';
import Dashboard   from './pages/Dashboard';

import Layout      from './components/Layout';
import TopicGuard  from './components/TopicProgressGuard';

import { AuthProvider, useAuth } from './context/AuthContext';

/* ——— приватный обёртчик ——— */
const Private: React.FC<{ children: JSX.Element; roles?: string[] }> = ({ children, roles }) => {
  const { token, role } = useAuth();
  if (!token)                        return <Navigate to="/login" replace />;
  if (roles && !roles.includes(role ?? '')) return <Navigate to="/" replace />;
  return children;
};

/* ——— основное приложение ——— */
const App: React.FC = () => (
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Private><Dashboard /></Private>} />

        <Route
          path="/topic/:topicId"
          element={
            <Private>
              <TopicGuard>
                <Dashboard />
              </TopicGuard>
            </Private>
          }
        />

        <Route
          path="/admin"
          element={<Private roles={['admin']}><AdminPanel /></Private>}
        />
      </Route>
    </Routes>
  </AuthProvider>
);

export default App;
