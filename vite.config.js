import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {

      'firebase.js': path.resolve(__dirname, 'firebase.js')
    }
  },
  define: {
    'process.env': process.env
  }
})
