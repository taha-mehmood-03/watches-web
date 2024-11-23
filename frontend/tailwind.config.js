import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    'path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  important: "#root",
  theme: {
    screens: {
      'vsm': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      '4xl':  '1900px',
      '5xl': '2560px',
      '80': '20rem',
      '84': '21rem',
      '88': '22rem',
    },
    extend: {
      imageRendering: {
        'auto': 'auto',
        'crisp-edges': 'crisp-edges',
        'pixelated': 'pixelated',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
     
    },
  },
  variants: {
    extend: {
      imageRendering: ['responsive', 'hover', 'focus'],
      
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.image-rendering-auto': {
          'image-rendering': 'auto',
        },
        '.image-rendering-crisp-edges': {
          'image-rendering': 'crisp-edges',
        },
        '.image-rendering-pixelated': {
          'image-rendering': 'pixelated',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',
        },
        
        
      }, ['responsive', 'hover']);
    },
  ],
});