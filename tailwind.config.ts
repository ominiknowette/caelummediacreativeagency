import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F4EFE7",
          50: "#FAF7F2",
          100: "#F4EFE7",
          200: "#EFE6DB",
        },
        charcoal: {
          DEFAULT: "#191817",
          900: "#191817",
          800: "#2A2826",
          700: "#3D3A37",
          600: "#55524E",
          500: "#736F6A",
          400: "#96918B",
          300: "#BFBAB3",
        },
        burntOrange: {
          DEFAULT: "#C86432",
          hover: "#B35527",
          active: "#9E4820",
          light: "#F5E8E1",
          muted: "#E2936B",
        },
        sand: {
          DEFAULT: "#E9E0D5",
          50: "#F8F5F1",
          100: "#E9E0D5",
          200: "#DDD1C3",
          300: "#CEBFAD",
        },
        white: "#FFFFFF",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        editorial: "12px",
        "editorial-sm": "8px",
        "editorial-lg": "16px",
      },
      spacing: {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "6": "24px",
        "8": "32px",
        "12": "48px",
        "16": "64px",
        "20": "80px",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(25, 24, 23, 0.04)",
        card: "0 2px 8px -2px rgba(25, 24, 23, 0.05)",
        floating: "0 8px 24px -6px rgba(25, 24, 23, 0.08)",
      },
      borderWidth: {
        DEFAULT: "1px",
        editorial: "1px",
      },
    },
  },
  plugins: [],
};

export default config;
