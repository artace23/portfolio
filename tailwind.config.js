module.exports = {
darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'blink': 'blink 1s infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-slower': 'float 8s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'spin-slow-reverse': 'spin 8s linear infinite reverse',
        'float-delayed': 'float 3s ease-in-out infinite 1s',
        'float-slow': 'float 5s ease-in-out infinite',
        gradient: 'gradient 3s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        gradient: {
            '0%, 100%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-cursor': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'white' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'glitch-1': {
          '0%, 100%': { transform: 'none' },
          '20%': { transform: 'skew(-10deg)' },
          '40%': { transform: 'skew(5deg) translateX(-2px)' },
          '60%': { transform: 'skew(-3deg)' },
          '80%': { transform: 'skew(2deg) translateX(2px)' }
        },
        'glitch-2': {
          '0%, 100%': { transform: 'none' },
          '25%': { transform: 'skew(5deg)' },
          '45%': { transform: 'skew(-3deg) translateX(3px)' },
          '65%': { transform: 'skew(1deg)' },
          '85%': { transform: 'skew(-1deg) translateX(-3px)' }
        },
        'glitch-3': {
          '0%, 100%': { transform: 'none' },
          '30%': { transform: 'translateX(2px)' },
          '50%': { transform: 'translateX(-2px)' },
          '70%': { transform: 'translateX(3px)' }
        },
        'glitch-opacity': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        }
      },
      animation: {
        'glitch-1': 'glitch-1 2s infinite',
        'glitch-2': 'glitch-2 2.5s infinite',
        'glitch-3': 'glitch-3 3s infinite',
        'glitch-opacity': 'glitch-opacity 0.3s infinite'
      }
    }
  }
}