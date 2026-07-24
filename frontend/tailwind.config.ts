import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Body: legible handwriting (diary ink).
        sans: [
          'Shantell Sans',
          'Comic Sans MS',
          'Segoe Print',
          'cursive',
          'sans-serif',
        ],
        // Big headings: loose casual handwriting.
        hand: ['Caveat', 'Shantell Sans', 'cursive'],
        // "Mono" labels become a plain print handwriting for margins/tags.
        mono: ['Gaegu', 'Shantell Sans', 'cursive'],
      },
      colors: {
        // Ballpoint-ink palette on paper.
        ink: {
          DEFAULT: '#1f2a44', // dark blue-black ballpoint
          soft: '#3d4767',
          muted: '#7a7466',
        },
        canvas: {
          light: '#f6efdd', // warm cream paper
          dark: '#171410', // dark leather journal
        },
        surface: {
          light: '#fbf6e8',
          dark: '#211c16',
        },
        // 朱色 — a single restrained vermillion accent (Japanese-coded).
        shu: {
          DEFAULT: '#e6362a',
          soft: '#ff5a48',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      fontSize: {
        // Handwriting reads smaller per em — scale headings up.
        display: ['clamp(3.5rem, 9vw, 7rem)', { lineHeight: '0.95', letterSpacing: '0' }],
        headline: ['clamp(2.5rem, 5vw, 3.75rem)', { lineHeight: '1', letterSpacing: '0' }],
      },
      maxWidth: {
        content: '1080px',
      },
    },
  },
  plugins: [],
} satisfies Config;
