/**
 * Kingspan Eesti BIO — Brand Design Tokens
 * =========================================
 * SINGLE SOURCE OF TRUTH for the website AND all branded documents
 * (proposal / invoice / order PDFs).
 *
 * Consumers:
 *   - tailwind.config.js   → web utility classes
 *   - src/styles.css       → CSS custom properties (generated below as :root vars)
 *   - src/documents/theme.js → @react-pdf/renderer StyleSheet
 *
 * Plain ESM .js (not .ts) on purpose: Tailwind's loader, Vite/TS, and bare
 * `node` scripts can all import this same file. Types come from JSDoc.
 *
 * Direction: "Aqua-Tech Immersive" / Liquid Glass — deep navy canvas,
 * Kingspan gold accent, cyan water highlights, glassmorphism.
 */

/* ------------------------------------------------------------------ *
 * 1. COLOR RAMPS (50 → 950)
 * ------------------------------------------------------------------ */

/** Kingspan Blue — brand primary lives at 700 (#003A70). */
export const blue = {
  50: '#EAF1F8',
  100: '#CFE0EF',
  200: '#9FC0DF',
  300: '#6F9FCE',
  400: '#3F7FBE',
  500: '#1A5F9E',
  600: '#0A4B85',
  700: '#003A70', // brand
  800: '#002F5C',
  900: '#002344',
  950: '#001628',
}

/** Kingspan Gold — accent, brand at 500 (#C69214). */
export const gold = {
  50: '#FBF6E9',
  100: '#F5E9C4',
  200: '#EBD389',
  300: '#E0BD4E',
  400: '#D5A82A',
  500: '#C69214', // brand
  600: '#A87911',
  700: '#85600E',
  800: '#63480B',
  900: '#423006',
}

/** Aqua / cyan — "water" highlight, used in gradients & glows. */
export const aqua = {
  50: '#E7FAFE',
  100: '#C2F1FB',
  200: '#8FE4F4',
  300: '#5FD0E6',
  400: '#2BB8D6',
  500: '#0E9DC2',
  600: '#0A7E9E',
  700: '#0A6580',
  800: '#0C5266',
  900: '#0E4453',
}

/** Ink / navy — dark canvas surfaces for the immersive sections. */
export const ink = {
  700: '#013A5E',
  800: '#002B4A', // DESIGN.md "navy"
  850: '#002038',
  900: '#001A30', // page base (dark)
  950: '#00111F', // deepest
}

/** Slate — neutral text & borders. */
export const slate = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B', // DESIGN.md "slate"
  600: '#475569',
  700: '#334155',
  800: '#1E293B',
  900: '#0F172A',
}

export const cloud = '#F5F7FA'
export const white = '#FFFFFF'

/** Status colors (forms, validation). */
export const status = {
  success: '#1B9C5D',
  warning: '#C68A14',
  danger: '#C0392B',
  info: blue[500],
}

/* ------------------------------------------------------------------ *
 * 2. SEMANTIC TOKENS  (use these in components, not raw ramps)
 * ------------------------------------------------------------------ */

export const semantic = {
  // Dark / immersive surfaces
  bgDeep: ink[950],
  bgBase: ink[900],
  bgRaised: ink[850],
  // Light / document surfaces
  bgLight: cloud,
  surface: white,
  // Text on dark
  textOnDark: '#EAF1F8',
  textOnDarkMuted: '#9FB4CC',
  // Text on light
  textOnLight: blue[900],
  textOnLightMuted: slate[600],
  // Lines
  borderOnDark: 'rgba(255,255,255,0.12)',
  borderOnLight: slate[200],
  // Brand
  primary: blue[700],
  accent: gold[500],
  water: aqua[400],
  cta: gold[500],
  ctaHover: gold[600],
}

/* ------------------------------------------------------------------ *
 * 3. TYPOGRAPHY
 * ------------------------------------------------------------------ */

export const fontFamily = {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['Inter', 'system-ui', 'sans-serif'],
}

