/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'onlineblue': '#0d5474',
        'onlinebluedark': '#072f41',
        'onlineyellow': '#f9b759',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'playfair': ['Playfair Display SC', 'serif'],
        'roboto': ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
