import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Copy,
  EyeOff,
  FileText,
  Layers,
  MessageCircle,
  ScanLine,
  Search,
  Sun,
  Terminal,
  Volume2,
  X,
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/siteConfig';
import { usePortfolio } from '../context/PortfolioContext';
import { soundEngine } from '../utils/soundEngine';

const INITIAL_TERMINAL_LINES = [
  {
    type: 'sys',
    text: 'KA_OS v2.0 // Obsidian Telemetry Shell — Tap a chip or type `help`.',
  },
];

const QUICK_TERMINAL_CHIPS = [
  'whoami',
  'projects',
  'stack',
  'dhaka',
  'setup',
  'hire',
  'shokti',
];

export default function CommandPalette() {
  const {
    paletteOpen,
    paletteTab,
    setPaletteTab,
    closePalette,
    lens,
    setLens,
    xray,
    toggleXray,
    theme,
    toggleTheme,
    reducedMotion,
    toggleReducedMotion,
    soundEnabled,
    toggleSound,
    setActiveCaseStudy,
    setShoktiModalOpen,
    announce,
  } = usePortfolio();

  const [query, setQuery] = useState('');
  const [termInput, setTermInput] = useState('');
  const [termLines, setTermLines] = useState(INITIAL_TERMINAL_LINES);
  const searchInputRef = useRef(null);
  const termInputRef = useRef(null);

  useEffect(() => {
    if (!paletteOpen) return;
    setTimeout(() => {
      if (paletteTab === 'terminal') {
        termInputRef.current?.focus();
      } else {
        searchInputRef.current?.focus();
      }
    }, 30);
  }, [paletteOpen, paletteTab]);

  // Pinned top order matches v2 §4.4: Copy email · WhatsApp · Download résumé · Switch lens
  const commands = useMemo(
    () => [
      {
        id: 'copy-email',
        label: `Copy email (${SITE_CONFIG.email})`,
        icon: Copy,
        shortcut: 'EMAIL',
        run: () => {
          navigator.clipboard?.writeText(SITE_CONFIG.email).catch(() => {});
          soundEngine.playSuccess();
          announce(`Copied ${SITE_CONFIG.email}`);
          closePalette();
        },
      },
      {
        id: 'open-whatsapp',
        label: 'Open WhatsApp direct',
        icon: MessageCircle,
        shortcut: 'WA.ME',
        run: () => {
          window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer');
          closePalette();
        },
      },
      {
        id: 'download-resume',
        label: 'Download résumé (PDF)',
        icon: FileText,
        shortcut: 'CV',
        run: () => {
          window.open(SITE_CONFIG.resumeUrl, '_blank', 'noopener,noreferrer');
          closePalette();
        },
      },
      {
        id: 'switch-lens',
        label:
          lens === 'engineer'
            ? 'Switch lens → Client Mode'
            : 'Switch lens → Engineering Mode',
        icon: Layers,
        shortcut: 'LENS',
        run: () => {
          setLens(lens === 'engineer' ? 'client' : 'engineer');
          closePalette();
        },
      },
      {
        id: 'toggle-xray',
        label: xray
          ? 'Disable X-Ray Architecture Mode'
          : 'Enable X-Ray Architecture Mode',
        icon: ScanLine,
        shortcut: 'X',
        run: () => {
          toggleXray();
          closePalette();
        },
      },
      {
        id: 'switch-theme',
        label:
          theme === 'obsidian'
            ? 'Switch to Daylight Paper theme'
            : 'Switch to Obsidian dark theme',
        icon: Sun,
        shortcut: 'THEME',
        run: () => {
          toggleTheme();
          closePalette();
        },
      },
      {
        id: 'toggle-reduced-motion',
        label: reducedMotion ? 'Enable full motion' : 'Reduce motion',
        icon: EyeOff,
        shortcut: 'A11Y',
        run: () => {
          toggleReducedMotion();
          closePalette();
        },
      },
      {
        id: 'toggle-sound',
        label: soundEnabled ? 'Mute micro-audio' : 'Enable micro-audio',
        icon: Volume2,
        shortcut: 'AUDIO',
        run: () => {
          toggleSound();
          closePalette();
        },
      },
      ...PROJECTS.map((proj, idx) => ({
        id: `cs-${proj.id}`,
        label: `Case Study: ${proj.title}`,
        icon: ArrowRight,
        shortcut: `0${idx + 1}`,
        run: () => {
          closePalette();
          setActiveCaseStudy(proj);
        },
      })),
      {
        id: 'shokti-roadmap',
        label: 'Inspect Shokti Lab Roadmap',
        icon: Layers,
        shortcut: 'LAB',
        run: () => {
          closePalette();
          setShoktiModalOpen(true);
        },
      },
      ...[
        ['#work', 'Jump to 03 // Selected Work'],
        ['#stack', 'Jump to 05 // Systems Matrix'],
        ['#estimator', 'Jump to 06 // 60-Second Scope Estimator'],
        ['#about', 'Jump to 07 // About Koushik'],
        ['#contact', 'Jump to 08 // Contact Dock'],
      ].map(([hash, label]) => ({
        id: `nav-${hash}`,
        label,
        icon: ArrowRight,
        shortcut: 'GO',
        run: () => {
          closePalette();
          document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
        },
      })),
    ],
    [
      announce,
      closePalette,
      lens,
      reducedMotion,
      setActiveCaseStudy,
      setLens,
      setShoktiModalOpen,
      soundEnabled,
      theme,
      toggleReducedMotion,
      toggleSound,
      toggleTheme,
      toggleXray,
      xray,
    ]
  );

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  const executeTerminalCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const nextLines = [...termLines, { type: 'in', text: `$ ${raw}` }];

    if (cmd === 'help') {
      nextLines.push({
        type: 'out',
        text: 'Commands: whoami · projects · stack · dhaka · setup · hire · gym · shokti · xray · theme · clear',
      });
    } else if (cmd === 'whoami') {
      nextLines.push({
        type: 'out',
        text: 'Koushik Ahmed — Final-year B.Sc. CS student & Full-Stack Web/Mobile Engineer in Mohammadpur, Dhaka (GMT+6).',
      });
    } else if (cmd === 'projects') {
      nextLines.push({
        type: 'out',
        text: '01 Fitness Factory (Concept Pitch) · 02 Chikara (React Native/Expo) · 03 ElevateCV (AI Résumé App) · 04 BD Premium Jersey Store · [LAB] Shokti',
      });
    } else if (cmd === 'stack') {
      nextLines.push({
        type: 'out',
        text: 'Frontend: React, TypeScript, Tailwind, Sass, Figma | Mobile: React Native, Expo | Edge/Cloud: Cloudflare Workers/Pages, Vercel, Supabase, Railway | QA/AI: Playwright, Vitest, FFmpeg, faster-whisper',
      });
    } else if (cmd === 'dhaka') {
      nextLines.push({
        type: 'out',
        text: 'Base: Mohammadpur, Dhaka, Bangladesh (UTC+6). Fluent in English & Bangla. Remote-ready worldwide.',
      });
    } else if (cmd === 'setup') {
      nextLines.push({
        type: 'out',
        text: `Workstation: ${SITE_CONFIG.workstation.cpu} · ${SITE_CONFIG.workstation.ram} · ${SITE_CONFIG.workstation.gpu} (${SITE_CONFIG.workstation.capability}).`,
      });
    } else if (cmd === 'hire') {
      nextLines.push({
        type: 'out',
        text: `Direct Email: ${SITE_CONFIG.email} (copied!) · GitHub: github.com/ahm3d777`,
      });
      navigator.clipboard?.writeText(SITE_CONFIG.email).catch(() => {});
    } else if (cmd === 'gym' || cmd === 'shokti') {
      nextLines.push({
        type: 'out',
        text: '[EASTER EGG] Training 4–5x/week with progressive overload. That discipline sparked Shokti — a distraction-free React Native workout tracker built for Bangladeshi gym floors.',
      });
    } else if (cmd === 'xray') {
      toggleXray();
      nextLines.push({
        type: 'out',
        text: `X-Ray Architecture Mode toggled ${!xray ? 'ON' : 'OFF'}.`,
      });
    } else if (cmd === 'theme') {
      toggleTheme();
      nextLines.push({
        type: 'out',
        text: `Switched surface theme to ${
          theme === 'obsidian' ? 'Daylight Paper' : 'Obsidian Telemetry'
        }.`,
      });
    } else if (cmd === 'clear') {
      setTermLines(INITIAL_TERMINAL_LINES);
      setTermInput('');
      return;
    } else {
      nextLines.push({
        type: 'out',
        text: `Unknown command: "${cmd}". Tap a chip above or type \`help\`.`,
      });
    }

    soundEngine.playClick(680, 0.024);
    setTermLines(nextLines);
    setTermInput('');
  };

  if (!paletteOpen) return null;

  return (
    <div
      className="modal-backdrop palette-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Global Command Palette and Terminal"
      onClick={(e) => {
        if (e.target === e.currentTarget) closePalette();
      }}
    >
      <div className="palette-dialog">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            borderBottom: 'var(--hairline) solid var(--border-seam)',
            background: 'var(--bg-canvas)',
          }}
        >
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              type="button"
              id="palette-tab-commands"
              className={`hud-pill-btn ${
                paletteTab === 'commands' ? 'xray-active' : ''
              }`}
              onClick={() => setPaletteTab('commands')}
            >
              <Search size={12} />
              <span>Commands</span>
            </button>
            <button
              type="button"
              id="palette-tab-terminal"
              className={`hud-pill-btn ${
                paletteTab === 'terminal' ? 'xray-active' : ''
              }`}
              onClick={() => setPaletteTab('terminal')}
            >
              <Terminal size={12} />
              <span>&gt;_ Terminal</span>
            </button>
          </div>

          <button
            type="button"
            className="hud-icon-btn"
            style={{ width: 36, height: 36 }}
            onClick={closePalette}
            aria-label="Close Command Palette"
          >
            <X size={15} />
          </button>
        </div>

        {paletteTab === 'commands' ? (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 16px',
                borderBottom: 'var(--hairline) solid var(--border-seam)',
              }}
            >
              <Search size={16} style={{ color: 'var(--text-muted)' }} />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.startsWith('>')) {
                    setPaletteTab('terminal');
                    setQuery('');
                    return;
                  }
                  setQuery(val);
                }}
                placeholder="Search commands, projects, or '>' for Terminal..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: 16,
                }}
              />
            </div>

            <div
              style={{
                maxHeight: 360,
                overflowY: 'auto',
                padding: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {filteredCommands.map((cmd) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    type="button"
                    className="palette-item"
                    onClick={cmd.run}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      <Icon size={15} />
                      <span>{cmd.label}</span>
                    </span>
                    <span
                      className="mono-tag"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {cmd.shortcut}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div
            style={{
              padding: 16,
              background: '#09090b',
              color: '#f4f4f6',
              fontFamily: 'var(--font-mono)',
              fontSize: 12.5,
            }}
          >
            {/* Tappable Command Chips for Touch Ergonomics (§4.4) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                marginBottom: 12,
                paddingBottom: 10,
                borderBottom: '1px solid #27272f',
              }}
            >
              {QUICK_TERMINAL_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => executeTerminalCommand(chip)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 6,
                    background: '#18181f',
                    border: '1px solid #27272f',
                    color: '#f4f4f6',
                    fontSize: 12,
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>

            <div
              style={{
                maxHeight: 240,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                marginBottom: 12,
              }}
            >
              {termLines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    color:
                      line.type === 'sys'
                        ? '#22d3ee'
                        : line.type === 'in'
                        ? '#fb7185'
                        : '#d4d4d8',
                    lineHeight: 1.55,
                  }}
                >
                  {line.text}
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeTerminalCommand(termInput);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                paddingTop: 10,
                borderTop: '1px solid #27272f',
              }}
            >
              <span style={{ color: '#f43f5e', fontWeight: 600 }}>
                koushik@dhaka:~$
              </span>
              <input
                ref={termInputRef}
                id="terminal-cli-input"
                type="text"
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                placeholder="Type command..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#f4f4f6',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 16,
                }}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
