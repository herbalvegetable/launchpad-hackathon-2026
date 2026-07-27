import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// OpenCVE does not send CORS headers for browser origins, so all client
// requests go to /api/opencve and Vite (dev) / Vercel (prod) proxy them.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/opencve': {
        target: 'https://app.opencve.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/opencve/, '/api/v2'),
        secure: true,
      },
    },
  },
})
