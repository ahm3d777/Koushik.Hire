import { useEffect, useRef, useState } from 'react';
import {
  Check,
  Copy,
  Mail,
  MessageCircle,
  MoveHorizontal,
  Zap,
} from 'lucide-react';
import { ENGAGEMENT_TRACKS, ESTIMATOR_STEPS } from '../data/portfolioData';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/siteConfig';
import { handleSpecularMouseMove } from '../utils/scrambleText';
import { soundEngine } from '../utils/soundEngine';

export default function ServicesEstimatorSection() {
  // Before / After Slider State (auto-nudges on first intersection)
  const [splitPct, setSplitPct] = useState(50);
  const baRef = useRef(null);
  const nudgedRef = useRef(false);

  // 60-Second Scope Estimator State
  const [projectType, setProjectType] = useState(
    ESTIMATOR_STEPS.projectTypes[0]
  );
  const [stage, setStage] = useState(ESTIMATOR_STEPS.stages[0]);
  const [speed, setSpeed] = useState(ESTIMATOR_STEPS.speeds[1]);
  const [goal, setGoal] = useState(ESTIMATOR_STEPS.goals[0]);
  const [clientName, setClientName] = useState('');
  const [briefNote, setBriefNote] = useState('');
  const [copiedBrief, setCopiedBrief] = useState(false);

  useEffect(() => {
    const el = baRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !nudgedRef.current) {
          nudgedRef.current = true;
          setTimeout(() => setSplitPct(60), 220);
          setTimeout(() => setSplitPct(48), 580);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const generatedBriefText = [
    `Hi Koushik! Here is my 60-Second Project Scope Summary:`,
    clientName ? `• Name: ${clientName}` : null,
    `• Building: ${projectType.label}`,
    `• Current Stage: ${stage.label} (${stage.phaseNote})`,
    `• Target Speed: ${speed.label}`,
    `• Primary Goal: ${goal.label}`,
    `• Recommended Stack: ${projectType.stack}`,
    briefNote ? `• Extra Note: ${briefNote}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const mailtoBriefHref = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
    `Project Scope Brief — ${projectType.label}`
  )}&body=${encodeURIComponent(generatedBriefText)}`;

  const handleCopyBrief = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(generatedBriefText).catch(() => {});
    }
    soundEngine.playSuccess();
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2400);
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

        {/* Part A: Interactive Before / After Prototype Lab */}
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
              PART A // INTERACTIVE BEFORE &amp; AFTER PROTOTYPE LAB
            </span>
            <span className="mono-tag" style={{ color: 'var(--accent-rose)' }}>
              DRAG SLIDER ({splitPct}%)
            </span>
          </div>

          <div
            ref={baRef}
            className="ba-viewport"
            style={{ marginTop: 14 }}
            data-xray-module="PROTOTYPE_LAB · SPLIT_DIFF_VIEWPORT"
          >
            {/* Full-Width Right Layer ("AFTER — Koushik's Edge Prototype") */}
            <div className="ba-pane ba-pane-after">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
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
                  AFTER · KOUSHIK&apos;S EDGE FRONT DESK (0.38s LCP)
                </span>
                <span className="mono-tag" style={{ color: '#a1a1aa' }}>
                  CLOUDFLARE PAGES · DHANMONDI
                </span>
              </div>

              <div style={{ maxWidth: 560, marginLeft: 'auto', textAlign: 'right' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 2.8vw, 34px)',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    marginBottom: 10,
                  }}
                >
                  Fitness Factory — Instant Trial Pass &amp; Live Floor Capacity
                </div>
                <p style={{ fontSize: 14.5, color: '#a1a1aa', marginBottom: 18 }}>
                  Clean mobile hierarchy, live class slots, transparent BDT
                  tiers, and 1-tap WhatsApp / walk-in pass activation.
                </p>
                <div
                  style={{
                    display: 'inline-flex',
                    gap: 10,
                    flexWrap: 'wrap',
                    justifyContent: 'flex-end',
                  }}
                >
                  <span
                    style={{
                      padding: '10px 18px',
                      borderRadius: 999,
                      background: '#e11d48',
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    Claim 1-Day Trial Pass →
                  </span>
                  <span
                    style={{
                      padding: '10px 16px',
                      borderRadius: 999,
                      border: '1px solid #27272f',
                      color: '#f4f4f6',
                      fontSize: 13,
                    }}
                  >
                    43 / 100 Floor Live
                  </span>
                </div>
              </div>

              <div
                className="mono-tag"
                style={{ textAlign: 'right', color: '#71717a' }}
              >
                RESULT: CLEAR MOBILE FUNNEL · ZERO FRICTION
              </div>
            </div>

            {/* Clipped Left Layer ("BEFORE — Typical Static Template") */}
            <div
              className="ba-pane ba-pane-before"
              style={{
                clipPath: `inset(0 ${100 - splitPct}% 0 0)`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 11,
                    padding: '4px 9px',
                    background: '#d4d4ce',
                    border: '1px solid #a1a19a',
                    color: '#3f3f46',
                  }}
                >
                  BEFORE · GENERIC STATIC TEMPLATE (5.8s LOAD)
                </span>
              </div>

              <div style={{ maxWidth: 470 }}>
                <div
                  style={{
                    fontSize: 12,
                    textTransform: 'uppercase',
                    color: '#71717a',
                    marginBottom: 6,
                  }}
                >
                  Home | About Us | Gallery 2018 | PDF Price List | Contact Us
                </div>
                <div
                  style={{
                    fontSize: 'clamp(20px, 2.4vw, 28px)',
                    fontWeight: 700,
                    color: '#18181b',
                    marginBottom: 10,
                  }}
                >
                  WELCOME TO OUR FITNESS CENTER WEBSITE!!
                </div>
                <p style={{ fontSize: 14, color: '#52525b', marginBottom: 14 }}>
                  Unoptimized 8MB hero slider, broken mobile table spacing, no
                  online class schedule, and a buried landline number at the
                  bottom of a long page.
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '7px 12px',
                    background: '#a1a1aa',
                    color: '#18181b',
                    fontSize: 12,
                  }}
                >
                  Download Brochure.pdf (14.2 MB)
                </span>
              </div>

              <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#52525b' }}>
                PROBLEM: VISITORS BOUNCE IN &lt;8 SECONDS ON MOBILE
              </div>
            </div>

            {/* Drag Handle Line & Knob */}
            <div className="ba-divider-line" style={{ left: `${splitPct}%` }} />
            <div className="ba-handle-knob" style={{ left: `${splitPct}%` }}>
              <MoveHorizontal size={18} />
            </div>

            <input
              type="range"
              id="before-after-slider"
              className="ba-range-input"
              min="8"
              max="92"
              value={splitPct}
              aria-label="Compare Before Legacy Website and After Koushik Edge Prototype"
              onChange={(e) => setSplitPct(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Part B: Four Clear Engagement Tracks */}
        <div className="tracks-grid">
          {ENGAGEMENT_TRACKS.map((track) => (
            <div
              key={track.code}
              className="specular-card track-card"
              onMouseMove={handleSpecularMouseMove}
            >
              <span className="mono-tag" style={{ color: 'var(--accent-rose)' }}>
                {track.code}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18.5,
                  fontWeight: 700,
                }}
              >
                {track.title}
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>
                {track.description}
              </p>
            </div>
          ))}
        </div>

        {/* Part C: The 60-Second Scope Estimator */}
        <div
          id="estimator"
          className="specular-card estimator-shell"
          onMouseMove={handleSpecularMouseMove}
          data-xray-module="ESTIMATOR_FSM · 4_STEP_CONFIGURATOR"
        >
          <div>
            <div
              className="mono-tag"
              style={{
                color: 'var(--accent-rose)',
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
                fontSize: 'clamp(22px, 2.2vw, 28px)',
                fontWeight: 700,
                marginBottom: 22,
              }}
            >
              Configure your build &amp; generate a ready-to-send brief.
            </h3>

            {/* Step 1 */}
            <div className="estimator-step-group">
              <span className="estimator-step-label">
                01 · What are we building?
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
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="estimator-step-group">
              <span className="estimator-step-label">
                02 · Current design readiness
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
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 */}
            <div className="estimator-step-group">
              <span className="estimator-step-label">03 · Target timeline</span>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: 10,
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
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4 */}
            <div className="estimator-step-group" style={{ marginBottom: 0 }}>
              <span className="estimator-step-label">
                04 · Primary outcome &amp; optional note
              </span>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                  gap: 10,
                  marginBottom: 12,
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
                <input
                  type="text"
                  className="input-field"
                  placeholder="Your Name / Brand (optional)"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
                <input
                  type="text"
                  className="input-field"
                  placeholder="1-line context (e.g. Dhaka clinic booking)"
                  value={briefNote}
                  onChange={(e) => setBriefNote(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Dynamic Tailored Roadmap Output Card */}
          <aside className="estimator-result-card" aria-live="polite">
            <div className="mono-tag" style={{ color: 'var(--accent-telemetry)' }}>
              // TAILORED PROJECT ROADMAP
            </div>
            <div>
              <div className="telemetry-strip-label">RECOMMENDED ARCHITECTURE</div>
              <div style={{ fontWeight: 600, fontSize: 14.5, marginTop: 4 }}>
                {projectType.stack}
              </div>
            </div>

            <div>
              <div className="telemetry-strip-label">ESTIMATED CADENCE &amp; PHASE</div>
              <div style={{ fontWeight: 600, fontSize: 14.5, marginTop: 4 }}>
                {speed.cadence} · {stage.phaseNote}
              </div>
            </div>

            <div>
              <div className="telemetry-strip-label" style={{ marginBottom: 8 }}>
                KEY DELIVERABLES INCLUDED
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
                      fontSize: 13.5,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <Check
                      size={15}
                      style={{
                        color: 'var(--accent-emerald)',
                        marginTop: 2,
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
                paddingTop: 8,
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
                <span>Send This Brief on WhatsApp</span>
              </a>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <a
                  href={mailtoBriefHref}
                  id="estimator-email-btn"
                  className="btn-secondary"
                  style={{ padding: '11px 12px', fontSize: 13 }}
                >
                  <Mail size={14} />
                  <span>Send via Email</span>
                </a>
                <button
                  type="button"
                  id="estimator-copy-btn"
                  className="btn-secondary"
                  style={{ padding: '11px 12px', fontSize: 13 }}
                  onClick={handleCopyBrief}
                >
                  {copiedBrief ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedBrief ? 'Copied ✓' : 'Copy Brief'}</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
