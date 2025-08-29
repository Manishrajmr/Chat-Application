import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from "vite-jsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),jsconfigPaths()],
  optimizeDeps: {
    include: ['react-router-dom']
  },

   server: {
    proxy: {
      '/api': {
        target: 'https://chat-application-g7r8-git-main-manish-rajs-projects-f5ae813e.vercel.app/', // 🟢 tumhara backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // ⚡ 1MB limit set
  },
})

