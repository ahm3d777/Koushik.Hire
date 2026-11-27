import { Cpu, GraduationCap, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { handleSpecularMouseMove } from '../utils/scrambleText';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="section-shell"
      data-xray-module="SECTION_07 · HUMAN_LAYER"
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
          {/* Left Narrative Column */}
          <div className="about-narrative">
            <p>
              I&apos;m <strong>Koushik Ahmed</strong>—a final-year Computer
              Science student and freelance web &amp; mobile developer based in{' '}
              <strong>Mohammadpur, Dhaka</strong>.
            </p>
            <p>
              I care deeply about the gap between &ldquo;it works on
              localhost&rdquo; and software that actually feels unmistakable in
              someone&apos;s hands. Whether I&apos;m pitching a live
              Cloudflare-deployed prototype to a local gym in Dhanmondi,
              building a cross-platform React Native app, or automating a local
              AI video pipeline for an international client, I obsess over
              speed, clarity, and real-world utility.
            </p>
            <p>
              Fluent in <strong>English and Bangla</strong>, I bridge
              international engineering standards with sharp local market
              execution. Outside of shipping code, you&apos;ll find me training
              at the gym 4–5 days a week—the same progressive-overload mindset I
              bring to every codebase I touch.
            </p>
          </div>

          {/* Right 3-Card Bento Column */}
          <div className="about-bento-col">
            {/* 1. Editorial Portrait Card */}
            <div
              className="specular-card portrait-bento"
              onMouseMove={handleSpecularMouseMove}
              data-xray-module="BENTO_PORTRAIT · EDITORIAL_FRAME"
            >
              <img
                src={SITE_CONFIG.portraitImage}
                alt="Koushik Ahmed — Editorial Portrait"
                loading="lazy"
              />
              <div className="portrait-caption">
                KOUSHIK AHMED · DHAKA, BD
              </div>
            </div>

            {/* 2. Education & Base Card */}
            <div
              className="specular-card"
              style={{
                padding: 22,
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
                  color: 'var(--accent-rose)',
                }}
              >
                <GraduationCap size={18} />
                <span className="mono-tag">ACADEMIC &amp; BASE</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15.5, marginBottom: 6 }}>
                  B.Sc. in Computer Science (Final Year)
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                  }}
                >
                  <MapPin size={13} />
                  <span>Dhaka, Bangladesh (GMT+6) · Remote-Ready Worldwide</span>
                </div>
              </div>
            </div>

            {/* 3. Workstation & Local Rig (Developer Easter Egg Card) */}
            <div
              className="specular-card"
              style={{
                padding: 22,
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
                <span className="mono-tag">WORKSTATION RIG</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6 }}>
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
