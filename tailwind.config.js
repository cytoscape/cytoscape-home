import formsPlugin from '@tailwindcss/forms';
import headlessuiPlugin from '@headlessui/tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['2rem', { lineHeight: '3rem' }],
      '4xl': ['2.5rem', { lineHeight: '3rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      animation: {
        'fade-in': 'fade-in 0.5s linear forwards',
        marquee: 'marquee var(--marquee-duration) linear infinite',
        'spin-slow': 'spin 4s linear infinite',
        'spin-slower': 'spin 6s linear infinite',
        'spin-reverse': 'spin-reverse 1s linear infinite',
        'spin-reverse-slow': 'spin-reverse 4s linear infinite',
        'spin-reverse-slower': 'spin-reverse 6s linear infinite',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      colors: ({ colors }) => ({
        gray: colors.neutral,
        'primary': {
          '50': '#fdf4e9',
          '100': '#fbe9d3',
          '200': '#f7d3a7',
          '300': '#f2bd7a',
          '400': '#eea74e',
          '500': '#ea9122',
          '600': '#bb741b',
          '700': '#8c5714',
          '800': '#5e3a0e',
          '900': '#2f1d07',
          '950': '#170e03',
        },
        'complement': {
          '50': '#f2f9fd',
          '100': '#e5f1f9',
          '200': '#c4e2f3',
          '300': '#90cbe9',
          '400': '#55b0db',
          '500': '#2f97c8',
          '600': '#2079a9',
          '700': '#1d6995',
          '800': '#1a5272',
          '900': '#1b455f',
          '950': '#122c3f',
        },
      }),
      ringColor: {
        DEFAULT: '#2f97c8',
      },
      fontFamily: {
        sans: 'var(--font-inter)',
      },
      keyframes: {
        'fade-in': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        marquee: {
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
        'spin-reverse': {
          to: {
            transform: 'rotate(-360deg)',
          },
        },
      },
      maxWidth: {
        '2xl': '40rem',
      },
      screens: {
        'xs': '320px',
      },
    },
  },
  plugins: [formsPlugin, headlessuiPlugin],
}
