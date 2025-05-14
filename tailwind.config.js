const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Space Mono', 'IBM Plex Mono', ...fontFamily.mono],
        heading: ['JetBrains Mono', 'Space Mono', 'IBM Plex Mono', ...fontFamily.sans],
      },
      colors: {
        background: '#0a0a0a',
        card: '#18181b',
        accent: '#00ffae', // Neon green
        secondary: '#a259ff', // Neon purple
        border: '#222',
        'accent-foreground': '#0a0a0a',
        'muted-foreground': '#e0e0e0',
      },
      boxShadow: {
        neon: '0 0 8px #00ffae66',
      },
    },
  },
  plugins: [],
}; 