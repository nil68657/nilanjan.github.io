import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // User-site repository and future custom domains are both served from root.
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    target: 'es2022',
    sourcemap: false,
  },
})
