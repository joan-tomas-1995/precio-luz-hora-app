/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "rgba(255, 99, 71, 0.9)",
        "custom-orange": "rgba(255, 205, 0, 0.7)",
        "custom-green": "rgba(144, 238, 144, 0.7)",
      },
      boxShadow: {
        blue: "rgba(59, 130, 246, 0.7) 0px 0px 0px 4px",
      },
    },
  },
  plugins: [],
};
