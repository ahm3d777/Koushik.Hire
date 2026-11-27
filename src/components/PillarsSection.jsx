import { PILLARS } from '../data/portfolioData';
import { handleSpecularMouseMove } from '../utils/scrambleText';
import { soundEngine } from '../utils/soundEngine';

export default function PillarsSection() {
  return (
    <section
      id="principles"
      className="section-shell"
      data-xray-module="SECTION_02 · OPERATING_PRINCIPLES"
    >
      <div className="container">
        <div className="eyebrow-telemetry">
          <span className="index-code">02 //</span>
          <span>OPERATING PRINCIPLES</span>
        </div>
        <h2 className="display-section">
          Built like a product team, shipped with solo{' '}
          <em className="editorial-italic">velocity</em>.
        </h2>

        <div className="pillars-bento">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.id}
              className={`specular-card pillar-card ${pillar.span}`}
              onMouseMove={handleSpecularMouseMove}
              onMouseEnter={() => soundEngine.playHoverTick()}
              data-xray-module={pillar.xrayTag}
            >
              <div className="pillar-index">
                <span>{pillar.code}</span>
                <span style={{ color: 'var(--text-muted)' }}>// SYS</span>
              </div>
              <div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-copy">{pillar.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
