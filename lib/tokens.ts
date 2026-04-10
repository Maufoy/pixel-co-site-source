// Design Tokens — Pixel.Co
// Source: output/pixel-co/04-design-tokens.md
// Methodology: Jack Watson Responsive Design System

export const colors = {
  // Pixel Black scale (H=20°, S variável, B variável)
  black: {
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
  // Pixel Cyan scale (H=192°, S e B variáveis)
  cyan: {
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
  // Semantic (dark mode — modo principal)
  bg: {
    primary: '#0A0909',
    surface: '#141312',
    elevated: '#262523',
  },
  text: {
    primary: '#F8F7F6',
    secondary: '#8C8B89',
    disabled: '#3D3C38',
  },
  border: '#3D3C38',
  borderStrong: '#616059',
  cta: '#00D4FF',
  ctaHover: '#00AECF',
  ctaText: '#0A0909',
  accentSubtle: '#003F4D',
} as const

export const typography = {
  // Jack Watson formula: 64 / 3 / 2
  headline: {
    size: 'clamp(32px, 4.4vw, 64px)',
    weight: 800,
    lineHeight: 0.90,
    letterSpacing: '-0.02em',
  },
  subhead: {
    size: '21px',
    weight: 700,
    lineHeight: 1.15,
  },
  body: {
    size: '11px',
    weight: 400,
    lineHeight: 1.40,
  },
} as const

export const spacing = {
  // Jack Watson: viewport / 25
  marginDesktop: '58px',
  marginMobile: '34px',
  logoDesktop: '116px', // 2 × 58px
  logoMobile: '68px',   // 2 × 34px
  sectionGap: '120px',
  sectionGapMobile: '80px',
} as const

export const grid = {
  columns: 8,
  rows: 12,
  unit: '8px',
} as const
