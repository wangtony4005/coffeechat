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
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
