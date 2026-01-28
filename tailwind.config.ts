import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Wedding-themed color palette
        primary: {
          50: '#fdf8f6',
          100: '#f9ede8',
          200: '#f5ddd3',
          300: '#ecc5b3',
          400: '#e0a589',
          500: '#d4856a',
          600: '#c26a50',
          700: '#a35440',
          800: '#874738',
          900: '#6f3d32',
          950: '#3b1e17',
        },
        secondary: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae2',
          300: '#b1bac9',
          400: '#8694ab',
          500: '#677791',
          600: '#526078',
          700: '#434e62',
          800: '#3a4353',
          900: '#343b47',
          950: '#22262f',
        },
        accent: {
          50: '#fef6ee',
          100: '#fcebd8',
          200: '#f8d3af',
          300: '#f3b47d',
          400: '#ed8c48',
          500: '#e96d24',
          600: '#da5419',
          700: '#b53f17',
          800: '#90331a',
          900: '#742d19',
          950: '#3e140a',
        },
        cream: '#FFFBF5',
        champagne: '#F7E7CE',
        blush: '#F4D1D1',
        sage: '#9CAF88',
        dustyrose: '#D4A5A5',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
      },
      backgroundImage: {
        'wedding-pattern': "url('/patterns/wedding-pattern.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-romantic': 'linear-gradient(135deg, #fdf8f6 0%, #f9ede8 50%, #f5ddd3 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'elegant': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
