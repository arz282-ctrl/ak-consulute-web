import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // shadcn-style semantic tokens mapped to the Anwar Khan brand system
        background: '#FFFFFF',
        foreground: '#0A1628',
        'muted-foreground': '#506586',
        border: 'rgba(10, 22, 40, 0.10)',
        primary: {
          DEFAULT: '#F57C20',
          50: '#FFF3E8',
          100: '#FFE3C7',
          200: '#FFC68A',
          300: '#FFA84E',
          400: '#FA8C2A',
          500: '#F57C20',
          600: '#D6691A',
          700: '#A85113',
          800: '#7A3A0E',
          900: '#4D2308',
        },
        secondary: {
          DEFAULT: '#0A1628',
          50: '#E6E9EE',
          100: '#C5CCD6',
          200: '#8A98AE',
          300: '#506586',
          400: '#1E3358',
          500: '#0A1628',
          600: '#081222',
          700: '#060E1B',
          800: '#040A14',
          900: '#02060D',
        },
        ink: '#0A1628',
        flame: '#F57C20',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        'google-sans': ['var(--font-google-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-flame': 'linear-gradient(135deg, #F57C20 0%, #FA8C2A 50%, #FFA84E 100%)',
        'gradient-ink': 'linear-gradient(135deg, #02060D 0%, #0A1628 50%, #1E3358 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'flame': '0 20px 60px -15px rgba(245, 124, 32, 0.45)',
        'flame-sm': '0 8px 24px -6px rgba(245, 124, 32, 0.35)',
        'ink': '0 24px 80px -20px rgba(10, 22, 40, 0.55)',
        'glass': 'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.18)',
      },
      animation: {
        'float-slow': 'float 9s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.4s cubic-bezier(0.4,0,0.6,1) infinite',
        'gradient-shift': 'gradientShift 12s ease infinite',
        'shimmer': 'shimmer 2.4s linear infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-22px) rotate(6deg)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.85' },
          '80%, 100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      letterSpacing: {
        'widest-plus': '0.22em',
      },
    },
  },
  plugins: [],
};

export default config;
