import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';

export default () => {
  const [rows, setRows] = useState<any[]>([]);
  const [sum,  setSum ] = useState<any>({});

  useEffect(() => {
    api.get('/analytics/summary').then(r => setSum(r.data));
    api.get('/analytics/users').then(r => setRows(r.data));
  }, []);

  return (
    <div className="space-y-6">
      <div className="p-4 bg-white rounded shadow">
        <h2 className="font-bold mb-2">Platform summary (last 30 days)</h2>
        <ul className="list-disc pl-6">
          <li>Total users: {sum.users}</li>
          <li>Assignments solved: {sum.assignments}</li>
          <li>Average score: {sum.avgScore}</li>
        </ul>
      </div>

      <div className="p-4 bg-white rounded shadow overflow-x-auto">
        <h2 className="font-bold mb-4">Users details</h2>
        <table className="min-w-[700px] w-full text-sm">
          <thead><tr className="text-left border-b">
            <th className="py-1 pr-3">Name</th><th className="py-1 pr-3">E‑mail</th><th className="py-1 pr-3">Role</th>
            <th className="py-1 pr-3">Assignments</th><th className="py-1 pr-3">Avg. score</th><th className="py-1">Last activity</th>
          </tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r._id} className="border-b last:border-none">
                <td className="py-1 pr-3">{r.name}</td>
                <td className="py-1 pr-3">{r.email}</td>
                <td className="py-1 pr-3">{r.role}</td>
                <td className="py-1 pr-3">{r.assignments}</td>
                <td className="py-1 pr-3">{r.avgScore}</td>
                <td className="py-1">{typeof r.lastActivity === 'string'
                  ? r.lastActivity.slice(0,10)
                  : new Date(r.lastActivity).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
