/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens:{
      'sm':'350px',
      'md':'700px',
      'lg':'1000px',
      'xl':'1400px'
        },
  },
  plugins: [],
}

