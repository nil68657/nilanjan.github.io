import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://nil68657.github.io/nilanjan.github.io/
// Local dev uses '/'. For a custom domain at apex, use base: '/' in production too.
const repo = 'nilanjan.github.io'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? `/${repo}/` : '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
}))
