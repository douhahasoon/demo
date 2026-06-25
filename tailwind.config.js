/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'sans-serif'],
      },
      colors: {
        dark: '#05070e',
        glass: 'rgba(255, 255, 255, 0.03)',
      }
    },
  },
  plugins: [],
}