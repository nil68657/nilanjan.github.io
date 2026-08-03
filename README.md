# Nilanjan Chatterjee — Portfolio

A lightweight, responsive portfolio for a Principal Data Architect, focused on enterprise-scale data, AI, MLOps, governance, and platform outcomes.

## Stack

- React 19
- Vite 8
- Plain CSS with no UI or animation runtime
- GitHub Actions + GitHub Pages

## Local development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run preview
```

## GitHub Pages

`.github/workflows/deploy-pages.yml` builds and deploys the site whenever `main` is updated. In the repository settings, set **Pages → Source** to **GitHub Actions**.

The Vite build uses relative asset paths, so the same artifact works at both:

- `https://nil68657.github.io/nilanjan.github.io/`
- A custom domain

## AWS Route 53 custom domain

After choosing the exact domain:

1. Add `public/CNAME` containing only the domain, for example `example.com`.
2. Add the same custom domain under **GitHub repository → Settings → Pages**.
3. In the Route 53 hosted zone, point the apex domain to GitHub Pages with four `A` records:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
4. For `www`, add a `CNAME` record pointing to `nil68657.github.io`.
5. After GitHub verifies DNS, enable **Enforce HTTPS**.

DNS changes can take several hours to propagate. Replace `example.com` with the real domain before deploying.
