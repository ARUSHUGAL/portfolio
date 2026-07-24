# Arush Ugal — Portfolio

A premium, Apple.com-caliber personal portfolio for **Arush Ugal**, Backend Software Engineer. Fully static and self-contained — it runs and deploys with **no backend**.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (class-based dark mode)
- **Framer Motion** for scroll-reveal animations and micro-interactions

Portfolio content is embedded as a typed TypeScript module (`src/data/content.ts`), sourced verbatim from the backend `content.json`. No API calls, no runtime data dependency.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Build

```bash
npm run build
```

Produces an optimized static site in `dist/`. Preview the production build locally with:

```bash
npm run preview
```

## Deploy

This is a static SPA, so it deploys to any static host or CDN.

### Vercel

The included `vercel.json` sets the build command (`npm run build`), output directory (`dist`), and SPA rewrites.

```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

Or import the repo at [vercel.com/new](https://vercel.com/new) — the framework preset (Vite) is detected automatically.

### Netlify

The included `netlify.toml` sets the build command and publish directory.

```bash
npm i -g netlify-cli
netlify deploy --build            # preview
netlify deploy --build --prod     # production
```

Or drag-and-drop the `dist/` folder at [app.netlify.com/drop](https://app.netlify.com/drop).

## Project structure

```
frontend/
├── index.html                 # meta tags, Open Graph, canonical, theme anti-flash
├── vercel.json / netlify.toml # deploy config
├── tailwind.config.ts         # design tokens (palette, type scale, shadows)
└── src
    ├── main.tsx
    ├── App.tsx                # layout + section composition
    ├── data/content.ts        # embedded typed portfolio content
    ├── types/content.ts       # TypeScript interfaces
    ├── theme/ThemeProvider.tsx# light/dark, persisted, respects prefers-color-scheme
    ├── hooks/useReducedMotion.ts
    ├── config/navigation.ts
    ├── utils/                 # date formatting + contact validation
    └── components
        ├── layout/            # Navbar, Footer
        ├── sections/          # Hero, About, Experience, Projects, Skills,
        │                      # Certifications, Education, Contact
        └── ui/                # Section, AnimatedReveal, ThemeToggle, icons
```

## Design & accessibility

- Glassmorphism sticky navbar with smooth-scroll section links and a mobile menu.
- Full-viewport hero with an animated ambient gradient and large refined type.
- Scroll-triggered fade + translate reveals via Framer Motion `whileInView`.
- Light and dark themes; default respects `prefers-color-scheme`, toggle persists to `localStorage`.
- Respects `prefers-reduced-motion` (non-essential animation disabled).
- Semantic landmarks, heading hierarchy, visible focus rings, keyboard-operable nav/toggle, 44px touch targets, skip-to-content link.
- Mobile-first responsive layout: single column on mobile, multi-column grids on desktop.

## Editing content

All content lives in `src/data/content.ts` (typed against `src/types/content.ts`). Update it there to change what the site displays.
