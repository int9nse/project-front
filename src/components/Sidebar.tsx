import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../services/api';

const Sidebar: React.FC = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const loc = useLocation();

  useEffect(() => {
    api.get('/lessons').then(r => setTopics(r.data));
  }, []);

  return (
    <aside className="w-64 flex flex-col bg-white dark:bg-panel dark:border-r dark:border-line">
      <h2 className="text-xl font-bold p-4 border-b dark:border-line">
        Topics
      </h2>

      <nav className="flex-1 overflow-y-auto">
        {topics.length === 0 && (
          <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
            No topics yet
          </p>
        )}

        {topics.map(t => (
          <Link
            key={t._id}
            to={`/topic/${t._id}`}
            className={`
              block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700
              ${loc.pathname.includes(t._id) ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : ''}
            `}
          >
            {t.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
