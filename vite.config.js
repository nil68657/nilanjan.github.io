import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative assets work on both the GitHub project URL and a custom domain.
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    target: 'es2022',
    sourcemap: false,
  },
})
