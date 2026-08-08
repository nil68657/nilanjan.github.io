# Nilanjan Chatterjee — Portfolio

[View the live website](https://nil68657.github.io/)

Static portfolio for Nilanjan Chatterjee, Principal Data Architect. The site highlights enterprise data platform work, Lakehouse and Data Mesh architecture, GPU training and inference, MLOps, and governance.

## Features

- Scroll-reactive Mandelbrot backdrop (WebGL with CPU and reduced-motion fallbacks)
- Orientation-aware experience timeline with keyboard navigation
- Impact stories, expertise cards, and pinned GitHub projects
- Responsive layout, semantic HTML, and plain CSS (no UI framework)

## Technology

- React 19 and Vite 8
- GitHub Actions → GitHub Pages at the repository root URL

## Run locally

```bash
npm ci
npm run dev
npm run build
npm run preview
```

## Deployment

Pushes to `main` build and deploy automatically via `.github/workflows/deploy-pages.yml`.

## Project status

Development for the current redesign is complete and live at the URL above. Content lives in `src/data/portfolio.js`; site structure and styling are in `src/components/` and `src/index.css`.
