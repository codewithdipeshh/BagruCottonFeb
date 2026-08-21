/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        luxury: {
          ivory: '#FAF9F6',      // Primary background canvas
          cream: '#F5F2EB',      // Secondary panel backgrounds
          black: '#1A1A1A',      // High contrast deep primary elements
          charcoal: '#333333',   // Soft description body tones
          gold: '#C4B097',       // Accent borders, highlights, and badges
          clay: '#8C6239',       // Deep earth tone accent
          crimson: '#8B2635',    // Traditional Bagru madder red accent
        }
      },
      letterSpacing: {
        luxury: '0.15em',
        epic: '0.25em',
      },
    },
  },
  plugins: [],
};