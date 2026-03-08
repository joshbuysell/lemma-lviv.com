# Copilot Instructions

## Architecture

This repo has two distinct layers:

- **Root** (`index.html` + `style.css`): The actual deployed website — plain HTML/CSS, no build step. This is what goes live on GitHub Pages.
- **`lemma/`**: A Figma-exported React prototype (package name `@figma/my-make-file`). Used as a design reference/prototype, not the deployed site.

The site is Ukrainian-language (`lang="uk"`, `og:locale: uk_UA`). All user-facing text should remain in Ukrainian.

## Development (lemma/ app)

All commands must be run from the `lemma/` directory:

```bash
cd lemma
npm install       # install dependencies (uses pnpm overrides)
npm run dev       # start Vite dev server
npm run build     # production build
```

There are no tests or linters configured.

## Tech Stack (lemma/)

- React 18 + TypeScript, Vite 6
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin — no `tailwind.config.js`; configuration lives in `src/styles/theme.css`
- shadcn/ui components (Radix UI primitives) in `src/app/components/ui/`
- MUI (`@mui/material`) and `lucide-react` for icons
- `motion` (Framer Motion v12) for animations
- Path alias: `@` → `lemma/src/`

## Key Conventions

### CSS / Theming
- Theme tokens are CSS custom properties in `src/styles/theme.css`, exposed to Tailwind via `@theme inline { ... }`.
- The `lemma/src/styles/index.css` entry point imports `fonts.css`, `tailwind.css`, and `theme.css` in that order.
- Never add `.css`, `.tsx`, or `.ts` files to `vite.config.ts`'s `assetsInclude` — it's reserved for `.svg` and `.csv` raw imports.
- The React and Tailwind Vite plugins must both remain in `vite.config.ts` even if Tailwind isn't actively used.

### Components
- Use `ImageWithFallback` (in `src/app/components/figma/`) instead of bare `<img>` tags — it renders a placeholder SVG on load error.
- UI primitives in `src/app/components/ui/` are shadcn/ui components; prefer these over raw Radix or MUI equivalents when both are available.

### Root site (index.html / style.css)
- Plain HTML with BEM-like class naming (e.g., `header__inner`, `btn--primary`, `card__title`).
- No JavaScript framework — keep it that way unless there's a specific reason to add one.
- Inline SVG icons are used throughout; do not swap them for icon library imports.
