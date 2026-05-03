/** @type {import('tailwindcss').Config} */
export default {
  content: ["./client/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        navy:  "#000033",
        gold:  "#D4AF37",
        cream: "#F6E7B0",
      },
      fontFamily: {
        serif: ["Lora", "Georgia", "serif"],
        sans:  ["Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
