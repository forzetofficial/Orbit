import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
          allowedHosts: ['cookhub.space'], // Указываем хост
  },
});