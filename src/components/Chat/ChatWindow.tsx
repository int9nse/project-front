import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { useParams } from 'react-router-dom';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
  ts?: string;
}

const ChatWindow: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [inp, setInp] = useState('');
  const [step, setStep] = useState<'chunk' | 'final' | 'result'>('chunk');
  const [loading, setLoading] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  // Guard: если нет topicId, показываем призыв выбрать тему
  if (!topicId) {
    return (
      <div className="p-4 text-gray-600 dark:text-gray-400">
        Please select a topic on the left to start the lesson.
      </div>
    );
  }

  // Автоматический скролл вниз при добавлении новых сообщений
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  // При монтировании/смене topicId подпруживаем историю чата или делаем старт
  useEffect(() => {
    (async () => {
      try {
        // 1) Пробуем получить историю (GET /api/learning/chat/:topicId)
        const { data } = await api.get<Msg[]>(`/learning/chat/${topicId}`);
        if (data.length) {
          setMsgs(data);
          setStep(data.some(m => m.content.startsWith('Final questions')) ? 'final' : 'chunk');
        } else {
          // 2) Если история пуста, сразу “start”
          const res = await api.post(`/learning/chat/${topicId}`, { message: 'start' });
          setMsgs([{ role: 'assistant', content: res.data.chunk }]);
        }
      } catch (err) {
        console.error(err);
        setMsgs([{ role: 'assistant', content: `🚫 Error: ${(err as any).message}` }]);
      } finally {
        setLoading(false);
      }
    })();
  }, [topicId]);

  const send = async (override?: string) => {
    const text = override ?? inp.trim();
    if (!text) return;
    setMsgs(prev => [...prev, { role: 'user', content: text }]);
    setInp('');
    try {
      const { data } = await api.post(`/learning/chat/${topicId}`, { message: text });
      if (data.type === 'chunk') {
        setMsgs(prev => [...prev, { role: 'assistant', content: data.chunk }]);
        setStep('chunk');
      } else if (data.type === 'answer') {
        setMsgs(prev => [...prev, { role: 'assistant', content: data.answer }]);
      } else if (data.type === 'final') {
        setMsgs(prev => [
          ...prev,
          { role: 'assistant', content: 'Final questions:' },
          ...data.questions.map((q: string) => ({ role: 'assistant', content: q }))
        ]);
        setStep('final');
      } else if (data.type === 'result') {
        const msg = data.passed
          ? `🎉 You passed! Score: ${data.score}\n\n${data.feedback}`
          : `❌ You failed. Score: ${data.score}\n\n${data.feedback}\n\nType 'restart' to retry.`;
        setMsgs(prev => [...prev, { role: 'assistant', content: msg }]);
        setStep('result');
      } else {
        setMsgs(prev => [...prev, { role: 'assistant', content: `🚫 Unexpected type: ${data.type}` }]);
      }
    } catch (e: any) {
      const err = e.response?.data?.error || e.message;
      setMsgs(prev => [...prev, { role: 'assistant', content: `🚫 ${err}` }]);
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-gray-600 dark:text-gray-400">
        Loading chat…
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded">
      {step === 'chunk' && (
        <div className="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-400">
          hint: type 'continue' to get the next part
        </div>
      )}

      <div className="flex-1 overflow-auto p-4 flex flex-col gap-3">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`chat-bubble ${m.role === 'assistant' ? 'ai' : 'user'}`}
          >
            {m.content}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-2 border-t dark:border-gray-700 bg-gray-100 dark:bg-gray-900 flex gap-2">
        <input
          className="flex-1 px-3 py-2 border rounded bg-gray-200 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          placeholder="Type a message…"
          value={inp}
          onChange={e => setInp(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button
          onClick={() => send()}
          className="px-4 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded"
        >
          Send
        </button>
        <button
          onClick={() => {
            setMsgs([]);
            send('restart');
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Reset Chat
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
