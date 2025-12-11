/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "border-pulse": "border-pulse 2s infinite",
        "finger": "finger 1.5s infinite ease-in-out",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        "border-pulse": {
          "0%, 100%": { borderColor: "rgba(148, 163, 184, 0.2)" },
          "50%": { borderColor: "rgba(148, 163, 184, 0.8)" },
        },
        finger: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(-5px, -5px) rotate(-10deg)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
