/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        error: "#F44336",
        warning: "#FFC107",
        primary: "#00836C",
        secondary: "#00836C",
        primaryDark: "#16a34a",
        info: "#29ABFA"
      },
      keyframes: {
        circulate: {
          "0%": {
            transform: "rotate(20deg) translate(-150.5px) rotate(-40deg)",
          },
          "100%": {
            transform: "rotate(380deg) translate(-150.5px) rotate(-40deg)",
          },
        },
      },
      animation: {
        circulate: "circulate 7s linear infinite",
      },
    },
  },
  plugins: [],
};
