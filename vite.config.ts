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
    port: 3000,
    // Allow dev server behind ngrok / reverse proxies with varying Host headers
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    // Required when opening `vite preview` via ngrok (or add specific hosts to the array)
    allowedHosts: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
})