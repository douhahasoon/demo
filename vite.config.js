import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base = '/paydemo/' عند البناء للنشر على GitHub Pages، و '/' أثناء التطوير
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/paydemo/' : '/',
  plugins: [react()],
}))
