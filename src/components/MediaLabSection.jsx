import { Film, Sparkles } from 'lucide-react';
import { MEDIA_SYSTEMS } from '../data/portfolioData';
import { handleSpecularMouseMove } from '../utils/scrambleText';
import { soundEngine } from '../utils/soundEngine';

export default function MediaLabSection() {
  return (
    <section
      id="media"
      className="section-shell"
      data-xray-module="SECTION_04 · BEYOND_CODE_AI_MEDIA"
    >
      <div className="container">
        <div className="eyebrow-telemetry">
          <span className="index-code">04 //</span>
          <span>MULTIDISCIPLINARY EDGE</span>
        </div>
        <h2 className="display-section">
          Engineering meets growth media and local{' '}
          <em className="editorial-italic">AI pipelines</em>.
        </h2>
        <p className="lead-copy" style={{ marginTop: 14 }}>
          Great products don&apos;t just work—they communicate. Alongside software
          engineering, I build high-converting short-form video systems and
          automated local AI media pipelines for clients in Dhaka and Europe.
        </p>

        <div className="media-grid">
          {MEDIA_SYSTEMS.map((item) => (
            <article
              key={item.id}
              className="specular-card media-card"
              onMouseMove={handleSpecularMouseMove}
              onMouseEnter={() => soundEngine.playHoverTick()}
              data-xray-module={`MEDIA_PIPE · ${item.id.toUpperCase()}`}
            >
              <div>
                <div
                  className="mono-tag"
                  style={{ color: 'var(--accent-rose)', marginBottom: 10 }}
                >
                  {item.tag}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 1.9vw, 24px)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    marginBottom: 4,
                  }}
                >
                  {item.client}
                </h3>
                <div
                  className="mono-tag"
                  style={{ color: 'var(--text-muted)', marginBottom: 14 }}
                >
                  {item.location}
                </div>
                <p
                  style={{
                    fontSize: 14.5,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.62,
                  }}
                >
                  {item.scope}
                </p>
              </div>

              {/* 9:16 Vertical Broadcast Safe-Area Frame Simulator */}
              <div className="reel-frame-9x16" aria-hidden="true">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: 9.5,
                    fontFamily: 'var(--font-mono)',
                    color: '#a1a1aa',
                  }}
                >
                  <span>9:16</span>
                  <Film size={12} style={{ color: '#e11d48' }} />
                </div>

                <div style={{ margin: 'auto 0' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 9,
                      fontFamily: 'var(--font-mono)',
                      color: '#22d3ee',
                      marginBottom: 6,
                    }}
                  >
                    <Sparkles size={10} />
                    <span>{item.reelMeta.badge}</span>
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      lineHeight: 1.38,
                      fontWeight: 600,
                      color: '#f4f4f6',
                    }}
                  >
                    {item.reelMeta.captionSample}
                  </div>
                </div>

                <div>
                  <div className="reel-wave-bars">
                    {[35, 70, 50, 88, 42, 76, 60, 32, 68, 48].map((h, idx) => (
                      <span
                        key={idx}
                        className="reel-wave-bar"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 9,
                      fontFamily: 'var(--font-mono)',
                      color: '#71717a',
                    }}
                  >
                    {item.reelMeta.pipeline}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
