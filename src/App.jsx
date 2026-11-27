import { useEffect } from 'react';
import Lenis from 'lenis';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import NavbarHUD from './components/NavbarHUD';
import HeroSection from './components/HeroSection';
import PillarsSection from './components/PillarsSection';
import WorkSection from './components/WorkSection';
import MediaLabSection from './components/MediaLabSection';
import SystemsMatrixSection from './components/SystemsMatrixSection';
import ServicesEstimatorSection from './components/ServicesEstimatorSection';
import AboutSection from './components/AboutSection';
import ContactFooter from './components/ContactFooter';
import CommandPalette from './components/CommandPalette';
import CaseStudyModal from './components/CaseStudyModal';
import XRayOverlay from './components/XRayOverlay';
import CustomCursor from './components/CustomCursor';

function PortfolioShell() {
  const {
    paletteOpen,
    openPalette,
    closePalette,
    toggleXray,
    reducedMotion,
    activeCaseStudy,
    shoktiModalOpen,
    announcement,
  } = usePortfolio();

  // v2 §3.4: Lenis runs ONLY on fine-pointer devices and when reduced-motion is off
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia || reducedMotion) {
      return undefined;
    }
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return undefined;

    let lenis;
    let rafId = null;
    try {
      lenis = new Lenis({
        duration: 1.0,
        smoothWheel: true,
      });

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    } catch {
      // Fallback to native browser scroll
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, [reducedMotion]);

  // v2 §0.1 #1 & §4.4 Keyboard Shortcuts:
  // - Cmd/Ctrl + K or `/` (outside inputs) -> Command Palette
  // - Single-key `X` (NO Cmd/Ctrl modifier, so OS Cut is never hijacked!) -> X-Ray Mode
  useEffect(() => {
    const isTypingTarget = (el) => {
      if (!el) return false;
      const tag = el.tagName;
      return (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        el.isContentEditable
      );
    };

    const handleKeyDown = (e) => {
      const isMod = e.metaKey || e.ctrlKey;
      const key = e.key.toLowerCase();

      if (isMod && key === 'k') {
        e.preventDefault();
        if (paletteOpen) closePalette();
        else openPalette('commands');
        return;
      }

      if (e.key === 'Escape' && paletteOpen) {
        closePalette();
        return;
      }

      // Never intercept unmodified keys while typing in a form input or with Ctrl/Cmd/Alt held
      if (isMod || e.altKey || isTypingTarget(document.activeElement)) {
        return;
      }

      if (key === 'x' && !paletteOpen) {
        e.preventDefault();
        toggleXray();
      } else if (e.key === '/' && !paletteOpen) {
        e.preventDefault();
        openPalette('commands');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paletteOpen, openPalette, closePalette, toggleXray]);

  useEffect(() => {
    const anyModal = Boolean(paletteOpen || activeCaseStudy || shoktiModalOpen);
    document.body.style.overflow = anyModal ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [paletteOpen, activeCaseStudy, shoktiModalOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Screen-Reader Polite Live Region (§9.2) */}
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>

      <div className="film-grain" aria-hidden="true" />
      <CustomCursor />
      <XRayOverlay />
      <NavbarHUD />

      <main id="main-content">
        <HeroSection />
        <PillarsSection />
        <WorkSection />
        <MediaLabSection />
        <SystemsMatrixSection />
        <ServicesEstimatorSection />
        <AboutSection />
        <ContactFooter />
      </main>

      <CommandPalette />
      <CaseStudyModal />
    </>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioShell />
    </PortfolioProvider>
  );
}
