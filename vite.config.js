import { defineConfig } from 'vite';

// Static demo sites live in public/demos/<name>/index.html. Production hosts serve the folder URL
// (/demos/<name>/) automatically; the dev server would fall back to the portfolio page instead.
const DEMO_FOLDER_URL = /^\/demos\/[^/]+\/?$/;

function serveDemoIndex(server) {
  server.middlewares.use((req, _res, next) => {
    const [path, query] = (req.url || '').split('?');
    if (DEMO_FOLDER_URL.test(path)) {
      req.url = `${path.replace(/\/$/, '')}/index.html${query ? `?${query}` : ''}`;
    }
    next();
  });
}

export default defineConfig({
  plugins: [{
    name: 'serve-demo-folder-index',
    configureServer: serveDemoIndex,
    configurePreviewServer: serveDemoIndex
  }]
});
