import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default () => {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
      title="Switch theme"
    >
      {dark ? '🌞' : '🌙'}
    </button>
  );
};
