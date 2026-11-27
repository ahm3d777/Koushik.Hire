import { useEffect, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * XRayOverlay — 350ms cyan scanline sweep + honest live FPS/Viewport/Scroll/Edge HUD (§4.1)
 */
export default function XRayOverlay() {
  const { xray, scanPulse, telemetry, lens } = usePortfolio();
  const [fps, setFps] = useState(60);
  const [viewport, setViewport] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 1440,
    h: typeof window !== 'undefined' ? window.innerHeight : 900,
  });
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    if (!xray) return undefined;

    let frames = 0;
    let lastStamp = performance.now();
    let rafId = null;

    const measureFps = (now) => {
      frames += 1;
      if (now - lastStamp >= 500) {
        setFps(Math.min(144, Math.round((frames * 1000) / (now - lastStamp))));
        frames = 0;
        lastStamp = now;
      }
      rafId = requestAnimationFrame(measureFps);
    };
    rafId = requestAnimationFrame(measureFps);

    const handleResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };

    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        docHeight > 0 ? Math.round((window.scrollY / docHeight) * 100) : 0;
      setScrollPct(Math.max(0, Math.min(100, pct)));
    };

    handleScroll();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [xray]);

  return (
    <>
      {scanPulse > 0 && (
        <div key={scanPulse} className="xray-scanline" aria-hidden="true" />
      )}
      {xray && (
        <aside className="xray-perf-hud" aria-hidden="true">
          <div style={{ fontWeight: 600, marginBottom: 4, color: '#ffffff' }}>
            // X-RAY ARCHITECTURE HUD
          </div>
          <div>
            FPS: {fps} · VIEWPORT: {viewport.w}×{viewport.h}px · SCROLL:{' '}
            {scrollPct}%
          </div>
          <div>
            STATE: lens={lens} · EDGE: CF colo={telemetry.colo}
            {telemetry.latencyMs !== null ? ` · ${telemetry.latencyMs}ms` : ''}
          </div>
        </aside>
      )}
    </>
  );
}
