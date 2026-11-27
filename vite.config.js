import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function localEdgeTelemetryPlugin() {
  return {
    name: 'local-edge-telemetry',
    configureServer(server) {
      server.middlewares.use('/api/telemetry', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.end(
          JSON.stringify({
            ok: true,
            colo: 'DAC-DEV',
            city: 'Dhaka',
            country: 'BD',
            protocol: 'HTTP/2',
            runtime: 'Vite Local Edge Sim',
            serverTime: new Date().toISOString(),
          })
        );
      });

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
