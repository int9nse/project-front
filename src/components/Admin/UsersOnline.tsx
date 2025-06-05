import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', { query: { uid: 'admin' } });

export default () => {
  const [list, setList] = useState<string[]>([]);
  useEffect(() => { socket.on('onlineUsers', setList); return () => { socket.off('onlineUsers'); }; }, []);
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="font-bold mb-2">Online users</h2>
      <ul className="list-disc pl-6">{list.map(id => <li key={id}>{id}</li>)}</ul>
    </div>
  );
};
