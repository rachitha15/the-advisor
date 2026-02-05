import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#13ec49",
        "background-light": "#f6f8f6",
        "background-dark": "#102215",
        "soft-green": "#e0f5e3",
        "text-dark": "#0d1b11",
        "text-subtle": "#4a554e",
        "night-bg": "#0B1015",
        "lamp-glow": "#FFD580",
        "card-dark": "#1c3022",
        "card-highlight": "#23482c",
        "surface-dark": "#1c3323",
      },
      fontFamily: {
        display: ["Spline Sans", "Noto Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(255, 213, 128, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
