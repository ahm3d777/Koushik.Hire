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
    activeCaseStudy,
    shoktiModalOpen,
  } = usePortfolio();

  // Weighted inertial smooth scroll via Lenis (disabled automatically for reduced-motion or open modals)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduced) return undefined;

    let lenis;
    let rafId = null;
    try {
      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
      });

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    } catch {
      // Fallback to native browser scroll in non-DOM test environments
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  // Global Keyboard Shortcuts: Cmd/Ctrl + K (Command Palette), Cmd/Ctrl + X (X-Ray Mode), Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMod = e.metaKey || e.ctrlKey;
      const key = e.key.toLowerCase();

      if (isMod && key === 'k') {
        e.preventDefault();
        if (paletteOpen) {
          closePalette();
        } else {
          openPalette('commands');
        }
      } else if (isMod && key === 'x') {
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        toggleXray();
      } else if (e.key === 'Escape' && paletteOpen) {
        closePalette();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paletteOpen, openPalette, closePalette, toggleXray]);

  // Lock body scroll when full-screen Case Study or Command Palette is open
  useEffect(() => {
    const anyModal = Boolean(paletteOpen || activeCaseStudy || shoktiModalOpen);
    document.body.style.overflow = anyModal ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [paletteOpen, activeCaseStudy, shoktiModalOpen]);

  return (
    <>
      <div className="film-grain" aria-hidden="true" />
      <CustomCursor />
      <XRayOverlay />
      <NavbarHUD />

      <main>
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
