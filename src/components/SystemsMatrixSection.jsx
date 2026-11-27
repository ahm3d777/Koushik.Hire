import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { PROJECTS, SYSTEMS_MATRIX } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { handleSpecularMouseMove } from '../utils/scrambleText';
import { soundEngine } from '../utils/soundEngine';

const FILTERS = ['All', 'Frontend', 'Mobile', 'Edge & Cloud', 'AI & Media'];

export default function SystemsMatrixSection() {
  const { setActiveCaseStudy } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTool, setSelectedTool] = useState(SYSTEMS_MATRIX[0].tools[0]);
  const [openLayerIds, setOpenLayerIds] = useState(['interface']);

  const visibleLayers =
    activeFilter === 'All'
      ? SYSTEMS_MATRIX
      : SYSTEMS_MATRIX.filter((layer) => layer.filterKey === activeFilter);

  const linkedProjects = selectedTool
    ? PROJECTS.filter((p) => selectedTool.projects.includes(p.id))
    : [];

  const toggleAccordionLayer = (id) => {
    setOpenLayerIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="stack"
      className="section-shell"
      data-xray-module="SECTION_05 · SYSTEMS_MATRIX"
    >
      <div className="container">
        <div className="eyebrow-telemetry">
          <span className="index-code">05 //</span>
          <span>TECHNICAL ARCHITECTURE</span>
        </div>
        <h2 className="display-section">
          Tools I ship <em className="editorial-italic">production</em> work
          with.
        </h2>
        <p className="lead-copy" style={{ marginTop: 12 }}>
          No percentage bars or star ratings. Hover or tap any technology chip
          to highlight the shipped projects that used it.
        </p>

        {/* Scroll-Snap Filter Pills */}
        <div
          className="matrix-filter-bar"
          role="tablist"
          aria-label="Architecture Layer Filter"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              className={`filter-pill ${
                activeFilter === filter ? 'active' : ''
              }`}
              onClick={() => {
                soundEngine.playClick(580, 0.025);
                setActiveFilter(filter);
                if (filter !== 'All') {
                  const matched = SYSTEMS_MATRIX.find(
                    (l) => l.filterKey === filter
                  );
                  if (matched && !openLayerIds.includes(matched.id)) {
                    setOpenLayerIds((prev) => [...prev, matched.id]);
                  }
                }
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 4-Layer Grid on md+/lg+, Accordion by Layer on Mobile Base (§5 Section 05) */}
        <div className="matrix-layers">
          {visibleLayers.map((layer, idx) => {
            const isOpenOnMobile = openLayerIds.includes(layer.id);

            return (
              <div
                key={layer.id}
                className="specular-card matrix-layer-card"
                onMouseMove={handleSpecularMouseMove}
                data-xray-module={`LAYER_0${idx + 1} · ${layer.id.toUpperCase()}`}
              >
                <button
                  type="button"
                  className="matrix-accordion-trigger"
                  onClick={() => toggleAccordionLayer(layer.id)}
                  aria-expanded={isOpenOnMobile}
                >
                  <div>
                    <div
                      className="mono-tag"
                      style={{ color: 'var(--accent-text)', marginBottom: 4 }}
                    >
                      LAYER 0{idx + 1}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 21,
                        fontWeight: 600,
                      }}
                    >
                      {layer.layerName}
                    </h3>
                  </div>
                  <span className="matrix-accordion-chevron">
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpenOnMobile ? 'rotate(180deg)' : 'none',
                        transition: 'transform 200ms ease',
                      }}
                    />
                  </span>
                </button>

                <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                  {layer.role}
                </p>

                <div
                  className="matrix-tech-pills"
                  style={{
                    display: isOpenOnMobile ? 'flex' : undefined,
                  }}
                  data-mobile-collapsed={!isOpenOnMobile}
                >
                  <style>{`
                    @media (max-width: 767px) {
                      [data-mobile-collapsed="true"] { display: none !important; }
                    }
                  `}</style>
                  {layer.tools.map((tool) => {
                    const isSelected = selectedTool?.name === tool.name;
                    return (
                      <button
                        key={tool.name}
                        type="button"
                        className={`tech-node-btn ${
                          isSelected ? 'selected' : ''
                        }`}
                        aria-pressed={isSelected}
                        onMouseEnter={() => {
                          soundEngine.playHoverTick();
                          setSelectedTool(tool);
                        }}
                        onClick={() => {
                          soundEngine.playClick(620, 0.025);
                          // Sticky tap selection; tap again to clear (§3.3)
                          setSelectedTool((prev) =>
                            prev?.name === tool.name ? null : tool
                          );
                        }}
                      >
                        <span>{tool.name}</span>
                        {tool.projects.length > 0 && (
                          <span
                            className="mono-tag"
                            style={{
                              padding: '1px 6px',
                              borderRadius: 99,
                              background: 'var(--border-subtle)',
                              color: 'var(--text-muted)',
                            }}
                          >
                            {tool.projects.length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Relational Project Link Inspector */}
        {selectedTool && (
          <div
            className="matrix-inspector-bar"
            data-xray-module="RELATIONAL_LOOKUP · STACK_TO_WORK"
          >
            <div>
              <span
                className="mono-tag"
                style={{ color: 'var(--accent-telemetry)' }}
              >
                SELECTED CHIP:{' '}
              </span>
              <strong style={{ marginLeft: 6 }}>{selectedTool.name}</strong>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {linkedProjects.length > 0 ? (
                linkedProjects.map((proj) => (
                  <button
                    key={proj.id}
                    type="button"
                    className="hud-pill-btn"
                    onClick={() => setActiveCaseStudy(proj)}
                  >
                    <span>{proj.shortName}</span>
                    <ArrowUpRight size={12} />
                  </button>
                ))
              ) : (
                <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
                  Used in Centria / JTC Local AI Media &amp; Dev Pipelines
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
