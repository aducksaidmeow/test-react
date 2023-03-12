/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
      },
      fontFamily: {
        'nerko-one': ['"Nerko One"', 'cursive'],
        'Philosopher-Regular': ["Philosopher-Regular", 'sans-serif'],
        'Philosopher-BoldItalic': ["Philosopher-BoldItalic", 'sans-serif'],
        'Philosopher-Italic': ["Philosopher-Italic", 'sans-serif'],
        'Philosopher-Bold': ["Philosopher-Bold", 'sans-serif']
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
