import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Generates relative asset paths for subpath hosting compatibility (such as GitHub Pages)
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  },
  plugins: [
    {
      name: 'configure-mime-types',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const originalSetHeader = res.setHeader;
          const originalWriteHead = res.writeHead;

          // Prevent any caching of development server assets
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');

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

          res.writeHead = function (this: any, statusCode: number, ...args: any[]) {
            const lastArg = args[args.length - 1];
            if (typeof lastArg === 'object' && lastArg !== null) {
              const headers: any = lastArg;
              for (const key of Object.keys(headers)) {
                if (key.toLowerCase() === 'content-type') {
                  const url = (req.url || '').split('?')[0];
                  if (url.endsWith('.js') || url.endsWith('.ts') || url.endsWith('.tsx') || url.endsWith('.jsx')) {
                    headers[key] = 'text/javascript';
                  } else if (url.endsWith('.css')) {
                    headers[key] = 'text/css';
                  } else if (url.endsWith('.svg')) {
                    headers[key] = 'image/svg+xml';
                  } else if (url.endsWith('.html')) {
                    headers[key] = 'text/html';
                  }
                }
              }
            }
            return originalWriteHead.apply(this, [statusCode, ...args]);
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

