const defaultTheme = require('tailwindcss/defaultTheme');
const tailwindTypographyPlugin = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    fontFamily: {
      sans: ['Inter', 'Sarabun', ...defaultTheme.fontFamily.sans],
    },
    extend: {
    }
  },
  darkMode: 'class',
  plugins: [tailwindTypographyPlugin],
};
