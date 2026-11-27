import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
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
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: SITE_CONFIG.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    return 'GMT+6';
  }
}

export default function ContactFooter() {
  const { openPalette, telemetry, setCursorLabel, announce } = usePortfolio();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [dhakaTime, setDhakaTime] = useState(getDhakaShortClock);
  const contactSectionRef = useRef(null);

  // Smart Mobile Bottom Bar visibility (§3.5: shows after Hero scrolls out, hides when Contact is in view or keyboard open)
  const [pastHero, setPastHero] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Async 3-field form state with real error fallback (§5 Section 08)
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const id = setInterval(() => setDhakaTime(getDhakaShortClock()), 15000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.65);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    let io;
    if (typeof IntersectionObserver !== 'undefined' && contactSectionRef.current) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0]) setContactInView(entries[0].isIntersecting);
        },
        { threshold: 0.08 }
      );
      io.observe(contactSectionRef.current);
    }

    const onFocusIn = (e) => {
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        setKeyboardOpen(true);
      }
    };
    const onFocusOut = () => {
      setKeyboardOpen(false);
    };

    window.addEventListener('focusin', onFocusIn);
    window.addEventListener('focusout', onFocusOut);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('focusin', onFocusIn);
      window.removeEventListener('focusout', onFocusOut);
      if (io) io.disconnect();
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(SITE_CONFIG.email).catch(() => {});
    soundEngine.playSuccess();
    setCopiedEmail(true);
    announce(`Copied ${SITE_CONFIG.email} to clipboard`);
    setTimeout(() => setCopiedEmail(false), 1600);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !message.trim()) return;
    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, message }),
      });
      if (!res.ok) {
        throw new Error('Edge endpoint returned non-200');
      }
      setSubmitted(true);
      soundEngine.playSuccess();
      announce('Project brief sent');
    } catch {
      setSubmitError(
        'Could not reach the edge form endpoint right now. Send directly via email below in one click:'
      );
      announce('Form submission error; direct email fallback shown');
    } finally {
      setSubmitting(false);
    }
  };

  const showMobileDock = pastHero && !contactInView && !keyboardOpen;

  return (
    <section
      ref={contactSectionRef}
      id="contact"
      className="section-shell"
      style={{ paddingBottom: 0 }}
      data-xray-module="SECTION_08 · CONTACT_DOCK"
    >
      <div className="container">
        <div className="eyebrow-telemetry">
          <span className="index-code">08 //</span>
          <span>START A CONVERSATION</span>
        </div>
        <h2
          className="display-hero"
          style={{ fontSize: 'clamp(2.1rem, 1.3rem + 3.8vw, 4.25rem)' }}
        >
          <span className="copy-desktop-only">
            Have something worth building?{' '}
          </span>
          <span className="copy-mobile-only">Something worth building? </span>
          Let&apos;s <em className="editorial-italic">ship</em> it.
        </h2>

        <div className="contact-grid">
          {/* Left: Direct Tactile Conversion Cards (WhatsApp First on Mobile per §5 Section 08) */}
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
                  minWidth: 0,
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
                  {copiedEmail ? 'COPIED ✓' : '01 · DIRECT EMAIL (CLICK TO COPY)'}
                </span>
                <span
                  className="wrap-anywhere"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 1.8vw, 23px)',
                    fontWeight: 600,
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
                  {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hud-icon-btn"
                  aria-label="Open mail app"
                  title="Open mail app"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="specular-card contact-action-card whatsapp-card-first"
              onMouseMove={handleSpecularMouseMove}
              onMouseEnter={() => setCursorLabel('WHATSAPP')}
              onMouseLeave={() => setCursorLabel('')}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span
                  className="mono-tag"
                  style={{ color: 'var(--accent-emerald)' }}
                >
                  02 · WHATSAPP DIRECT · FASTEST IN DHAKA
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 1.8vw, 23px)',
                    fontWeight: 600,
                  }}
                >
                  Message on WhatsApp
                </span>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                  Direct line for business owners &amp; international founders.
                </span>
              </div>
              <span className="hud-icon-btn" aria-hidden="true">
                <MessageCircle size={16} />
              </span>
            </a>
          </div>

          {/* Right: 3-Field Project Form with Proper Autocomplete & Error Fallback */}
          <div
            className="specular-card"
            style={{ padding: 'clamp(22px, 3vw, 32px)' }}
            onMouseMove={handleSpecularMouseMove}
            data-xray-module="PROJECT_FORM · EDGE_POST"
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
                <span
                  className="mono-tag"
                  style={{ color: 'var(--accent-emerald)' }}
                >
                  SENT ✓
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                >
                  Thanks, {name} — message received.
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
                  I review inquiries daily in Dhaka (GMT+6). You can also open
                  this note directly in your email app if you want a local copy:
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 10,
                    marginTop: 6,
                  }}
                >
                  <a
                    href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
                      `Project Inquiry from ${name}`
                    )}&body=${encodeURIComponent(
                      `Name: ${name}\nContact: ${contact}\n\n${message}`
                    )}`}
                    className="btn-secondary"
                  >
                    <Mail size={15} />
                    <span>Open in Mail App</span>
                  </a>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                  >
                    Send Another
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <div className="mono-tag" style={{ color: 'var(--accent-text)' }}>
                  03 · PROJECT BRIEF FORM
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
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
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
                      name="email"
                      type="text"
                      inputMode="email"
                      autoComplete="email"
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
                    name="message"
                    rows={3}
                    required
                    className="input-field"
                    placeholder="Briefly describe your website, app, or engineering role..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {SITE_CONFIG.turnstileSiteKey && (
                  <div
                    className="cf-turnstile"
                    data-sitekey={SITE_CONFIG.turnstileSiteKey}
                    data-theme="dark"
                  />
                )}

                {submitError && (
                  <div
                    role="alert"
                    style={{
                      padding: 12,
                      borderRadius: 8,
                      background: 'var(--accent-crimson-soft)',
                      border: '1px solid var(--accent-text)',
                      fontSize: 13.5,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <AlertCircle size={15} />
                      <span>{submitError}</span>
                    </span>
                    <a
                      href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
                        `Project Inquiry from ${name}`
                      )}&body=${encodeURIComponent(
                        `Name: ${name}\nContact: ${contact}\n\n${message}`
                      )}`}
                      className="btn-secondary"
                      style={{ alignSelf: 'flex-start', minHeight: 40 }}
                    >
                      <Mail size={14} />
                      <span>Send via Email Instead</span>
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={submitting}
                  className="btn-primary"
                  style={{ alignSelf: 'flex-start', marginTop: 4 }}
                >
                  <Send size={15} />
                  <span>{submitting ? 'Sending...' : 'Send Project Brief'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Architecture (§5 Section 08) */}
        <footer className="site-footer" role="contentinfo">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 18,
                color: 'var(--text-primary)',
              }}
            >
              KA<span style={{ color: 'var(--accent-text)' }}>.</span>
            </span>
            <span>
              Designed &amp; engineered by Koushik Ahmed · Dhaka, Bangladesh
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 18,
            }}
          >
            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="link-action"
              style={{ fontSize: 14 }}
            >
              <span>GitHub</span>
              <ArrowUpRight size={13} />
            </a>
            <a
              href={SITE_CONFIG.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="link-action"
              style={{ fontSize: 14 }}
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={13} />
            </a>
            <a
              href={SITE_CONFIG.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="link-action"
              style={{ fontSize: 14 }}
            >
              <span>Résumé (PDF)</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <span className="mono-tag tabular-nums">
              DHAKA {dhakaTime} GMT+6 · EDGE {telemetry.colo}
              {telemetry.latencyMs !== null ? ` ${telemetry.latencyMs}ms` : ''}
            </span>
            <button
              type="button"
              className="hud-pill-btn"
              onClick={() => openPalette('commands')}
            >
              <span className="copy-desktop-only">
                Press ⌘K / Ctrl K anywhere
              </span>
              <span className="copy-mobile-only">Commands</span>
            </button>
          </div>
        </footer>
      </div>

      {/* Smart Mobile Bottom Contact Bar (§3.5: 52px tall + safe-area, hides in Contact & keyboard) */}
      <div
        className={`mobile-sticky-dock ${showMobileDock ? 'dock-visible' : ''}`}
        aria-label="Quick Contact Actions"
      >
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
          style={{ minHeight: 52, padding: '10px 14px', fontSize: 14 }}
        >
          <MessageCircle size={16} />
          <span>WhatsApp</span>
        </a>
        <a
          href={`mailto:${SITE_CONFIG.email}`}
          className="btn-secondary"
          style={{ minHeight: 52, padding: '10px 14px', fontSize: 14 }}
        >
          <Mail size={16} />
          <span>Email</span>
        </a>
      </div>
    </section>
  );
}
