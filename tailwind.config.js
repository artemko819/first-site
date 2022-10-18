const tailwindColors = require('tailwindcss/colors');

const themeColors = {
  one: {
    main: "#F8F9F9",
    accent: "#C0190E",
    secondary: "#ffffff",
    secondaryText: "#878792",
  },
  two: {
    primary: tailwindColors.slate,
    secondary: tailwindColors.violet,
  }
};

const globalColors = {
  wtite: "#ffffff",
  ...tailwindColors,
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
    colors: { ...themeColors.one, ...globalColors },
     screens: {
      'sm': '320px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
