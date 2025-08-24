import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true,
      interval: 100,
      awaitWriteFinish: {
        stabilityThreshold: 200,
        pollInterval: 100
      }
    },
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
})
