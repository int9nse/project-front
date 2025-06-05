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

          {lessons.map((l) => (
            <div
              key={l._id}
              className="flex justify-between items-center p-3 rounded border bg-white dark:bg-panel dark:border-line"
            >
              <span>
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
          ))}
        </>
      )}
    </div>
  );
};

export default LessonList;
