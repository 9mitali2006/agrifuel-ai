/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f1',
          100: '#dcedde',
          200: '#b9dbbe',
          300: '#8ec297',
          400: '#5fa26c',
          500: '#3f8a4e',
          600: '#2f6f3d',
          700: '#265933',
          800: '#20472a',
          900: '#1b3b24',
          950: '#0d2113',
        },
        earth: {
          50: '#faf7f2',
          100: '#f2ead9',
          200: '#e4d2b1',
          300: '#d3b384',
          400: '#c2955c',
          500: '#b17f45',
          600: '#95663a',
          700: '#784f31',
          800: '#63422c',
          900: '#533826',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 40, 20, 0.08), 0 1px 2px rgba(15,40,20,0.04)',
        soft: '0 4px 20px rgba(15, 40, 20, 0.08)',
      },
    },
  },
  plugins: [],
}
