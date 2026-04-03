import { useRef, useEffect, useState } from "react";

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
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=95&auto=format&fit=crop&crop=center",
    label: "Open Now",
    sub: "We're available today",
    tag: "Available",
    icon: "clock",
    accent: "#22c55e",
    position: "center",
  },
  {
    url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=95&auto=format&fit=crop&crop=center",
    label: "Chat Us",
    sub: "Reply within 2 hours",
    tag: "Instant",
    icon: "chat",
    accent: "#3b82f6",
    position: "center top",
  },
  {
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=95&auto=format&fit=crop&crop=faces",
    label: "Our Team",
    sub: "Experts at your service",
    tag: "People",
    icon: "team",
    accent: "#b8973a",
    position: "center 30%",
  },
  {
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=95&auto=format&fit=crop&crop=center",
    label: "We Build",
    sub: "Fast & modern solutions",
    tag: "Craft",
    icon: "code",
    accent: "#a855f7",
    position: "center",
  },
];

const INTERVAL = 4500;

function SlideIcon({ type }) {
  const props = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "clock") return <svg {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
  if (type === "chat")  return <svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
  if (type === "team")  return <svg {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
  if (type === "code")  return <svg {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
  return null;
}

export default function CTA() {
  const [rootRef, inView] = useInView(0.08);
  const [slide, setSlide] = useState(0);
  const [prev, setPrev]   = useState(null);
  const [busy, setBusy]   = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef   = useRef(null);
  const timerRef = useRef(null);

  const goTo = (i) => {
    if (i === slide || busy) return;
    setBusy(true);
    setPrev(slide);
    setSlide(i);
    setProgress(0);
    setTimeout(() => { setPrev(null); setBusy(false); }, 700);
  };

  useEffect(() => {
    setProgress(0);
    const start = performance.now();
    const tick = (now) => {
      const pct = Math.min(((now - start) / INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    timerRef.current = setTimeout(() => {
      const next = (slide + 1) % SLIDES.length;
      setBusy(true); setPrev(slide); setSlide(next); setProgress(0);
      setTimeout(() => { setPrev(null); setBusy(false); }, 700);
    }, INTERVAL);
    return () => { clearTimeout(timerRef.current); cancelAnimationFrame(rafRef.current); };
  }, [slide]);

  const cur = SLIDES[slide];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');

        :root {
          --white  : #ffffff;
          --ink    : #0f172a;
          --muted  : #64748b;
          --line   : rgba(0,0,0,0.08);
          --blue   : #1d4ed8;
          --blue-2 : #1e40af;
          --gold   : #b8973a;
          --font-d : 'Cormorant', Georgia, serif;
          --font-b : 'DM Sans', system-ui, sans-serif;
          --ease   : cubic-bezier(0.16, 1, 0.3, 1);
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cta {
          font-family: var(--font-b);
          background: var(--white);
          position: relative; overflow: hidden;
          isolation: isolate;
          border-top: 1px solid var(--line);
        }
        .cta__glow {
          position: absolute; width: 700px; height: 700px;
          top: -250px; right: -180px; border-radius: 50%;
          background: radial-gradient(circle, rgba(29,78,216,0.055) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        .cta__inner {
          position: relative; z-index: 1;
          max-width: 1360px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          min-height: 740px; align-items: stretch;
        }

        /* ─── LEFT PANEL ─── */
        .cta__media {
          position: relative;
          padding: 56px 56px 56px 52px;
          display: flex; align-items: stretch; gap: 18px;
          border-right: 1px solid var(--line);
          opacity: 0; transform: translateX(-24px);
          transition: opacity 1s var(--ease), transform 1s var(--ease);
        }
        .cta__media.is-in { opacity: 1; transform: translateX(0); }

        .cta__frame {
          position: relative; flex: 1;
          border-radius: 6px; overflow: hidden;
          box-shadow:
            0 2px 4px rgba(0,0,0,0.06),
            0 8px 24px rgba(0,0,0,0.10),
            0 24px 64px rgba(0,0,0,0.12),
            0 48px 96px rgba(0,0,0,0.08);
        }
        /* Gold corner lines */
        .cta__frame::before,
        .cta__frame::after {
          content: ''; position: absolute; z-index: 10; pointer-events: none;
        }
        .cta__frame::before {
          top: 0; right: 0; width: 72px; height: 72px;
          border-top: 1.5px solid var(--gold);
          border-right: 1.5px solid var(--gold);
          border-radius: 0 6px 0 0;
        }
        .cta__frame::after {
          bottom: 0; left: 0; width: 72px; height: 72px;
          border-bottom: 1.5px solid rgba(184,151,58,0.45);
          border-left: 1.5px solid rgba(184,151,58,0.45);
          border-radius: 0 0 0 6px;
        }

        /* Slide layers */
        .cta__slide {
          position: absolute; inset: 0; will-change: opacity;
        }
        .cta__slide img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: contrast(1.06) brightness(0.86) saturate(1.1);
        }
        .cta__slide--active img { animation: kenburns 6s ease-out forwards; }
        @keyframes kenburns { from { transform: scale(1.07); } to { transform: scale(1.0); } }
        .cta__slide--prev   { animation: fadeOut 0.7s var(--ease) forwards; }
        .cta__slide--active { animation: fadeIn  0.7s var(--ease) forwards; }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }

        /* Cinematic scrim */
        .cta__scrim {
          position: absolute; inset: 0; z-index: 2;
          background:
            linear-gradient(to top,  rgba(4,8,28,0.75) 0%, rgba(4,8,28,0.22) 42%, transparent 66%),
            linear-gradient(to right, rgba(4,8,28,0.30) 0%, transparent 52%);
        }

        /* Top row */
        .cta__top-row {
          position: absolute; top: 20px; left: 20px; right: 20px;
          z-index: 4; display: flex; align-items: center; justify-content: space-between;
        }
        .cta__badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.97);
          border: 1px solid rgba(255,255,255,0.88);
          border-radius: 100px; padding: 6px 14px 6px 8px;
          font-size: 11px; font-weight: 600; color: #0f172a;
          letter-spacing: 0.04em;
          box-shadow: 0 4px 16px rgba(0,0,0,0.16);
          backdrop-filter: blur(10px);
        }
        .cta__badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22c55e; flex-shrink: 0;
          animation: bdot 2.2s ease-in-out infinite;
        }
        @keyframes bdot {
          0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          55%      { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }
        .cta__counter {
          font-family: var(--font-d); font-size: 13px; font-weight: 300;
          color: rgba(255,255,255,0.6); letter-spacing: 0.08em;
        }
        .cta__counter strong { font-weight: 500; color: #fff; font-size: 15px; }

        /* Per-slide accent tag — centered top */
        .cta__tag {
          position: absolute; top: 20px; left: 50%; transform: translateX(-50%);
          z-index: 4;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 13px; border-radius: 100px;
          font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
          border: 1px solid; backdrop-filter: blur(12px);
          white-space: nowrap;
          transition: background 0.5s ease, color 0.5s ease, border-color 0.5s ease;
        }

        /* Bottom overlay */
        .cta__bottom {
          position: absolute; bottom: 0; left: 0; right: 0;
          z-index: 4; padding: 0 24px;
        }

        /* Progress bar */
        .cta__progress-wrap {
          display: flex; gap: 5px; margin-bottom: 18px;
        }
        .cta__prog-seg {
          flex: 1; height: 2px; border-radius: 2px;
          background: rgba(255,255,255,0.2); overflow: hidden; cursor: pointer; position: relative;
        }
        .cta__prog-fill {
          position: absolute; inset: 0; background: #fff;
          transform-origin: left; border-radius: 2px; transition: none;
        }

        /* Label + nav */
        .cta__slide-row {
          display: flex; align-items: flex-end; justify-content: space-between;
          padding-bottom: 22px;
        }
        .cta__slide-title {
          font-family: var(--font-d); font-size: 44px; font-weight: 300;
          font-style: italic; color: #fff; letter-spacing: -0.02em; line-height: 1;
          display: block; text-shadow: 0 2px 20px rgba(0,0,0,0.35);
        }
        .cta__slide-sub {
          font-size: 10.5px; font-weight: 500;
          color: rgba(255,255,255,0.52); letter-spacing: 0.18em; text-transform: uppercase;
          margin-top: 6px; display: block;
        }
        .cta__nav { display: flex; gap: 8px; }
        .cta__nav-btn {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.09);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #fff;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .cta__nav-btn:hover {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.58);
          transform: scale(1.08);
        }
        .cta__nav-btn:active { transform: scale(0.95); }

        /* Vertical index */
        .cta__index {
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          align-self: center; opacity: 0.22; user-select: none;
        }
        .cta__index-num  { font-family: var(--font-d); font-size: 11px; letter-spacing: 0.08em; color: var(--gold); writing-mode: vertical-rl; }
        .cta__index-rule { width: 1px; height: 48px; background: var(--gold); }
        .cta__index-lbl  { font-size: 9px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: var(--gold); writing-mode: vertical-rl; }

        /* ─── RIGHT PANEL ─── */
        .cta__content {
          padding: 80px 64px 80px 72px;
          display: flex; flex-direction: column; justify-content: center;
        }
        .cta__label {
          display: flex; align-items: center; gap: 14px; margin-bottom: 40px;
          font-size: 10.5px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--gold); opacity: 0; transform: translateY(8px);
          transition: opacity 0.55s 0.1s var(--ease), transform 0.55s 0.1s var(--ease);
        }
        .cta__label.is-in { opacity: 1; transform: translateY(0); }
        .cta__label-rule { display: block; width: 24px; height: 1px; background: var(--gold); flex-shrink: 0; }

        .cta__heading-wrap { margin-bottom: 32px; }
        .cta__heading-line { overflow: hidden; line-height: 1; }
        .cta__h2 {
          font-family: var(--font-d);
          font-size: clamp(50px, 5.6vw, 80px);
          font-weight: 300; line-height: 1.06; letter-spacing: -0.025em; color: var(--ink);
          display: block; transform: translateY(105%);
          transition: transform 0.9s var(--ease);
        }
        .cta__h2.is-in { transform: translateY(0); }
        .cta__h2--accent { font-style: italic; color: var(--blue); }

        .cta__body {
          font-size: 15.5px; font-weight: 300; line-height: 1.9; color: var(--muted);
          max-width: 380px; margin-bottom: 40px;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.7s 0.62s var(--ease), transform 0.7s 0.62s var(--ease);
        }
        .cta__body.is-in { opacity: 1; transform: translateY(0); }

        .cta__rule {
          height: 1px; background: linear-gradient(to right, var(--gold), transparent);
          margin-bottom: 36px; transform: scaleX(0); transform-origin: left;
          transition: transform 0.8s 0.7s var(--ease);
        }
        .cta__rule.is-in { transform: scaleX(1); }

        .cta__action {
          margin-bottom: 32px; opacity: 0; transform: translateY(10px);
          transition: opacity 0.6s 0.8s var(--ease), transform 0.6s 0.8s var(--ease);
        }
        .cta__action.is-in { opacity: 1; transform: translateY(0); }

        .cta__cta-btn {
          display: inline-flex; align-items: center; gap: 18px;
          padding: 10px 22px 10px 10px; background: var(--ink); border-radius: 3px;
          text-decoration: none;
          transition: background 0.3s ease, transform 0.3s var(--ease), box-shadow 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.10);
        }
        .cta__cta-btn:hover {
          background: var(--blue-2); transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(29,78,216,0.22), 0 16px 48px rgba(29,78,216,0.14);
        }
        .cta__cta-btn:active { transform: translateY(-1px); }
        .cta__cta-icon {
          width: 46px; height: 46px; border-radius: 2px; background: #25d366;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: transform 0.3s var(--ease); box-shadow: 0 2px 8px rgba(37,211,102,0.3);
        }
        .cta__cta-btn:hover .cta__cta-icon { transform: scale(1.06); box-shadow: 0 4px 14px rgba(37,211,102,0.45); }
        .cta__cta-text { display: flex; flex-direction: column; gap: 2px; }
        .cta__cta-title { font-size: 14px; font-weight: 600; color: #fff; letter-spacing: 0.01em; }
        .cta__cta-sub   { font-size: 11.5px; color: rgba(255,255,255,0.4); font-weight: 400; }
        .cta__cta-arrow {
          display: flex; align-items: center; color: rgba(255,255,255,0.45); margin-left: auto;
          transition: transform 0.3s var(--ease), color 0.3s ease;
        }
        .cta__cta-btn:hover .cta__cta-arrow { transform: translateX(5px); color: rgba(255,255,255,0.9); }

        .cta__trust {
          display: flex; align-items: center; flex-wrap: wrap; gap: 20px;
          opacity: 0; transition: opacity 0.5s 1s var(--ease);
        }
        .cta__trust.is-in { opacity: 1; }
        .cta__trust-item {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11.5px; color: var(--muted); letter-spacing: 0.01em;
        }

        /* ─── MARQUEE ─── */
        .cta__marquee-wrap {
          position: relative; z-index: 2; overflow: hidden;
          background: var(--blue);
          border-top: 1px solid rgba(29,78,216,0.2);
          padding: 13px 0;
        }
        .cta__marquee-track {
          display: flex; white-space: nowrap;
          animation: marquee 38s linear infinite; width: max-content;
        }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        .cta__marquee-item {
          font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.85);
          letter-spacing: 0.22em; text-transform: uppercase;
          display: inline-flex; align-items: center; gap: 20px;
        }
        .cta__marquee-sep { color: var(--gold); font-size: 14px; line-height: 1; }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1024px) {
          .cta__inner { grid-template-columns: 1fr; min-height: auto; }
          .cta__media { min-height: 480px; padding: 40px 32px; border-right: none; border-bottom: 1px solid var(--line); }
          .cta__content { padding: 60px 40px 72px; }
          .cta__h2 { font-size: clamp(44px, 8vw, 70px); }
        }
        @media (max-width: 640px) {
          .cta__media { min-height: 360px; padding: 28px 20px; }
          .cta__index { display: none; }
          .cta__slide-title { font-size: 32px; }
          .cta__content { padding: 48px 24px 60px; }
          .cta__h2 { font-size: clamp(38px, 10vw, 58px); }
          .cta__body { max-width: 100%; }
          .cta__cta-btn { width: 100%; }
          .cta__trust { gap: 12px; }
          .cta__tag { display: none; }
        }
      `}</style>

      <section className="cta" ref={rootRef}>
        <div className="cta__glow" aria-hidden="true" />

        <div className="cta__inner">

          {/* ── LEFT ── */}
          <div className={`cta__media ${inView ? "is-in" : ""}`}>
            <div className="cta__frame">

              {/* Prev slide fading out */}
              {prev !== null && (
                <div className="cta__slide cta__slide--prev" key={`p${prev}`}>
                  <img src={SLIDES[prev].url} alt="" style={{ objectPosition: SLIDES[prev].position }} />
                </div>
              )}

              {/* Active slide */}
              <div className="cta__slide cta__slide--active" key={`a${slide}`}>
                <img src={cur.url} alt={cur.label} style={{ objectPosition: cur.position }} />
              </div>

              {/* Scrim */}
              <div className="cta__scrim" />

              {/* Top row */}
              <div className="cta__top-row">
                <div className="cta__badge">
                  <span className="cta__badge-dot" />
                  <span>Open Now</span>
                </div>
                <div className="cta__counter">
                  <strong>0{slide + 1}</strong> / 0{SLIDES.length}
                </div>
              </div>

              {/* Accent tag */}
              <div
                className="cta__tag"
                style={{
                  background: `${cur.accent}1e`,
                  color: cur.accent,
                  borderColor: `${cur.accent}55`,
                }}
              >
                <SlideIcon type={cur.icon} />
                {cur.tag}
              </div>

              {/* Bottom */}
              <div className="cta__bottom">
                {/* Progress */}
                <div className="cta__progress-wrap">
                  {SLIDES.map((_, i) => (
                    <div key={i} className="cta__prog-seg" onClick={() => goTo(i)}>
                      <div
                        className="cta__prog-fill"
                        style={{
                          transform: i === slide
                            ? `scaleX(${progress / 100})`
                            : i < slide ? "scaleX(1)" : "scaleX(0)",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Label + nav */}
                <div className="cta__slide-row">
                  <div>
                    <span className="cta__slide-title">{cur.label}</span>
                    <span className="cta__slide-sub">{cur.sub}</span>
                  </div>
                  <div className="cta__nav">
                    <button className="cta__nav-btn" onClick={() => goTo((slide - 1 + SLIDES.length) % SLIDES.length)} aria-label="Previous">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button className="cta__nav-btn" onClick={() => goTo((slide + 1) % SLIDES.length)} aria-label="Next">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical index */}
            <aside className="cta__index" aria-hidden="true">
              <span className="cta__index-num">01</span>
              <span className="cta__index-rule" />
              <span className="cta__index-lbl">CTA</span>
            </aside>
          </div>

          {/* ── RIGHT ── */}
          <div className="cta__content">

            <div className={`cta__label ${inView ? "is-in" : ""}`}>
              <span className="cta__label-rule" />
              <span>Start a Project</span>
            </div>

            <div className="cta__heading-wrap">
              {[
                { text: "Ready to",   delay: "0.22s" },
                { text: "build your", delay: "0.34s" },
                { text: "next great", delay: "0.46s", accent: true },
                { text: "website?",   delay: "0.58s" },
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
              <a href="https://wa.me/254705427449" className="cta__cta-btn" target="_blank" rel="noreferrer">
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
    </>
  );
}
