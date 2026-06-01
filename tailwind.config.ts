import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14171a",
        "ink-soft": "#3a3d43",
        paper: "#f5efe0",
        "paper-warm": "#ecdfbd",
        "paper-soft": "#fbf6e8",
        "paper-on-navy": "#f5efe0",
        "paper-on-navy-soft": "#d9d2c0",
        rule: "#b89a4d",
        "rule-soft": "#d4c08a",
        navy: "#0d1b2a",
        "navy-mid": "#1b2c44",
        gold: "#d4b25a",
        "gold-soft": "#f0d98a",
        accent: "#8b1a1a",
        focus: "#2563eb",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "1240px" },
    },
  },
  plugins: [],
} satisfies Config;
