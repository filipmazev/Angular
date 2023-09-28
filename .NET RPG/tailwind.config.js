/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "var(--primary)",
        "secondary": "var(--secondary)",
        "tertiary": "var(--tertiary)",
        "dark": "var(--dark)",
        "darker": "var(--darker)",
      },
      fontFamily: {
        medieval: ["medievalsharpregular", "sans-serif"],
      },
    },
  },
  plugins: [],
}

