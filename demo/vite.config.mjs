import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: path.resolve(__dirname, '../docs/demo'),
    emptyOutDir: false,
  },
  server: {
    port: 3001,
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      'replace-react-color': path.resolve(__dirname, '../src/index.ts'),
    },
  },
})
