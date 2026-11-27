import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, FileText, MessageCircle } from 'lucide-react';
import { HERO_COPY } from '../data/portfolioData';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/siteConfig';
import { usePortfolio } from '../context/PortfolioContext';
import { useScrambleText } from '../utils/scrambleText';

const SpatialDeviceForge = lazy(() => import('./SpatialDeviceForge'));

function getDhakaAndVisitorClocks() {
  const now = new Date();
  let dhaka;
  let visitorNote = '';
  try {
    dhaka = new Intl.DateTimeFormat('en-GB', {
      timeZone: SITE_CONFIG.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now);

    // Compute hour offset between visitor local timezone and Dhaka (UTC+6 = -360 min getTimezoneOffset)
    const visitorUtcHours = -now.getTimezoneOffset() / 60;
    const diffHours = Math.round((visitorUtcHours - 6) * 2) / 2;
    if (Math.abs(diffHours) >= 0.5) {
      const localClock = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now);
      const absH = Math.abs(diffHours);
      visitorNote = `Your time ${localClock} · ${absH}h ${
        diffHours < 0 ? 'behind' : 'ahead of'
      } Dhaka`;
    }
  } catch {
    dhaka = 'LIVE';
  }
  return { dhaka, visitorNote };
}

export default function HeroSection() {
  const { lens, toggleXray, telemetry, setCursorLabel } = usePortfolio();
  const [clocks, setClocks] = useState(getDhakaAndVisitorClocks);
  const heroRef = useRef(null);

  const activeCopy = HERO_COPY[lens];
  const scrambledPrefix = useScrambleText(activeCopy.headlinePrefix, 250);
  const scrambledItalic = useScrambleText(activeCopy.headlineItalic, 250);

  useEffect(() => {
    const timer = setInterval(() => {
      setClocks(getDhakaAndVisitorClocks());
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleHeroPointerMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    heroRef.current.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    heroRef.current.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={heroRef}
      id="top"
      className="hero-section"
      onPointerMove={handleHeroPointerMove}
      data-xray-module="SECTION_01 · KINETIC_HERO"
    >
      {/* Performance-safe static CSS dotted grid + fine-pointer cursor spotlight */}
      <div className="hero-grid-underlay" aria-hidden="true" />
      <div className="hero-grid-spotlight" aria-hidden="true" />

      <div className="container">
        <div className="hero-grid">
          {/* Left 7/12 Narrative Column */}
          <div className="hero-copy-col">
            <div className="eyebrow-telemetry">
              <span className="copy-desktop-only">
                <span className="index-code">01 //</span>{' '}
                {HERO_COPY.eyebrowDesktop.replace('01 // ', '')}
              </span>
              <span className="copy-mobile-only">{HERO_COPY.eyebrowMobile}</span>
            </div>

            {/* Zero-CLS Stacked Grid Headline (§4.3) */}
            <div className="lens-stack-grid" style={{ width: '100%' }}>
              <h1 className="display-hero" id="hero-headline">
                {scrambledPrefix}
                <em className="editorial-italic">{scrambledItalic}</em>
                {activeCopy.headlineSuffix}
              </h1>
              {/* Hidden shadow sizer guarantees taller lens variant reserves constant height */}
              <div
                className="display-hero lens-variant-hidden"
                aria-hidden="true"
              >
                {HERO_COPY.engineer.headlinePrefix}
                <em className="editorial-italic">
                  {HERO_COPY.engineer.headlineItalic}
                </em>
                {HERO_COPY.engineer.headlineSuffix}
              </div>
              <div
                className="display-hero lens-variant-hidden"
                aria-hidden="true"
              >
                {HERO_COPY.client.headlinePrefix}
                <em className="editorial-italic">
                  {HERO_COPY.client.headlineItalic}
                </em>
                {HERO_COPY.client.headlineSuffix}
              </div>
            </div>

            {/* Zero-CLS Stacked Grid Subheadline with <480px concise mobile variant */}
            <div
              className="lens-stack-grid"
              style={{ marginTop: 20, width: '100%' }}
            >
              <div id="hero-subheadline">
                <p className="lead-copy hero-measure copy-desktop-only">
                  {activeCopy.subheadlineDesktop}
                </p>
                <p className="lead-copy hero-measure copy-mobile-only">
                  {activeCopy.subheadlineMobile}
                </p>
              </div>
              <div className="lens-variant-hidden" aria-hidden="true">
                <p className="lead-copy hero-measure copy-desktop-only">
                  {HERO_COPY.engineer.subheadlineDesktop}
                </p>
                <p className="lead-copy hero-measure copy-mobile-only">
                  {HERO_COPY.engineer.subheadlineMobile}
                </p>
              </div>
              <div className="lens-variant-hidden" aria-hidden="true">
                <p className="lead-copy hero-measure copy-desktop-only">
                  {HERO_COPY.client.subheadlineDesktop}
                </p>
                <p className="lead-copy hero-measure copy-mobile-only">
                  {HERO_COPY.client.subheadlineMobile}
                </p>
              </div>
            </div>

            {/* Single Primary Crimson CTA + Ghost Secondary CTA + Desktop X-Ray Hint */}
            <div className="hero-cta-row">
              <a
                href={activeCopy.primaryTarget}
                id="hero-primary-cta"
                className="btn-primary"
                onMouseEnter={() => setCursorLabel('EXPLORE')}
                onMouseLeave={() => setCursorLabel('')}
              >
                <span>{activeCopy.primaryCta}</span>
              </a>

              {activeCopy.secondaryAction === 'resume' ? (
                <a
                  href={SITE_CONFIG.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  id="hero-secondary-resume-btn"
                  className="btn-secondary"
                >
                  <FileText size={16} />
                  <span>{activeCopy.secondaryCta}</span>
                </a>
              ) : (
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  id="hero-secondary-whatsapp-btn"
                  className="btn-secondary"
                  onMouseEnter={() => setCursorLabel('WHATSAPP')}
                  onMouseLeave={() => setCursorLabel('')}
                >
                  <MessageCircle size={16} />
                  <span>{activeCopy.secondaryCta}</span>
                  <ArrowUpRight size={15} />
                </a>
              )}

              {activeCopy.tertiaryHint && (
                <button
                  type="button"
                  onClick={toggleXray}
                  className="copy-desktop-only mono-tag"
                  style={{
                    color: 'var(--text-muted)',
                    padding: '8px 6px',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                  }}
                >
                  {activeCopy.tertiaryHint}
                </button>
              )}
            </div>

            {/* Dhaka Pulse Telemetry Capsule (§4.5: tabular numerals + visitor timezone diff) */}
            <div
              className="dhaka-pulse-capsule tabular-nums"
              data-xray-module="EDGE_TELEMETRY · DHAKA_PULSE"
            >
              <span className="status-dot" />
              <span>AVAILABLE</span>
              <span className="sep">·</span>
              <span>DHAKA {clocks.dhaka} GMT+6</span>
              <span className="sep copy-desktop-only">·</span>
              <span className="edge-readout copy-desktop-only">
                EDGE {telemetry.colo}
                {telemetry.latencyMs !== null
                  ? ` · ${telemetry.latencyMs}ms`
                  : ''}
              </span>
              {clocks.visitorNote && (
                <>
                  <span className="sep">·</span>
                  <span style={{ textTransform: 'none', color: 'var(--text-muted)' }}>
                    {clocks.visitorNote}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Right 5/12 3D Obsidian Monolith / Responsive Poster Stage */}
          <div
            className="hero-stage-col"
            data-xray-module="HERO_CANVAS · WebGL2 · 60 FPS"
          >
            <Suspense
              fallback={
                <img
                  src={SITE_CONFIG.monolithPoster}
                  alt="Bevelled 3D obsidian monolith with crimson rim light"
                  width="640"
                  height="800"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              }
            >
              <SpatialDeviceForge
                mode="monolith"
                captionLeft="STAGE 01 // OBSIDIAN MONOLITH"
                captionRight="DRAG TO ORBIT · MAX 8° TILT"
                ariaDescription="Interactive 3D bevelled obsidian monolith with crimson rim light"
              />
            </Suspense>
          </div>
        </div>

        {/* Hero Bottom Telemetry Strip (3 Crisp Signals; Scroll-Snap Chips on Mobile) */}
        <div
          className="hero-telemetry-strip"
          data-xray-module="TELEMETRY_STRIP · 3_SIGNALS"
        >
          {HERO_COPY.telemetryStrip.map((item) => (
            <div key={item.label} className="telemetry-strip-item">
              <span className="telemetry-strip-label">{item.label}</span>
              <span className="telemetry-strip-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
