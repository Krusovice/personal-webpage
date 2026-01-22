import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
      "/foundation-response": {
        target: "http://localhost:8100",
        changeOrigin: true,
        // Because Caddy uses handle_path in prod (strips prefix),
        // we mimic that here:
        rewrite: (path) => path.replace(/^\/foundation-response/, ""),
      },
      '/ws/metrics': {
        target: 'http://localhost:8010',
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});