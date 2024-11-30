import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "border-gradient": "linear-gradient(to bottom, #1D244E, #632E42)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        light: {
          primary: "#F8FAFC",
          secondary: "#E2E8F0",
        },
        dark: {
          primary: "#1A1B1F",
          secondary: "#2A2D32",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
} satisfies Config;
