import React, { useState } from 'react';
import LessonList from '../components/Admin/LessonList';
import UsersOnline from '../components/Admin/UsersOnline';
import ChatHistory from '../components/Admin/ChatHistory';
import AnalyticsCharts from '../components/Admin/AnalyticsCharts';

const tabs = ['Lessons', 'Users', 'Chats', 'Analytics'] as const;

const AdminPanel: React.FC = () => {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Lessons');

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold my-4">Administration panel</h1>

      {/* вкладки */}
      <div className="flex gap-2 mb-6">
        {tabs.map(t => (
          <button
            key={t}
            className={`rounded px-3 py-1 text-sm
              ${tab === t ? 'btn-tab-active' : 'btn-tab-inactive'}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* контент */}
      {tab === 'Lessons'   && <LessonList />}
      {tab === 'Users'     && <UsersOnline />}
      {tab === 'Chats'     && <ChatHistory />}
      {tab === 'Analytics' && <AnalyticsCharts />}
    </div>
  );
};

export default AdminPanel;
