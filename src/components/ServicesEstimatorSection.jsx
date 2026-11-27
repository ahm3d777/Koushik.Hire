import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Copy,
  Mail,
  MessageCircle,
  MoveHorizontal,
  Zap,
} from 'lucide-react';
import { ENGAGEMENT_TRACKS, ESTIMATOR_STEPS } from '../data/portfolioData';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/siteConfig';
import { usePortfolio } from '../context/PortfolioContext';
import { handleSpecularMouseMove } from '../utils/scrambleText';
import { soundEngine } from '../utils/soundEngine';

function loadSavedEstimatorState() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage?.getItem('ka_estimator_v2');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function ServicesEstimatorSection() {
  const { lens, reducedMotion, announce } = usePortfolio();

  // Part A: Before / After State (Slider on >=480px, Segmented Toggle on <480px)
  const [splitPct, setSplitPct] = useState(50);
  const [mobilePane, setMobilePane] = useState('after'); // 'before' | 'after'
  const [isNarrowPhone, setIsNarrowPhone] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 480 : false
  );
  const baRef = useRef(null);
  const nudgedRef = useRef(false);
  const draggingSliderRef = useRef(false);

  // Part C: Unified 4-Step Estimator State (Persisted to localStorage per §5 Section 06 Part C)
  const saved = loadSavedEstimatorState();
  const [projectType, setProjectType] = useState(
    () =>
      ESTIMATOR_STEPS.projectTypes.find((p) => p.id === saved?.typeId) ||
      ESTIMATOR_STEPS.projectTypes[0]
  );
  const [stage, setStage] = useState(
    () =>
      ESTIMATOR_STEPS.stages.find((s) => s.id === saved?.stageId) ||
      ESTIMATOR_STEPS.stages[0]
  );
  const [goal, setGoal] = useState(
    () =>
      ESTIMATOR_STEPS.goals.find((g) => g.id === saved?.goalId) ||
      ESTIMATOR_STEPS.goals[0]
  );
  const [speed, setSpeed] = useState(
    () =>
      ESTIMATOR_STEPS.speeds.find((sp) => sp.id === saved?.speedId) ||
      ESTIMATOR_STEPS.speeds[1]
  );
  const [clientName, setClientName] = useState(() => saved?.clientName || '');
  const [briefNote, setBriefNote] = useState(() => saved?.briefNote || '');
  const [mobileStep, setMobileStep] = useState(1); // 1..5 for <768px stepped wizard
  const [isMobileWizard, setIsMobileWizard] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [copiedBrief, setCopiedBrief] = useState(false);

  useEffect(() => {
    const onResize = () => {
      setIsNarrowPhone(window.innerWidth < 480);
      setIsMobileWizard(window.innerWidth < 768);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Persist estimator state safely
  useEffect(() => {
    try {
      window.localStorage?.setItem(
        'ka_estimator_v2',
        JSON.stringify({
          typeId: projectType.id,
          stageId: stage.id,
          goalId: goal.id,
          speedId: speed.id,
          clientName,
          briefNote,
        })
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [projectType, stage, goal, speed, clientName, briefNote]);

  // Auto-nudge 10% on first view (skipped when reduced motion is active)
  useEffect(() => {
    if (reducedMotion || isNarrowPhone) return undefined;
    const el = baRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !nudgedRef.current) {
          nudgedRef.current = true;
          setTimeout(() => setSplitPct(60), 220);
          setTimeout(() => setSplitPct(50), 580);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion, isNarrowPhone]);

  // Pointer drag + keyboard ArrowLeft/ArrowRight (5%) for role="slider"
  const updateSplitFromClientX = (clientX) => {
    if (!baRef.current) return;
    const rect = baRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplitPct(Math.max(8, Math.min(92, Math.round(pct))));
  };

  const handleSliderKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSplitPct((p) => Math.max(8, p - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSplitPct((p) => Math.min(92, p + 5));
    }
  };

  // Part B: In Engineering lens, Track 4 moves first; in Client lens it moves last (§5 Section 06 Part B)
  const orderedTracks =
    lens === 'engineer'
      ? [
          ENGAGEMENT_TRACKS[3],
          ENGAGEMENT_TRACKS[0],
          ENGAGEMENT_TRACKS[1],
          ENGAGEMENT_TRACKS[2],
        ]
      : ENGAGEMENT_TRACKS;

  const advanceWizardAfterSelect = () => {
    if (isMobileWizard) {
      setTimeout(() => {
        setMobileStep((s) => Math.min(5, s + 1));
      }, 150);
    }
  };

  const generatedBriefText = [
    `Hi Koushik! Here is my 60-Second Project Scope Brief:`,
    clientName ? `• Name: ${clientName}` : null,
    `• Building: ${projectType.label}`,
    `• Starting From: ${stage.label} (${stage.phaseNote})`,
    `• Main Goal: ${goal.label}`,
    `• Timeline: ${speed.label}`,
    `• Recommended Stack: ${projectType.stack}`,
    briefNote ? `• Note: ${briefNote}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const mailtoBriefHref = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
    `Project Scope Brief — ${projectType.label}`
  )}&body=${encodeURIComponent(generatedBriefText)}`;

  const handleCopyBrief = () => {
    navigator.clipboard?.writeText(generatedBriefText).catch(() => {});
    soundEngine.playSuccess();
    setCopiedBrief(true);
    announce('Project scope brief copied to clipboard');
    setTimeout(() => setCopiedBrief(false), 1600);
  };

  return (
    <section
      id="services"
      className="section-shell"
      data-xray-module="SECTION_06 · SERVICES_AND_ESTIMATOR"
    >
      <div className="container">
        <div className="eyebrow-telemetry">
          <span className="index-code">06 //</span>
          <span>WORK WITH ME</span>
        </div>
        <h2 className="display-section">
          From rapid prototype to production{' '}
          <em className="editorial-italic">launch</em>.
        </h2>

        {/* Part A: Before / After Prototype Lab */}
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <span className="mono-tag" style={{ color: 'var(--text-secondary)' }}>
              PART A // BEFORE &amp; AFTER PROTOTYPE LAB
            </span>
            {!isNarrowPhone && (
              <span
                className="mono-tag tabular-nums"
                style={{ color: 'var(--accent-text)' }}
              >
                DRAG OR USE ←/→ KEYS ({splitPct}%)
              </span>
            )}
          </div>

          {/* Mobile (<480px) Segmented Before | After Toggle (§5 Section 06 Part A) */}
          <div
            className="lens-switcher ba-mobile-toggle-bar"
            role="group"
            aria-label="Before and After Comparison View"
          >
            <button
              type="button"
              className={`lens-btn ${mobilePane === 'before' ? 'active' : ''}`}
              onClick={() => setMobilePane('before')}
            >
              Before
            </button>
            <button
              type="button"
              className={`lens-btn ${mobilePane === 'after' ? 'active' : ''}`}
              onClick={() => setMobilePane('after')}
            >
              After
            </button>
          </div>

          <div
            ref={baRef}
            className="ba-viewport"
            onPointerDown={(e) => {
              if (isNarrowPhone) return;
              draggingSliderRef.current = true;
              updateSplitFromClientX(e.clientX);
            }}
            onPointerMove={(e) => {
              if (!draggingSliderRef.current || isNarrowPhone) return;
              updateSplitFromClientX(e.clientX);
            }}
            onPointerUp={() => {
              draggingSliderRef.current = false;
            }}
            onPointerCancel={() => {
              draggingSliderRef.current = false;
            }}
            data-xray-module="PROTOTYPE_LAB · SPLIT_DIFF_VIEWPORT"
          >
            {/* AFTER Pane */}
            <div
              className="ba-pane ba-pane-after"
              style={{
                opacity: isNarrowPhone && mobilePane === 'before' ? 0 : 1,
                pointerEvents:
                  isNarrowPhone && mobilePane === 'before' ? 'none' : 'auto',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <span
                  className="mono-tag"
                  style={{
                    padding: '4px 10px',
                    borderRadius: 99,
                    background: 'rgba(16, 185, 129, 0.14)',
                    color: '#10b981',
                    border: '1px solid rgba(16,185,129,0.35)',
                  }}
                >
                  AFTER · EDGE PROTOTYPE
                </span>
                <span className="mono-tag" style={{ color: '#a1a1aa' }}>
                  CLOUDFLARE · DHANMONDI
                </span>
              </div>

              <div
                style={{
                  maxWidth: 540,
                  marginLeft: isNarrowPhone ? 0 : 'auto',
                  textAlign: isNarrowPhone ? 'left' : 'right',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 2.8vw, 32px)',
                    fontWeight: 600,
                    lineHeight: 1.1,
                    marginBottom: 10,
                  }}
                >
                  Fitness Factory — Instant Trial Pass &amp; Class Schedule
                </div>
                <p style={{ fontSize: 15, color: '#a1a1aa', marginBottom: 18 }}>
                  Clean mobile hierarchy, live class slots, clear membership
                  tiers, and one-tap WhatsApp or walk-in trial booking.
                </p>
                <div
                  style={{
                    display: 'inline-flex',
                    gap: 10,
                    flexWrap: 'wrap',
                    justifyContent: isNarrowPhone ? 'flex-start' : 'flex-end',
                  }}
                >
                  <span
                    style={{
                      padding: '10px 18px',
                      borderRadius: 10,
                      background: '#e11d48',
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    Claim 1-Day Trial Pass →
                  </span>
                </div>
              </div>

              <div
                className="mono-tag"
                style={{
                  textAlign: isNarrowPhone ? 'left' : 'right',
                  color: '#8b8b94',
                }}
              >
                CLEAR MOBILE HIERARCHY · ONE-TAP INQUIRY
              </div>
            </div>

            {/* BEFORE Pane */}
            <div
              className="ba-pane ba-pane-before"
              style={{
                clipPath: isNarrowPhone
                  ? undefined
                  : `inset(0 ${100 - splitPct}% 0 0)`,
                opacity: isNarrowPhone && mobilePane === 'after' ? 0 : 1,
                pointerEvents:
                  isNarrowPhone && mobilePane === 'after' ? 'none' : 'auto',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 12,
                    padding: '4px 9px',
                    background: '#d4d4ce',
                    border: '1px solid #a1a19a',
                    color: '#27272a',
                  }}
                >
                  BEFORE · GENERIC STATIC TEMPLATE
                </span>
              </div>

              <div style={{ maxWidth: 460 }}>
                <div
                  style={{
                    fontSize: 12,
                    textTransform: 'uppercase',
                    color: '#52525b',
                    marginBottom: 6,
                  }}
                >
                  Home | About | Gallery 2018 | PDF Price List | Contact
                </div>
                <div
                  style={{
                    fontSize: 'clamp(20px, 2.4vw, 28px)',
                    fontWeight: 700,
                    color: '#18181b',
                    marginBottom: 10,
                  }}
                >
                  WELCOME TO OUR FITNESS CENTER WEBSITE
                </div>
                <p style={{ fontSize: 15, color: '#3f3f46', marginBottom: 14 }}>
                  Heavy hero carousel, broken mobile spacing, no online
                  schedule, and a buried phone number at the bottom of the page.
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    background: '#a1a1aa',
                    color: '#18181b',
                    fontSize: 13,
                  }}
                >
                  Download Brochure.pdf (14.2 MB)
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: 12,
                  color: '#3f3f46',
                }}
              >
                SLOW LOAD · BURIED CONTACT DETAILS
              </div>
            </div>

            {/* Accessible ARIA Slider Handle (sm+ >=480px) */}
            <div className="ba-divider-line" style={{ left: `${splitPct}%` }} />
            <div
              id="before-after-slider"
              role="slider"
              tabIndex={0}
              aria-label="Before and After Prototype Comparison Slider"
              aria-valuemin={8}
              aria-valuemax={92}
              aria-valuenow={splitPct}
              onKeyDown={handleSliderKeyDown}
              className="ba-handle-knob"
              style={{ left: `${splitPct}%` }}
            >
              <MoveHorizontal size={18} />
            </div>
          </div>
        </div>

        {/* Part B: Four Engagement Tracks (Reordered dynamically by Lens) */}
        <div className="tracks-grid">
          {orderedTracks.map((track) => (
            <div
              key={track.id}
              className="specular-card track-card"
              onMouseMove={handleSpecularMouseMove}
            >
              <span className="mono-tag" style={{ color: 'var(--accent-text)' }}>
                {track.code}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 19,
                  fontWeight: 600,
                }}
              >
                {track.title}
              </h3>
              <p style={{ fontSize: 14.5, color: 'var(--text-secondary)' }}>
                {track.description}
              </p>
            </div>
          ))}
        </div>

        {/* Part C: Unified 60-Second Scope Estimator (Desktop All-Steps / Mobile Wizard) */}
        <div
          id="estimator"
          className="specular-card estimator-shell"
          onMouseMove={handleSpecularMouseMove}
          data-xray-module="ESTIMATOR_FSM · UNIFIED_4_STEP"
        >
          <div>
            <div
              className="mono-tag"
              style={{
                color: 'var(--accent-text)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 8,
              }}
            >
              <Zap size={13} />
              <span>60-SECOND PROJECT SCOPE ESTIMATOR</span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-h3)',
                fontWeight: 600,
                marginBottom: 18,
              }}
            >
              Configure your scope &amp; generate a ready-to-send brief.
            </h3>

            {/* Mobile Wizard Progress Header */}
            {isMobileWizard && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                  paddingBottom: 12,
                  borderBottom: 'var(--hairline) solid var(--border-seam)',
                }}
              >
                {mobileStep > 1 ? (
                  <button
                    type="button"
                    className="hud-pill-btn"
                    onClick={() => setMobileStep((s) => Math.max(1, s - 1))}
                  >
                    <ArrowLeft size={13} />
                    <span>Back</span>
                  </button>
                ) : (
                  <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>
                    TAP AN OPTION
                  </span>
                )}
                <span className="mono-tag tabular-nums">
                  STEP {Math.min(mobileStep, 4)} / 4
                </span>
              </div>
            )}

            {/* Step 1: What are we building? */}
            {(!isMobileWizard || mobileStep === 1) && (
              <div className="estimator-step-group">
                <span className="estimator-step-label">
                  1 · What are we building?
                </span>
                <div className="estimator-options-grid">
                  {ESTIMATOR_STEPS.projectTypes.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      id={`est-type-${opt.id}`}
                      className={`estimator-opt-btn ${
                        projectType.id === opt.id ? 'selected' : ''
                      }`}
                      onClick={() => {
                        soundEngine.playClick(600, 0.025);
                        setProjectType(opt);
                        advanceWizardAfterSelect();
                      }}
                    >
                      <span>{opt.label}</span>
                      <span
                        style={{
                          fontSize: 12.5,
                          color: 'var(--text-muted)',
                          fontWeight: 400,
                        }}
                      >
                        {opt.hint}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Where are you starting? */}
            {(!isMobileWizard || mobileStep === 2) && (
              <div className="estimator-step-group">
                <span className="estimator-step-label">
                  2 · Where are you starting?
                </span>
                <div className="estimator-options-grid">
                  {ESTIMATOR_STEPS.stages.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`estimator-opt-btn ${
                        stage.id === opt.id ? 'selected' : ''
                      }`}
                      onClick={() => {
                        soundEngine.playClick(600, 0.025);
                        setStage(opt);
                        advanceWizardAfterSelect();
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: What's the main goal? */}
            {(!isMobileWizard || mobileStep === 3) && (
              <div className="estimator-step-group">
                <span className="estimator-step-label">
                  3 · What&apos;s the main goal?
                </span>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                    gap: 10,
                  }}
                >
                  {ESTIMATOR_STEPS.goals.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`estimator-opt-btn ${
                        goal.id === opt.id ? 'selected' : ''
                      }`}
                      onClick={() => {
                        soundEngine.playClick(600, 0.025);
                        setGoal(opt);
                        advanceWizardAfterSelect();
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: How fast? + Optional Name & Note */}
            {(!isMobileWizard || mobileStep >= 4) && (
              <div className="estimator-step-group" style={{ marginBottom: 0 }}>
                <span className="estimator-step-label">4 · How fast?</span>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: 10,
                    marginBottom: 14,
                  }}
                >
                  {ESTIMATOR_STEPS.speeds.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`estimator-opt-btn ${
                        speed.id === opt.id ? 'selected' : ''
                      }`}
                      onClick={() => {
                        soundEngine.playClick(600, 0.025);
                        setSpeed(opt);
                        if (isMobileWizard) setMobileStep(5);
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 10,
                  }}
                >
                  <div>
                    <label
                      htmlFor="est-client-name"
                      className="mono-tag"
                      style={{
                        display: 'block',
                        marginBottom: 4,
                        color: 'var(--text-muted)',
                      }}
                    >
                      Optional: Name
                    </label>
                    <input
                      id="est-client-name"
                      type="text"
                      autoComplete="name"
                      className="input-field"
                      placeholder="Your name or business"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="est-brief-note"
                      className="mono-tag"
                      style={{
                        display: 'block',
                        marginBottom: 4,
                        color: 'var(--text-muted)',
                      }}
                    >
                      Optional: One-line note
                    </label>
                    <input
                      id="est-brief-note"
                      type="text"
                      className="input-field"
                      placeholder="e.g. Dhaka clinic booking"
                      value={briefNote}
                      onChange={(e) => setBriefNote(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Result Summary Card (Sticky on Desktop; Shown on Step 5 on Mobile Wizard) */}
          {(!isMobileWizard || mobileStep === 5) && (
            <aside className="estimator-result-card" aria-live="polite">
              <div
                className="mono-tag"
                style={{ color: 'var(--accent-telemetry)' }}
              >
                // PROJECT ROADMAP BRIEF
              </div>

              <div>
                <div className="telemetry-strip-label">
                  RECOMMENDED ARCHITECTURE
                </div>
                <div style={{ fontWeight: 600, fontSize: 15, marginTop: 4 }}>
                  {projectType.stack}
                </div>
              </div>

              <div>
                <div className="telemetry-strip-label">SUGGESTED PHASES</div>
                <div style={{ fontWeight: 500, fontSize: 14.5, marginTop: 4 }}>
                  {projectType.phases} ({stage.phaseNote})
                </div>
              </div>

              <div>
                <div className="telemetry-strip-label">
                  TYPICAL TIMELINE RANGE
                </div>
                <div style={{ fontWeight: 600, fontSize: 15, marginTop: 4 }}>
                  {speed.timelineRange}
                </div>
              </div>

              <div>
                <div
                  className="telemetry-strip-label"
                  style={{ marginBottom: 8 }}
                >
                  WHAT&apos;S INCLUDED
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  {projectType.deliverables.map((d) => (
                    <li
                      key={d}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                        fontSize: 14,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <Check
                        size={15}
                        style={{
                          color: 'var(--accent-emerald)',
                          marginTop: 3,
                          flexShrink: 0,
                        }}
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  paddingTop: 6,
                }}
              >
                <a
                  href={buildWhatsAppUrl(generatedBriefText)}
                  target="_blank"
                  rel="noreferrer"
                  id="estimator-whatsapp-btn"
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  <MessageCircle size={16} />
                  <span>Send this brief on WhatsApp</span>
                </a>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 8,
                  }}
                >
                  <a
                    href={mailtoBriefHref}
                    id="estimator-email-btn"
                    className="btn-secondary"
                    style={{ padding: '10px 12px', fontSize: 13.5 }}
                  >
                    <Mail size={14} />
                    <span>Send via email</span>
                  </a>
                  <button
                    type="button"
                    id="estimator-copy-btn"
                    className="btn-secondary"
                    style={{ padding: '10px 12px', fontSize: 13.5 }}
                    onClick={handleCopyBrief}
                  >
                    {copiedBrief ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedBrief ? 'COPIED ✓' : 'Copy brief'}</span>
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
