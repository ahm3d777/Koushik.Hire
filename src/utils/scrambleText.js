import { useEffect, useRef, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789//·';

/**
 * Crisp 250ms kinetic text-scramble hook for Dual-Lens headline transitions.
 * Respects both OS `prefers-reduced-motion` and manual `[data-reduced-motion="true"]`.
 */
export function useScrambleText(targetText, durationMs = 250) {
  const [display, setDisplay] = useState(targetText);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return undefined;
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      ((window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
        document.documentElement.getAttribute('data-reduced-motion') === 'true');

    let rafId = null;
    const start = performance.now();
    const len = targetText.length;

    const tick = (now) => {
      if (prefersReduced) {
        setDisplay(targetText);
        return;
      }

      const progress = Math.min(1, (now - start) / durationMs);
      const settledCount = Math.floor(progress * len);
      let out = '';

      for (let i = 0; i < len; i++) {
        const ch = targetText[i];
        if (i < settledCount || ch === ' ' || ch === '\n') {
          out += ch;
        } else {
          out += GLYPHS[(i + Math.floor(now / 28)) % GLYPHS.length];
        }
      }

      setDisplay(out);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplay(targetText);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [targetText, durationMs]);

  return display;
}

/**
 * Writes cursor coordinates to CSS variables once per pointer move on fine-pointer devices.
 */
export function handleSpecularMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
}
