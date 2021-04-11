const plugin = require('tailwindcss/plugin')
module.exports = {
  mode: 'jit',
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        a: { color: '#1DA57A' },
      })
    }),
  ],
}
