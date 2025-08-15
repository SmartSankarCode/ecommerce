import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000, // changed the frontend port to match backend cors
    proxy: {
      '/api': {
        target: 'http://localhost:3000', //  backend server
      },
      '/images': {
        target: 'http://localhost:3000', //  backend server
      }
    },
  },
})
