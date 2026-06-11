import { defineConfig } from 'vite';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Generates relative asset paths for subpath hosting compatibility (such as GitHub Pages)
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
  },
  plugins: [
    {
      name: 'configure-mime-types',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const originalSetHeader = res.setHeader;
          res.setHeader = function (name, value) {
            if (typeof name === 'string' && name.toLowerCase() === 'content-type') {
              const url = (req.url || '').split('?')[0];
              if (url.endsWith('.js') || url.endsWith('.ts') || url.endsWith('.tsx') || url.endsWith('.jsx')) {
                value = 'text/javascript';
              } else if (url.endsWith('.css')) {
                value = 'text/css';
              } else if (url.endsWith('.svg')) {
                value = 'image/svg+xml';
              } else if (url.endsWith('.html')) {
                value = 'text/html';
              }
            }
            return originalSetHeader.call(this, name, value);
          };
          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        caseStudy: 'case-study.html',
      },
    },
  },
});


