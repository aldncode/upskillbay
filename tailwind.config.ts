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
        'bg-primary': '#0B0F19',
        'bg-card': '#111827',
        'bg-border': '#1F2937',
        'primary': '#3B82F6',
        'primary-hover': '#2563EB',
        'text-primary': '#FFFFFF',
        'text-secondary': '#9CA3AF',
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      backgroundColor: {
        dark: '#0B0F19',
        card: '#111827',
      },
      borderColor: {
        dark: '#1F2937',
      },
      textColor: {
        secondary: '#9CA3AF',
      },
    },
  },
  plugins: [forms],
};

export default config;
