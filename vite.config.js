import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  base: "/map/",
  server: {
    allowedHosts: [
      'cookhub.space'
    ]
  },
  plugins: [preact()],
})
