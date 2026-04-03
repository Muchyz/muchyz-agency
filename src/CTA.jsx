import { useRef, useEffect, useState, useCallback } from "react";
import "./CTA.css";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const MARQUEE = [
  "Web Design", "E-Commerce", "Brand Identity",
  "AI Solutions", "Custom Software", "Mobile First",
  "SEO Strategy", "Business Automation",
];

export default function CTA() {
  const [rootRef, inView] = useInView(0.08);

  return (
    <section className="cta" ref={rootRef}>

      {/* Background texture */}
      <div className="cta__noise" aria-hidden="true" />
      <div className="cta__glow"  aria-hidden="true" />

      {/* ── Main layout ── */}
      <div className="cta__inner">

        {/* LEFT — Photo column */}
        <div className={`cta__media ${inView ? "is-in" : ""}`}>
          <div className="cta__frame">
            <img
              className="cta__img"
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=90&auto=format&fit=crop&crop=center"
              alt="Professional agency workspace"
              loading="lazy"
            />
            <div className="cta__img-scrim" />

            {/* Availability badge */}
            <div className="cta__badge">
              <span className="cta__badge-dot" />
              <span>Available for new projects</span>
            </div>
          </div>

          {/* Vertical index label */}
          <aside className="cta__index" aria-hidden="true">
            <span className="cta__index-num">01</span>
            <span className="cta__index-rule" />
            <span className="cta__index-label">CTA</span>
          </aside>
        </div>

        {/* RIGHT — Content column */}
        <div className="cta__content">

          {/* Section label */}
          <div className={`cta__label ${inView ? "is-in" : ""}`}>
            <span className="cta__label-rule" />
            <span>Start a Project</span>
          </div>

          {/* Headline */}
          <div className="cta__heading-wrap">
            {[
              { text: "Ready to",    delay: "0.22s" },
              { text: "build your",  delay: "0.34s" },
              { text: "next great",  delay: "0.46s", accent: true },
              { text: "website?",    delay: "0.58s" },
            ].map(({ text, delay, accent }, i) => (
              <div className="cta__heading-line" key={i}>
                <h2
                  className={`cta__h2 ${inView ? "is-in" : ""} ${accent ? "cta__h2--accent" : ""}`}
                  style={{ transitionDelay: delay }}
                >
                  {text}
                </h2>
              </div>
            ))}
          </div>

          {/* Body */}
          <p className={`cta__body ${inView ? "is-in" : ""}`}>
            We respond within 2 hours. Direct access to the team that
            designs, builds, and delivers — no intermediaries, no delays.
          </p>

          {/* Divider */}
          <div className={`cta__rule ${inView ? "is-in" : ""}`} />

          {/* WhatsApp CTA — the only button */}
          <div className={`cta__action ${inView ? "is-in" : ""}`}>
            <a
              href="https://wa.me/254705427449"
              className="cta__cta-btn"
              target="_blank"
              rel="noreferrer"
            >
              <span className="cta__cta-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 2.107.546 4.14 1.587 5.932L.057 24l6.233-1.607A11.938 11.938 0 0012 24c6.626 0 12-5.374 12-12S18.626 0 12 0zm0 21.818a9.814 9.814 0 01-5.003-1.366l-.357-.214-3.703.954.983-3.596-.234-.37A9.761 9.761 0 012.182 12c0-5.421 4.397-9.818 9.818-9.818 5.422 0 9.818 4.397 9.818 9.818 0 5.422-4.396 9.818-9.818 9.818z"/>
                </svg>
              </span>
              <span className="cta__cta-text">
                <span className="cta__cta-title">Begin on WhatsApp</span>
                <span className="cta__cta-sub">+254 705 427 449</span>
              </span>
              <span className="cta__cta-arrow" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
          </div>

          {/* Trust line */}
          <div className={`cta__trust ${inView ? "is-in" : ""}`}>
            {["No contracts required", "Free initial consultation", "Results within 3 days"].map((t, i) => (
              <span key={i} className="cta__trust-item">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {t}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* ── Marquee ── */}
      <div className="cta__marquee-wrap">
        <div className="cta__marquee-track">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="cta__marquee-item">
              {w}
              <span className="cta__marquee-sep" aria-hidden="true">·</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
