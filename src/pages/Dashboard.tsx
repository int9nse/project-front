import React from 'react';
import { useParams } from 'react-router-dom';
import ChatWindow from '../components/Chat/ChatWindow';

/**
 * Dashboard:
 * - Если URL без :topicId (то есть просто /topic), показывает подсказку.
 * - Если есть topicId, рендерит ChatWindow (который сам берёт topicId из URL).
 */
const Dashboard: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();

  if (!topicId) {
    return (
      <div className="p-4 text-gray-600 dark:text-gray-400">
        Please select a topic on the left to start the lesson.
      </div>
    );
  }

  return <ChatWindow />;
};

export default Dashboard;
