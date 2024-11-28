import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 80,
    watch: {
      usePolling: true
    },
    host: true,
    proxy: {
      '/ride/estimate': {
        target: 'http://backend:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ride\/estimate/, '/ride/estimate'),
      },
    }
  }
})

