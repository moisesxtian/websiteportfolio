/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
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
