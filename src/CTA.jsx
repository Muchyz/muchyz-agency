import { useRef, useEffect, useState, useCallback } from "react";

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

const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=90&auto=format&fit=crop&crop=center",
    label: "Open Now",
    sub: "We're available today",
  },
  {
    url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&q=90&auto=format&fit=crop&crop=center",
    label: "Chat Us",
    sub: "Reply within 2 hours",
  },
  {
    url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=90&auto=format&fit=crop&crop=center",
    label: "Our Team",
    sub: "Experts at your service",
  },
  {
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=90&auto=format&fit=crop&crop=center",
    label: "We Build",
    sub: "Fast & modern solutions",
  },
];

export default function CTA() {
  const [rootRef, inView] = useInView(0.08);
  const [slide, setSlide] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setSlide(s => (s + 1) % SLIDES.length);
        setFading(false);
      }, 500);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i) => {
    if (i === slide) return;
    setFading(true);
    setTimeout(() => { setSlide(i); setFading(false); }, 500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');

        :root {
          --white   : #ffffff;
          --paper   : #f5f7ff;
          --ink     : #0f172a;
          --ink-2   : #1e293b;
          --muted   : #64748b;
          --line    : rgba(0,0,0,0.08);
          --blue    : #1d4ed8;
          --blue-2  : #1e40af;
          --blue-lt : #eff6ff;
          --gold    : #b8973a;
          --gold-lt : #f5edda;
          --green   : #15803d;

          --font-d  : 'Cormorant', Georgia, serif;
          --font-b  : 'DM Sans', system-ui, sans-serif;
          --ease    : cubic-bezier(0.16, 1, 0.3, 1);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cta {
          font-family: var(--font-b);
          background: var(--white);
          position: relative;
          overflow: hidden;
          isolation: isolate;
          border-top: 1px solid var(--line);
        }

        .cta__noise {
          position: absolute;
          inset: 0;
          opacity: 0.018;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
          pointer-events: none;
          z-index: 0;
        }

        .cta__glow {
          position: absolute;
          width: 600px; height: 600px;
          top: -200px; right: -160px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(29,78,216,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Layout ── */
        .cta__inner {
          position: relative; z-index: 1;
          max-width: 1360px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 720px;
          align-items: stretch;
        }

        /* ── LEFT — Slideshow ── */
        .cta__media {
          position: relative;
          display: flex;
          align-items: stretch;
          padding: 64px 64px 64px 56px;
          gap: 20px;
          border-right: 1px solid var(--line);
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 1s var(--ease), transform 1s var(--ease);
        }
        .cta__media.is-in { opacity: 1; transform: translateX(0); }

        .cta__frame {
          position: relative;
          flex: 1;
          border-radius: 4px;
          overflow: hidden;
          box-shadow:
            0 1px 2px rgba(0,0,0,0.04),
            0 4px 16px rgba(0,0,0,0.07),
            0 16px 48px rgba(0,0,0,0.09),
            0 32px 80px rgba(0,0,0,0.06);
        }

        .cta__slide-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          position: absolute;
          inset: 0;
          filter: contrast(1.04) brightness(0.93);
          transition: opacity 0.5s ease, transform 8s ease;
        }
        .cta__slide-img.is-fading { opacity: 0; }
        .cta__slide-img:not(.is-fading) { opacity: 1; transform: scale(1.03); }

        .cta__img-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(15,23,42,0.55) 0%,
            rgba(15,23,42,0.15) 35%,
            transparent 65%
          );
          z-index: 1;
        }

        /* Slide label */
        .cta__slide-label {
          position: absolute;
          bottom: 70px; left: 24px;
          z-index: 2;
          transition: opacity 0.4s ease;
        }
        .cta__slide-label.is-fading { opacity: 0; }
        .cta__slide-label-title {
          font-family: var(--font-d);
          font-size: 32px;
          font-weight: 400;
          font-style: italic;
          color: #fff;
          letter-spacing: -0.01em;
          line-height: 1;
          display: block;
        }
        .cta__slide-label-sub {
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-top: 5px;
          display: block;
        }

        /* Dots */
        .cta__dots {
          position: absolute;
          bottom: 24px; left: 24px;
          z-index: 2;
          display: flex;
          gap: 7px;
          align-items: center;
        }
        .cta__dot {
          width: 20px; height: 3px;
          border-radius: 2px;
          background: rgba(255,255,255,0.35);
          cursor: pointer;
          transition: background 0.3s ease, width 0.3s ease;
          border: none;
          padding: 0;
        }
        .cta__dot.active {
          background: #fff;
          width: 32px;
        }

        /* Badge */
        .cta__badge {
          position: absolute;
          top: 24px; left: 24px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.97);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 2px;
          padding: 8px 14px;
          font-size: 11px;
          font-weight: 600;
          color: var(--blue-2);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          backdrop-filter: blur(12px);
        }
        .cta__badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
          animation: dotPulse 2.4s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.45); }
          55%      { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
        }

        /* Index aside */
        .cta__index {
          display: flex; flex-direction: column;
          align-items: center; gap: 10px;
          align-self: center;
          opacity: 0.22; user-select: none;
        }
        .cta__index-num {
          font-family: var(--font-d); font-size: 11px;
          font-weight: 400; letter-spacing: 0.08em;
          color: var(--gold); writing-mode: vertical-rl;
        }
        .cta__index-rule {
          width: 1px; height: 48px;
          background: var(--gold);
        }
        .cta__index-label {
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--gold); writing-mode: vertical-rl;
        }

        /* ── RIGHT — Content ── */
        .cta__content {
          padding: 80px 64px 80px 72px;
          display: flex; flex-direction: column;
          justify-content: center;
        }

        /* Label */
        .cta__label {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 40px;
          font-size: 10.5px; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--gold);
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.55s 0.1s var(--ease), transform 0.55s 0.1s var(--ease);
        }
        .cta__label.is-in { opacity: 1; transform: translateY(0); }
        .cta__label-rule {
          display: block; width: 24px; height: 1px;
          background: var(--gold); flex-shrink: 0;
        }

        /* Headline */
        .cta__heading-wrap { margin-bottom: 32px; }
        .cta__heading-line { overflow: hidden; line-height: 1; }
        .cta__h2 {
          font-family: var(--font-d);
          font-size: clamp(52px, 5.8vw, 82px);
          font-weight: 300; line-height: 1.06;
          letter-spacing: -0.025em;
          color: var(--ink);
          display: block;
          transform: translateY(105%);
          transition: transform 0.9s var(--ease);
        }
        .cta__h2.is-in { transform: translateY(0); }
        .cta__h2--accent {
          font-style: italic;
          color: var(--blue);
        }

        /* Body */
        .cta__body {
          font-size: 15.5px; font-weight: 300;
          line-height: 1.9; color: var(--muted);
          max-width: 380px; margin-bottom: 40px;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.7s 0.62s var(--ease), transform 0.7s 0.62s var(--ease);
        }
        .cta__body.is-in { opacity: 1; transform: translateY(0); }

        /* Rule */
        .cta__rule {
          height: 1px; background: linear-gradient(to right, var(--gold), transparent);
          margin-bottom: 36px;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.8s 0.7s var(--ease);
        }
        .cta__rule.is-in { transform: scaleX(1); }

        /* Button */
        .cta__action {
          margin-bottom: 32px;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.6s 0.8s var(--ease), transform 0.6s 0.8s var(--ease);
        }
        .cta__action.is-in { opacity: 1; transform: translateY(0); }

        .cta__cta-btn {
          display: inline-flex; align-items: center; gap: 18px;
          padding: 10px 22px 10px 10px;
          background: var(--ink);
          border-radius: 3px; text-decoration: none;
          transition: background 0.3s ease, transform 0.3s var(--ease), box-shadow 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.10);
        }
        .cta__cta-btn:hover {
          background: var(--blue-2);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(29,78,216,0.22), 0 16px 48px rgba(29,78,216,0.14);
        }
        .cta__cta-btn:active { transform: translateY(-1px); }

        .cta__cta-icon {
          width: 46px; height: 46px; border-radius: 2px;
          background: #25d366;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s var(--ease);
          box-shadow: 0 2px 8px rgba(37,211,102,0.3);
        }
        .cta__cta-btn:hover .cta__cta-icon {
          transform: scale(1.06);
          box-shadow: 0 4px 14px rgba(37,211,102,0.45);
        }

        .cta__cta-text { display: flex; flex-direction: column; gap: 2px; }
        .cta__cta-title { font-size: 14px; font-weight: 600; color: #fff; letter-spacing: 0.01em; }
        .cta__cta-sub { font-size: 11.5px; color: rgba(255,255,255,0.4); font-weight: 400; letter-spacing: 0.03em; }

        .cta__cta-arrow {
          display: flex; align-items: center;
          color: rgba(255,255,255,0.45);
          margin-left: auto;
          transition: transform 0.3s var(--ease), color 0.3s ease;
        }
        .cta__cta-btn:hover .cta__cta-arrow {
          transform: translateX(5px);
          color: rgba(255,255,255,0.9);
        }

        /* Trust */
        .cta__trust {
          display: flex; align-items: center; flex-wrap: wrap; gap: 20px;
          opacity: 0; transition: opacity 0.5s 1s var(--ease);
        }
        .cta__trust.is-in { opacity: 1; }
        .cta__trust-item {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11.5px; font-weight: 400;
          color: var(--muted); letter-spacing: 0.01em;
        }

        /* ── Marquee — BLUE ── */
        .cta__marquee-wrap {
          position: relative; z-index: 2;
          border-top: 1px solid rgba(29,78,216,0.15);
          overflow: hidden;
          background: var(--blue);
          padding: 13px 0;
        }
        .cta__marquee-track {
          display: flex; white-space: nowrap;
          animation: marquee 36s linear infinite;
          width: max-content;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .cta__marquee-item {
          font-size: 10px; font-weight: 600;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.22em; text-transform: uppercase;
          display: inline-flex; align-items: center; gap: 20px;
        }
        .cta__marquee-sep {
          color: var(--gold);
          font-size: 14px; line-height: 1;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .cta__inner { grid-template-columns: 1fr; min-height: auto; }
          .cta__media {
            min-height: 440px; padding: 48px 40px;
            border-right: none; border-bottom: 1px solid var(--line);
          }
          .cta__content { padding: 60px 40px 72px; }
          .cta__h2 { font-size: clamp(46px, 8vw, 72px); }
        }
        @media (max-width: 640px) {
          .cta__media { min-height: 320px; padding: 32px 24px; }
          .cta__index { display: none; }
          .cta__content { padding: 48px 24px 60px; }
          .cta__h2 { font-size: clamp(40px, 10vw, 60px); }
          .cta__body { max-width: 100%; }
          .cta__cta-btn { width: 100%; }
          .cta__trust { gap: 12px; }
        }
      `}</style>

      <section className="cta" ref={rootRef}>
        <div className="cta__noise" aria-hidden="true" />
        <div className="cta__glow"  aria-hidden="true" />

        <div className="cta__inner">

          {/* LEFT — Slideshow */}
          <div className={`cta__media ${inView ? "is-in" : ""}`}>
            <div className="cta__frame">

              {/* Active slide image */}
              <img
                className={`cta__slide-img ${fading ? "is-fading" : ""}`}
                src={SLIDES[slide].url}
                alt={SLIDES[slide].label}
                loading="lazy"
                key={slide}
              />
              <div className="cta__img-scrim" />

              {/* Open Now badge top-left */}
              <div className="cta__badge">
                <span className="cta__badge-dot" />
                <span>Open Now</span>
              </div>

              {/* Slide label */}
              <div className={`cta__slide-label ${fading ? "is-fading" : ""}`}>
                <span className="cta__slide-label-title">{SLIDES[slide].label}</span>
                <span className="cta__slide-label-sub">{SLIDES[slide].sub}</span>
              </div>

              {/* Dot navigation */}
              <div className="cta__dots">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    className={`cta__dot ${i === slide ? "active" : ""}`}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Vertical index */}
            <aside className="cta__index" aria-hidden="true">
              <span className="cta__index-num">01</span>
              <span className="cta__index-rule" />
              <span className="cta__index-label">CTA</span>
            </aside>
          </div>

          {/* RIGHT — Content */}
          <div className="cta__content">

            <div className={`cta__label ${inView ? "is-in" : ""}`}>
              <span className="cta__label-rule" />
              <span>Start a Project</span>
            </div>

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

            <p className={`cta__body ${inView ? "is-in" : ""}`}>
              We respond within 2 hours. Direct access to the team that
              designs, builds, and delivers — no intermediaries, no delays.
            </p>

            <div className={`cta__rule ${inView ? "is-in" : ""}`} />

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

        {/* ── Marquee — Blue bar ── */}
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
    </>
  );
}
