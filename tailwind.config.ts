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
        sans:  ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['News Reader', 'Georgia', 'serif'],
      },
      colors: {
        'px-bg':      '#F8F7F6',
        'px-surface': '#FFFFFF',
        'px-ink':     '#0A0909',
        'px-ink-2':   '#333333',
        'px-ink-3':   '#6B6B6B',
        'px-border':  '#E6E5E3',
        'px-gold': {
          DEFAULT: '#C4962A',
          hover:   '#A07820',
          subtle:  'rgba(196,150,42,0.08)',
          light:   '#F5E6C8',
        },
      },
      spacing: {
        '58':  '58px',
        '34':  '34px',
        '116': '116px',
        '68':  '68px',
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      lineHeight: {
        headline: '0.90',
        tight:    '1.05',
      },
      borderRadius: {
        pill: '9999px',
        card: '12px',
      },
    },
  },
  plugins: [],
}

export default config
