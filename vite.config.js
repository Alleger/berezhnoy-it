import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — сайт работает и на GitHub Pages (/repo-name/), и на своём домене
export default defineConfig({
  plugins: [react()],
  base: './',
});
