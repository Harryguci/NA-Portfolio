/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dream: {
          pink: "#F8C8DC",
          blue: "#BDE0FE",
          mint: "#CCFBDC",
          yellow: "#FEF9C3",
          text: "#4A3728",
        },
      },
      fontFamily: {
        script: ['"Dancing Script"', "cursive"],
        pixel: ['"SVN Retron 2000"', '"Silkscreen"', '"VT323"', "monospace"],
        rounded: ['"Nunito"', '"Quicksand"', "sans-serif"],
      },
      boxShadow: {
        dream: "0 20px 50px rgba(15, 76, 129, 0.22)",
      },
    },
  },
  plugins: [],
};
