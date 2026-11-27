import { Cpu, GraduationCap, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { handleSpecularMouseMove } from '../utils/scrambleText';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="section-shell"
      data-xray-module="SECTION_07 · BEHIND_THE_SCREEN"
    >
      <div className="container">
        <div className="eyebrow-telemetry">
          <span className="index-code">07 //</span>
          <span>BEHIND THE SCREEN</span>
        </div>
        <h2 className="display-section">
          Disciplined in code. Disciplined in{' '}
          <em className="editorial-italic">craft</em>.
        </h2>

        <div className="about-layout">
          {/* Left 7/12 Narrative Column */}
          <div className="about-narrative">
            <p>
              I&apos;m <strong>Koushik Ahmed</strong>, a final-year Computer
              Science student and freelance web &amp; mobile developer based in{' '}
              <strong>Dhaka</strong>.
            </p>
            <p>
              I care about the gap between &ldquo;it works on localhost&rdquo;
              and software that feels right in someone&apos;s hands. Whether
              I&apos;m pitching a live prototype to a local gym, building a
              cross-platform React Native app, or automating an AI video
              pipeline for an international client, I focus on speed, clarity,
              and real-world usefulness.
            </p>
            <p>
              Fluent in <strong>English and Bangla</strong>, I bring
              international engineering standards to sharp local execution.
              Outside of code, I train 4–5 days a week, with the same
              progressive-overload mindset I bring to every codebase.
            </p>
          </div>

          {/* Right 5/12 Bento Stack (Ordered First on Mobile Base per §5 Section 07) */}
          <div className="about-bento-col">
            {/* 1. Editorial 4:5 Portrait */}
            <div
              className="specular-card portrait-bento"
              onMouseMove={handleSpecularMouseMove}
              data-xray-module="BENTO_PORTRAIT · 4_BY_5_FRAME"
            >
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${SITE_CONFIG.portraitWebpSm} 640w, ${SITE_CONFIG.portraitWebp} 1200w`}
                  sizes="(max-width: 767px) 92vw, 480px"
                />
                <img
                  src={SITE_CONFIG.portraitFallback}
                  alt="Koushik Ahmed — Editorial Portrait"
                  width="640"
                  height="800"
                  loading="lazy"
                />
              </picture>
              <div className="portrait-caption">
                KOUSHIK AHMED · DHAKA, BD
              </div>
            </div>

            {/* 2. Education & Base */}
            <div
              className="specular-card"
              style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 14,
              }}
              onMouseMove={handleSpecularMouseMove}
              data-xray-module="BENTO_BASE · GMT_PLUS_6"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: 'var(--accent-text)',
                }}
              >
                <GraduationCap size={18} />
                <span className="mono-tag">BASE</span>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15.5, marginBottom: 6 }}>
                  B.Sc. Computer Science (Final Year)
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13.5,
                    color: 'var(--text-secondary)',
                  }}
                >
                  <MapPin size={13} style={{ flexShrink: 0 }} />
                  <span>Dhaka, Bangladesh · GMT+6 · Remote-ready worldwide</span>
                </div>
              </div>
            </div>

            {/* 3. Workstation Easter-Egg Card */}
            <div
              className="specular-card"
              style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 14,
              }}
              onMouseMove={handleSpecularMouseMove}
              data-xray-module="BENTO_RIG · LOCAL_AI_WORKSTATION"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: 'var(--accent-telemetry)',
                }}
              >
                <Cpu size={18} />
                <span className="mono-tag">WORKSTATION</span>
              </div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6 }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {SITE_CONFIG.workstation.cpu} · {SITE_CONFIG.workstation.ram}
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  {SITE_CONFIG.workstation.gpu} ·{' '}
                  {SITE_CONFIG.workstation.capability}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
