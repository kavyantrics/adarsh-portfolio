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
        background: {
          DEFAULT: '#ffffff',
          dark: '#0a0a0a',
        },
        card: {
          DEFAULT: '#f8f9fa',
          dark: '#18181b',
        },
        accent: '#00ffae', // Neon green
        secondary: '#a259ff', // Neon purple
        border: {
          DEFAULT: '#e5e7eb',
          dark: '#222',
        },
        'accent-foreground': {
          DEFAULT: '#0a0a0a',
          dark: '#ffffff',
        },
        'muted-foreground': {
          DEFAULT: '#6b7280',
          dark: '#e0e0e0',
        },
        text: {
          DEFAULT: '#1f2937',
          dark: '#f3f4f6',
        },
        'text-secondary': {
          DEFAULT: '#6b7280',
          dark: '#d1d5db',
        },
      },
      boxShadow: {
        neon: '0 0 8px #00ffae66',
        'neon-dark': '0 0 8px #00ffae66',
        'neon-light': '0 0 8px #00ffae40',
      },
    },
  },
  plugins: [],
}; 