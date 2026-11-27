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
      { rootMargin: '-30% 0px -42% 0px', threshold: 0.15 }
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
      data-xray-module="SECTION_03 · SELECTED_WORK"
    >
      <div className="container">
        <div className="eyebrow-telemetry">
          <span className="index-code">03 //</span>
          <span>SELECTED WORK</span>
        </div>
        <h2 className="display-section">
          Real products, live prototypes, and cross-platform{' '}
          <em className="editorial-italic">builds</em>.
        </h2>

        <div className="work-split-layout">
          {/* Left Project Narrative Stack (Container-Query Cards) */}
          <div className="work-cards-stack">
            {PROJECTS.map((project, idx) => {
              const isActive = project.id === activeProject.id;

              return (
                <div key={project.id} className="project-card-container">
                  <article
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
                    onFocus={() => setActiveProjectId(project.id)}
                  >
                    <div className="project-meta-top">
                      <span>
                        {project.index} / 0{PROJECTS.length} · {project.category}
                      </span>
                      <span>{project.timeline}</span>
                    </div>

                    {project.badge && (
                      <div className="project-status-badge">{project.badge}</div>
                    )}

                    {/* Inline Responsive WebP Picture (shown whenever pinned stage is disabled, e.g. <1280px or <720px laptop height) */}
                    <div className="project-inline-media">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={`${project.imageWebpSm} 640w, ${project.imageWebp} 1280w`}
                          sizes="(max-width: 767px) 92vw, 680px"
                        />
                        <img
                          src={project.image}
                          alt={`${project.title} interface showcase`}
                          width="1280"
                          height="720"
                          loading={idx === 0 ? 'eager' : 'lazy'}
                        />
                      </picture>
                    </div>

                    <h3 className="project-title">{project.title}</h3>

                    {/* Zero-CLS Stacked Summary Grid */}
                    <div className="lens-stack-grid">
                      <p
                        className={`project-summary ${
                          lens === 'engineer' ? '' : 'lens-variant-hidden'
                        }`}
                        aria-hidden={lens !== 'engineer'}
                      >
                        {project.engineerSummary}
                      </p>
                      <p
                        className={`project-summary ${
                          lens === 'client' ? '' : 'lens-variant-hidden'
                        }`}
                        aria-hidden={lens !== 'client'}
                      >
                        {project.clientSummary}
                      </p>
                    </div>

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
                        <ExternalLink size={15} />
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
                        onMouseEnter={() => setCursorLabel('EXPLORE')}
                        onMouseLeave={() => setCursorLabel('')}
                      >
                        <span>Case Study</span>
                        <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Right Pinned Stage (Active ONLY when >=1280px AND height >=720px per §3.1) */}
          <aside
            className="work-sticky-stage"
            data-xray-module="PINNED_STAGE · 3D_DEVICE_MORPH"
          >
            <div className="work-stage-3d-box">
              <Suspense fallback={null}>
                <SpatialDeviceForge
                  mode={activeProject.stageMode}
                  imageUrl={activeProject.imageWebp}
                  captionLeft={`ACTIVE // ${activeProject.shortName.toUpperCase()}`}
                  captionRight={`MEDIUM: ${activeProject.stageMode.toUpperCase()}`}
                  ariaDescription={`3D ${activeProject.stageMode} preview displaying ${activeProject.title}`}
                />
              </Suspense>
            </div>

            <div className="work-stage-preview-strip">
              <div style={{ minWidth: 0 }}>
                <div
                  className="mono-tag"
                  style={{ color: 'var(--accent-text)', marginBottom: 4 }}
                >
                  {activeProject.index} · INTERACTIVE STAGE PREVIEW
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
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
                style={{ minHeight: 42, padding: '8px 14px', fontSize: 13 }}
                onClick={() => setActiveCaseStudy(activeProject)}
              >
                <span>Case Study</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </aside>
        </div>

        {/* Lab Spotlight: Shokti (<span lang="bn">শক্তি</span>) with Proper Bangla Font Token */}
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
            <h3 className="project-title" style={{ marginBottom: 8 }}>
              {SHOKTI_LAB.namePrefix}
              <span lang="bn">{SHOKTI_LAB.nameBangla}</span>
              {SHOKTI_LAB.nameSuffix}
            </h3>
            <p
              style={{
                color: 'var(--text-primary)',
                fontWeight: 500,
                marginBottom: 10,
                fontSize: 16.5,
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
              borderRadius: 'var(--radius-card)',
              background: 'var(--bg-canvas)',
              border: 'var(--hairline) solid var(--border-seam)',
            }}
          >
            <div className="mono-tag" style={{ color: 'var(--accent-telemetry)' }}>
              // R&amp;D ARCHITECTURE
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              React Native · Expo · Offline-First Overload Engine · Bilingual EN/BN
              Gym Cue System
            </div>
            <button
              type="button"
              id="shokti-roadmap-btn"
              className="btn-secondary"
              style={{ marginTop: 4, width: '100%' }}
              onClick={() => {
                soundEngine.playClick(660, 0.03);
                setShoktiModalOpen(true);
              }}
            >
              <Layers size={15} />
              <span>Inspect Roadmap</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
