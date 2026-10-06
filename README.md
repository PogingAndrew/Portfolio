# Bart Andrew D. Cayanan — Portfolio

React + Vite single-page portfolio.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
```

## Build and deploy
```bash
npm run build    # outputs to dist/
npm run preview  # test the production build
```
`dist/` is a static site. Upload it to Netlify, Vercel, or GitHub Pages (the build uses relative paths).

## Edit your content
All text lives in `src/data.js` (skills, certifications, experience, projects) and in `src/components/`.
Colors and fonts are CSS variables at the top of `src/styles.css`. Your resume PDF is `public/MidtermResume.pdf`.

## Projects carousel
- Component: `src/components/ui/coverflow-carousel.tsx` (shadcn-style path, imported as `@/components/ui/coverflow-carousel`). Needs `lucide-react` and `tw-animate-css`.
- Edit projects in `WORKS` in `src/data.js`: `title`, `subtitle`, `description`, `meta` rows, optional `links`, and `src`.
- Projects come from the GitHub account (live demos and source links are in `WORKS`).
- Covers: each card tries `public/works/<name>.png` first (cieqen, brewnest, ironforge, freshmart, blaze), then the screenshot on the old Netlify portfolio, then a generated SVG in `public/works/`. To make the site fully self-contained, copy the five PNGs from the old Netlify project into `public/works/`.
- Controls: next/previous buttons, dots, drag or swipe, and the left/right arrow keys.

## Certifications
- Component: `src/components/ui/image-stack-carousel.tsx` (needs `framer-motion`). The original used `next/image`; this project is Vite, so it uses a plain `<img>`.
- Added to the component: `ref` controls (`next`, `prev`, `goTo`), an `onChange` callback, `maxVisible` and `fit: "contain"` settings.
- Certificates live in `CERTS` in `src/data.js` (title, issuer, date, image, optional `verify` link). Images are in `public/certificates/`.

## Stack notes
- TypeScript (`tsconfig.json`, `npm run typecheck`), Tailwind v4 without its global reset (so existing styles are untouched), `@` alias to `src`, `components.json` for the shadcn CLI, `cn()` helper in `src/lib/utils.ts`.
- Existing `.jsx` files keep working next to `.tsx` files.
- Site-wide base rules such as `a{color:inherit}` live in `@layer base` so Tailwind utility classes on components can override them.

## Palette
Blush `#f6dad5`, mauve `#a6767d`, cream `#f5efe6`, sand `#d8c39b`, sage `#a2b0a6`. Tokens are at the top of `src/styles.css` (light and dark).
