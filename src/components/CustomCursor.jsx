import { useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

function detectFineHoverSupport() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Contextual Desktop Cursor (§6.3):
 * 8px Alabaster dot + 32px lagging hairline ring.
 * Disabled on touch, reduced motion, when X-Ray Mode is active, and hidden over text inputs.
 */
export default function CustomCursor() {
  const { cursorLabel, xray, reducedMotion } = usePortfolio();
  const [fineSupported] = useState(detectFineHoverSupport);
  const [overInput, setOverInput] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const active = fineSupported && !xray && !reducedMotion;

  useEffect(() => {
    if (!active) return undefined;

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = null;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      const tag = e.target?.tagName;
      const isTextControl =
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        e.target?.isContentEditable;
      setOverInput(Boolean(isTextControl));

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
    };

    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ringRef.current) {
        const w = ringRef.current.offsetWidth || 32;
        const h = ringRef.current.offsetHeight || 32;
        ringRef.current.style.transform = `translate3d(${ringX - w / 2}px, ${
          ringY - h / 2
        }px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [active]);

  if (!active || overInput) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${cursorLabel ? 'has-label' : ''}`}
        aria-hidden="true"
      >
        {cursorLabel}
      </div>
    </>
  );
}
