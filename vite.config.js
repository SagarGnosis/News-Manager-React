import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit:1024 * 1024 // 1 MB (adjust as needed)
  },
});
