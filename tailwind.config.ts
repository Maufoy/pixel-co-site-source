import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        'px-black': {
          100: '#F8F7F6',
          200: '#E6E5E3',
          300: '#C0BFBD',
          400: '#8C8B89',
          500: '#616059',
          600: '#3D3C38',
          700: '#262523',
          800: '#141312',
          900: '#0A0909',
        },
        'px-cyan': {
          100: '#E3FAFF',
          200: '#C4F2FF',
          300: '#97E9FF',
          400: '#65DEFF',
          500: '#00D4FF',
          600: '#00AECF',
          700: '#0086A6',
          800: '#006D85',
          900: '#003F4D',
        },
      },
      spacing: {
        '58': '58px',
        '34': '34px',
        '116': '116px',
        '68': '68px',
      },
      letterSpacing: {
        tightest: '-0.02em',
      },
      lineHeight: {
        headline: '0.90',
      },
      borderRadius: {
        card: '8px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
}

export default config
