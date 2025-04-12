/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  safelist: [
    'bg-green-950/30',
    'bg-amber-950/30',
    'border-green-800/50',
    'border-green-700/50',
    'border-amber-800/50',
    'border-amber-700/50',
    'hover:border-green-700/50',
    'hover:border-amber-700/50',
    'hover:bg-green-950/30',
    'hover:bg-amber-950/30',
    'group-hover:text-green-400',
    'group-hover:text-amber-400',
    'focus:ring-green-500',
    'focus:ring-amber-500'
  ],
  plugins: [],
};