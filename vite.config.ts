import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Generates relative asset paths for subpath hosting compatibility (such as GitHub Pages)
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        caseStudy: 'case-study.html',
      },
    },
  },
});


