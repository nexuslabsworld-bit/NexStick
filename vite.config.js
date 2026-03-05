import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Analytics } from "@vercel/analytics/react"
export default defineConfig({
  plugins: [react()],
})
