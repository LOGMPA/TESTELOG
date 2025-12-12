import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base relativo pra rodar em GitHub Pages sem dor de cabeça.
// E usando HashRouter, nem precisa adivinhar nome de repo.
export default defineConfig({
  plugins: [react()],
  base: './'
})
