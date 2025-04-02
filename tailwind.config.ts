import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(255,231,231,0.38)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["GowunDodum-Regular", "sans-serif"],
      },
    },
  },
  plugins: [scrollbarHide],
};

export default config;
