import { useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

function detectFineCursorSupport() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  return finePointer && !reducedMotion;
}

/**
 * Contextual Desktop Cursor — 7px Alabaster dot + lagging precision ring with monospace micro-labels.
 * Automatically disabled on touch / coarse pointer devices and reduced-motion setups.
 */
export default function CustomCursor() {
  const { cursorLabel } = usePortfolio();
  const [enabled] = useState(detectFineCursorSupport);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = null;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
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
  }, [enabled]);

  if (!enabled) return null;

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