/** Fluid type scale. Tailwind-shaped: [size, { lineHeight, letterSpacing }]. */
export const fontSize = {
  'display-xl': ['clamp(3rem, 8vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
  'display-1': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
  'display-2': ['clamp(2rem, 4.5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
  h1: ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
  h2: ['clamp(1.5rem, 2.4vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
  h3: ['1.25rem', { lineHeight: '1.3' }],
  'body-lg': ['1.125rem', { lineHeight: '1.7' }],
  body: ['1rem', { lineHeight: '1.6' }],
  small: ['0.875rem', { lineHeight: '1.55' }],
  caption: ['0.75rem', { lineHeight: '1.4' }],
  overline: ['0.6875rem', { lineHeight: '1.3', letterSpacing: '0.18em' }],
}

export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

/* ------------------------------------------------------------------ *
 * 4. SPACING / RADIUS / ELEVATION
 * ------------------------------------------------------------------ */

export const spacing = {
  18: '4.5rem',
  22: '5.5rem',
  26: '6.5rem',
  30: '7.5rem',
  38: '9.5rem',
}

export const borderRadius = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  '2xl': '1rem',
  '3xl': '1.25rem',
  '4xl': '1.75rem',
  pill: '9999px',
}

export const boxShadow = {
  card: '0 10px 30px rgba(0,0,0,0.08)',
  'card-navy': '0 20px 40px rgba(0, 58, 112, 0.12)',
  glass: '0 8px 32px rgba(0, 17, 31, 0.37)',
  'glow-gold': '0 0 40px rgba(198,146,20,0.25)',
  'glow-aqua': '0 0 48px rgba(43,184,214,0.28)',
  lift: '0 24px 60px -12px rgba(0,17,31,0.45)',
}

/* ------------------------------------------------------------------ *
 * 5. MOTION  (shared by CSS + framer-motion)
 * ------------------------------------------------------------------ */

export const motion = {
  duration: { fast: 0.15, base: 0.25, slow: 0.4, slower: 0.6 },
  ease: {
    standard: [0.4, 0, 0.2, 1],
    emphasized: [0.2, 0, 0, 1],
    water: [0.65, 0, 0.35, 1], // smooth flowing curve
  },
  spring: {
    soft: { type: 'spring', stiffness: 120, damping: 20, mass: 1 },
    snappy: { type: 'spring', stiffness: 300, damping: 30 },
    gentle: { type: 'spring', stiffness: 80, damping: 18 },
  },
}

/* ------------------------------------------------------------------ *
 * 6. GLASS RECIPES  (glassmorphism for dark & light contexts)
 * ------------------------------------------------------------------ */

export const glass = {
  dark: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    backdropFilter: 'blur(16px) saturate(140%)',
    boxShadow: boxShadow.glass,
  },
  light: {
    background: 'rgba(255,255,255,0.80)',
    border: `1px solid ${slate[200]}`,
    backdropFilter: 'blur(12px) saturate(120%)',
    boxShadow: boxShadow.card,
  },
}

/* ------------------------------------------------------------------ *
 * 7. GRADIENTS
 * ------------------------------------------------------------------ */

export const gradient = {
  heroWater:
    'radial-gradient(60% 120% at 20% 10%, rgba(10,75,133,0.55), rgba(0,17,31,0)), ' +
    'radial-gradient(80% 140% at 80% 90%, rgba(43,184,214,0.30), rgba(0,17,31,0)), ' +
    'radial-gradient(50% 80% at 60% 40%, rgba(198,146,20,0.18), rgba(0,17,31,0))',
  goldLine: `linear-gradient(90deg, ${gold[600]}, ${gold[400]}, ${gold[600]})`,
  aquaLine: `linear-gradient(90deg, ${aqua[600]}, ${aqua[300]}, ${aqua[600]})`,
}

/* ------------------------------------------------------------------ *
 * 8. Z-INDEX SCALE
 * ------------------------------------------------------------------ */

export const zIndex = { base: 0, raised: 10, sticky: 20, header: 30, overlay: 40, modal: 50 }

/* ------------------------------------------------------------------ *
 * 9. DOCUMENT GEOMETRY  (for @react-pdf/renderer — units are pt)
 * ------------------------------------------------------------------ */

export const doc = {
  page: { width: 595.28, height: 841.89 }, // A4 portrait, pt
  margin: { x: 48, y: 56 },
  // Document-safe color subset (hex only — react-pdf has no rgba/var support)
  color: {
    primary: blue[700],
    primaryDeep: blue[900],
    accent: gold[500],
    accentDeep: gold[700],
    text: slate[900],
    textMuted: slate[600],
    line: slate[200],
    surface: white,
    surfaceAlt: cloud,
    tableHeader: blue[700],
    tableHeaderText: white,
    zebra: slate[50],
  },
  font: {
    family: 'Inter',
    size: { h1: 24, h2: 16, h3: 12, body: 10, small: 9, caption: 8 },
  },
  company: {
    name: 'Kingspan Eesti BIO',
    legal: 'Kingspan Water & Energy',
    site: 'biopuhastid.com',
    email: 'info@kingspaneesti.com',
    phone: '+372 5610 3001',
    vatRate: 0.22, // Estonian VAT (käibemaks) as of 2024+
    currency: 'EUR',
  },
}

/* ------------------------------------------------------------------ *
 * Aggregate (Tailwind `colors` shape + everything else)
 * ------------------------------------------------------------------ */

export const colors = {
  kingspan: {
    blue: blue[700],
    gold: gold[500],
    navy: ink[800],
    slate: slate[500],
    cloud,
    white,
  },
  blue,
  gold,
  aqua,
  ink,
  slate,
  cloud,
  white,
  status,
}

const tokens = {
  colors,
  semantic,
  fontFamily,
  fontSize,
  fontWeight,
  spacing,
  borderRadius,
  boxShadow,
  motion,
  glass,
  gradient,
  zIndex,
  doc,
}

export default tokens
