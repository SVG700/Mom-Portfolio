import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef2f9",
          100: "#d8e1f1",
          200: "#b0c3e2",
          300: "#7e9fce",
          400: "#4d79b8",
          500: "#1c4f97",
          600: "#173f79",
          700: "#112f5b",
          800: "#0d2344",
          900: "#09172d"
        }
      },
      boxShadow: {
        soft: "0 10px 40px -15px rgba(14, 23, 49, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
