/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tsr-primary': '#1E40AF',
        'tsr-secondary': '#60A5FA',
        'tsr-accent': '#F59E0B',
      },
    },
  },
  plugins: [],
}
