import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({ 
  plugins: [react()],
  base: "./", // Empty string for current directory
  publicDir: "public",
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
})