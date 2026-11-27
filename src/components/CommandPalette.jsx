import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Copy,
  FileText,
  Layers,
  MessageCircle,
  ScanLine,
  Search,
  Sun,
  Terminal,
  X,
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/siteConfig';
import { usePortfolio } from '../context/PortfolioContext';
import { soundEngine } from '../utils/soundEngine';

const INITIAL_TERMINAL_LINES = [
  {
    type: 'sys',
    text: 'KA_OS v2.6 // Obsidian Telemetry Shell — Type `help` to list commands.',
  },
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
    setActiveCaseStudy,
    setShoktiModalOpen,
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

  const commands = useMemo(
    () => [
      {
        id: 'copy-email',
        label: `Copy Email (${SITE_CONFIG.email})`,
        group: 'Quick Actions',
        icon: Copy,
        shortcut: 'EMAIL',
        run: () => {
          navigator.clipboard?.writeText(SITE_CONFIG.email).catch(() => {});
          soundEngine.playSuccess();
          closePalette();
        },
      },
      {
        id: 'open-whatsapp',
        label: 'Open WhatsApp Direct',
        group: 'Quick Actions',
        icon: MessageCircle,
        shortcut: 'WA.ME',
        run: () => {
          window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer');
          closePalette();
        },
      },
      {
        id: 'toggle-xray',
        label: xray ? 'Disable X-Ray Architecture Mode' : 'Enable X-Ray Architecture Mode',
        group: 'Quick Actions',
        icon: ScanLine,
        shortcut: '⌘X',
        run: () => {
          toggleXray();
          closePalette();
        },
      },
      {
        id: 'switch-lens',
        label:
          lens === 'engineer'
            ? 'Switch to Business Client Mode'
            : 'Switch to Engineering Team Mode',
        group: 'Quick Actions',
        icon: Layers,
        shortcut: 'LENS',
        run: () => {
          setLens(lens === 'engineer' ? 'client' : 'engineer');
          closePalette();
        },
      },
      {
        id: 'switch-theme',
        label:
          theme === 'obsidian'
            ? 'Switch to Daylight Paper Theme'
            : 'Switch to Obsidian Dark Theme',
        group: 'Quick Actions',
        icon: Sun,
        shortcut: 'THEME',
        run: () => {
          toggleTheme();
          closePalette();
        },
      },
      {
        id: 'download-resume',
        label: 'Open / Print Résumé PDF',
        group: 'Quick Actions',
        icon: FileText,
        shortcut: 'CV',
        run: () => {
          window.open(SITE_CONFIG.resumeUrl, '_blank', 'noopener,noreferrer');
          closePalette();
        },
      },
      ...PROJECTS.map((proj) => ({
        id: `cs-${proj.id}`,
        label: `Case Study: ${proj.title}`,
        group: 'Deep-Dive Case Studies',
        icon: ArrowRight,
        shortcut: `0${PROJECTS.indexOf(proj) + 1}`,
        run: () => {
          closePalette();
          setActiveCaseStudy(proj);
        },
      })),
      {
        id: 'shokti-roadmap',
        label: 'Inspect Shokti (শক্তি) Lab Product Roadmap',
        group: 'Deep-Dive Case Studies',
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
        group: 'Navigation',
        icon: ArrowRight,
        shortcut: 'GO',
        run: () => {
          closePalette();
          document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
        },
      })),
    ],
    [
      closePalette,
      lens,
      setActiveCaseStudy,
      setLens,
      setShoktiModalOpen,
      theme,
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
        text: 'Available commands: whoami · projects · stack · dhaka · setup · hire · gym · shokti · xray · theme · clear',
      });
    } else if (cmd === 'whoami') {
      nextLines.push({
        type: 'out',
        text: 'Koushik Ahmed — Final-year B.Sc. CS student & Full-Stack Web/Mobile Engineer in Mohammadpur, Dhaka (GMT+6).',
      });
    } else if (cmd === 'projects') {
      nextLines.push({
        type: 'out',
        text: '01 Fitness Factory (CF Pages) · 02 Chikara (React Native/Expo) · 03 ElevateCV (AI Resume Web App) · 04 BD Premium Jersey Store · [LAB] Shokti',
      });
    } else if (cmd === 'stack') {
      nextLines.push({
        type: 'out',
        text: 'Frontend: React, Tailwind, Sass, Figma | Mobile: React Native, Expo | Edge/Cloud: Cloudflare Pages, Vercel, Supabase, Railway | QA/AI: Playwright, Vitest, FFmpeg, faster-whisper',
      });
    } else if (cmd === 'dhaka') {
      nextLines.push({
        type: 'out',
        text: 'Base: Mohammadpur, Dhaka, Bangladesh (UTC+6). Fluent in English & Bangla. Shipping globally.',
      });
    } else if (cmd === 'setup') {
      nextLines.push({
        type: 'out',
        text: `Workstation: ${SITE_CONFIG.workstation.cpu} · ${SITE_CONFIG.workstation.ram} · ${SITE_CONFIG.workstation.gpu} (${SITE_CONFIG.workstation.capability}).`,
      });
    } else if (cmd === 'hire') {
      nextLines.push({
        type: 'out',
        text: `Direct Email: ${SITE_CONFIG.email} (copied to clipboard!) · GitHub: github.com/ahm3d777`,
      });
      navigator.clipboard?.writeText(SITE_CONFIG.email).catch(() => {});
    } else if (cmd === 'gym' || cmd === 'shokti') {
      nextLines.push({
        type: 'out',
        text: '[EASTER EGG] Training 4–5x/week with progressive overload. That exact discipline sparked Shokti (শক্তি) — a distraction-free React Native workout tracker built for Bangladeshi gym floors.',
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
        text: `Command not recognized: "${cmd}". Type \`help\` for available commands.`,
      });
    }

    soundEngine.playClick(680, 0.024);
    setTermLines(nextLines);
    setTermInput('');
  };

  if (!paletteOpen) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Global Command Palette and Terminal"
      onClick={(e) => {
        if (e.target === e.currentTarget) closePalette();
      }}
    >
      <div className="palette-dialog">
        {/* Top Mode Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            borderBottom: '1px solid var(--border-seam)',
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
              <span>Spotlight</span>
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
            style={{ width: 28, height: 28 }}
            onClick={closePalette}
            aria-label="Close Command Palette"
          >
            <X size={14} />
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
                borderBottom: '1px solid var(--border-seam)',
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
                placeholder="Type a command, project, or '>' for Terminal..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: 14.5,
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
                    <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>
                      {cmd.shortcut}
                    </span>
                  </button>
                );
              })}
              {filteredCommands.length === 0 && (
                <div
                  style={{
                    padding: 20,
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: 13.5,
                  }}
                >
                  No matching commands. Switch to <code>&gt;_ Terminal</code> to
                  run shell queries.
                </div>
              )}
            </div>
          </>
        ) : (
          <div
            style={{
              padding: 18,
              background: '#09090b',
              color: '#f4f4f6',
              fontFamily: 'var(--font-mono)',
              fontSize: 12.5,
            }}
          >
            <div
              style={{
                maxHeight: 280,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                marginBottom: 14,
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
              <span style={{ color: '#e11d48', fontWeight: 600 }}>
                koushik@dhaka:~$
              </span>
              <input
                ref={termInputRef}
                id="terminal-cli-input"
                type="text"
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                placeholder="whoami | projects | stack | setup | shokti"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#f4f4f6',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12.5,
                }}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
