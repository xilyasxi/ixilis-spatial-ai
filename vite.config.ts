import { defineConfig } from 'vite';

export default defineConfig({
  // Ensures assets are loaded relative to where the HTML is served
  base: './', 
  build: {
    outDir: 'dist',
  }
});