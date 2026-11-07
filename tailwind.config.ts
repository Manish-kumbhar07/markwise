import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: '#123B2F',
          'forest-dark': '#0c2921',
          'forest-light': '#174C3B',
          coral: '#F47745',
          'coral-hover': '#dc612e',
          ivory: '#F7F2E8',
          'ivory-light': '#FCFAF5',
          cream: '#FAF7F0',
          border: '#E8DFD0',
          'border-dark': '#D5CDBD',
          ink: '#242820',
          muted: '#545B4E',
          subtle: '#7A8274',
        },
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
