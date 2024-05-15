/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'xs': '300px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1800px',
    },
    fontFamily: {
      custom_black: ["custom_black", "sans-serif"],
      custom_black_italic: ["custom_black_italic", "sans-serif"],
      custom_bold: ["custom_bold", "sans-serif"],
      custom_bold_italic: ["custom_bold_italic", "sans-serif"],
      custom_extrabold: ["custom_extrabold", "sans-serif"],
      custom_extrabold_italic: ["custom_extrabold_italic", "sans-serif"],
      custom_extralight: ["custom_extralight", "sans-serif"],
      custom_extralight_italic: ["custom_extralight_italic", "sans-serif"],
      custom_italic: ["custom_italic", "sans-serif"],
      custom_light: ["custom_light", "sans-serif"],
      custom_light_italic: ["custom_light_italic", "sans-serif"],
      custom_medium: ["custom_medium", "sans-serif"],
      custom_medium_italic: ["custom_medium_italic", "sans-serif"],
      custom_regular: ["custom_regular", "sans-serif"],
      custom_semibold: ["custom_semibold", "sans-serif"],
      custom_semibold_italic: ["custom_semibold_italic", "sans-serif"],
      custom_thin: ["custom_thin", "sans-serif"],
      custom_thin_italic: ["custom_thin_italic", "sans-serif"],
    },
    extend: {
      fontSize: {
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
      },
    },

  },
  plugins: [],
}

