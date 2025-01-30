/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "loop-scroll": "loop-scroll 20s linear infinite",
        "appear-block": "appear-block 2s linear",
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
      },
      fontFamily: {
        poppins: ["Poppins", "serif"],
      },
      colors: {
        "main-color": "#F97316",
        "secondary-color": "#252525",
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
