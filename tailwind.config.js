/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        kingspan: {
          blue: '#003A70',
          gold: '#C69214',
          navy: '#002B4A',
          slate: '#64748B',
          cloud: '#F5F7FA',
          white: '#FFFFFF',
        },
      },
      boxShadow: {
        'card': '0 10px 30px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        }
      },
      animation: {
        shimmer: 'shimmer 10s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}