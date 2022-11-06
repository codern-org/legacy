const defaultTheme = require('tailwindcss/defaultTheme');
const tailwindTypographyPlugin = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'Sarabun', ...defaultTheme.fontFamily.sans],
      },
    }
  },
  darkMode: 'class',
  plugins: [tailwindTypographyPlugin],
};
