import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/face-name-trainer/',
  server: {
    port: 3000
  }
});
