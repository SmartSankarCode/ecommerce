import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://smartsankarcode-ecommerce-backend.onrender.com', // backend server
        changeOrigin: true,
        secure: false, 
      },
      '/images': {
        target: 'https://smartsankarcode-ecommerce-backend.onrender.com', // backend server
        changeOrigin: true,
        secure: false,  
      }
    },
  },
})
