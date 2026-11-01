/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFCFA',
          100: '#FAF8F5',
          200: '#F5F0EA',
          300: '#ECE3D7',
          400: '#DDD0BE',
          DEFAULT: '#FAF8F5',
        },
        lavender: {
          50: '#F7F5FC',
          100: '#EFEBF9',
          200: '#E0D8F3',
          300: '#C7B7E9',
          400: '#A78FDB',
          500: '#8C6ECD',
          600: '#7551BE',
          700: '#5F3EA3',
          800: '#4E3484',
          900: '#3D2A68',
        },
        rose: {
          50: '#FDF7F7',
          100: '#FAEEEE',
          200: '#F4D9D7',
          300: '#E9B9B6',
          400: '#D9918D',
          500: '#C46B67',
          600: '#AC4D49',
          700: '#8F3C38',
          800: '#763431',
          900: '#642F2D',
        },
        navy: {
          50: '#F0F3F9',
          100: '#DEE4F1',
          200: '#C2CDE5',
          300: '#99ACD2',
          400: '#6984BB',
          500: '#4863A2',
          600: '#364B84',
          700: '#2A3A69',
          800: '#1F2A4B',
          900: '#0F172A',
          950: '#0A0F1D',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Merriweather', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(15, 23, 42, 0.05), 0 1px 4px -1px rgba(15, 23, 42, 0.03)',
        'soft': '0 8px 24px -4px rgba(15, 23, 42, 0.06), 0 4px 12px -2px rgba(15, 23, 42, 0.03)',
        'soft-lg': '0 16px 36px -6px rgba(15, 23, 42, 0.08), 0 8px 18px -4px rgba(15, 23, 42, 0.04)',
        'soft-xl': '0 24px 48px -12px rgba(15, 23, 42, 0.12)',
      }
    },
  },
  plugins: [],
}

