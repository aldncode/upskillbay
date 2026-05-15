import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          dark: '#030712',
          surface: '#0A0F1A',
          card: '#0F1729',
          border: '#1E293B',
          'border-light': '#334155',
        },
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          400: '#818CF8',
          500: '#4F46E5',
          600: '#4F46E5',
          700: '#4338CA',
        },
        accent: {
          50: '#FEF3C7',
          500: '#F97316',
          600: '#EA580C',
        },
        eco: {
          50: '#E0F2FE',
          600: '#059669',
        },
        warm: {
          50: '#FAFAF8',
          100: '#F5F2F0',
          200: '#E8E4E0',
          300: '#D9D4CD',
          400: '#B8AFA3',
          500: '#A9A39E',
          600: '#8A8077',
          700: '#6F6B64',
          800: '#4A4540',
          900: '#1A1612',
        },
        success: {
          50: '#EBF8F1',
          100: '#D1F0E4',
          500: '#2D9D7F',
          600: '#0D7659',
        },
        indigo: {
          50: '#EFE9F9',
          600: '#5B4A9E',
          700: '#4A3A8A',
        },
        purple: {
          50: '#EFE9F9',
          600: '#5B4A9E',
        },
        gray: {
          50: '#FAFAF8',
          100: '#F5F2F0',
          200: '#E8E4E0',
          300: '#D9D4CD',
          500: '#A9A39E',
          600: '#8A8077',
          900: '#1A1612',
        },
        green: {
          50: '#EBF8F1',
          200: '#A7F3D0',
          700: '#0D7659',
        },
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Inter', 'system-ui', 'sans-serif'],
        editorial: ['Inter', 'system-ui', 'sans-serif'],
      },
      
      borderRadius: {
        organic: '20px 24px 22px 18px / 22px 20px 18px 24px',
        organicSm: '12px 14px 13px 11px / 13px 12px 11px 14px',
        organicLg: '28px 32px 30px 26px / 30px 28px 26px 32px',
      },
      
      boxShadow: {
        sm: '0 2px 8px rgba(0, 0, 0, 0.04)',
        md: '0 8px 24px rgba(26, 22, 18, 0.08)',
        lg: '0 16px 40px rgba(26, 22, 18, 0.12)',
        xl: '0 20px 50px rgba(26, 22, 18, 0.16)',
        organic: '0 8px 24px -12px rgba(26, 22, 18, 0.08)',
        organicHover: '0 16px 40px -16px rgba(26, 22, 18, 0.12)',
        inset: 'inset 0 1px 2px rgba(255, 255, 255, 0.8)',
      },
      
      animation: {
        organicBreathe: 'organicBreathe 20s ease-in-out infinite',
        fluidMove: 'fluidMove 15s ease-in-out infinite',
        slideIn: 'slideIn 300ms ease-out',
        ripple: 'ripple 600ms ease-out',
        shimmer: 'shimmer 2s infinite',
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      keyframes: {
        organicBreathe: {
          '0%, 100%': {
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            transform: 'translate(0, 0) scale(1)',
          },
          '25%': {
            borderRadius: '58% 42% 34% 66% / 66% 58% 42% 34%',
            transform: 'translate(20px, -10px) scale(1.05)',
          },
          '50%': {
            borderRadius: '70% 30% 66% 34% / 34% 70% 30% 66%',
            transform: 'translate(-10px, 20px) scale(1.08)',
          },
          '75%': {
            borderRadius: '42% 58% 42% 58% / 58% 42% 58% 42%',
            transform: 'translate(10px, 10px) scale(1.05)',
          },
        },
        fluidMove: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -20px) rotate(120deg)' },
          '66%': { transform: 'translate(-30px, 20px) rotate(240deg)' },
        },
        slideIn: {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        ripple: {
          to: {
            transform: 'translate(-50%, -50%) scale(4)',
            opacity: '0',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      
      backgroundColor: {
        main: '#F8FAFC',
        'section-alt': '#EEF2FF',
        card: '#FFFFFF',
      },
      
      borderColor: {
        default: '#E2E8F0',
      },
      
      textColor: {
        primary: '#0F172A',
        secondary: '#475569',
        muted: '#64748B',
      },
      
      opacity: {
        personalization: 'var(--personalization-intensity)',
      },
    },
  },
  
  plugins: [forms],
};

export default config;
