/** @type {import('tailwindcss').Config} */
import {
  colors,
  fontFamily,
  fontSize,
  spacing,
  borderRadius,
  boxShadow,
  zIndex,
} from './src/brand/tokens.js'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily,
      fontSize,
      spacing,
      colors,
      boxShadow,
      borderRadius,
      zIndex,
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        'water-drift': {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(-2%, 1%, 0) scale(1.04)' },
          '100%': { transform: 'translate3d(0,0,0) scale(1)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 10s ease-in-out infinite',
        'water-drift': 'water-drift 18s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
