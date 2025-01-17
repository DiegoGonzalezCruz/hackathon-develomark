import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      transitionDuration: {
        DEFAULT: "300ms",
      },
      fontFamily: {
        title: ["'Libre Franklin'", ...defaultTheme.fontFamily.sans],
        body: ["'Nunito'", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "brand-gray": "#242424",
        neutral: {
          DEFAULT: "#a3a3a3",
        },

        positive: {
          light: "#c3e9c3",
          DEFAULT: "#89d18a",
          dark: "#3ea140",
        },

        moderate: {
          light: "#ffd9c0",
          DEFAULT: "#fe875c",
          dark: "#c92513",
        },

        negative: {
          light: "#ffa3a3",
          DEFAULT: "#fa5252",
          dark: "#910101",
        },

        magenta: {
          50: "#ffedf2",
          100: "#ffdce7",
          200: "#ffbfd8",
          300: "#ff8ab7",
          400: "#ff4992",
          500: "#ff006d",
          600: "#df0067",
          700: "#bc0057",
          800: "#9e0050",
          900: "#86024a",
          950: "#4c0024",
          DEFAULT: "#ff006d",
        },

        bide: {
          50: "#f7fcfd",
          100: "#ebf8fa",
          200: "#d8eff5",
          300: "#b2dfea",
          400: "#98d1e0",
          500: "#6ac0d8",
          600: "#47a8cc",
          700: "#398eb0",
          800: "#3b7791",
          900: "#36657d",
          950: "#1d3f53",
          DEFAULT: "#6ac0d8",
        },

        evergreen: {
          50: "#f8fdf8",
          100: "#f1faf1",
          200: "#e2f5e2",
          300: "#c3e9c3",
          400: "#b2e0b3",
          500: "#89d18a",
          600: "#54c256",
          700: "#3ea140",
          800: "#378138",
          900: "#2f6b32",
          950: "#133914",
          DEFAULT: "#89d18a",
        },

        ember: {
          50: "#fff8f2",
          100: "#ffeee1",
          200: "#ffd9c0",
          300: "#ffb387",
          400: "#ff9c70",
          500: "#fe875c",
          600: "#f96541",
          700: "#f63211",
          800: "#c92513",
          900: "#a22414",
          950: "#570d08",
          DEFAULT: "#fe875c",
        },

        ultraviolet: {
          50: "#f5f5fc",
          100: "#eeecf8",
          200: "#e0def2",
          300: "#c8c2e8",
          400: "#aba0d9",
          500: "#816dc2",
          600: "#765bb5",
          700: "#664f98",
          800: "#55437e",
          900: "#483868",
          950: "#2d2445",
          DEFAULT: "#816dc2",
        },
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
