import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Generates relative asset paths for subpath hosting compatibility (such as GitHub Pages)
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        caseStudy: 'case-study.html',
      },
    },
  },
});

