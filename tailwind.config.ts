import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: "#fdf8f0",
          100: "#f5e6d0",
          200: "#e8c99a",
          300: "#d4a96a",
          400: "#c08040",
          500: "#8B4513",
          600: "#7a3d10",
          700: "#6b330d",
          800: "#5c2b0b",
          900: "#4a2209",
        },
        roofGreen: {
          50: "#f0f7f0",
          100: "#d4e9d4",
          200: "#a8d4a8",
          300: "#7bbf7b",
          400: "#4fa04f",
          500: "#2d6a2d",
          600: "#255625",
          700: "#1e461e",
          800: "#163616",
          900: "#0f270f",
        },
        roofGrey: {
          50: "#f8f8f8",
          100: "#e8e8e8",
          200: "#d0d0d0",
          300: "#b0b0b0",
          400: "#888888",
          500: "#666666",
          600: "#4a4a4a",
          700: "#333333",
          800: "#1f1f1f",
          900: "#111111",
        },
        roofRed: {
          50: "#fdf2f2",
          100: "#fad8d8",
          200: "#f4a8a8",
          300: "#eb7070",
          400: "#de4040",
          500: "#c0392b",
          600: "#a32323",
          700: "#861b1b",
          800: "#6b1313",
          900: "#520d0d",
        },
      },
      fontFamily: {
        heading: ["Georgia", "Cambria", "serif"],
        body: ["Palatino Linotype", "Palatino", "Book Antiqua", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
