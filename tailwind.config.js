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
        'brandBody': ['Roboto Slab', 'serif'],
      },

      colors: {
        // FrailtyTester Brand Colors
        'primary': '#0BA650',    // Primary Green
        'secondary': '#055A30',  // Secondary Green
        'accent': '#FBB31C',     // Accent Yellow
        'neutral': {
          'dark': '#374151',     // Neutral Dark
          'medium': '#6B7280',   // Neutral Medium
          'light': '#EDEDEB',    // Neutral Light
        },
        // Brand Colors
        'brand': {
          'primary': '#e81e1e',    // FrailtyTester Red
          'secondary': '#20545c',  // FrailtyTester Teal
          'accent': '#ffe46c',     // FrailtyTester Yellow
          'neutral': '#6c757d',   // FrailtyTester Neutral
        },
        // Functional Colors
        'info': '#007AFF',       // Blue
        'success': '#34C759',    // Green
        'warning': '#FBB31C',    // Amber
        'error': '#F12D25',      // Red
      },
    },
  },
  plugins: [],
}

