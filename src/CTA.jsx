import { useRef, useEffect, useState } from "react";

function useInView(threshold = 0.05) {
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

const SERVICES = ["Web Design","E-Commerce","Brand Identity","AI Solutions","Custom Software","Mobile First","SEO Strategy","Business Automation"];

const SLIDES = [
  { url: "/slide-open.jpeg",    label: "Open",     tag: "Available", accent: "#22c55e" },
  { url: "/slide-chat.jpeg",    label: "Chat",     tag: "Instant",   accent: "#3b82f6" },
  { url: "/slide-deliver.jpeg", label: "Deliver",  tag: "Commerce",  accent: "#f59e0b" },
  { url: "/slide-build.jpeg",   label: "Build",    tag: "Code",      accent: "#a855f7" },
  { url: "/slide-modern.jpeg",  label: "Modern",   tag: "Design",    accent: "#ef4444" },
];

const INTERVAL = 4800;

export default function CTA() {
  const [rootRef, inView] = useInView(0.05);
  const [slide, setSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef(null);
  const timerRef = useRef(null);

  const goTo = (i) => {
    if (i === slide || busy) return;
    setBusy(true); setPrevSlide(slide); setSlide(i); setProgress(0);
    setTimeout(() => { setPrevSlide(null); setBusy(false); }, 700);
  };

  useEffect(() => {
    if (paused) { cancelAnimationFrame(rafRef.current); clearTimeout(timerRef.current); return; }
    setProgress(0);
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(((now - start) / INTERVAL) * 100, 100);
      setProgress(p);
      if (p < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    timerRef.current = setTimeout(() => {
      const next = (slide + 1) % SLIDES.length;
      setBusy(true); setPrevSlide(slide); setSlide(next); setProgress(0);
      setTimeout(() => { setPrevSlide(null); setBusy(false); }, 700);
    }, INTERVAL);
    return () => { cancelAnimationFrame(rafRef.current); clearTimeout(timerRef.current); };
  }, [slide, paused]);

  const cur = SLIDES[slide];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

        :root {
          --white : #ffffff;
          --black : #060608;
          --blue  : #1354f9;
          --blue2 : #0d3ecc;
          --blue3 : #dce8ff;
          --green : #16a34a;
          --g-bg  : #f0fdf4;
          --mid   : #f2f4f8;
          --bd    : #e2e6ee;
          --muted : #6b7280;
          --light : #9ca3af;
          --wa    : #22c55e;
          --ff-hd : 'Bebas Neue', Impact, sans-serif;
          --ff-bd : 'Plus Jakarta Sans', system-ui, sans-serif;
          --ease  : cubic-bezier(0.16, 1, 0.3, 1);
          --easeb : cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Root ── */
        .x { font-family: var(--ff-bd); background: var(--white); position: relative; overflow: hidden; }

        /* Dot-grid bg */
        .x::before {
          content: ''; position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(circle, #c5cfe0 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.35;
          mask-image: radial-gradient(ellipse 60% 70% at 68% 40%, black 0%, transparent 75%);
        }

        /* ── Top strip ── */
        .x__strip {
          position: relative; z-index: 2;
          background: var(--black);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 44px;
          opacity: 0; transition: opacity 0.4s var(--ease);
        }
        .x__strip.in { opacity: 1; }

        .x__strip-l { display: flex; align-items: center; gap: 20px; }
        .x__strip-label {
          font-size: 9px; font-weight: 700; letter-spacing: 0.3em;
          text-transform: uppercase; color: rgba(255,255,255,0.4);
        }
        .x__strip-sep { width: 1px; height: 16px; background: rgba(255,255,255,0.1); }
        .x__live {
          display: flex; align-items: center; gap: 6px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--green);
        }
        .x__live-dot {
          width: 5px; height: 5px; border-radius: 50%; background: var(--green);
          animation: liveDot 1.8s ease-in-out infinite;
        }
        @keyframes liveDot {
          0%,100% { box-shadow: 0 0 0 0 rgba(22,163,74,0.6); }
          50%      { box-shadow: 0 0 0 5px rgba(22,163,74,0); }
        }
        .x__strip-r {
          display: flex; align-items: center; gap: 8px;
        }
        .x__strip-tag {
          font-size: 9px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,255,255,0.3);
        }
        .x__strip-num {
          background: var(--blue);
          border-radius: 3px; padding: 3px 9px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.1em;
          color: #fff;
        }

        /* ── Body grid ── */
        .x__body {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1fr 520px;
          min-height: 680px;
        }

        /* ── LEFT ── */
        .x__left {
          display: flex; flex-direction: column; justify-content: center;
          padding: 72px 56px 80px;
          border-right: 1px solid var(--bd);
          position: relative;
        }

        /* Blue accent corner block */
        .x__corner {
          position: absolute; top: 0; left: 0;
          width: 6px; height: 100%;
          background: linear-gradient(to bottom, var(--blue) 0%, transparent 100%);
        }

        /* Eyebrow */
        .x__eyebrow {
          display: flex; align-items: center; gap: 10px; margin-bottom: 28px;
          opacity: 0; transform: translateX(-16px);
          transition: opacity 0.5s 0.1s var(--ease), transform 0.5s 0.1s var(--ease);
        }
        .x__eyebrow.in { opacity: 1; transform: translateX(0); }
        .x__ey-line { width: 28px; height: 2px; background: var(--blue); }
        .x__ey-text { font-size: 10px; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; color: var(--blue); }

        /* Big heading */
        .x__h1 {
          font-family: var(--ff-hd);
          font-size: clamp(72px, 7.5vw, 116px);
          line-height: 0.92; letter-spacing: 0.01em;
          color: var(--black);
          margin-bottom: 0;
          overflow: visible;
        }
        .x__h1-row { display: block; overflow: hidden; }
        .x__h1-inner {
          display: block;
          transform: translateY(115%);
          transition: transform 1s var(--ease);
        }
        .x__h1-inner.in { transform: translateY(0); }

        /* "next great" — blue outlined text */
        .x__h1 .x__outline {
          -webkit-text-stroke: 2px var(--blue);
          color: transparent;
          font-family: var(--ff-hd);
        }

        /* Subtext */
        .x__sub {
          font-size: 14.5px; font-weight: 300; line-height: 1.85; color: var(--muted);
          max-width: 380px; margin-top: 36px; margin-bottom: 44px;
          padding-left: 20px; border-left: 2px solid var(--bd);
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.6s 0.45s var(--ease), transform 0.6s 0.45s var(--ease);
        }
        .x__sub.in { opacity: 1; transform: translateY(0); }
        .x__sub strong { font-weight: 700; color: var(--black); }

        /* CTA */
        .x__cta {
          display: flex; flex-direction: column; gap: 16px;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.6s 0.58s var(--ease), transform 0.6s 0.58s var(--ease);
        }
        .x__cta.in { opacity: 1; transform: translateY(0); }

        /* WhatsApp button */
        .x__wa {
          display: inline-flex; align-items: center;
          width: fit-content; text-decoration: none;
          border-radius: 0; overflow: hidden;
          box-shadow: 6px 6px 0 var(--black);
          border: 1.5px solid var(--black);
          transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease);
        }
        .x__wa:hover {
          transform: translate(-2px, -2px);
          box-shadow: 8px 8px 0 var(--black);
        }
        .x__wa:active {
          transform: translate(3px, 3px);
          box-shadow: 3px 3px 0 var(--black);
        }

        .x__wa-icon {
          width: 56px; height: 56px; background: var(--wa);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .x__wa-main {
          background: var(--black); height: 56px;
          padding: 0 24px; display: flex; align-items: center; gap: 18px;
        }
        .x__wa-texts { display: flex; flex-direction: column; gap: 1px; }
        .x__wa-title { font-size: 13px; font-weight: 700; color: #fff; letter-spacing: 0.02em; }
        .x__wa-num   { font-size: 10.5px; color: rgba(255,255,255,0.38); font-weight: 300; }
        .x__wa-arr   {
          margin-left: 4px;
          width: 30px; height: 30px; border-radius: 50%;
          background: var(--blue); border: none;
          display: flex; align-items: center; justify-content: center;
          color: #fff; flex-shrink: 0;
          transition: transform 0.3s var(--easeb), background 0.2s;
        }
        .x__wa:hover .x__wa-arr { transform: translateX(3px) scale(1.1); background: #1a5fff; }

        /* Pill guarantees */
        .x__pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .x__pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 13px 7px 9px;
          background: var(--white); border: 1.5px solid var(--bd);
          border-radius: 0;
          font-size: 11px; font-weight: 600; color: var(--black);
          letter-spacing: 0.01em;
          transition: border-color 0.2s, background 0.2s, transform 0.2s var(--easeb);
        }
        .x__pill:hover { border-color: var(--blue); background: var(--blue3); transform: translateY(-2px); }
        .x__pill-dot {
          width: 14px; height: 14px; border-radius: 50%; background: var(--g-bg);
          border: 1.5px solid rgba(22,163,74,0.3);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }

        /* ── RIGHT ── */
        .x__right {
          position: relative; overflow: hidden;
          background: var(--black);
          opacity: 0; transform: translateX(20px);
          transition: opacity 0.8s 0.06s var(--ease), transform 0.8s 0.06s var(--ease);
        }
        .x__right.in { opacity: 1; transform: translateX(0); }

        /* Slides */
        .x__slides { position: absolute; inset: 0; }
        .x__slide { position: absolute; inset: 0; }
        .x__slide img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .x__slide--out { animation: sOut 0.7s var(--ease) forwards; }
        .x__slide--in  { animation: sIn  0.7s var(--ease) forwards; }
        .x__slide--in img { animation: kb 6s ease-out forwards; }
        @keyframes sOut { from{opacity:1} to{opacity:0;transform:scale(1.03)} }
        @keyframes sIn  { from{opacity:0} to{opacity:1} }
        @keyframes kb   { from{transform:scale(1.07)} to{transform:scale(1)} }

        /* Gradient overlays */
        .x__scrim {
          position: absolute; inset: 0; z-index: 2;
          background:
            linear-gradient(to top, rgba(6,6,8,0.95) 0%, rgba(6,6,8,0.45) 30%, transparent 55%),
            linear-gradient(to bottom, rgba(6,6,8,0.5) 0%, transparent 30%);
        }

        /* Blue accent bar on right side */
        .x__accent-bar {
          position: absolute; top: 0; right: 0; bottom: 0; width: 4px; z-index: 5;
          background: linear-gradient(to bottom, var(--blue) 0%, transparent 60%);
        }

        /* Slide top */
        .x__slide-top {
          position: absolute; top: 0; left: 0; right: 0; z-index: 5;
          padding: 20px 20px 0;
          display: flex; align-items: center; justify-content: space-between;
        }

        .x__badge {
          display: flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.95); backdrop-filter: blur(20px);
          padding: 6px 12px 6px 9px; border: 1px solid rgba(255,255,255,0.8);
          font-size: 10.5px; font-weight: 700; color: var(--black); letter-spacing: 0.01em;
          box-shadow: 2px 2px 0 rgba(0,0,0,0.2);
        }
        .x__badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: liveDot 1.8s ease-in-out infinite; }

        .x__counter {
          background: rgba(19,84,249,0.9); backdrop-filter: blur(12px);
          padding: 6px 13px;
          font-family: var(--ff-hd); font-size: 18px; letter-spacing: 0.04em;
          color: #fff; line-height: 1;
        }

        /* Slide tag — diagonal ribbon style */
        .x__tag-wrap {
          position: absolute; right: 0; top: 80px; z-index: 5;
        }
        .x__tag {
          display: block; padding: 6px 14px;
          font-size: 9px; font-weight: 800; letter-spacing: 0.22em; text-transform: uppercase;
          color: #fff; white-space: nowrap;
          transition: background 0.5s;
        }

        /* Big slide number background */
        .x__bg-num {
          position: absolute; bottom: 90px; right: 16px; z-index: 3;
          font-family: var(--ff-hd); font-size: 200px; line-height: 1;
          color: rgba(255,255,255,0.03); pointer-events: none; user-select: none;
          letter-spacing: -0.05em;
        }

        /* Slide bottom */
        .x__slide-bot {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 5;
          padding: 0 20px 22px;
        }

        /* Progress */
        .x__prog {
          display: flex; gap: 3px; margin-bottom: 20px;
        }
        .x__prog-seg {
          flex: 1; height: 2px; cursor: pointer;
          background: rgba(255,255,255,0.15);
          overflow: hidden;
          transition: transform 0.15s var(--easeb), background 0.2s;
        }
        .x__prog-seg:hover { transform: scaleY(2.5); background: rgba(255,255,255,0.22); }
        .x__prog-fill {
          height: 100%; background: var(--blue);
          transform-origin: left;
          box-shadow: 0 0 8px rgba(19,84,249,0.7);
        }

        /* Slide title + nav */
        .x__slide-info { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; }

        .x__slide-title {
          font-family: var(--ff-hd);
          font-size: 64px; line-height: 0.9; letter-spacing: 0.02em;
          color: #fff; text-shadow: 0 4px 40px rgba(0,0,0,0.5);
        }
        .x__slide-sub {
          font-size: 9.5px; font-weight: 500; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(255,255,255,0.35); margin-top: 10px;
        }

        .x__navs { display: flex; gap: 4px; flex-shrink: 0; }
        .x__nav {
          width: 36px; height: 36px;
          border: 1.5px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05); backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.6);
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s var(--easeb);
        }
        .x__nav:hover { background: var(--blue); border-color: var(--blue); color: #fff; transform: scale(1.1); }
        .x__nav:active { transform: scale(0.92); }

        /* ── Floating cards ── */
        .x__float {
          position: absolute; z-index: 15;
          background: var(--white);
          border: 1.5px solid var(--black);
          box-shadow: 4px 4px 0 var(--black);
        }

        .x__float--rating {
          bottom: 100px; left: -72px; padding: 14px 18px;
          display: flex; align-items: center; gap: 12px;
          animation: f1 5s ease-in-out infinite;
        }
        @keyframes f1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

        .x__f-icon { width: 40px; height: 40px; background: #fefce8; border: 1.5px solid #fde68a; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .x__f-score { font-family: var(--ff-hd); font-size: 28px; color: var(--black); line-height: 1; }
        .x__f-stars { display: flex; gap: 2px; margin: 3px 0 2px; }
        .x__f-lbl   { font-size: 10px; color: var(--light); font-weight: 500; }

        .x__float--clients {
          top: 44px; right: -68px; padding: 12px 16px;
          display: flex; align-items: center; gap: 10px;
          animation: f2 6s ease-in-out infinite;
        }
        @keyframes f2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(9px)} }
        .x__avs { display: flex; }
        .x__av {
          width: 28px; height: 28px; border-radius: 50%;
          border: 2.5px solid var(--white);
          font-size: 10px; font-weight: 800; color: #fff;
          display: flex; align-items: center; justify-content: center;
          margin-left: -9px; flex-shrink: 0;
        }
        .x__av:first-child { margin-left: 0; }
        .x__f-count  { font-size: 13px; font-weight: 700; color: var(--black); }
        .x__f-region { font-size: 10px; color: var(--light); font-weight: 400; margin-top: 2px; }

        .x__float--online {
          top: 50%; right: -60px; transform: translateY(-50%);
          padding: 10px 14px;
          display: flex; align-items: center; gap: 9px;
          animation: f3 4.5s ease-in-out infinite;
        }
        @keyframes f3 { 0%,100%{transform:translateY(-50%)} 50%{transform:translateY(calc(-50% - 8px))} }
        .x__o-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); flex-shrink: 0; animation: liveDot 1.8s ease-in-out infinite; }
        .x__o-title { font-size: 11.5px; font-weight: 700; color: var(--black); white-space: nowrap; }
        .x__o-sub   { font-size: 10px; color: var(--light); font-weight: 400; margin-top: 1px; }

        /* ── Marquee ── */
        .x__mq {
          position: relative; z-index: 2;
          display: flex; align-items: stretch;
          border-top: 1.5px solid var(--black);
          background: var(--white); overflow: hidden;
        }
        .x__mq-lbl {
          flex-shrink: 0; background: var(--blue);
          padding: 12px 24px;
          font-size: 9px; font-weight: 800; letter-spacing: 0.3em; text-transform: uppercase;
          color: #fff; display: flex; align-items: center; white-space: nowrap;
          border-right: 1.5px solid var(--black);
        }
        .x__mq-body { flex: 1; overflow: hidden; position: relative; }
        .x__mq-body::before,
        .x__mq-body::after {
          content: ''; position: absolute; top: 0; bottom: 0; width: 60px; z-index: 2;
        }
        .x__mq-body::before { left: 0; background: linear-gradient(to right, var(--white), transparent); }
        .x__mq-body::after  { right: 0; background: linear-gradient(to left, var(--white), transparent); }

        .x__mq-track {
          display: flex; width: max-content;
          animation: mq 42s linear infinite;
          padding: 12px 0;
        }
        @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }

        .x__mq-item {
          display: inline-flex; align-items: center; gap: 16px;
          padding: 0 16px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--muted);
        }
        .x__mq-sep { width: 4px; height: 4px; background: var(--blue); border-radius: 50%; opacity: 0.5; }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .x__body { grid-template-columns: 1fr; }
          .x__left { border-right: none; border-bottom: 1.5px solid var(--black); padding: 52px 36px 60px; }
          .x__right { min-height: 520px; }
          .x__float--rating  { left: -16px; }
          .x__float--clients { right: -16px; }
          .x__float--online  { right: -16px; }
          .x__strip { padding: 0 36px; }
        }
        @media (max-width: 640px) {
          .x__strip { padding: 0 20px; }
          .x__left { padding: 40px 20px 48px; }
          .x__h1 { font-size: clamp(68px, 18vw, 90px); }
          .x__float--rating, .x__float--clients, .x__float--online { display: none; }
          .x__slide-title { font-size: 48px; }
          .x__mq-lbl { display: none; }
        }
      `}</style>

      <section className="x" ref={rootRef}>

        {/* ── Top black strip ── */}
        <div className={`x__strip ${inView ? "in" : ""}`}>
          <div className="x__strip-l">
            <span className="x__strip-label">Studio — Projects</span>
            <span className="x__strip-sep" />
            <span className="x__live">
              <span className="x__live-dot" />
              Open for work
            </span>
          </div>
          <div className="x__strip-r">
            <span className="x__strip-tag">Available</span>
            <span className="x__strip-num">NOW</span>
          </div>
        </div>

        {/* ── Main body ── */}
        <div className="x__body">

          {/* ── LEFT ── */}
          <div className="x__left">
            <div className="x__corner" aria-hidden />

            <div className={`x__eyebrow ${inView ? "in" : ""}`}>
              <span className="x__ey-line" />
              <span className="x__ey-text">Start a Project</span>
            </div>

            <h2 className="x__h1">
              <span className="x__h1-row">
                <span className={`x__h1-inner ${inView ? "in" : ""}`} style={{transitionDelay:"0.05s"}}>READY</span>
              </span>
              <span className="x__h1-row">
                <span className={`x__h1-inner ${inView ? "in" : ""}`} style={{transitionDelay:"0.14s"}}>TO <span className="x__outline">BUILD</span></span>
              </span>
              <span className="x__h1-row">
                <span className={`x__h1-inner ${inView ? "in" : ""}`} style={{transitionDelay:"0.23s"}}>YOUR SITE?</span>
              </span>
            </h2>

            <p className={`x__sub ${inView ? "in" : ""}`}>
              We respond within <strong>2 hours</strong>. Direct access to the team
              that designs, builds, and delivers — no intermediaries, no delays.
            </p>

            <div className={`x__cta ${inView ? "in" : ""}`}>
              <a href="https://wa.me/254705427449" className="x__wa" target="_blank" rel="noreferrer">
                <span className="x__wa-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 2.107.546 4.14 1.587 5.932L.057 24l6.233-1.607A11.938 11.938 0 0012 24c6.626 0 12-5.374 12-12S18.626 0 12 0zm0 21.818a9.814 9.814 0 01-5.003-1.366l-.357-.214-3.703.954.983-3.596-.234-.37A9.761 9.761 0 012.182 12c0-5.421 4.397-9.818 9.818-9.818 5.422 0 9.818 4.397 9.818 9.818 0 5.422-4.396 9.818-9.818 9.818z"/>
                  </svg>
                </span>
                <span className="x__wa-main">
                  <span className="x__wa-texts">
                    <span className="x__wa-title">Begin on WhatsApp</span>
                    <span className="x__wa-num">+254 705 427 449</span>
                  </span>
                  <span className="x__wa-arr">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </span>
              </a>

              <div className="x__pills">
                {["No contracts","Free consult","3-day delivery"].map(t => (
                  <span key={t} className="x__pill">
                    <span className="x__pill-dot">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div
            className={`x__right ${inView ? "in" : ""}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Floating cards */}
            <div className="x__float x__float--rating">
              <div className="x__f-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#f59e0b">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <div className="x__f-score">4.9</div>
                <div className="x__f-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <div className="x__f-lbl">Client rating</div>
              </div>
            </div>

            <div className="x__float x__float--clients">
              <div className="x__avs">
                {[["#2563eb","M"],["#059669","A"],["#d97706","K"],["#db2777","J"]].map(([bg,l],i)=>(
                  <div key={i} className="x__av" style={{background:bg}}>{l}</div>
                ))}
              </div>
              <div>
                <div className="x__f-count">120+ Clients</div>
                <div className="x__f-region">Kenya & beyond</div>
              </div>
            </div>

            <div className="x__float x__float--online">
              <div className="x__o-dot" />
              <div>
                <div className="x__o-title">Online now</div>
                <div className="x__o-sub">Replies &lt; 2 hrs</div>
              </div>
            </div>

            {/* Blue accent bar */}
            <div className="x__accent-bar" aria-hidden />

            {/* Slides */}
            <div className="x__slides">
              {prevSlide !== null && (
                <div className="x__slide x__slide--out" key={`p${prevSlide}`}>
                  <img src={SLIDES[prevSlide].url} alt="" />
                </div>
              )}
              <div className="x__slide x__slide--in" key={`a${slide}`}>
                <img src={cur.url} alt={cur.label} />
              </div>
              <div className="x__scrim" />
              <div className="x__bg-num" aria-hidden>0{slide+1}</div>

              {/* Top */}
              <div className="x__slide-top">
                <div className="x__badge">
                  <span className="x__badge-dot" />
                  Open Now
                </div>
                <div className="x__counter">0{slide+1}/{SLIDES.length}</div>
              </div>

              {/* Tag ribbon */}
              <div className="x__tag-wrap">
                <div className="x__tag" style={{ background: cur.accent }}>
                  {cur.tag}
                </div>
              </div>

              {/* Bottom */}
              <div className="x__slide-bot">
                <div className="x__prog">
                  {SLIDES.map((_,i) => (
                    <div key={i} className="x__prog-seg" onClick={()=>goTo(i)}>
                      <div className="x__prog-fill" style={{
                        transform: i===slide ? `scaleX(${progress/100})` : i<slide ? "scaleX(1)" : "scaleX(0)"
                      }} />
                    </div>
                  ))}
                </div>

                <div className="x__slide-info">
                  <div>
                    <div className="x__slide-title">{cur.label}</div>
                    <div className="x__slide-sub">{SLIDES[slide].tag} · {slide===0?"Available today":slide===1?"Reply 2 hrs":slide===2?"E-commerce":slide===3?"Modern code":"Cutting-edge"}</div>
                  </div>
                  <div className="x__navs">
                    <button className="x__nav" onClick={()=>goTo((slide-1+SLIDES.length)%SLIDES.length)} aria-label="Prev">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button className="x__nav" onClick={()=>goTo((slide+1)%SLIDES.length)} aria-label="Next">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Marquee ── */}
        <div className="x__mq">
          <div className="x__mq-lbl">Services</div>
          <div className="x__mq-body">
            <div className="x__mq-track">
              {[...SERVICES,...SERVICES,...SERVICES].map((w,i)=>(
                <span key={i} className="x__mq-item">
                  {w}
                  <span className="x__mq-sep" aria-hidden />
                </span>
              ))}
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
