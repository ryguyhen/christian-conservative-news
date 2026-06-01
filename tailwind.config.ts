import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#15171a",
        "ink-soft": "#4a4d52",
        "ink-mute": "#7a7d83",
        paper: "#f6f1e3",
        "paper-warm": "#ede5d0",
        rule: "#c9b483",
        "rule-soft": "#d9cba7",
        navy: "#0d1b2a",
        "navy-mid": "#152338",
        gold: "#b08a36",
        "gold-deep": "#8a6a22",
        accent: "#8b1a1a",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-barlow)", "Helvetica Neue", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "1240px" },
    },
  },
  plugins: [],
} satisfies Config;
