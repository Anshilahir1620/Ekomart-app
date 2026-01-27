/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4C7C3C',
          dark: '#0D150A',
        },
        secondary: {
          orange: '#FF8424',
          red: '#FA3838',
        },
        neutral: {
          dark: '#595959',
          light: '#F5F5F5',
        },
      },
    },
  },
  plugins: [],
}