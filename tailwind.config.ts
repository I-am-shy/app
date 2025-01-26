import type { Config } from "tailwindcss";
import daisyui from 'daisyui';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: ["light", "dark", {
      myTheme: {
        "primary": "#009ef9",
        "secondary": "#e6b500",
        "accent": "#0039ff",                 
        "neutral": "#1c0410",                  
        "base-100": "C1D4F8", 
        "base-200": "C1D4F8",
        "info": "#0066ff",
        "success": "#7a9d00",                  
        "warning": "#d26200",
        "error": "#ff8183",
      }
    }],
  },
  plugins: [
    daisyui,
  ],
} satisfies Config;
