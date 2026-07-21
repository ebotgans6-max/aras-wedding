/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F5E6C4',
          DEFAULT: '#D4AF37', // Classic metallic gold
          dark: '#AA7C11',
          soft: '#C5A059',
          bright: '#FFDF00',
          bronze: '#8C6239',
        },
        charcoal: {
          light: '#2A2A2A',
          DEFAULT: '#121212',
          dark: '#0B0B0B',
          card: '#1A1A1A',
          border: '#333333',
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #AA7C11 0%, #D4AF37 50%, #F5E6C4 100%)',
        'gold-gradient-hover': 'linear-gradient(135deg, #8C6239 0%, #AA7C11 50%, #D4AF37 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0B0B0B 0%, #1A1A1A 100%)',
        'overlay-gradient': 'linear-gradient(to bottom, rgba(11, 11, 11, 0.4), rgba(11, 11, 11, 0.95))',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
