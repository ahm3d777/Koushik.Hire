import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, SYSTEMS_MATRIX } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { handleSpecularMouseMove } from '../utils/scrambleText';
import { soundEngine } from '../utils/soundEngine';

const FILTERS = [
  'All',
  'Interface & Design',
  'Mobile',
  'Edge & Cloud',
  'Quality & AI',
];

export default function SystemsMatrixSection() {
  const { setActiveCaseStudy } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('All');
  const [inspectedTool, setInspectedTool] = useState(
    SYSTEMS_MATRIX[0].tools[0]
  );

  const visibleLayers =
    activeFilter === 'All'
      ? SYSTEMS_MATRIX
      : SYSTEMS_MATRIX.filter((layer) => layer.filterKey === activeFilter);

  const linkedProjects = PROJECTS.filter((p) =>
    inspectedTool.projects.includes(p.id)
  );

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
          Zero arbitrary skill-percentage bars. Select or hover any technology
          node below to inspect how it powers real shipped work in this
          portfolio.
        </p>

        {/* Filter Pills */}
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
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 4-Layer Relational Systems Matrix */}
        <div className="matrix-layers">
          {visibleLayers.map((layer, idx) => (
            <div
              key={layer.id}
              className="specular-card matrix-layer-row"
              onMouseMove={handleSpecularMouseMove}
              data-xray-module={`LAYER_0${idx + 1} · ${layer.id.toUpperCase()}`}
            >
              <div>
                <div
                  className="mono-tag"
                  style={{ color: 'var(--accent-rose)', marginBottom: 6 }}
                >
                  LAYER 0{idx + 1}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  {layer.layerName}
                </h3>
                <p style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
                  {layer.role}
                </p>
              </div>

              <div className="matrix-tech-pills">
                {layer.tools.map((tool) => {
                  const isSelected = inspectedTool.name === tool.name;
                  return (
                    <button
                      key={tool.name}
                      type="button"
                      className={`tech-node-btn ${
                        isSelected ? 'selected' : ''
                      }`}
                      onMouseEnter={() => {
                        soundEngine.playHoverTick();
                        setInspectedTool(tool);
                      }}
                      onClick={() => {
                        soundEngine.playClick(620, 0.025);
                        setInspectedTool(tool);
                      }}
                    >
                      <span>{tool.name}</span>
                      {tool.projects.length > 0 && (
                        <span
                          className="mono-tag"
                          style={{
                            fontSize: 10,
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
          ))}
        </div>

        {/* Live Relational Project Link Inspector */}
        <div
          className="matrix-inspector-bar"
          data-xray-module="RELATIONAL_LOOKUP · STACK_TO_WORK"
        >
          <div>
            <span className="mono-tag" style={{ color: 'var(--accent-telemetry)' }}>
              INSPECTING NODE:{' '}
            </span>
            <strong style={{ marginLeft: 6 }}>{inspectedTool.name}</strong>
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
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Used in Centria / JTC Local AI Media &amp; Dev Pipelines
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
