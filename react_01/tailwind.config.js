/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "1.5xl": "37.188rem",
        mid: "25.25rem",
      },
      fontSize: {
        heroSize: [
          "6.75rem",
          {
            lineHeight: "6.375rem",
            letterSpacing: "-0.01em",
            fontWeight: "800",
          },
        ],
      },
      colors: {
        "btn-red": "#D01C28",
        "para-gray": "#5A5959",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [require("tailwindcss-inner-border")],
};
