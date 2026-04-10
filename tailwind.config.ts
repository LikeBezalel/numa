import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f5f0ea",
        ivory: "#fbf8f4",
        forest: "#1f3b33",
        plum: "#64263d",
        berry: "#7d3b4b",
        sage: "#c8d2c0",
        moss: "#9cab99",
        gold: "#af9455",
        blush: "#e9ddda"
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 16px 40px rgba(31, 59, 47, 0.1)",
        float: "0 30px 50px rgba(100, 38, 61, 0.12)"
      },
      backgroundImage: {
        "botanical-fade":
          "radial-gradient(circle at 8% 4%, rgba(175,148,85,.2) 0, transparent 30%), radial-gradient(circle at 95% 94%, rgba(125,59,75,.2) 0, transparent 28%)"
      }
    }
  },
  plugins: []
};

export default config;
