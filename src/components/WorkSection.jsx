import { Suspense, lazy, useEffect, useRef } from 'react';
import { ArrowUpRight, ExternalLink, Layers } from 'lucide-react';
import { PROJECTS, SHOKTI_LAB } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { handleSpecularMouseMove } from '../utils/scrambleText';
import { soundEngine } from '../utils/soundEngine';

const SpatialDeviceForge = lazy(() => import('./SpatialDeviceForge'));

export default function WorkSection() {
  const {
    lens,
    activeProjectId,
    setActiveProjectId,
    setActiveCaseStudy,
    setShoktiModalOpen,
    setCursorLabel,
  } = usePortfolio();

  const cardRefs = useRef({});

  // Scroll-choreographed active project detection so the 3D stage morphs automatically on scroll
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projId = entry.target.getAttribute('data-project-id');
            if (projId) setActiveProjectId(projId);
          }
        });
      },
      { rootMargin: '-32% 0px -42% 0px', threshold: 0.15 }
    );

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveProjectId]);

  const activeProject =
    PROJECTS.find((p) => p.id === activeProjectId) || PROJECTS[0];

  return (
    <section
      id="work"
      className="section-shell"
      data-xray-module="SECTION_03 · FEATURED_WORK_GALLERY"
    >
      <div className="container">
        <div className="eyebrow-telemetry">
          <span className="index-code">03 //</span>
          <span>SELECTED SHIPPED WORK</span>
        </div>
        <h2 className="display-section">
          Real products, live prototypes, and cross-platform{' '}
          <em className="editorial-italic">builds</em>.
        </h2>

        <div className="work-split-layout">
          {/* Left Scrolling Project Narrative Stack */}
          <div className="work-cards-stack">
            {PROJECTS.map((project) => {
              const isActive = project.id === activeProject.id;
              const summary =
                lens === 'engineer'
                  ? project.engineerSummary
                  : project.clientSummary;

              return (
                <article
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[project.id] = el;
                  }}
                  data-project-id={project.id}
                  data-xray-module={project.xrayTag}
                  className={`specular-card project-card ${
                    isActive ? 'active-project' : ''
                  }`}
                  onMouseMove={handleSpecularMouseMove}
                  onMouseEnter={() => {
                    setActiveProjectId(project.id);
                    soundEngine.playHoverTick();
                  }}
                >
                  <div className="project-meta-top">
                    <span>
                      {project.index} // {project.category}
                    </span>
                    <span>{project.timeline}</span>
                  </div>

                  {/* Mobile / Tablet High-Res Device Mockup Preview */}
                  <div className="project-mobile-thumb">
                    <img
                      src={project.image}
                      alt={`${project.title} interface preview`}
                      loading="lazy"
                    />
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{summary}</p>

                  <div className="stack-tags-row">
                    {project.stack.map((tech) => (
                      <span key={tech} className="stack-chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-actions-row">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="link-action"
                      onMouseEnter={() => setCursorLabel('LIVE DEMO')}
                      onMouseLeave={() => setCursorLabel('')}
                    >
                      <ExternalLink size={14} />
                      <span>{project.liveLabel}</span>
                    </a>

                    <button
                      type="button"
                      id={`case-study-btn-${project.id}`}
                      className="link-action primary-case"
                      onClick={() => {
                        soundEngine.playClick(640, 0.03);
                        setActiveCaseStudy(project);
                      }}
                      onMouseEnter={() => setCursorLabel('CASE STUDY')}
                      onMouseLeave={() => setCursorLabel('')}
                    >
                      <span>Case Study Breakdown</span>
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Right Pinned 3D Hardware Morph Stage (Desktop) */}
          <aside
            className="work-sticky-stage"
            data-xray-module="PINNED_STAGE · 3D_DEVICE_MORPH"
          >
            <div className="work-stage-3d-box">
              <Suspense fallback={null}>
                <SpatialDeviceForge
                  mode={activeProject.stageMode}
                  imageUrl={activeProject.image}
                  captionLeft={`ACTIVE // ${activeProject.shortName.toUpperCase()}`}
                  captionRight={`MEDIUM: ${activeProject.stageMode.toUpperCase()}`}
                />
              </Suspense>
            </div>

            <div className="work-stage-preview-strip">
              <div style={{ minWidth: 0 }}>
                <div
                  className="mono-tag"
                  style={{ color: 'var(--accent-rose)', marginBottom: 4 }}
                >
                  {activeProject.index} · INTERACTIVE STAGE PREVIEW
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 14.5,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {activeProject.title}
                </div>
              </div>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '9px 15px', fontSize: 12.5, flexShrink: 0 }}
                onClick={() => setActiveCaseStudy(activeProject)}
              >
                <span>Inspect</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </aside>
        </div>

        {/* Special Spotlight Card: "In the Lab — Currently Building": Shokti (শক্তি) */}
        <div
          id="lab"
          className="specular-card shokti-spotlight"
          onMouseMove={handleSpecularMouseMove}
          data-xray-module="LAB_SPOTLIGHT · SHOKTI_RN"
        >
          <div>
            <div className="lab-badge">
              <span className="status-dot cyan" />
              <span>{SHOKTI_LAB.badge}</span>
            </div>
            <h3
              className="project-title"
              style={{ marginBottom: 8, fontSize: 'clamp(24px, 2.5vw, 32px)' }}
            >
              {SHOKTI_LAB.name}
            </h3>
            <p
              style={{
                color: 'var(--text-primary)',
                fontWeight: 500,
                marginBottom: 10,
                fontSize: 16,
              }}
            >
              {SHOKTI_LAB.tagline}
            </p>
            <p className="project-summary" style={{ marginBottom: 0 }}>
              {SHOKTI_LAB.narrative}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              padding: 20,
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-canvas)',
              border: '1px solid var(--border-seam)',
            }}
          >
            <div className="mono-tag" style={{ color: 'var(--accent-telemetry)' }}>
              // R&amp;D ARCHITECTURE
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>
              React Native · Expo · Offline-First Overload Engine · Bilingual EN/BN
              Gym Cue System
            </div>
            <button
              type="button"
              id="shokti-roadmap-btn"
              className="btn-secondary"
              style={{ marginTop: 6, width: '100%' }}
              onClick={() => {
                soundEngine.playClick(660, 0.03);
                setShoktiModalOpen(true);
              }}
            >
              <Layers size={15} />
              <span>Inspect Product Roadmap</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
