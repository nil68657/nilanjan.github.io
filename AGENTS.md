# Portfolio Website Instructions

## Project context

- Lightweight React 19 and Vite 8 portfolio deployed through GitHub Actions to GitHub Pages.
- Keep the site static, fast, responsive, and accessible; avoid runtime UI or animation dependencies.
- The intended canonical address is `https://nil68657.github.io/`, which requires the GitHub repository to be named `nil68657.github.io`.

## Commands

- Install reproducibly: `npm ci`
- Develop: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## Content and privacy

- Never add, commit, serve, or link a personal résumé or PDF.
- Keep professional claims consistent with the source information supplied by the owner.
- Do not expose phone numbers, private addresses, credentials, or unpublished employer information.
- Link only verified public profiles and repositories; never guess pinned projects.

## Implementation guidance

- Preserve plain CSS and semantic React components unless a dependency has clear value.
- Respect reduced-motion preferences, keyboard navigation, responsive layouts, and heading hierarchy.
- Keep Vite asset paths compatible with GitHub Pages.

## Verification

- Run `npm run build` after code, content, dependency, or deployment changes.
- Check recently edited files for diagnostics and verify desktop and mobile layout for visual changes.
