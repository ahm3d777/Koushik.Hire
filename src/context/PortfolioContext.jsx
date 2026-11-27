/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

const PortfolioContext = createContext(null);

function readInitialLens() {
  if (typeof window === 'undefined') return 'engineer';
  try {
    const params = new URLSearchParams(window.location.search);
    const urlLens = params.get('lens');
    if (urlLens === 'client' || urlLens === 'engineer') {
      window.localStorage?.setItem('ka_lens', urlLens);
      return urlLens;
    }
    const stored = window.localStorage?.getItem('ka_lens');
    if (stored === 'client' || stored === 'engineer') {
      return stored;
    }
  } catch {
    // Fail silently if storage is restricted
  }
  return 'engineer';
}

function readInitialTheme() {
  if (typeof window === 'undefined') return 'obsidian';
  try {
    const stored = window.localStorage?.getItem('ka_theme');
    if (stored === 'obsidian' || stored === 'daylight') return stored;
  } catch {
    // Ignore storage errors
  }
  return 'obsidian';
}

function readInitialCaseStudyFromPath() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/work\/([a-z0-9-]+)\/?$/i);
  if (!match) return null;
  return PROJECTS.find((p) => p.id === match[1]) || null;
}

function readInitialReducedMotion() {
  if (typeof window === 'undefined') return false;
  try {
    if (window.localStorage?.getItem('ka_reduced_motion') === 'true') {
      return true;
    }
  } catch {
    // Ignore
  }
  return Boolean(
    window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function PortfolioProvider({ children }) {
  const [lens, setLensState] = useState(readInitialLens);
  const [xray, setXray] = useState(false);
  const [scanPulse, setScanPulse] = useState(0);
  const [theme, setThemeState] = useState(readInitialTheme);
  const [reducedMotion, setReducedMotion] = useState(readInitialReducedMotion);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteTab, setPaletteTab] = useState('commands');
  const [activeProjectId, setActiveProjectId] = useState('fitness-factory');
  const [activeCaseStudy, setActiveCaseStudyState] = useState(
    readInitialCaseStudyFromPath
  );
  const [shoktiModalOpen, setShoktiModalOpen] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [telemetry, setTelemetry] = useState({
    colo: 'EDGE',
    latencyMs: null,
    runtime: 'Cloudflare Edge',
    country: '',
  });

  // Sync theme, X-Ray, and manual reduced-motion attributes to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-xray', xray ? 'true' : 'false');
  }, [xray]);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-reduced-motion',
      reducedMotion ? 'true' : 'false'
    );
  }, [reducedMotion]);

  // Dynamic <title> per route (§9.4)
  useEffect(() => {
    if (activeCaseStudy) {
      document.title = `${activeCaseStudy.title} — Case Study · Koushik Ahmed`;
    } else {
      document.title =
        'Koushik Ahmed — Full-Stack Web, Mobile & Edge Engineer';
    }
  }, [activeCaseStudy]);

  // Sync browser Back/Forward for /work/<slug> and ?lens=
  useEffect(() => {
    const onPopState = () => {
      setActiveCaseStudyState(readInitialCaseStudyFromPath());
      setLensState(readInitialLens());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Measure live honest Edge Telemetry RTT from /api/edge
  useEffect(() => {
    let cancelled = false;
    async function fetchTelemetry() {
      const t0 = performance.now();
      try {
        const res = await fetch('/api/edge', { cache: 'no-store' });
        if (!res.ok) throw new Error('Non-200');
        const json = await res.json();
        const rtt = Math.max(2, Math.round(performance.now() - t0));
        if (!cancelled && json && json.ok) {
          setTelemetry({
            colo: json.colo || 'EDGE',
            latencyMs: rtt,
            runtime: json.runtime || 'Cloudflare Edge',
            country: json.country || '',
          });
        }
      } catch {
        const rtt = Math.max(4, Math.round(performance.now() - t0));
        if (!cancelled) {
          setTelemetry({
            colo: 'EDGE',
            latencyMs: rtt,
            runtime: 'Edge',
            country: '',
          });
        }
      }
    }
    fetchTelemetry();
    return () => {
      cancelled = true;
    };
  }, []);

  const announce = useCallback((msg) => {
    setAnnouncement(msg);
  }, []);

  const setLens = useCallback((nextLens) => {
    setLensState((prev) => {
      const resolved =
        typeof nextLens === 'function' ? nextLens(prev) : nextLens;
      if (resolved !== prev) {
        soundEngine.playClick(580, 0.028);
        try {
          window.localStorage?.setItem('ka_lens', resolved);
          const url = new URL(window.location.href);
          if (resolved === 'client') {
            url.searchParams.set('lens', 'client');
          } else {
            url.searchParams.delete('lens');
          }
          window.history.replaceState({}, '', url.toString());
        } catch {
          // Ignore URL/storage errors in sandboxed frames
        }
        setAnnouncement(
          resolved === 'client'
            ? 'Switched to Client Mode'
            : 'Switched to Engineering Mode'
        );
      }
      return resolved;
    });
  }, []);

  const setActiveCaseStudy = useCallback((projectOrNull) => {
    const applyChange = () => {
      setActiveCaseStudyState(projectOrNull);
      try {
        const url = new URL(window.location.href);
        url.pathname = projectOrNull ? `/work/${projectOrNull.id}` : '/';
        window.history.pushState({}, '', url.toString());
      } catch {
        // Ignore history errors in restricted test environments
      }
    };

    if (
      typeof document !== 'undefined' &&
      document.startViewTransition &&
      !reducedMotion
    ) {
      document.startViewTransition(applyChange);
    } else {
      applyChange();
    }
  }, [reducedMotion]);

  const toggleXray = useCallback(() => {
    setXray((prev) => {
      const next = !prev;
      soundEngine.playXRaySweep(next);
      if (!reducedMotion) {
        setScanPulse((n) => n + 1);
      }
      setAnnouncement(next ? 'X-Ray mode on' : 'X-Ray mode off');
      return next;
    });
  }, [reducedMotion]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'obsidian' ? 'daylight' : 'obsidian';
      soundEngine.playClick(620, 0.028);
      try {
        window.localStorage?.setItem('ka_theme', next);
      } catch {
        // Ignore
      }
      setAnnouncement(
        next === 'daylight'
          ? 'Daylight Paper theme activated'
          : 'Obsidian dark theme activated'
      );
      return next;
    });
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setReducedMotion((prev) => {
      const next = !prev;
      try {
        window.localStorage?.setItem('ka_reduced_motion', String(next));
      } catch {
        // Ignore
      }
      setAnnouncement(next ? 'Reduced motion enabled' : 'Reduced motion disabled');
      return next;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundEngine.setEnabled(next);
      setAnnouncement(next ? 'Tactile audio enabled' : 'Tactile audio muted');
      return next;
    });
  }, []);

  const openPalette = useCallback((tab = 'commands') => {
    soundEngine.playClick(700, 0.024);
    setPaletteTab(tab);
    setPaletteOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setPaletteOpen(false);
  }, []);

  const value = {
    lens,
    setLens,
    xray,
    toggleXray,
    scanPulse,
    theme,
    toggleTheme,
    reducedMotion,
    toggleReducedMotion,
    soundEnabled,
    toggleSound,
    paletteOpen,
    paletteTab,
    setPaletteTab,
    openPalette,
    closePalette,
    activeProjectId,
    setActiveProjectId,
    activeCaseStudy,
    setActiveCaseStudy,
    shoktiModalOpen,
    setShoktiModalOpen,
    cursorLabel,
    setCursorLabel,
    telemetry,
    announcement,
    announce,
  };

  return (
    <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used inside PortfolioProvider');
  }
  return ctx;
}
