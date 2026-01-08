/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'montserrat': ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'brandHeading': ['Montserrat', 'sans-serif'],
        'brandBody': ['Inter', 'sans-serif'],
      },
      colors: {
        // FrailtyTester HiFi Brand Colors
        'primary': {
          DEFAULT: '#059669', // Emerald 600 - Kept as best fit for Health/Figma
          light: '#34D399',   // Emerald 400
          dark: '#047857',    // Emerald 700
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',
          600: '#059669',
          900: '#064E3B',
        },
        'accent': {
          DEFAULT: '#F59E0B', // Amber 500
          light: '#FBBF24',
          dark: '#D97706',
        },
        'neutral': {
          50: '#FBF9F6', // <--- UPDATED: Figma Background Color
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Functional Colors
        'info': '#0EA5E9',       // Sky 500
        'success': '#10B981',    // Emerald 500
        'warning': '#F59E0B',    // Amber 500
        'error': '#EF4444',      // Red 500
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
        'glow': '0 0 15px rgba(5, 150, 105, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/hero-pattern.svg')", // Placeholder if needed
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}

