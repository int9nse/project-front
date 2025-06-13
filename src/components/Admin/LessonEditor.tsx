// frontend/src/components/Admin/LessonEditor.tsx

import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

interface Criterion {
  name: string;
  weight: number;
}

interface LessonData {
  _id?: string;
  title: string;
  content: string;
  order: number;
  finalQuestions?: string[];
  criteria?: Criterion[];
}

interface Props {
  lesson: LessonData;
  onDone: () => void;
}

const LessonEditor: React.FC<Props> = ({ lesson, onDone }) => {
  const isNew = !lesson._id;

  const [title, setTitle] = useState<string>(lesson.title || '');
  const [content, setContent] = useState<string>(lesson.content || '');
  const [order, setOrder] = useState<number>(lesson.order || 1);
  const [questions, setQuestions] = useState<string[]>(
    lesson.finalQuestions?.length ? lesson.finalQuestions : ['']
  );
  const [criteria, setCriteria] = useState<Criterion[]>(
    lesson.criteria?.length ? lesson.criteria : [{ name: '', weight: 0 }]
  );
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setTitle(lesson.title || '');
    setContent(lesson.content || '');
    setOrder(lesson.order || 1);
    setQuestions(lesson.finalQuestions?.length ? lesson.finalQuestions! : ['']);
    setCriteria(lesson.criteria?.length ? lesson.criteria! : [{ name: '', weight: 0 }]);
  }, [lesson]);

  const handleSave = async () => {
    setError('');
    setSaving(true);
    try {
      const fq = questions.filter(q => q.trim());
      const crit = criteria
        .filter(c => c.name.trim())
        .map(c => ({ name: c.name.trim(), weight: c.weight || 0 }));

      const body = {
        title,
        content,
        order,
        finalQuestions: fq,
        criteria: crit,
      };

      if (isNew) {
        await api.post('/lessons', body);
      } else {
        await api.put(`/lessons/${lesson._id}`, body);
      }
      onDone();
    } catch (e: any) {
      setError(e.response?.data?.error || e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-panel rounded shadow space-y-4">
      <h3 className="text-xl font-bold">{isNew ? 'New Lesson' : 'Edit Lesson'}</h3>
      {error && <div className="text-red-600">{error}</div>}

      <div>
        <label className="block mb-1">Title</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1">Content</label>
        <textarea
          className="w-full border p-2 rounded h-32"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1">Order</label>
        <input
          type="number"
          className="w-20 border p-2 rounded"
          value={order}
          onChange={e => setOrder(+e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1">Final Questions (one per line)</label>
        {questions.map((q, i) => (
          <input
            key={i}
            className="w-full border p-2 rounded mb-1"
            value={q}
            onChange={e => {
              const arr = [...questions];
              arr[i] = e.target.value;
              setQuestions(arr);
            }}
          />
        ))}
        <button
          type="button"
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          onClick={() => setQuestions([...questions, ''])}
        >
          + Question
        </button>
      </div>

      <div>
        <label className="block mb-1">Evaluation Criteria</label>
        {criteria.map((c, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <input
              type="text"
              placeholder="Name"
              className="flex-1 border p-2 rounded"
              value={c.name}
              onChange={e => {
                const arr = [...criteria];
                arr[i].name = e.target.value;
                setCriteria(arr);
              }}
            />
            <input
              type="number"
              placeholder="Weight"
              className="w-20 border p-2 rounded"
              value={c.weight}
              onChange={e => {
                const arr = [...criteria];
                arr[i].weight = +e.target.value;
                setCriteria(arr);
              }}
            />
          </div>
        ))}
        <button
          type="button"
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          onClick={() => setCriteria([...criteria, { name: '', weight: 0 }])}
        >
          + Criterion
        </button>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded"
          onClick={onDone}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </div>
);

export default LessonEditor;

