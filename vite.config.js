import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base نسبي عند البناء ('./') حتى تعمل النسخة على أي استضافة:
// Netlify (الجذر) أو GitHub Pages (مسار فرعي) دون كسر مسارات الملفات.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [react()],
}))
