import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./launch-console.html",
    "./network-checker.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "!./node_modules/**/*",
    "!./dist/**/*",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      colors: {
        cream: "#F9F4EF",
        "cream-dark": "#EBE5DE",
        charcoal: "#1A1A1A",
        "accent-blue": "#4F46E5",
        "accent-orange": "#EA580C",
      },
      borderRadius: {
        card: "2rem",
        "card-lg": "2.5rem",
      },
      letterSpacing: {
        widest: "0.2em",
      },
    },
  },
  plugins: [],
} satisfies Config;
