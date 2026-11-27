/**
 * Cloudflare Pages Edge Function: GET /api/telemetry
 * Returns live visitor Cloudflare Edge PoP code, geolocation metadata, and server timestamp.
 */
export async function onRequestGet(context) {
  const cf = context.request.cf || {};
  const payload = {
    ok: true,
    colo: cf.colo || 'DAC',
    city: cf.city || 'Edge Node',
    country: cf.country || 'GLOBAL',
    httpProtocol: cf.httpProtocol || 'HTTP/3',
    tlsVersion: cf.tlsVersion || 'TLSv1.3',
    runtime: 'Cloudflare Workers Edge',
    serverTime: new Date().toISOString(),
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
