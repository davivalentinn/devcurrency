import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/devcurrency/', // 👈 coloque o nome exato do seu repositório aqui
  plugins: [react()],
})
