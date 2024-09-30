/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "5vw": "5vw",
      },
      colors: {
        "base-color": "#F6F3EC",
        "mocha-color": "#574C3F",
        "footer-color": "#36302A",
        "nav-color": "#F6F3EC",
        "darker-nav-color": "#ECE4DA",
      },
    },
  },
  plugins: [],
};
