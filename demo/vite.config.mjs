import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/replace-react-color/demo/',
  build: {
    outDir: path.resolve(__dirname, '../docs/demo'),
    emptyOutDir: true,
  },
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      'replace-react-color': path.resolve(__dirname, '../src/index.ts'),
    },
  },
})
