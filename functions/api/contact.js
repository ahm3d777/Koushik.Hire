/**
 * Cloudflare Pages Edge Function: POST /api/contact
 * Handles async project brief submissions from the Contact Dock & Scope Estimator.
 * Supports optional DISCORD_WEBHOOK_URL or RESEND_API_KEY environment variables in Cloudflare Pages.
 */
export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const name = String(data.name || '').trim().slice(0, 120);
    const contact = String(data.contact || '').trim().slice(0, 160);
    const message = String(data.message || '').trim().slice(0, 2500);

    if (!name || !contact || !message) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Please complete all three fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cf = context.request.cf || {};
    const metaLine = `Origin PoP: ${cf.colo || 'N/A'} (${cf.country || 'Global'})`;

    // Optional: Forward to Discord Webhook if configured in Cloudflare Pages environment
    if (context.env && context.env.DISCORD_WEBHOOK_URL) {
      await fetch(context.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `**New Portfolio Inquiry**\n**From:** ${name}\n**Contact:** ${contact}\n**Brief:** ${message}\n*${metaLine}*`,
        }),
      });
    }

    // Optional: Forward via Resend Email API if configured in Cloudflare Pages environment
    if (context.env && context.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: context.env.RESEND_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
          to: [context.env.CONTACT_TO_EMAIL || 'k.ahm3d777@gmail.com'],
          subject: `New Project Inquiry from ${name}`,
          text: `Name: ${name}\nContact: ${contact}\n\nBrief:\n${message}\n\n${metaLine}`,
        }),
      });
    }

    return new Response(
      JSON.stringify({
        ok: true,
        delivered: Boolean(
          (context.env && context.env.DISCORD_WEBHOOK_URL) ||
            (context.env && context.env.RESEND_API_KEY)
        ),
        receivedAt: new Date().toISOString(),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: 'Invalid request payload.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
