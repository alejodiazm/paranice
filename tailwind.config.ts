import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pn: {
          deep: '#1E1356',
          purple: '#4B2E83',
          violet: '#7B5EA7',
          lavender: '#C8BAE5',
          pale: '#EDE8F6',
          cream: '#FAF7FF',
          gold: '#F9C846',
          'gold-bg': '#FFFBE6',
          mint: '#D4F0E8',
          'mint-text': '#1A6B4A',
          coral: '#FFE4E1',
          'coral-text': '#9B2F2F',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Nunito', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #FAF7FF 0%, #EDE8F6 50%, #C8BAE5 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config
