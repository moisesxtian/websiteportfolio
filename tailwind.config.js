/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "loop-scroll": "loop-scroll 20s linear infinite",
        "appear-block": "appear-block 2s linear",
        "hero-float": "hero-float 5.5s ease-in-out infinite",
      },
      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "appear-block": {
          from: { opacity: 0, transform: "scale(0.8) translateY(20px)" },
          to: { opacity: 1, transform: "scale(1) translateY(0)" },
        },
        "hero-float": {
          "0%, 100%": { transform: "translateY(0) rotateX(4deg) rotateY(-6deg)" },
          "50%": { transform: "translateY(-18px) rotateX(2deg) rotateY(6deg)" },
        },
      },
      fontFamily: {
        poppins: ["Poppins", "serif"],
      },
      colors: {
        "main-color": "#F97316",
        "secondary-color": "var(--secondary-color)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        "page-bg": "var(--page-bg)",
      },
    },
  },
  plugins: [
    require("tailwindcss/plugin")(function ({ addUtilities }) {
      // Add scroll-timeline utilities
      addUtilities({
        ".scroll-timeline": {
          "scroll-timeline": "auto",
        },
        ".view-animate": {
          "animation-timeline": "view()",
        },
      });
    }),
  ],
};
