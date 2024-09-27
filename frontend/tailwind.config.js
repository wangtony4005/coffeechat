/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "5vw": "5vw",
      },
      colors: {
        "base-color": "#ffeddb",
        "mocha-color": "#FFEDDB",
      },
    },
  },
  plugins: [],
};
