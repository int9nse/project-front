import React from 'react';
interface Props { who: 'ai' | 'user'; text: string }

export default ({ who, text }: Props) => (
  <div className={`chat-bubble ${who === 'ai' ? 'self-start bg-blue-100' : 'self-end bg-green-100'}`}>
    {text}
  </div>
);
