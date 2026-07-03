/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep Space palette
        'space-black': '#050608',
        'cosmic-navy': '#08152F',
        'dark-blue': '#0E2A5C',
        'event-horizon': '#123A78',
        'starlight': '#F6F7FA',
        'electric-blue': '#3FA9FF',
        'nebula-glow': '#5CCBFF',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        space: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
      backgroundImage: {
        'cosmic-gradient': 'radial-gradient(ellipse at 50% 0%, #0E2A5C 0%, #08152F 40%, #050608 100%)',
        'nebula-gradient': 'radial-gradient(ellipse at 80% 50%, rgba(63,169,255,0.05) 0%, transparent 60%)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'aurora': 'aurora 15s ease infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'cosmic': '0 0 60px rgba(63,169,255,0.1), 0 0 120px rgba(63,169,255,0.05)',
        'nebula': '0 0 30px rgba(92,203,255,0.15)',
        'card': '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
};
