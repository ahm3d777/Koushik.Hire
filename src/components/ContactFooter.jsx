import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Command,
  Copy,
  Mail,
  MessageCircle,
  Send,
} from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/siteConfig';
import { usePortfolio } from '../context/PortfolioContext';
import { handleSpecularMouseMove } from '../utils/scrambleText';
import { soundEngine } from '../utils/soundEngine';

function getDhakaShortClock() {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: SITE_CONFIG.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(new Date());
  } catch {
    return 'GMT+6';
  }
}

export default function ContactFooter() {
  const { openPalette, setCursorLabel } = usePortfolio();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [dhakaTime, setDhakaTime] = useState(() => getDhakaShortClock());

  // Async 3-field form state
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setDhakaTime(getDhakaShortClock()), 15000);
    return () => clearInterval(id);
  }, []);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(SITE_CONFIG.email).catch(() => {});
    }
    soundEngine.playSuccess();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2600);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, message }),
      });
    } catch {
      // Optimistic confirmation even if offline / static host
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      soundEngine.playSuccess();
    }
  };

  return (
    <section
      id="contact"
      className="section-shell"
      style={{ paddingBottom: 0 }}
      data-xray-module="SECTION_08 · CONVERSION_CONTACT_DOCK"
    >
      <div className="container">
        <div className="eyebrow-telemetry">
          <span className="index-code">08 //</span>
          <span>START A CONVERSATION</span>
        </div>
        <h2
          className="display-hero"
          style={{ fontSize: 'clamp(34px, 4.8vw, 68px)' }}
        >
          Have something worth building? Let&apos;s{' '}
          <em className="editorial-italic">ship</em> it.
        </h2>

        <div className="contact-grid">
          {/* Left: Direct Tactile Conversion Cards */}
          <div className="contact-direct-stack">
            <div
              className="specular-card contact-action-card"
              onMouseMove={handleSpecularMouseMove}
            >
              <button
                type="button"
                id="copy-email-card-btn"
                onClick={handleCopyEmail}
                onMouseEnter={() => setCursorLabel('COPY')}
                onMouseLeave={() => setCursorLabel('')}
                style={{
                  flex: 1,
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <span
                  className="mono-tag"
                  style={{
                    color: copiedEmail
                      ? 'var(--accent-emerald)'
                      : 'var(--text-muted)',
                  }}
                >
                  {copiedEmail
                    ? 'COPIED TO CLIPBOARD ✓'
                    : '01 · DIRECT EMAIL (CLICK TO COPY)'}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 1.9vw, 24px)',
                    fontWeight: 700,
                    wordBreak: 'break-all',
                  }}
                >
                  {SITE_CONFIG.email}
                </span>
              </button>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  className="hud-icon-btn"
                  onClick={handleCopyEmail}
                  aria-label="Copy Email Address"
                >
                  {copiedEmail ? <Check size={15} /> : <Copy size={15} />}
                </button>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hud-icon-btn"
                  aria-label="Open Mail App"
                  title="Open Mail App"
                >
                  <Mail size={15} />
                </a>
              </div>
            </div>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="specular-card contact-action-card"
              onMouseMove={handleSpecularMouseMove}
              onMouseEnter={() => setCursorLabel('WHATSAPP')}
              onMouseLeave={() => setCursorLabel('')}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="mono-tag" style={{ color: 'var(--accent-emerald)' }}>
                  02 · WHATSAPP DIRECT · FASTEST RESPONSE
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 1.9vw, 24px)',
                    fontWeight: 700,
                  }}
                >
                  Message on WhatsApp
                </span>
                <span style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>
                  Ideal for Dhaka business owners &amp; international founders.
                </span>
              </div>
              <span className="hud-icon-btn" aria-hidden="true">
                <MessageCircle size={16} />
              </span>
            </a>
          </div>

          {/* Right: Minimal 3-Field Async Project Form */}
          <div
            className="specular-card"
            style={{ padding: 'clamp(24px, 3vw, 34px)' }}
            onMouseMove={handleSpecularMouseMove}
            data-xray-module="ASYNC_BRIEF_FORM · EDGE_POST"
          >
            {submitted ? (
              <div
                style={{
                  minHeight: 230,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 12,
                }}
              >
                <span className="mono-tag" style={{ color: 'var(--accent-emerald)' }}>
                  // BRIEF LOGGED SUCCESSFULLY ✓
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                >
                  Thanks, {name} — your message is ready.
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14.5 }}>
                  For immediate follow-up in Dhaka (GMT+6), you can also send
                  this exact note straight to my inbox or WhatsApp in one click:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 6 }}>
                  <a
                    href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
                      `Project Inquiry from ${name}`
                    )}&body=${encodeURIComponent(
                      `Name: ${name}\nContact: ${contact}\n\n${message}`
                    )}`}
                    className="btn-primary"
                  >
                    <Mail size={15} />
                    <span>Open in Email Client</span>
                  </a>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <div className="mono-tag" style={{ color: 'var(--accent-rose)' }}>
                  03 · ASYNC PROJECT BRIEF
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                    gap: 12,
                  }}
                >
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mono-tag"
                      style={{
                        display: 'block',
                        marginBottom: 6,
                        color: 'var(--text-muted)',
                      }}
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      className="input-field"
                      placeholder="Tariq Rahman"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-handle"
                      className="mono-tag"
                      style={{
                        display: 'block',
                        marginBottom: 6,
                        color: 'var(--text-muted)',
                      }}
                    >
                      Email or WhatsApp
                    </label>
                    <input
                      id="contact-handle"
                      type="text"
                      required
                      className="input-field"
                      placeholder="you@company.com / +880..."
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mono-tag"
                    style={{
                      display: 'block',
                      marginBottom: 6,
                      color: 'var(--text-muted)',
                    }}
                  >
                    What are we building?
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    required
                    className="input-field"
                    placeholder="Briefly describe your product, website, or engineering role..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={submitting}
                  className="btn-primary"
                  style={{ alignSelf: 'flex-start', marginTop: 4 }}
                >
                  <Send size={15} />
                  <span>
                    {submitting ? 'Dispatching Brief...' : 'Send Project Brief'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Architecture */}
        <footer className="site-footer" role="contentinfo">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 18,
                color: 'var(--text-primary)',
              }}
            >
              KA<span style={{ color: 'var(--accent-crimson)' }}>.</span>
            </span>
            <span>
              Designed &amp; engineered by Koushik Ahmed · Dhaka, Bangladesh.
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="link-action"
              style={{ fontSize: 13 }}
            >
              <span>GitHub</span>
              <ArrowUpRight size={13} />
            </a>
            <a
              href={SITE_CONFIG.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="link-action"
              style={{ fontSize: 13 }}
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={13} />
            </a>
            <a
              href={SITE_CONFIG.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="link-action"
              style={{ fontSize: 13 }}
            >
              <span>Résumé PDF</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="mono-tag">DHAKA {dhakaTime} (GMT+6)</span>
            <button
              type="button"
              className="hud-pill-btn"
              onClick={() => openPalette('commands')}
            >
              <Command size={11} />
              <span>Press ⌘K</span>
            </button>
          </div>
        </footer>
      </div>

      {/* Mobile Sticky Quick-Contact Bar */}
      <div className="mobile-sticky-dock" aria-label="Quick Contact Actions">
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
          style={{ padding: '10px 14px', fontSize: 13 }}
        >
          <MessageCircle size={15} />
          <span>WhatsApp</span>
        </a>
        <button
          type="button"
          onClick={handleCopyEmail}
          className="btn-secondary"
          style={{ padding: '10px 14px', fontSize: 13 }}
        >
          <Mail size={15} />
          <span>{copiedEmail ? 'Copied ✓' : 'Copy Email'}</span>
        </button>
      </div>
    </section>
  );
}
