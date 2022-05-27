module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",    
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['monospace'],
        sans: [
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Inter',
            'Helvetica',
            'Arial',
            'sans-serif',
            'Apple Color Emoji',
            'Segoe UI Emoji',
            'Segoe UI Symbol',
        ],        
      }
    },
  },
  plugins: [],
}
