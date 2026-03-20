/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00A86B",
        background: "#F8F9FA",
      },
      fontFamily: {
        italic: ["italic"],
      }
    },
  },
  plugins: [],
}
