// frontend/src/components/Admin/LessonList.tsx

import React, { useState, useEffect } from 'react';
import LessonEditor from './LessonEditor';
import { api } from '../../services/api';

interface Lesson {
  _id?: string;
  title: string;
  content: string;
  order: number;
  finalQuestions?: string[];
  criteria?: { name: string; weight: number }[];
}

const LessonList: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [editing, setEditing] = useState<Lesson | null>(null);

  const load = async () => {
    try {
      const { data } = await api.get<Lesson[]>('/lessons');
      setLessons(data);
    } catch (e) {
      console.error('Load lessons failed', e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm('Delete this lesson?')) return;
    await api.delete(`/lessons/${id}`);
    load();
  };

  return (
    <div className="space-y-4">
      {editing ? (
        <LessonEditor
          lesson={editing}
          onDone={() => {
            setEditing(null);
            load();
          }}
        />
      ) : (
        <>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={() =>
              setEditing({
                title: '',
                content: '',
                order: lessons.length + 1,
                finalQuestions: [''],
                criteria: [{ name: '', weight: 0 }],
              })
            }
          >
            + New lesson
          </button>

          {lessons.map(l => (
            <div
              key={l._id}
              className="flex flex-col p-3 rounded border bg-white dark:bg-panel dark:border-line"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">
                  {l.order}. {l.title}
                </span>
                <div className="space-x-3">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => setEditing(l)}
                  >
                    Edit
                  </button>
                  {l._id && (
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => remove(l._id!)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {l.content
                  ? l.content.length > 100
                    ? l.content.slice(0, 100) + '…'
                    : l.content
                  : '— нет текста урока —'}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};  // ← вот эта закрывающая скобка и точка с запятой были пропущены

export default LessonList;
