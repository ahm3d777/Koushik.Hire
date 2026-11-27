import { useEffect, useRef, useState } from 'react';
import {
  Menu,
  MessageCircle,
  Moon,
  ScanLine,
  Search,
  Sun,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/siteConfig';

const NAV_ITEMS = [
  { label: 'Work', href: '#work', code: '03 / WORK', id: 'work' },
  { label: 'Lab', href: '#lab', code: '03 / LAB', id: 'lab' },
  { label: 'Stack', href: '#stack', code: '05 / STACK', id: 'stack' },
  { label: 'Services', href: '#services', code: '06 / SERVICES', id: 'services' },
  { label: 'About', href: '#about', code: '07 / ABOUT', id: 'about' },
];

function detectApplePlatform() {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPhone|iPad|iPod/i.test(
    navigator.platform || navigator.userAgent || ''
  );
}

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
  const [hudHiddenMobile, setHudHiddenMobile] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('');
  const [isApple] = useState(detectApplePlatform);
  const lastScrollY = useRef(0);

  // Hide HUD on scroll down / reveal on scroll up (mobile) + track active section
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 120 && y > lastScrollY.current + 8) {
        setHudHiddenMobile(true);
      } else if (y < lastScrollY.current - 6 || y <= 80) {
        setHudHiddenMobile(false);
      }
      lastScrollY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.05 }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const activeMobileCode =
    NAV_ITEMS.find((n) => n.id === activeSectionId)?.code || 'MENU';

  return (
    <header
      className={`hud-header ${
        hudHiddenMobile && !mobileMenuOpen ? 'hud-hidden-mobile' : ''
      }`}
      role="banner"
    >
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

          {/* Center: Clean Section Links with Active Underline */}
          <div className="hud-nav-links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`hud-nav-link ${
                  activeSectionId === item.id ? 'active' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right: Dual-Lens Pill + X-RAY (X key) + Platform-Aware ⌘K / Ctrl K + Sound + Mobile Menu */}
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
                <span className="lens-label-full">Engineering</span>
                <span className="lens-label-short">Eng</span>
              </button>
              <button
                type="button"
                id="lens-client-btn"
                className={`lens-btn ${lens === 'client' ? 'active' : ''}`}
                onClick={() => setLens('client')}
                aria-pressed={lens === 'client'}
              >
                <span>Client</span>
              </button>
            </div>

            <button
              type="button"
              id="xray-toggle-btn"
              className={`hud-pill-btn hide-sm ${xray ? 'xray-active' : ''}`}
              onClick={toggleXray}
              aria-pressed={xray}
              title="Toggle X-Ray Architecture Mode (Press X)"
            >
              <ScanLine size={13} />
              <span>X-RAY</span>
            </button>

            <button
              type="button"
              id="cmdk-open-btn"
              className="hud-pill-btn hide-sm"
              onClick={() => openPalette('commands')}
              title="Open Command Palette (/ or Cmd/Ctrl + K)"
            >
              <span>{isApple ? '⌘K' : 'Ctrl K'}</span>
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
            >
              {theme === 'obsidian' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              type="button"
              id="sound-toggle-btn"
              className={`hud-icon-btn hide-sm ${
                soundEnabled ? 'sound-on' : ''
              }`}
              onClick={toggleSound}
              aria-pressed={soundEnabled}
              aria-label={
                soundEnabled
                  ? 'Mute tactile micro-audio'
                  : 'Enable tactile micro-audio'
              }
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            <button
              type="button"
              className="hud-pill-btn hud-mobile-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={14} />
              <span>{activeMobileCode}</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Full-Screen Mobile Menu Sheet (§3.5) */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation Menu"
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span className="hud-brand">
              {SITE_CONFIG.monogram}
              <span className="dot-crimson">.</span>
            </span>
            <button
              type="button"
              className="hud-icon-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X size={18} />
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              margin: '24px 0',
            }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '14px 4px',
                  fontFamily: 'var(--font-display)',
                  fontSize: 26,
                  fontWeight: 600,
                  borderBottom: 'var(--hairline) solid var(--border-seam)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{item.label}</span>
                <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>
                  {item.code.split(' ')[0]}
                </span>
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <button
                type="button"
                className="hud-pill-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openPalette('commands');
                }}
              >
                <Search size={13} />
                <span>Search / Commands</span>
              </button>
              <button
                type="button"
                className={`hud-pill-btn ${xray ? 'xray-active' : ''}`}
                onClick={() => {
                  toggleXray();
                  setMobileMenuOpen(false);
                }}
              >
                <ScanLine size={13} />
                <span>X-Ray</span>
              </button>
              <button
                type="button"
                className="hud-pill-btn"
                onClick={() => toggleTheme()}
              >
                {theme === 'obsidian' ? <Sun size={13} /> : <Moon size={13} />}
                <span>{theme === 'obsidian' ? 'Daylight' : 'Obsidian'}</span>
              </button>
              <button
                type="button"
                className="hud-pill-btn"
                onClick={() => toggleSound()}
              >
                {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                <span>{soundEnabled ? 'Sound On' : 'Muted'}</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="btn-secondary">
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
