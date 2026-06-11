import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DIST_DIR = path.join(__dirname, 'dist');
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.ts': 'text/javascript',
  '.tsx': 'text/javascript',
  '.jsx': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = parsedUrl.pathname;

  // Intercept requests for index.tsx, index.ts, or index.js to support old cached index.html files
  if (pathname === '/index.tsx' || pathname === '/index.ts' || pathname === '/index.js') {
    const indexPath = path.join(ROOT_DIR, 'index.js');
    serveFile(indexPath, res);
    return;
  }

  // SPA fallback or static resolving
  // First, check if the file exists in the DIST_DIR
  let filePath = path.join(DIST_DIR, pathname);
  
  // If requesting a directory, serve index.html from it
  if (pathname.endsWith('/')) {
    filePath = path.join(DIST_DIR, pathname, 'index.html');
  }

  // Check if file exists in dist
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      // It exists in dist as a file or directory
      fs.stat(filePath, (statErr, stats) => {
        if (!statErr && stats.isDirectory()) {
          // If it is a directory, try serving index.html inside it
          const subIndexPath = path.join(filePath, 'index.html');
          fs.access(subIndexPath, fs.constants.F_OK, (subIndexErr) => {
            if (!subIndexErr) {
              serveFile(subIndexPath, res);
            } else {
              serveFile(path.join(DIST_DIR, 'index.html'), res);
            }
          });
        } else {
          serveFile(filePath, res);
        }
      });
    } else {
      // If not in dist, check if it exists in ROOT_DIR (like index.js, index.ts, index.tsx for compatibility with cached requests)
      const fallbackPath = path.join(ROOT_DIR, pathname);
      fs.access(fallbackPath, fs.constants.F_OK, (fallbackErr) => {
        if (!fallbackErr) {
          fs.stat(fallbackPath, (fallbackStatErr, fallbackStats) => {
            if (!fallbackStatErr && fallbackStats.isFile()) {
              serveFile(fallbackPath, res);
            } else {
              serveSPA(res);
            }
          });
        } else {
          serveSPA(res);
        }
      });
    }
  });
});

function serveSPA(res) {
  const indexPath = path.join(DIST_DIR, 'index.html');
  fs.access(indexPath, fs.constants.F_OK, (indexErr) => {
    if (!indexErr) {
      serveFile(indexPath, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
}

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Check if it's a directory
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error');
      return;
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Content-Type-Options': 'nosniff'
    });
    res.end(data);
  });
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Production server running on http://0.0.0.0:${PORT}`);
});
