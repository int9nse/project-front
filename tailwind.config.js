export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: {
        brand:   '#3b82f6',   // основной акцент
        surface: '#1e1e1e',   // фон основного окна
        panel:   '#272727',   // боковая панель
        line:    '#3a3a3a',
      },
    },
  },
  plugins: [],
};
