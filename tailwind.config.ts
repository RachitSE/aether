import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aether: {
          black: "#050505", // True dark, not just black
          charcoal: "#0F0F0F", // Slightly lighter for cards
          gold: "#D4AF37", // Metallic Gold
          champagne: "#F5E6C8", // Soft highlight
          ash: "#2A2A2A", // Borders
          white: "#E5E5E5", // Muted white for text (never use pure #FFF)
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Helvetica Neue", "sans-serif"],
        serif: ["var(--font-playfair)", "Didot", "serif"], // Ensure you load Playfair Display in layout.tsx!
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slow-pan': 'panImage 30s linear infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        panImage: {
          '0%': { transform: 'scale(1.1) translate(0%, 0%)' },
          '50%': { transform: 'scale(1.1) translate(-2%, -2%)' },
          '100%': { transform: 'scale(1.1) translate(0%, 0%)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;