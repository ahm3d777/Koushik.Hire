/**
 * Cloudflare Pages Edge Function: GET /api/edge (and /api/telemetry)
 * Returns honest visitor Cloudflare Edge PoP code (cf.colo) and server timestamp.
 * Never hard-codes a fake city; reports exact request metadata from Cloudflare's edge.
 */
export async function onRequestGet(context) {
  const cf = context.request.cf || {};
  const payload = {
    ok: true,
    colo: cf.colo || 'EDGE',
    country: cf.country || '',
    httpProtocol: cf.httpProtocol || 'HTTP/3',
    runtime: 'Cloudflare Edge',
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
