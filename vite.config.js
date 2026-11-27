import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function localEdgeTelemetryPlugin() {
  const sendEdgeJson = (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    res.end(
      JSON.stringify({
        ok: true,
        colo: 'LOCAL',
        country: '',
        protocol: 'HTTP/2',
        runtime: 'Vite Dev',
        serverTime: new Date().toISOString(),
      })
    );
  };

  return {
    name: 'local-edge-telemetry',
    configureServer(server) {
      server.middlewares.use('/api/edge', sendEdgeJson);
      server.middlewares.use('/api/telemetry', sendEdgeJson);

      server.middlewares.use('/api/contact', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
          return;
        }
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              ok: true,
              mode: 'local-dev',
              receivedAt: new Date().toISOString(),
              echo: body ? JSON.parse(body) : {},
            })
          );
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localEdgeTelemetryPlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
