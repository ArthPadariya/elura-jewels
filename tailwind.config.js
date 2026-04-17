import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#C6A55C',
        emerald: '#0F3B2E',
        ivory: '#F8F6F2',
        linen: '#EFE9DE',
        sand: '#DDD1BD',
        mist: '#F3EFE8',
        ink: '#1B1813',
        muted: '#6E655A',
      },
      fontFamily: {
        sans: ['Manrope', ...defaultTheme.fontFamily.sans],
        display: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
      },
      boxShadow: {
        soft: '0 16px 40px rgba(27, 24, 19, 0.06)',
        card: '0 10px 30px rgba(27, 24, 19, 0.05)',
        line: '0 0 0 1px rgba(27, 24, 19, 0.06)',
      },
      keyframes: {
        fadeUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(24px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fade: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-6px)',
          },
        },
      },
      animation: {
        'fade-up': 'fadeUp 700ms ease-out forwards',
        fade: 'fade 900ms ease-out forwards',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
