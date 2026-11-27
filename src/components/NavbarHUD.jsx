import { useState } from 'react';
import {
  Command,
  Menu,
  ScanLine,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SITE_CONFIG } from '../config/siteConfig';

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'Lab', href: '#lab' },
  { label: 'Stack', href: '#stack' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
];

export default function NavbarHUD() {
  const {
    lens,
    setLens,
    xray,
    toggleXray,
    theme,
    toggleTheme,
    soundEnabled,
    toggleSound,
    openPalette,
  } = usePortfolio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="hud-header" role="banner">
      <div className="container">
        <nav
          className="hud-bar"
          aria-label="Primary Navigation"
          data-xray-module="HUD_NAV · DUAL_LENS_CONTEXT"
        >
          {/* Left: Monogram + Pulsing Availability Dot */}
          <a href="#top" className="hud-brand" aria-label="Koushik Ahmed Home">
            <span>
              {SITE_CONFIG.monogram}
              <span className="dot-crimson">.</span>
            </span>
            <span
              className="status-dot"
              title="Available for Roles & Select Client Projects"
            />
          </a>

          {/* Center: Clean Section Links */}
          <div className="hud-nav-links">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="hud-nav-link">
                {item.label}
              </a>
            ))}
          </div>

          {/* Right: Dual-Lens Pill + X-RAY + ⌘K + Theme + Soundwave */}
          <div className="hud-controls">
            <div
              className="lens-switcher"
              role="group"
              aria-label="Visitor Lens Mode"
            >
              <button
                type="button"
                id="lens-engineer-btn"
                className={`lens-btn ${lens === 'engineer' ? 'active' : ''}`}
                onClick={() => setLens('engineer')}
                aria-pressed={lens === 'engineer'}
              >
                Engineer
              </button>
              <button
                type="button"
                id="lens-client-btn"
                className={`lens-btn ${lens === 'client' ? 'active' : ''}`}
                onClick={() => setLens('client')}
                aria-pressed={lens === 'client'}
              >
                Client
              </button>
            </div>

            <button
              type="button"
              id="xray-toggle-btn"
              className={`hud-pill-btn hide-sm ${xray ? 'xray-active' : ''}`}
              onClick={toggleXray}
              aria-pressed={xray}
              title="Toggle X-Ray Architecture Mode (Ctrl/Cmd + X)"
            >
              <ScanLine size={13} />
              <span>X-RAY</span>
            </button>

            <button
              type="button"
              id="cmdk-open-btn"
              className="hud-pill-btn"
              onClick={() => openPalette('commands')}
              title="Open Command Palette & Terminal (Ctrl/Cmd + K)"
            >
              <Command size={12} />
              <span>K</span>
            </button>

            <button
              type="button"
              id="theme-toggle-btn"
              className="hud-icon-btn hide-sm"
              onClick={toggleTheme}
              aria-label={
                theme === 'obsidian'
                  ? 'Switch to Daylight Paper Theme'
                  : 'Switch to Obsidian Telemetry Theme'
              }
              title={
                theme === 'obsidian'
                  ? 'Daylight Paper Theme'
                  : 'Obsidian Dark Theme'
              }
            >
              {theme === 'obsidian' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              type="button"
              id="sound-toggle-btn"
              className={`hud-icon-btn ${soundEnabled ? 'sound-on' : ''}`}
              onClick={toggleSound}
              aria-pressed={soundEnabled}
              aria-label={
                soundEnabled
                  ? 'Mute tactile micro-audio'
                  : 'Enable tactile micro-audio'
              }
              title={
                soundEnabled
                  ? 'Tactile Audio On (Click to Mute)'
                  : 'Tactile Audio Muted (Click to Enable)'
              }
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            <button
              type="button"
              className="hud-icon-btn hud-mobile-toggle"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle Mobile Navigation"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        {/* Compact Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              pointerEvents: 'auto',
              marginTop: 8,
              padding: 16,
              borderRadius: 18,
              background: 'var(--bg-surface-1)',
              border: '1px solid var(--border-strong)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '8px 10px',
                  fontWeight: 600,
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                {item.label}
              </a>
            ))}
            <div style={{ display: 'flex', gap: 8, paddingTop: 6 }}>
              <button
                type="button"
                className={`hud-pill-btn ${xray ? 'xray-active' : ''}`}
                onClick={() => {
                  toggleXray();
                  setMobileMenuOpen(false);
                }}
              >
                <ScanLine size={13} />
                <span>X-RAY MODE</span>
              </button>
              <button
                type="button"
                className="hud-pill-btn"
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
              >
                <span>{theme === 'obsidian' ? 'DAYLIGHT' : 'OBSIDIAN'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
