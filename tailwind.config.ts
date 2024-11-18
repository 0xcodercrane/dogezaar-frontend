/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-doge-sans)'],
      },
      colors: {
        primary: {
          DEFUAULT: ' var(--primary)',
        },
        background: {
          DEFUAULT: 'var(--background)',
        },
      },
    },
  },
  plugins: [],
}
