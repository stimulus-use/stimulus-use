const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          '50': '#f6fcf9',
          '100': '#ecf8f3',
          '200': '#d0eee0',
          '300': '#b3e3cd',
          '400': '#7bcea8',
          '500': '#42b983',
          '600': '#3ba776',
          '700': '#328b62',
          '800': '#286f4f',
          '900': '#205b40'
        }
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
