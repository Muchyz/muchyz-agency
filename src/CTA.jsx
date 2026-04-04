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
  { url: "/slide-open.jpeg",    label: "Open",     tag: "Available", accent: "#22c55e", category: "STUDIO", year: "2025" },
  { url: "/slide-chat.jpeg",    label: "Chat",     tag: "Instant",   accent: "#3b82f6", category: "COMMS",  year: "2025" },
  { url: "/slide-deliver.jpeg", label: "Deliver",  tag: "Commerce",  accent: "#f59e0b", category: "STORE",  year: "2025" },
  { url: "/slide-build.jpeg",   label: "Build",    tag: "Code",      accent: "#a855f7", category: "DEV",    year: "2025" },
  { url: "/slide-modern.jpeg",  label: "Modern",   tag: "Design",    accent: "#ef4444", category: "DESIGN", year: "2025" },
];

const INTERVAL = 4800;

export default function CTA() {
  const [rootRef, inView] = useInView(0.05);
  const [slide, setSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [revealDir, setRevealDir] = useState(1); // 1=forward, -1=backward
  const rafRef = useRef(null);
  const timerRef = useRef(null);

  const goTo = (i, dir) => {
    if (i === slide || busy) return;
    const d = dir !== undefined ? dir : (i > slide ? 1 : -1);
    setRevealDir(d);
    setBusy(true); setPrevSlide(slide); setSlide(i); setProgress(0);
    setTimeout(() => { setPrevSlide(null); setBusy(false); }, 800);
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
      setRevealDir(1);
      setBusy(true); setPrevSlide(slide); setSlide(next); setProgress(0);
      setTimeout(() => { setPrevSlide(null); setBusy(false); }, 800);
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

        .x { font-family: var(--ff-bd); background: var(--white); position: relative; overflow: hidden; }

        .x::before {
          content: ''; position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(circle, #c5cfe0 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.35;
          mask-image: radial-gradient(ellipse 60% 70% at 68% 40%, black 0%, transparent 75%);
        }

        /* ── Top strip ── */
        .x__strip {
          position: relative; z-index: 10;
          background: var(--black);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 44px;
          opacity: 0; transition: opacity 0.4s var(--ease);
        }
        .x__strip.in { opacity: 1; }
        .x__strip-l { display: flex; align-items: center; gap: 20px; }
        .x__strip-label { font-size: 9px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,255,255,0.4); }
        .x__strip-sep { width: 1px; height: 16px; background: rgba(255,255,255,0.1); }
        .x__live { display: flex; align-items: center; gap: 6px; font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--green); }
        .x__live-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--green); animation: liveDot 1.8s ease-in-out infinite; }
        @keyframes liveDot { 0%,100%{box-shadow:0 0 0 0 rgba(22,163,74,0.6)} 50%{box-shadow:0 0 0 5px rgba(22,163,74,0)} }
        .x__strip-r { display: flex; align-items: center; gap: 8px; }
        .x__strip-tag { font-size: 9px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
        .x__strip-num { background: var(--blue); border-radius: 3px; padding: 3px 9px; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; color: #fff; }

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
        .x__corner { position: absolute; top: 0; left: 0; width: 6px; height: 100%; background: linear-gradient(to bottom, var(--blue) 0%, transparent 100%); }
        .x__eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; opacity: 0; transform: translateX(-16px); transition: opacity 0.5s 0.1s var(--ease), transform 0.5s 0.1s var(--ease); }
        .x__eyebrow.in { opacity: 1; transform: translateX(0); }
        .x__ey-line { width: 28px; height: 2px; background: var(--blue); }
        .x__ey-text { font-size: 10px; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; color: var(--blue); }
        .x__h1 { font-family: var(--ff-hd); font-size: clamp(72px, 7.5vw, 116px); line-height: 0.92; letter-spacing: 0.01em; color: var(--black); margin-bottom: 0; overflow: visible; }
        .x__h1-row { display: block; overflow: hidden; }
        .x__h1-inner { display: block; transform: translateY(115%); transition: transform 1s var(--ease); }
        .x__h1-inner.in { transform: translateY(0); }
        .x__h1 .x__outline { -webkit-text-stroke: 2px var(--blue); color: transparent; font-family: var(--ff-hd); }
        .x__sub { font-size: 14.5px; font-weight: 300; line-height: 1.85; color: var(--muted); max-width: 380px; margin-top: 36px; margin-bottom: 44px; padding-left: 20px; border-left: 2px solid var(--bd); opacity: 0; transform: translateY(10px); transition: opacity 0.6s 0.45s var(--ease), transform 0.6s 0.45s var(--ease); }
        .x__sub.in { opacity: 1; transform: translateY(0); }
        .x__sub strong { font-weight: 700; color: var(--black); }
        .x__cta { display: flex; flex-direction: column; gap: 16px; opacity: 0; transform: translateY(10px); transition: opacity 0.6s 0.58s var(--ease), transform 0.6s 0.58s var(--ease); }
        .x__cta.in { opacity: 1; transform: translateY(0); }
        .x__wa { display: inline-flex; align-items: center; width: fit-content; text-decoration: none; border-radius: 0; overflow: hidden; box-shadow: 6px 6px 0 var(--black); border: 1.5px solid var(--black); transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease); }
        .x__wa:hover { transform: translate(-2px,-2px); box-shadow: 8px 8px 0 var(--black); }
        .x__wa:active { transform: translate(3px,3px); box-shadow: 3px 3px 0 var(--black); }
        .x__wa-icon { width: 56px; height: 56px; background: var(--wa); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .x__wa-main { background: var(--black); height: 56px; padding: 0 24px; display: flex; align-items: center; gap: 18px; }
        .x__wa-texts { display: flex; flex-direction: column; gap: 1px; }
        .x__wa-title { font-size: 13px; font-weight: 700; color: #fff; letter-spacing: 0.02em; }
        .x__wa-num   { font-size: 10.5px; color: rgba(255,255,255,0.38); font-weight: 300; }
        .x__wa-arr { margin-left: 4px; width: 30px; height: 30px; border-radius: 50%; background: var(--blue); border: none; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; transition: transform 0.3s var(--easeb), background 0.2s; }
        .x__wa:hover .x__wa-arr { transform: translateX(3px) scale(1.1); background: #1a5fff; }
        .x__pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .x__pill { display: inline-flex; align-items: center; gap: 6px; padding: 7px 13px 7px 9px; background: var(--white); border: 1.5px solid var(--bd); border-radius: 0; font-size: 11px; font-weight: 600; color: var(--black); letter-spacing: 0.01em; transition: border-color 0.2s, background 0.2s, transform 0.2s var(--easeb); }
        .x__pill:hover { border-color: var(--blue); background: var(--blue3); transform: translateY(-2px); }
        .x__pill-dot { width: 14px; height: 14px; border-radius: 50%; background: var(--g-bg); border: 1.5px solid rgba(22,163,74,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

        /* ══════════════════════════════════════
           ── RIGHT — CINEMATIC PICTURE AREA ──
           ══════════════════════════════════════ */
        .x__right {
          position: relative; overflow: hidden;
          background: var(--black);
          opacity: 0; transform: translateX(20px);
          transition: opacity 0.8s 0.06s var(--ease), transform 0.8s 0.06s var(--ease);
          display: flex;
        }
        .x__right.in { opacity: 1; transform: translateX(0); }

        /* ── Film Strip Sidebar ── */
        .x__film {
          width: 52px; flex-shrink: 0;
          background: #0a0a0c;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column;
          position: relative; z-index: 10;
          overflow: hidden;
        }
        /* Film perforations */
        .x__film::before {
          content: '';
          position: absolute; left: 8px; top: 0; bottom: 0; width: 10px;
          background-image: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 10px,
            rgba(255,255,255,0.07) 10px,
            rgba(255,255,255,0.07) 22px,
            transparent 22px,
            transparent 32px
          );
        }
        .x__film::after {
          content: '';
          position: absolute; right: 8px; top: 0; bottom: 0; width: 10px;
          background-image: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 10px,
            rgba(255,255,255,0.07) 10px,
            rgba(255,255,255,0.07) 22px,
            transparent 22px,
            transparent 32px
          );
        }

        .x__film-thumbs {
          display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          padding: 16px 0; margin: auto 0;
          position: relative; z-index: 2;
        }

        .x__film-thumb {
          width: 28px; height: 28px;
          cursor: pointer; position: relative;
          overflow: hidden; flex-shrink: 0;
          border: 1.5px solid transparent;
          transition: border-color 0.3s, transform 0.3s var(--easeb), opacity 0.3s;
          opacity: 0.35;
        }
        .x__film-thumb:hover { opacity: 0.7; transform: scale(1.08); }
        .x__film-thumb.active { border-color: rgba(255,255,255,0.5); opacity: 1; transform: scale(1.12); }
        .x__film-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(0.3); }
        .x__film-thumb.active img { filter: none; }
        .x__film-thumb-glow {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.2s;
        }
        .x__film-thumb:hover .x__film-thumb-glow { opacity: 1; }

        .x__film-label {
          writing-mode: vertical-rl; text-orientation: mixed;
          font-size: 7.5px; font-weight: 800; letter-spacing: 0.3em;
          text-transform: uppercase; color: rgba(255,255,255,0.18);
          margin: auto 0; padding-bottom: 20px;
          user-select: none;
        }

        /* ── Main slide area ── */
        .x__stage { flex: 1; position: relative; overflow: hidden; }

        /* Slide images */
        .x__slides { position: absolute; inset: 0; }
        .x__slide { position: absolute; inset: 0; }
        .x__slide img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* Outgoing — slide exit left or right */
        .x__slide--out-fwd { animation: sOutFwd 0.8s var(--ease) forwards; }
        .x__slide--out-bwd { animation: sOutBwd 0.8s var(--ease) forwards; }
        @keyframes sOutFwd { from{opacity:1;transform:scale(1) translateX(0)} to{opacity:0;transform:scale(0.96) translateX(-3%)} }
        @keyframes sOutBwd { from{opacity:1;transform:scale(1) translateX(0)} to{opacity:0;transform:scale(0.96) translateX(3%)} }

        /* Incoming — split wipe reveal */
        .x__slide--in {
          clip-path: inset(0 100% 0 0);
          animation: sWipeIn 0.8s var(--ease) forwards;
        }
        .x__slide--in img { animation: kb 7s ease-out forwards; }
        @keyframes sWipeIn { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
        @keyframes kb { from{transform:scale(1.08)} to{transform:scale(1)} }

        /* ── Scanline / grain texture overlay ── */
        .x__scanlines {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0) 0px,
            rgba(0,0,0,0) 2px,
            rgba(0,0,0,0.04) 2px,
            rgba(0,0,0,0.04) 3px
          );
          animation: scanShift 8s linear infinite;
          opacity: 0.6;
        }
        @keyframes scanShift { from{background-position:0 0} to{background-position:0 48px} }

        /* ── Cinematic vignette / gradient overlays ── */
        .x__scrim {
          position: absolute; inset: 0; z-index: 3;
          background:
            linear-gradient(to top,    rgba(6,6,8,0.97) 0%,   rgba(6,6,8,0.55) 28%,  transparent 52%),
            linear-gradient(to bottom, rgba(6,6,8,0.7)  0%,   transparent 25%),
            linear-gradient(to right,  rgba(6,6,8,0.5)  0%,   transparent 30%),
            radial-gradient(ellipse 120% 100% at 50% 100%, rgba(6,6,8,0.4) 0%, transparent 60%);
        }

        /* ── Accent bar (right edge) ── */
        .x__accent-bar {
          position: absolute; top: 0; right: 0; bottom: 0; width: 3px; z-index: 8;
          background: linear-gradient(to bottom, var(--blue) 0%, transparent 70%);
        }

        /* ── TOP UI ── */
        .x__slide-top {
          position: absolute; top: 0; left: 0; right: 0; z-index: 6;
          padding: 16px 20px;
          display: flex; align-items: flex-start; justify-content: space-between;
        }

        /* Badge */
        .x__badge {
          display: flex; align-items: center; gap: 6px;
          background: rgba(6,6,8,0.65); backdrop-filter: blur(20px);
          padding: 7px 13px 7px 10px;
          border: 1px solid rgba(255,255,255,0.12);
          font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.9); letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .x__badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: liveDot 1.8s ease-in-out infinite; }

        /* Top-right info cluster */
        .x__top-cluster {
          display: flex; flex-direction: column; align-items: flex-end; gap: 6px;
        }
        .x__counter {
          background: var(--blue);
          padding: 6px 13px;
          font-family: var(--ff-hd); font-size: 18px; letter-spacing: 0.04em;
          color: #fff; line-height: 1;
        }
        .x__category-tag {
          font-size: 8.5px; font-weight: 800; letter-spacing: 0.32em;
          text-transform: uppercase; color: rgba(255,255,255,0.3);
          padding-right: 2px;
        }

        /* ── Slide accent tag — left ribbon ── */
        .x__tag-ribbon {
          position: absolute; left: 0; top: 50%; z-index: 6;
          transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 0;
          transition: opacity 0.4s;
        }
        .x__tag-block {
          writing-mode: vertical-rl; text-orientation: mixed;
          transform: rotate(180deg);
          font-size: 8px; font-weight: 900; letter-spacing: 0.3em;
          text-transform: uppercase; color: #fff;
          padding: 14px 8px;
          transition: background 0.5s;
          white-space: nowrap;
        }

        /* ── Big ghost number ── */
        .x__bg-num {
          position: absolute; bottom: 80px; right: 18px; z-index: 4;
          font-family: var(--ff-hd); font-size: 220px; line-height: 1;
          color: rgba(255,255,255,0.04); pointer-events: none; user-select: none;
          letter-spacing: -0.05em;
          transition: opacity 0.4s;
        }

        /* ── BOTTOM UI ── */
        .x__slide-bot {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 6;
          padding: 0 20px 20px;
        }

        /* Metadata strip above title */
        .x__meta-strip {
          display: flex; align-items: center; gap: 12px; margin-bottom: 14px;
          padding: 8px 12px;
          background: rgba(255,255,255,0.04); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.07);
          border-left: 2px solid var(--blue);
        }
        .x__meta-item {
          display: flex; flex-direction: column; gap: 2px;
        }
        .x__meta-key {
          font-size: 7.5px; font-weight: 700; letter-spacing: 0.28em;
          text-transform: uppercase; color: rgba(255,255,255,0.25);
        }
        .x__meta-val {
          font-size: 10.5px; font-weight: 600; color: rgba(255,255,255,0.75);
          letter-spacing: 0.02em;
        }
        .x__meta-sep { width: 1px; height: 28px; background: rgba(255,255,255,0.1); margin: 0 2px; }

        /* Progress */
        .x__prog { display: flex; gap: 3px; margin-bottom: 16px; }
        .x__prog-seg { flex: 1; height: 2px; cursor: pointer; background: rgba(255,255,255,0.12); overflow: hidden; transition: transform 0.15s var(--easeb); }
        .x__prog-seg:hover { transform: scaleY(3); }
        .x__prog-fill { height: 100%; background: var(--blue); transform-origin: left; box-shadow: 0 0 8px rgba(19,84,249,0.7); }

        /* Title row */
        .x__slide-info { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; }
        .x__slide-title { font-family: var(--ff-hd); font-size: 68px; line-height: 0.88; letter-spacing: 0.02em; color: #fff; text-shadow: 0 8px 48px rgba(0,0,0,0.6); }
        .x__slide-sub { font-size: 9.5px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin-top: 10px; }

        /* Nav cluster */
        .x__navs { display: flex; gap: 4px; flex-shrink: 0; }
        .x__nav {
          width: 38px; height: 38px;
          border: 1.5px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05); backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.55);
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s var(--easeb);
        }
        .x__nav:hover { background: var(--blue); border-color: var(--blue); color: #fff; transform: scale(1.12); }
        .x__nav:active { transform: scale(0.9); }

        /* Pause indicator */
        .x__pause-ring {
          position: absolute; top: 16px; left: 50%; transform: translateX(-50%); z-index: 7;
          display: flex; align-items: center; gap: 6px;
          background: rgba(0,0,0,0.5); backdrop-filter: blur(12px);
          padding: 5px 12px 5px 8px;
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(255,255,255,0.5);
          opacity: 0; transition: opacity 0.3s; pointer-events: none;
        }
        .x__right:hover .x__pause-ring { opacity: 1; }
        .x__pause-icon { display: flex; gap: 2px; }
        .x__pause-bar { width: 2px; height: 9px; background: rgba(255,255,255,0.5); }

        /* Corner tick marks — cinematic frame corners */
        .x__corner-marks {
          position: absolute; inset: 12px; z-index: 7; pointer-events: none;
        }
        .x__cm { position: absolute; width: 14px; height: 14px; }
        .x__cm--tl { top: 0; left: 0; border-top: 1.5px solid rgba(255,255,255,0.25); border-left: 1.5px solid rgba(255,255,255,0.25); }
        .x__cm--tr { top: 0; right: 0; border-top: 1.5px solid rgba(255,255,255,0.25); border-right: 1.5px solid rgba(255,255,255,0.25); }
        .x__cm--bl { bottom: 0; left: 0; border-bottom: 1.5px solid rgba(255,255,255,0.25); border-left: 1.5px solid rgba(255,255,255,0.25); }
        .x__cm--br { bottom: 0; right: 0; border-bottom: 1.5px solid rgba(255,255,255,0.25); border-right: 1.5px solid rgba(255,255,255,0.25); }

        /* ── Floating cards ── */
        .x__float {
          position: absolute; z-index: 15;
          background: var(--white);
          border: 1.5px solid var(--black);
          box-shadow: 4px 4px 0 var(--black);
        }
        .x__float--rating { bottom: 100px; left: -72px; padding: 14px 18px; display: flex; align-items: center; gap: 12px; animation: f1 5s ease-in-out infinite; }
        @keyframes f1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .x__f-icon { width: 40px; height: 40px; background: #fefce8; border: 1.5px solid #fde68a; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .x__f-score { font-family: var(--ff-hd); font-size: 28px; color: var(--black); line-height: 1; }
        .x__f-stars { display: flex; gap: 2px; margin: 3px 0 2px; }
        .x__f-lbl   { font-size: 10px; color: var(--light); font-weight: 500; }
        .x__float--clients { top: 44px; right: -68px; padding: 12px 16px; display: flex; align-items: center; gap: 10px; animation: f2 6s ease-in-out infinite; }
        @keyframes f2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(9px)} }
        .x__avs { display: flex; }
        .x__av { width: 28px; height: 28px; border-radius: 50%; border: 2.5px solid var(--white); font-size: 10px; font-weight: 800; color: #fff; display: flex; align-items: center; justify-content: center; margin-left: -9px; flex-shrink: 0; }
        .x__av:first-child { margin-left: 0; }
        .x__f-count  { font-size: 13px; font-weight: 700; color: var(--black); }
        .x__f-region { font-size: 10px; color: var(--light); font-weight: 400; margin-top: 2px; }
        .x__float--online { top: 50%; right: -60px; transform: translateY(-50%); padding: 10px 14px; display: flex; align-items: center; gap: 9px; animation: f3 4.5s ease-in-out infinite; }
        @keyframes f3 { 0%,100%{transform:translateY(-50%)} 50%{transform:translateY(calc(-50% - 8px))} }
        .x__o-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); flex-shrink: 0; animation: liveDot 1.8s ease-in-out infinite; }
        .x__o-title { font-size: 11.5px; font-weight: 700; color: var(--black); white-space: nowrap; }
        .x__o-sub   { font-size: 10px; color: var(--light); font-weight: 400; margin-top: 1px; }

        /* ── Marquee ── */
        .x__mq { position: relative; z-index: 2; display: flex; align-items: stretch; border-top: 1.5px solid var(--black); background: var(--white); overflow: hidden; }
        .x__mq-lbl { flex-shrink: 0; background: var(--blue); padding: 12px 24px; font-size: 9px; font-weight: 800; letter-spacing: 0.3em; text-transform: uppercase; color: #fff; display: flex; align-items: center; white-space: nowrap; border-right: 1.5px solid var(--black); }
        .x__mq-body { flex: 1; overflow: hidden; position: relative; }
        .x__mq-body::before, .x__mq-body::after { content: ''; position: absolute; top: 0; bottom: 0; width: 60px; z-index: 2; }
        .x__mq-body::before { left: 0; background: linear-gradient(to right, var(--white), transparent); }
        .x__mq-body::after  { right: 0; background: linear-gradient(to left, var(--white), transparent); }
        .x__mq-track { display: flex; width: max-content; animation: mq 42s linear infinite; padding: 12px 0; }
        @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
        .x__mq-item { display: inline-flex; align-items: center; gap: 16px; padding: 0 16px; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
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
          .x__film { display: none; }
          .x__meta-strip { display: none; }
        }
      `}</style>

      <section className="x" ref={rootRef}>

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

          {/* ══════════════════════════════════
               ── RIGHT — PICTURE AREA ──
               ══════════════════════════════════ */}
          <div
            className={`x__right ${inView ? "in" : ""}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >

            {/* ── Film strip sidebar ── */}
            <div className="x__film">
              <div className="x__film-thumbs">
                {SLIDES.map((s, i) => (
                  <div
                    key={i}
                    className={`x__film-thumb ${i === slide ? "active" : ""}`}
                    onClick={() => goTo(i)}
                    title={s.label}
                  >
                    <img src={s.url} alt={s.label} />
                    <div className="x__film-thumb-glow" />
                  </div>
                ))}
              </div>
              <div className="x__film-label">Portfolio</div>
            </div>

            {/* ── Main stage ── */}
            <div className="x__stage">

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

              {/* Accent bar */}
              <div className="x__accent-bar" aria-hidden />

              {/* Cinematic frame corners */}
              <div className="x__corner-marks" aria-hidden>
                <div className="x__cm x__cm--tl" />
                <div className="x__cm x__cm--tr" />
                <div className="x__cm x__cm--bl" />
                <div className="x__cm x__cm--br" />
              </div>

              {/* Pause overlay indicator */}
              <div className="x__pause-ring">
                <div className="x__pause-icon">
                  <div className="x__pause-bar" />
                  <div className="x__pause-bar" />
                </div>
                Paused
              </div>

              {/* Slide images */}
              <div className="x__slides">
                {prevSlide !== null && (
                  <div
                    className={`x__slide ${revealDir >= 0 ? "x__slide--out-fwd" : "x__slide--out-bwd"}`}
                    key={`p${prevSlide}`}
                  >
                    <img src={SLIDES[prevSlide].url} alt="" />
                  </div>
                )}
                <div className="x__slide x__slide--in" key={`a${slide}`}>
                  <img src={cur.url} alt={cur.label} />
                </div>
              </div>

              {/* Overlays */}
              <div className="x__scanlines" aria-hidden />
              <div className="x__scrim" aria-hidden />

              {/* Ghost number */}
              <div className="x__bg-num" aria-hidden>0{slide+1}</div>

              {/* Accent tag ribbon — left edge */}
              <div className="x__tag-ribbon" aria-hidden>
                <div className="x__tag-block" style={{ background: cur.accent }}>
                  {cur.tag}
                </div>
              </div>

              {/* Top UI */}
              <div className="x__slide-top">
                <div className="x__badge">
                  <span className="x__badge-dot" />
                  Open Now
                </div>
                <div className="x__top-cluster">
                  <div className="x__counter">0{slide+1}/{SLIDES.length}</div>
                  <div className="x__category-tag">{cur.category}</div>
                </div>
              </div>

              {/* Bottom UI */}
              <div className="x__slide-bot">
                {/* Metadata strip */}
                <div className="x__meta-strip">
                  <div className="x__meta-item">
                    <span className="x__meta-key">Category</span>
                    <span className="x__meta-val">{cur.category}</span>
                  </div>
                  <div className="x__meta-sep" />
                  <div className="x__meta-item">
                    <span className="x__meta-key">Year</span>
                    <span className="x__meta-val">{cur.year}</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="x__prog">
                  {SLIDES.map((_,i) => (
                    <div key={i} className="x__prog-seg" onClick={()=>goTo(i)}>
                      <div className="x__prog-fill" style={{
                        transform: i===slide ? `scaleX(${progress/100})` : i<slide ? "scaleX(1)" : "scaleX(0)"
                      }} />
                    </div>
                  ))}
                </div>

                {/* Title + nav */}
                <div className="x__slide-info">
                  <div>
                    <div className="x__slide-title">{cur.label}</div>
                    <div className="x__slide-sub">{cur.tag} · {slide===0?"Available today":slide===1?"Reply 2 hrs":slide===2?"E-commerce":slide===3?"Modern code":"Cutting-edge"}</div>
                  </div>
                  <div className="x__navs">
                    <button className="x__nav" onClick={()=>goTo((slide-1+SLIDES.length)%SLIDES.length, -1)} aria-label="Prev">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button className="x__nav" onClick={()=>goTo((slide+1)%SLIDES.length, 1)} aria-label="Next">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>
              </div>

            </div>{/* /x__stage */}
          </div>{/* /x__right */}
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
