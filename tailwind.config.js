/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        jura: ["Jura", "sans-serif"],
        aceh: ["Aceh", "sans-serif"],
      },
      colors: {
        green: {
          400: "var(--green-400)",
          500: "var(--green-500)",
          600: "var(--green-600)",
        },
        red: {
          400: "var(--red-400)",
          600: "var(--red-600)",
        },
        gray: {
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
        },
        white: {
          400: "var(--white-400)",
          500: "var(--white-500)",
          600: "var(--white-600)",
        },
        black: {
          600: "var(--black-600)",
        },
      },
      height: {
        "calc-full-mobile": "calc(100vh - 100px)", // Adiciona a classe h-calc-full
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
