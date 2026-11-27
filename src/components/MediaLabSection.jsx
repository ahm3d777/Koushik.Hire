import { useState } from 'react';
import { Pause, Play, Sparkles } from 'lucide-react';
import { MEDIA_SYSTEMS } from '../data/portfolioData';
import { handleSpecularMouseMove } from '../utils/scrambleText';
import { soundEngine } from '../utils/soundEngine';

export default function MediaLabSection() {
  const [playingId, setPlayingId] = useState(null);

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
          Great products don&apos;t just work; they communicate. Alongside
          software, I build short-form video systems and local AI media
          pipelines for clients in Dhaka and Europe.
        </p>

        <div className="media-grid">
          {MEDIA_SYSTEMS.map((item) => {
            const isPlaying = playingId === item.id;

            return (
              <article
                key={item.id}
                className="specular-card media-card"
                onMouseMove={handleSpecularMouseMove}
                onMouseEnter={() => {
                  soundEngine.playHoverTick();
                  setPlayingId(item.id);
                }}
                onMouseLeave={() => setPlayingId(null)}
                data-xray-module={`MEDIA_PIPE · ${item.id.toUpperCase()}`}
              >
                <div>
                  <div
                    className="mono-tag"
                    style={{ color: 'var(--accent-text)', marginBottom: 10 }}
                  >
                    {item.tag}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--fs-h3)',
                      fontWeight: 600,
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
                      fontSize: 15.5,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.62,
                    }}
                  >
                    {item.scope}
                  </p>
                </div>

                {/* 9:16 Vertical Frame with Tap-to-Play & Keyboard Accessibility (§3.3) */}
                <button
                  type="button"
                  className={`reel-frame-9x16 ${isPlaying ? 'playing' : ''}`}
                  onClick={() =>
                    setPlayingId((prev) => (prev === item.id ? null : item.id))
                  }
                  aria-pressed={isPlaying}
                  aria-label={`Toggle reel preview for ${item.client}`}
                >
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 12,
                      fontFamily: 'var(--font-mono)',
                      color: '#a1a1aa',
                    }}
                  >
                    <span>9:16</span>
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: 'rgba(225, 29, 72, 0.9)',
                        color: '#fff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                    </span>
                  </div>

                  <div style={{ margin: 'auto 0', textAlign: 'left' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 11,
                        fontFamily: 'var(--font-mono)',
                        color: '#22d3ee',
                        marginBottom: 6,
                      }}
                    >
                      <Sparkles size={11} />
                      <span>{item.reelMeta.badge}</span>
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        lineHeight: 1.4,
                        fontWeight: 600,
                        color: '#f4f4f6',
                      }}
                    >
                      {item.reelMeta.captionSample}
                    </div>
                  </div>

                  <div style={{ width: '100%', textAlign: 'left' }}>
                    <div className="reel-wave-bars">
                      {[35, 70, 50, 88, 42, 76, 60, 32, 68, 48].map(
                        (h, idx) => (
                          <span
                            key={idx}
                            className="reel-wave-bar"
                            style={{ height: `${h}%` }}
                          />
                        )
                      )}
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 11,
                        fontFamily: 'var(--font-mono)',
                        color: '#a1a1aa',
                      }}
                    >
                      {item.reelMeta.pipeline}
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
