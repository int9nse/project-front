// frontend/src/components/Admin/AdminDashboard.tsx

import React, { useState } from 'react';
import LessonList from './LessonList';
import ChatHistory from './ChatHistory';
// import другие компоненты админки по необходимости
// например: UsersOnline, Analytics, и т.д.

type TabKey = 'lessons' | 'chatHistory' /* | 'usersOnline' | 'analytics' */;

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('lessons');

  return (
    <div className="h-full flex flex-col">
      {/* Навигака по табам */}
      <nav className="border-b dark:border-line bg-white dark:bg-panel p-2 flex gap-4">
        <button
          className={`px-3 py-1 rounded ${
            activeTab === 'lessons'
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          onClick={() => setActiveTab('lessons')}
        >
          Lessons
        </button>
        <button
          className={`px-3 py-1 rounded ${
            activeTab === 'chatHistory'
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          onClick={() => setActiveTab('chatHistory')}
        >
          Chat History
        </button>
        {/*
        <button
          className={`px-3 py-1 rounded ${activeTab==='usersOnline' ? 'bg-blue-600 text-white' : ''}`}
          onClick={()=>setActiveTab('usersOnline')}
        >
          Users Online
        </button>
        */}
        {/*
        <button
          className={`px-3 py-1 rounded ${activeTab==='analytics' ? 'bg-blue-600 text-white' : ''}`}
          onClick={()=>setActiveTab('analytics')}
        >
          Analytics
        </button>
        */}
      </nav>

      {/* Содержимое выбранного таба */}
      <div className="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-gray-900">
        {activeTab === 'lessons' && <LessonList />}

        {activeTab === 'chatHistory' && <ChatHistory />}

        {/* 
        {activeTab === 'usersOnline' && <UsersOnline />} 
        {activeTab === 'analytics'   && <Analytics />} 
        */}
      </div>
    </div>
  );
};

export default AdminDashboard;
