import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeCtx = createContext<{ dark:boolean; toggle:()=>void }>({ dark:false, toggle:()=>{} });
export const useTheme = () => useContext(ThemeCtx);

export const ThemeProvider:React.FC<{ children:React.ReactNode }> = ({ children }) => {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  /* присваиваем/убираем класс у <html> */
  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add('dark') : root.classList.remove('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return <ThemeCtx.Provider value={{ dark, toggle: () => setDark(p => !p) }}>{children}</ThemeCtx.Provider>;
};
