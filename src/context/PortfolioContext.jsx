/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { soundEngine } from '../utils/soundEngine';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [lens, setLensState] = useState('engineer'); // 'engineer' | 'client'
  const [xray, setXray] = useState(false);
  const [scanPulse, setScanPulse] = useState(0);
  const [theme, setThemeState] = useState('obsidian'); // 'obsidian' | 'daylight'
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteTab, setPaletteTab] = useState('commands'); // 'commands' | 'terminal'
  const [activeProjectId, setActiveProjectId] = useState('fitness-factory');
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [shoktiModalOpen, setShoktiModalOpen] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const [telemetry, setTelemetry] = useState({
    colo: 'DAC',
    latencyMs: 24,
    runtime: 'Cloudflare Edge',
    country: 'BD',
  });

  // Sync theme attribute to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sync X-Ray attribute to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-xray', xray ? 'true' : 'false');
  }, [xray]);

  // Measure live Edge Telemetry RTT on mount
  useEffect(() => {
    let cancelled = false;
    async function fetchTelemetry() {
      const t0 = performance.now();
      try {
        const res = await fetch('/api/telemetry', { cache: 'no-store' });
        if (!res.ok) throw new Error('Non-200');
        const json = await res.json();
        const rtt = Math.max(2, Math.round(performance.now() - t0));
        if (!cancelled && json && json.ok) {
          setTelemetry({
            colo: json.colo || 'DAC',
            latencyMs: rtt,
            runtime: json.runtime || 'Cloudflare Edge',
            country: json.country || 'BD',
          });
        }
      } catch {
        const rtt = Math.max(4, Math.round(performance.now() - t0));
        if (!cancelled) {
          setTelemetry({
            colo: 'DAC',
            latencyMs: rtt,
            runtime: 'Edge PoP',
            country: 'BD',
          });
        }
      }
    }
    fetchTelemetry();
    return () => {
      cancelled = true;
    };
  }, []);

  const setLens = useCallback((nextLens) => {
    setLensState((prev) => {
      const resolved = typeof nextLens === 'function' ? nextLens(prev) : nextLens;
      if (resolved !== prev) {
        soundEngine.playClick(580, 0.028);
      }
      return resolved;
    });
  }, []);

  const toggleXray = useCallback(() => {
    setXray((prev) => {
      const next = !prev;
      soundEngine.playXRaySweep(next);
      setScanPulse((n) => n + 1);
      return next;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'obsidian' ? 'daylight' : 'obsidian';
      soundEngine.playClick(620, 0.028);
      return next;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundEngine.setEnabled(next);
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
