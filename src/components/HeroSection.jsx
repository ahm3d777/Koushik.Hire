import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, FileText, MessageCircle, ScanLine } from 'lucide-react';
import { HERO_COPY } from '../data/portfolioData';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/siteConfig';
import { usePortfolio } from '../context/PortfolioContext';
import { useScrambleText } from '../utils/scrambleText';

const SpatialDeviceForge = lazy(() => import('./SpatialDeviceForge'));

function formatDhakaTime() {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: SITE_CONFIG.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(new Date());
  } catch {
    return 'GMT+6 LIVE';
  }
}

export default function HeroSection() {
  const { lens, xray, toggleXray, telemetry, setCursorLabel } = usePortfolio();
  const [dhakaClock, setDhakaClock] = useState(() => formatDhakaTime());
  const coordCanvasRef = useRef(null);

  const activeCopy = HERO_COPY[lens];
  const scrambledPrefix = useScrambleText(activeCopy.headlinePrefix, 240);
  const scrambledItalic = useScrambleText(activeCopy.headlineItalic, 240);
  const scrambledCta = useScrambleText(activeCopy.primaryCta, 200);

  // Live Dhaka GMT+6 Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setDhakaClock(formatDhakaTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Architectural 64px Coordinate Dot Field with Cursor Radial Gravity + X-Ray Highlight
  useEffect(() => {
    const canvas = coordCanvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let width = (canvas.width = canvas.parentElement.clientWidth || 1280);
    let height = (canvas.height = canvas.parentElement.clientHeight || 800);
    let mouseX = -9999;
    let mouseY = -9999;
    let rafId = null;

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const spacing = 64;
      const isXray = document.documentElement.getAttribute('data-xray') === 'true';
      const isLight =
        document.documentElement.getAttribute('data-theme') === 'daylight';

      for (let x = 32; x < width; x += spacing) {
        for (let y = 32; y < height; y += spacing) {
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.hypot(dx, dy);
          const radius = 190;
          let ox = x;
          let oy = y;

          if (dist < radius && dist > 1) {
            const pull = (1 - dist / radius) * 9;
            ox += (dx / dist) * pull;
            oy += (dy / dist) * pull;
          }

          ctx.beginPath();
          ctx.arc(ox, oy, isXray ? 1.8 : 1.15, 0, Math.PI * 2);
          if (isXray) {
            ctx.fillStyle =
              dist < radius
                ? 'rgba(34, 211, 238, 0.85)'
                : 'rgba(34, 211, 238, 0.34)';
          } else if (isLight) {
            ctx.fillStyle =
              dist < radius
                ? 'rgba(190, 18, 60, 0.45)'
                : 'rgba(17, 17, 21, 0.14)';
          } else {
            ctx.fillStyle =
              dist < radius
                ? 'rgba(225, 29, 72, 0.6)'
                : 'rgba(244, 244, 246, 0.13)';
          }
          ctx.fill();
        }
      }
      rafId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [xray]);

  return (
    <section
      id="top"
      className="hero-section"
      data-xray-module="SECTION_01 · KINETIC_HERO"
    >
      <canvas ref={coordCanvasRef} className="hero-coord-canvas" aria-hidden="true" />

      <div className="container">
        <div className="hero-grid">
          {/* Left Narrative Column */}
          <div className="hero-copy-col">
            <div className="eyebrow-telemetry">
              <span className="index-code">01 //</span>
              <span>KOUSHIK AHMED · DHAKA, BD (GMT+6)</span>
            </div>

            <h1 className="display-hero" id="hero-headline">
              <span className="hero-line-mask">
                <span className="hero-line-inner">
                  {scrambledPrefix}
                  <em className="editorial-italic">{scrambledItalic}</em>
                  {activeCopy.headlineSuffix}
                </span>
              </span>
            </h1>

            <p
              className="lead-copy"
              style={{ marginTop: 22 }}
              id="hero-subheadline"
            >
              {activeCopy.subheadline}
            </p>

            <div className="hero-cta-row">
              <a
                href={activeCopy.primaryTarget}
                id="hero-primary-cta"
                className="btn-primary"
                onMouseEnter={() => setCursorLabel('EXPLORE')}
                onMouseLeave={() => setCursorLabel('')}
              >
                <span>{scrambledCta}</span>
              </a>

              {activeCopy.secondaryAction === 'xray' ? (
                <>
                  <button
                    type="button"
                    id="hero-secondary-xray-btn"
                    className="btn-secondary"
                    onClick={toggleXray}
                    onMouseEnter={() => setCursorLabel('INSPECT')}
                    onMouseLeave={() => setCursorLabel('')}
                  >
                    <ScanLine size={16} />
                    <span>
                      {xray ? 'Exit X-Ray Mode' : activeCopy.secondaryCta}
                    </span>
                  </button>
                  <a
                    href={SITE_CONFIG.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    <FileText size={16} />
                    <span>Résumé</span>
                  </a>
                </>
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
            </div>

            {/* Live Dhaka Pulse Edge Telemetry Capsule */}
            <div
              className="dhaka-pulse-capsule"
              style={{ marginTop: 28, marginBottom: 0 }}
              data-xray-module="EDGE_TELEMETRY · LIVE_POP"
            >
              <span className="status-dot" />
              <span>AVAILABLE FOR PROJECTS &amp; ROLES</span>
              <span className="sep">·</span>
              <span>DHAKA · GMT+6 · {dhakaClock}</span>
              <span className="sep">·</span>
              <span className="edge-readout">
                CONNECTED VIA {telemetry.colo} · {telemetry.latencyMs}ms
              </span>
            </div>
          </div>

          {/* Right 3D Spatial Device Forge Stage */}
          <div
            className="hero-stage-col"
            data-xray-module="HERO_CANVAS · WebGL2 · 60 FPS"
          >
            <Suspense
              fallback={
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--text-muted)',
                  }}
                >
                  HYDRATING 3D MONOLITH STAGE...
                </div>
              }
            >
              <SpatialDeviceForge
                mode="monolith"
                captionLeft="STAGE 01 // OBSIDIAN MONOLITH"
                captionRight="DRAG TO ORBIT · CURSOR TILT"
              />
            </Suspense>
          </div>
        </div>

        {/* Hero Bottom Telemetry Strip (3 Crisp Micro-Signals) */}
        <div
          className="hero-telemetry-strip"
          data-xray-module="TELEMETRY_STRIP · 3_SIGNALS"
        >
          {HERO_COPY.telemetryStrip.map((item) => (
            <div key={item.label} className="telemetry-strip-item">
              <span className="telemetry-strip-label">{item.label}:</span>
              <span className="telemetry-strip-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
