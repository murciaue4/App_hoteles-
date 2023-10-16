/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        'custom': '0.5s',
      }
     },
  },
  plugins: [],
}

