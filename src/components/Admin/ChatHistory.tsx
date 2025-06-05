import React, { useState } from 'react';
import { api } from '../../services/api';

interface ChatRecord {
  lessonId: string;
  messages: { role: string; content: string; ts: string }[];
}

const ChatHistory: React.FC = () => {
  const [email, setEmail] = useState('');
  const [history, setHistory] = useState<ChatRecord[]>([]);

  const load = async () => {
    if (!email.trim()) return;
    try {
      const { data } = await api.get<ChatRecord[]>('/admin/chats', {
        params: { email: email.trim() }
      });
      setHistory(data);
    } catch (err: any) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="User email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={load}
        >
          Load
        </button>
      </div>
      {history.length === 0 ? (
        <p className="text-gray-500">— no messages —</p>
      ) : (
        history.map((chat, idx) => (
          <div key={idx} className="mb-4">
            <h4 className="font-semibold">Lesson ID: {chat.lessonId}</h4>
            <ul className="max-h-64 overflow-auto border rounded p-2">
              {chat.messages.map((m, i) => (
                <li key={i} className="mb-1">
                  <span className="font-mono text-xs text-gray-500">{new Date(m.ts).toLocaleString()}:</span>{' '}
                  <span className={m.role === 'assistant' ? 'text-green-700' : 'text-blue-700'}>
                    {m.content}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatHistory;
