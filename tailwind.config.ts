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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Tokens warm V2 (light only) — miroir PMS. Cf. app/globals.css :root.
        gold:        "var(--gold)",
        "gold-dark": "var(--gold-dark)",
        "gold-50":   "var(--gold-50)",
        espresso:    "var(--espresso)",
        surface:     "var(--surface)",
        ink:         "var(--w-900)",
        "w-0":   "var(--w-0)",
        "w-25":  "var(--w-25)",
        "w-50":  "var(--w-50)",
        "w-75":  "var(--w-75)",
        "w-100": "var(--w-100)",
        "w-200": "var(--w-200)",
        "w-300": "var(--w-300)",
        "w-500": "var(--w-500)",
        "w-700": "var(--w-700)",
        "w-900": "var(--w-900)",
      },
    },
  },
  plugins: [],
};
export default config;
