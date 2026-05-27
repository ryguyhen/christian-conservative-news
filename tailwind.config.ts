import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0d1b2a",
        "navy-mid": "#152338",
        "navy-light": "#1e3250",
        gold: "#c9a84c",
        "gold-light": "#e8c97a",
        cream: "#faf6ef",
        parchment: "#f2ead8",
        red: "#8b1a1a",
        "border-tan": "#d4c9a8",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-barlow)", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "1280px" },
    },
  },
  plugins: [],
} satisfies Config;
