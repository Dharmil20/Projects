/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors:{
        "txt-color": "#2E2E2E",
          "btn-red": "#D01C28",
          "para-gray": "#5A5959",
      },
      spacing: {
        '18': '4.5rem',
        '1.8': '1.125rem',
        "100": "30rem",
      },
      maxWidth: {
        "1.5xl": "72.563rem",
        "para-w": "60.938rem",
        mid: "25.25rem",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [],
};
