import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/drawing_tree/',
  plugins: [react()],
  server: {
    // Add CORS configuration
    cors: {
      origin: 'https://api.baserow.io',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
    }
  }
})
