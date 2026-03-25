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
        // Midnight Bloom — Premium Dark Theme
        primary: {
          50: '#fdf2f4',
          100: '#fbe6ea',
          200: '#f8cdd6',
          300: '#f2a5b4',
          400: '#E8B4B8', // Rose Quartz — main brand
          500: '#D4A0A7',
          600: '#c07882',
          700: '#a15c66',
          800: '#874e56',
          900: '#73444c',
          950: '#3f2228',
        },
        secondary: {
          50: '#f5f3f7',
          100: '#ebe7ef',
          200: '#d7cfdf',
          300: '#b8aac7',
          400: '#9585ab',
          500: '#786990',
          600: '#635478',
          700: '#524562',
          800: '#463b53',
          900: '#241F31', // Elevated surface
          950: '#1A1625', // Deep background
        },
        accent: {
          50: '#fdf8ed',
          100: '#f9edcc',
          200: '#f3d995',
          300: '#ecc25e',
          400: '#e5ac3a',
          500: '#C9A96E', // Warm Gold
          600: '#b18a3e',
          700: '#936835',
          800: '#795330',
          900: '#64452b',
          950: '#382315',
        },
        gold: {
          50: '#fdfaf3',
          100: '#f9f3e0',
          200: '#f5e6c0',
          300: '#eed499',
          400: '#e5bc6a',
          500: '#C9A96E',
          600: '#b18a3e',
          700: '#936835',
          800: '#795330',
          900: '#64452b',
          950: '#382315',
        },
        // Semantic colors
        surface: '#241F31',
        night: '#1A1625',
        ivory: '#F5F0EB',
        muted: '#8B8693',
        glow: '#D4A0A7',
        cream: '#F5F0EB',
        champagne: '#F7E7CE',
        blush: '#F4D1D1',
        sage: '#9CAF88',
        dustyrose: '#D4A5A5',
        mint: '#7DD3A8',
      },
      fontFamily: {
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #1A1625 0%, #241F31 40%, #2D1B3D 100%)',
        'gradient-rose-gold': 'linear-gradient(135deg, #E8B4B8 0%, #C9A96E 100%)',
        'gradient-night': 'linear-gradient(180deg, #1A1625 0%, #241F31 100%)',
        'gradient-glow': 'radial-gradient(ellipse at center, rgba(232,180,184,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'elegant': '0 10px 40px -10px rgba(0, 0, 0, 0.3)',
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        'glow': '0 0 30px rgba(232, 180, 184, 0.2)',
        'glow-gold': '0 0 30px rgba(201, 169, 110, 0.2)',
        'glow-lg': '0 0 60px rgba(232, 180, 184, 0.15)',
        'card': '0 4px 30px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 8px 50px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
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
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232, 180, 184, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(232, 180, 184, 0.4)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
