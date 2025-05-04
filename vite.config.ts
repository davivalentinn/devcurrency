import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      'b60a-2804-3868-c35-5900-6d6c-227b-8375-ce8a.ngrok-free.app'
    ]
  }
})
