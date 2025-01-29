import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        onlineblue: '#0d5474',
        onlinebluedark: '#072f41',
        onlineyellow: '#f9b759',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        playfair: ['Playfair Display SC', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        spashSlideUp: {
          '0%': { transform: 'translateY(150px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceArrow: {
          '0%, 20%, 50%, 80%, 100%': {
            transform: 'translateY(0) rotate(45deg)',
          },
          '40%': { transform: 'translateY(-10px) rotate(45deg)' },
          '60%': { transform: 'translateY(-5px) rotate(45deg)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-out forwards',
        spashSlideUp: 'spashSlideUp 1.5s ease-out forwards',
        bounceArrow: 'bounceArrow 1s infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
