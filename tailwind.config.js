/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "off-white": "hsl(0, 0%, 94%)",
        "light-grey": "hsl(0, 0%, 86%)",
        "smokey-grey": "hsl(0, 1%, 44%)",
        "off-black": "hsl(0, 0%, 8%)",
        purple: "hsl(259, 100%, 65%)",
        red: "hsl(0, 100%, 67%)",
      },
    },
    fontSize: {
      "fluid-input": "clamp(1rem, 0.8rem + 1vw, 2rem);",
      "fluid-2": "clamp(2.5rem, 1.7rem + 4vw, 6.5rem);",
      "fluid-label":
        "clamp(0.7rem, 0.6649999999999999rem + 0.175vw, 0.875rem);",
    },
  },
  plugins: [],
};
