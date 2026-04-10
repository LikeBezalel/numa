import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f8f2e8",
        forest: "#1f3b2f",
        berry: "#7d3b4b",
        sage: "#d9e2d4",
        blush: "#efe3de"
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(31, 59, 47, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
