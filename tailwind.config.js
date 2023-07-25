/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "#FF6347",
        "custom-orange": "#FFA500",
        "custom-green": "#90EE90",
      },
      boxShadow: {
        blue: "rgba(59, 130, 246, 1) 0px 0px 0px 2px",
      },
    },
  },
  plugins: [],
};
