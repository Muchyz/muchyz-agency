import "./Process.css";
import { useInView } from "./hooks";
import { useState, useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Discovery Call",
    label: "Discover",
    day: "Day 1",
    desc: "We learn your business, goals and vision in a free 30-minute session. No commitment — just a conversation about what you want to build.",
    meta: "Free · 30 min",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Design & Concept",
    label: "Design",
    day: "Day 1",
    desc: "Same day we turn your brief into wireframes and a visual concept for your approval — before a single line of code is written.",
    meta: "Wireframes · Moodboard",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Build & Develop",
    label: "Build",
    day: "Day 1–2",
    desc: "Clean, fast, mobile-first code. Live progress updates so you always know exactly where your project stands.",
    meta: "Mobile-first · Live updates",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Launch & Support",
    label: "Launch",
    day: "Day 3",
    desc: "Your product goes live on Day 3. We handle deployment, train you, and provide 30 days of free post-launch support.",
    meta: "Deploy · 30-day support",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

const TRUST = [
  "Built with modern technologies",
  "Mobile optimized",
  "SEO ready",
];

// Spine node positions as % of the spine height
const NODE_PCTS = [12, 37, 62, 88];

const CheckSVG = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowSVG = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalSVG = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

function Process() {
  const [ref, visible] = useInView();
  const [active, setActive] = useState(0);
  const [spinePct, setSpinePct] = useState(NODE_PCTS[0]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.6;
      let cur = 0;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        if (el.getBoundingClientRect().top + window.scrollY < mid) cur = i;
      });
      setActive(cur);
      setSpinePct(NODE_PCTS[cur]);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="prc" id="process">

      {/* Top wave */}
      <div className="prc__wave-top" aria-hidden="true">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" fill="none">
          <path d="M0,28 C480,56 960,0 1440,28 L1440,0 L0,0 Z" fill="#eef2ff"/>
        </svg>
      </div>

      <div className="prc__wrap" ref={ref}>

        {/* Header */}
        <header className={`prc__head ${visible ? "is-in" : ""}`}>
          <div className="prc__badge">
            <span className="prc__badge-dot" />
            Live in 3 Days — Faster Than Any Agency
          </div>
          <p className="prc__eyebrow">How We Work</p>
          <h2 className="prc__h2">
            Your Website Live in <em>3 Days</em> — Or You Don't Pay.
          </h2>
          <p className="prc__lead">
            Most agencies take weeks. We take days. Four sharp steps — from
            your first message to a live, professional product.
          </p>
          <ul className="prc__trust">
            {TRUST.map((t, i) => (
              <li key={i} className="prc__trust-item" style={{ "--d": `${0.65 + i * 0.1}s` }}>
                <span className="prc__trust-icon"><CheckSVG /></span>
                {t}
              </li>
            ))}
          </ul>
        </header>

        {/* Step tracker */}
        <div className={`prc__tracker ${visible ? "is-in" : ""}`}>
          <div className="prc__tracker-rail">
            <div className="prc__tracker-fill" style={{ width: `${spinePct}%` }} />
          </div>
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              className={`prc__tstep ${i <= active ? "is-done" : ""} ${i === active ? "is-active" : ""}`}
              style={{ "--d": `${i * 0.08}s` }}
            >
              <div className="prc__tnode">
                {i < active ? <CheckSVG /> : <span>{i + 1}</span>}
              </div>
              <span className="prc__tlabel">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Spine + cards grid */}
        <div className="prc__layout">

          {/* Spine — completely outside cards */}
          <div className="prc__spine" aria-hidden="true">
            <div className="prc__spine-bg" />
            <div
              className="prc__spine-fg"
              style={{ height: `${spinePct}%` }}
            />
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`prc__sdot ${i < active ? "is-done" : ""} ${i === active ? "is-active" : ""}`}
                style={{ top: `${NODE_PCTS[i]}%` }}
              />
            ))}
          </div>

          {/* Cards */}
          <div className="prc__cards">
            {STEPS.map((s, i) => (
              <div
                key={s.num}
                ref={el => (cardRefs.current[i] = el)}
                className={`prc__card ${visible ? "is-in" : ""} ${i === active ? "is-active" : ""}`}
                style={{ "--i": i }}
              >
                {/* Navy left panel */}
                <div className="prc__left">
                  <div className="prc__left-glow" aria-hidden="true" />

                  <div className="prc__left-top">
                    <span className="prc__step-lbl">Step {s.num}</span>
                    <span className="prc__day-badge">{s.day}</span>
                  </div>

                  <div className="prc__icon-wrap">
                    <div className="prc__icon-shine" aria-hidden="true" />
                    <span className="prc__icon-inner">{s.icon}</span>
                  </div>

                  <div className="prc__left-bot">
                    <span className="prc__meta">{s.meta}</span>
                    <span className="prc__ghost" aria-hidden="true">{s.num}</span>
                  </div>
                </div>

                {/* White right panel */}
                <div className="prc__right">
                  <div className="prc__bar" aria-hidden="true" />
                  <div className="prc__body">
                    <h3 className="prc__title">{s.title}</h3>
                    <p className="prc__desc">{s.desc}</p>
                  </div>
                  <div className="prc__foot">
                    <span className="prc__chip">
                      <CalSVG />{s.day}
                    </span>
                    <div className="prc__arrow"><ArrowSVG /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`prc__cta ${visible ? "is-in" : ""}`}>
          <div className="prc__cta-copy">
            <strong>Get your project live in 3 days.</strong>
            <span>Book a free call today — we can start tomorrow.</span>
          </div>
          <a href="#contact" className="prc__cta-btn">
            Book a Free Call <ArrowSVG />
          </a>
        </div>

      </div>

      {/* Bottom wave */}
      <div className="prc__wave-bot" aria-hidden="true">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" fill="none">
          <path d="M0,28 C480,0 960,56 1440,28 L1440,56 L0,56 Z" fill="#eef2ff"/>
        </svg>
      </div>

    </section>
  );
}

export default Process;
