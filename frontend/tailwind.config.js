/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html", // This line tells Tailwind to scan your main HTML file
    "./src/**/*.{js,jsx,ts,tsx}", // This line tells Tailwind to scan all your React component files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Add this to set Inter as the default sans-serif font
      },
    },
  },
  plugins: [],
}
