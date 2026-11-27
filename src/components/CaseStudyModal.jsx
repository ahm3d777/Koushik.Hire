import { useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  X,
} from 'lucide-react';
import { PROJECTS, SHOKTI_LAB } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { soundEngine } from '../utils/soundEngine';

/**
 * Reusable 7-Block Deep-Dive Case Study Drawer + Shokti Lab Product Roadmap Modal
 */
export default function CaseStudyModal() {
  const {
    activeCaseStudy,
    setActiveCaseStudy,
    shoktiModalOpen,
    setShoktiModalOpen,
  } = usePortfolio();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeCaseStudy) setActiveCaseStudy(null);
        if (shoktiModalOpen) setShoktiModalOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    activeCaseStudy,
    setActiveCaseStudy,
    shoktiModalOpen,
    setShoktiModalOpen,
  ]);

  if (!activeCaseStudy && !shoktiModalOpen) return null;

  // Render Shokti Product Roadmap Modal
  if (shoktiModalOpen) {
    return (
      <div
        className="modal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shokti-modal-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) setShoktiModalOpen(false);
        }}
      >
        <div className="case-study-sheet" style={{ maxWidth: 780 }}>
          <div
            style={{
              padding: '22px 28px',
              borderBottom: '1px solid var(--border-seam)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div className="lab-badge" style={{ marginBottom: 0 }}>
              <span className="status-dot cyan" />
              <span>SHOKTI (শক্তি) · PRODUCT ROADMAP</span>
            </div>
            <button
              type="button"
              className="hud-icon-btn"
              onClick={() => setShoktiModalOpen(false)}
              aria-label="Close Shokti Roadmap"
            >
              <X size={16} />
            </button>
          </div>

          <div style={{ padding: 'clamp(22px, 3.5vw, 36px)' }}>
            <h2
              id="shokti-modal-title"
              className="display-section"
              style={{ fontSize: 'clamp(26px, 3vw, 36px)', marginBottom: 10 }}
            >
              {SHOKTI_LAB.name} — Progressive Overload Architecture
            </h2>
            <p className="lead-copy" style={{ marginBottom: 28 }}>
              {SHOKTI_LAB.narrative}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {SHOKTI_LAB.roadmap.map((milestone) => (
                <div
                  key={milestone.phase}
                  style={{
                    padding: 20,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-seam)',
                    background: 'var(--bg-canvas)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 8,
                      marginBottom: 10,
                    }}
                  >
                    <strong style={{ fontSize: 16 }}>{milestone.phase}</strong>
                    <span
                      className="mono-tag"
                      style={{ color: 'var(--accent-telemetry)' }}
                    >
                      {milestone.status}
                    </span>
                  </div>
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    {milestone.items.map((item) => (
                      <li
                        key={item}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 9,
                          fontSize: 14,
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <CheckCircle2
                          size={15}
                          style={{
                            color: 'var(--accent-emerald)',
                            marginTop: 3,
                            flexShrink: 0,
                          }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Full 7-Block Deep-Dive Case Study
  const currentIdx = PROJECTS.findIndex((p) => p.id === activeCaseStudy.id);
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];
  const cs = activeCaseStudy.caseStudy;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) setActiveCaseStudy(null);
      }}
    >
      <article
        className="case-study-sheet"
        data-xray-module={`CASE_STUDY_VIEW · ${activeCaseStudy.id.toUpperCase()}`}
      >
        {/* Top Sticky Header */}
        <div
          style={{
            padding: '18px 28px',
            borderBottom: '1px solid var(--border-seam)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span className="mono-tag" style={{ color: 'var(--accent-rose)' }}>
            CASE STUDY {activeCaseStudy.index} // {activeCaseStudy.shortName}
          </span>
          <button
            type="button"
            id="close-case-study-btn"
            className="hud-icon-btn"
            onClick={() => setActiveCaseStudy(null)}
            aria-label="Close Case Study"
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: 'clamp(24px, 4vw, 44px)' }}>
          {/* Block 1: Case Study Hero */}
          <header style={{ marginBottom: 32 }}>
            <h2
              id="case-study-modal-title"
              className="display-section"
              style={{ marginBottom: 12 }}
            >
              {activeCaseStudy.title}
            </h2>
            <p className="lead-copy" style={{ marginBottom: 22 }}>
              {cs.thesis}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a
                href={activeCaseStudy.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <ExternalLink size={15} />
                <span>{activeCaseStudy.liveLabel}</span>
              </a>
              <a
                href={activeCaseStudy.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <GitBranch size={15} />
                <span>GitHub Repository</span>
              </a>
            </div>
          </header>

          {/* Block 2: 4-Column Monospace Metadata Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 16,
              padding: '18px 22px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-canvas)',
              border: '1px solid var(--border-seam)',
              marginBottom: 34,
            }}
          >
            <div>
              <div className="telemetry-strip-label">ROLE</div>
              <div style={{ fontSize: 13.5, fontWeight: 500, marginTop: 4 }}>
                {cs.metadata.role}
              </div>
            </div>
            <div>
              <div className="telemetry-strip-label">TIMELINE</div>
              <div style={{ fontSize: 13.5, fontWeight: 500, marginTop: 4 }}>
                {cs.metadata.timeline}
              </div>
            </div>
            <div>
              <div className="telemetry-strip-label">CORE STACK</div>
              <div style={{ fontSize: 13.5, fontWeight: 500, marginTop: 4 }}>
                {cs.metadata.coreStack}
              </div>
            </div>
            <div>
              <div className="telemetry-strip-label">DEPLOYMENT</div>
              <div style={{ fontSize: 13.5, fontWeight: 500, marginTop: 4 }}>
                {cs.metadata.deployment}
              </div>
            </div>
          </div>

          {/* Block 6 / Hero Visual Frame */}
          <div
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--border-seam)',
              marginBottom: 36,
              background: '#09090b',
            }}
          >
            <img
              src={activeCaseStudy.image}
              alt={`${activeCaseStudy.title} full showcase`}
              style={{ width: '100%', maxHeight: 460, objectFit: 'cover' }}
            />
          </div>

          {/* Block 3: The Problem & Context */}
          <section style={{ marginBottom: 36 }}>
            <div className="eyebrow-telemetry">
              <span className="index-code">// 01</span>
              <span>THE PROBLEM &amp; CONTEXT</span>
            </div>
            {cs.problem.map((para) => (
              <p
                key={para.slice(0, 24)}
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: 15.5,
                  lineHeight: 1.7,
                  marginBottom: 14,
                }}
              >
                {para}
              </p>
            ))}
          </section>

          {/* Block 4: System Architecture Node Diagram */}
          <section
            style={{ marginBottom: 36 }}
            data-xray-module="ARCH_TOPOLOGY · DATA_FLOW_GRAPH"
          >
            <div className="eyebrow-telemetry">
              <span className="index-code">// 02</span>
              <span>SYSTEM ARCHITECTURE &amp; DATA FLOW</span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                gap: 12,
                alignItems: 'stretch',
              }}
            >
              {cs.architectureNodes.map((node, idx) => (
                <div
                  key={node.label}
                  style={{
                    padding: 16,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-canvas)',
                    border: '1px solid var(--border-seam)',
                    position: 'relative',
                  }}
                >
                  <div
                    className="mono-tag"
                    style={{ color: 'var(--accent-telemetry)', marginBottom: 6 }}
                  >
                    NODE 0{idx + 1}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                    {node.label}
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                    {node.sub}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Block 5: 3 Design & Engineering Highlights */}
          <section style={{ marginBottom: 20 }}>
            <div className="eyebrow-telemetry">
              <span className="index-code">// 03</span>
              <span>DESIGN &amp; ENGINEERING HIGHLIGHTS</span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 16,
              }}
            >
              {cs.highlights.map((h) => (
                <div
                  key={h.title}
                  style={{
                    padding: 20,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-canvas)',
                    border: '1px solid var(--border-seam)',
                  }}
                >
                  <h4 style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 8 }}>
                    {h.title}
                  </h4>
                  <p style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>
                    {h.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Block 7: Next Project Magnetic Bar */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick(640, 0.03);
            setActiveCaseStudy(nextProject);
          }}
          style={{
            width: '100%',
            padding: '24px 32px',
            borderTop: '1px solid var(--border-seam)',
            background: 'var(--bg-canvas)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            textAlign: 'left',
          }}
        >
          <div>
            <div className="mono-tag" style={{ color: 'var(--text-muted)' }}>
              NEXT CASE STUDY →
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20,
                fontWeight: 700,
                marginTop: 4,
              }}
            >
              {nextProject.title}
            </div>
          </div>
          <span className="btn-secondary" style={{ pointerEvents: 'none' }}>
            <span>Open Next</span>
            <ArrowRight size={15} />
          </span>
        </button>
      </article>
    </div>
  );
}
