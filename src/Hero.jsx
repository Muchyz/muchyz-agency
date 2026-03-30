import { useState, useEffect, useRef } from "react";

const WORDS = ["Websites", "AI Chatbots", "Software", "Mobile Apps", "Automation"];

export default function MuchyzHero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = WORDS[wordIdx];
    let t;
    if (!deleting && displayed.length < target.length)
      t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 85);
    else if (!deleting && displayed.length === target.length)
      t = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 42);
    else { setDeleting(false); setWordIdx(c => (c + 1) % WORDS.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, wordIdx]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;0,700;1,300;1,600&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #FAFAF8;
          --bg2: #F3F2EE;
          --ink: #111110;
          --ink2: #3D3D3A;
          --muted: #888884;
          --accent: #1A56DB;
          --accent-light: #EEF3FF;
          --border: #E5E4DF;
          --green: #16A34A;
          --serif: 'Fraunces', Georgia, serif;
          --sans: 'Instrument Sans', sans-serif;
          --mono: 'JetBrains Mono', monospace;
        }

        .mhero {
          background: var(--bg);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: var(--sans);
          color: var(--ink);
          overflow: hidden;
        }

        /* ─── NAV ─── */
        .mnav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px;
          height: 68px;
          border-bottom: 1px solid var(--border);
          background: rgba(250,250,248,0.9);
          backdrop-filter: blur(12px);
          position: sticky; top: 0; z-index: 100;
          opacity: ${loaded ? 1 : 0};
          transform: translateY(${loaded ? 0 : -16}px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .mnav-logo {
          display: flex; align-items: center; gap: 10px;
        }
        .mlogo-mark {
          width: 32px; height: 32px;
          background: var(--ink);
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
        }
        .mlogo-mark svg { width: 18px; height: 18px; }
        .mlogo-text {
          font-family: var(--serif);
          font-size: 17px; font-weight: 600;
          letter-spacing: -0.01em; color: var(--ink);
        }
        .mlogo-text span {
          color: var(--accent);
        }
        .mnav-links {
          display: flex; gap: 0; list-style: none;
        }
        .mnav-links a {
          display: block;
          font-size: 13.5px; font-weight: 500;
          color: var(--ink2); text-decoration: none;
          padding: 8px 18px; border-radius: 6px;
          transition: background 0.15s, color 0.15s;
          letter-spacing: -0.01em;
        }
        .mnav-links a:hover { background: var(--bg2); color: var(--ink); }
        .mnav-right { display: flex; align-items: center; gap: 10px; }
        .mbtn-ghost {
          font-size: 13.5px; font-weight: 500;
          color: var(--ink2); background: none; border: none;
          cursor: pointer; padding: 8px 14px; border-radius: 6px;
          transition: background 0.15s;
        }
        .mbtn-ghost:hover { background: var(--bg2); }
        .mbtn-solid {
          font-size: 13.5px; font-weight: 600;
          color: #fff; background: var(--ink);
          border: none; cursor: pointer;
          padding: 9px 20px; border-radius: 8px;
          letter-spacing: -0.01em;
          transition: background 0.15s, transform 0.1s;
        }
        .mbtn-solid:hover { background: #222; transform: translateY(-1px); }

        /* ─── HERO BODY ─── */
        .mhero-body {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          max-width: 1320px;
          margin: 0 auto;
          width: 100%;
          padding: 0 48px;
          align-items: center;
          padding-top: 72px;
          padding-bottom: 72px;
        }

        /* ─── LEFT ─── */
        .mleft {
          padding-right: 64px;
        }
        .mtag {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: var(--mono); font-size: 11px;
          letter-spacing: 0.04em; font-weight: 500;
          color: var(--green);
          background: #F0FDF4; border: 1px solid #BBF7D0;
          padding: 5px 12px; border-radius: 100px;
          margin-bottom: 32px;
          opacity: ${loaded ? 1 : 0};
          transform: translateY(${loaded ? 0 : 12}px);
          transition: opacity 0.6s 0.2s ease, transform 0.6s 0.2s ease;
        }
        .mtag-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--green); flex-shrink: 0;
          animation: greenPulse 2s infinite;
        }

        .mh1 {
          font-family: var(--serif);
          font-size: clamp(44px, 4.5vw, 68px);
          font-weight: 300;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--ink);
          margin-bottom: 6px;
          opacity: ${loaded ? 1 : 0};
          transform: translateY(${loaded ? 0 : 20}px);
          transition: opacity 0.7s 0.3s ease, transform 0.7s 0.3s ease;
        }
        .mh1 em {
          font-style: italic; font-weight: 600;
          color: var(--ink);
        }
        .mh1-accent {
          font-family: var(--serif);
          font-size: clamp(44px, 4.5vw, 68px);
          font-weight: 600; font-style: italic;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--accent);
          margin-bottom: 28px;
          display: flex; align-items: baseline; gap: 0;
          opacity: ${loaded ? 1 : 0};
          transform: translateY(${loaded ? 0 : 20}px);
          transition: opacity 0.7s 0.45s ease, transform 0.7s 0.45s ease;
        }
        .tw-cursor {
          display: inline-block; width: 3px;
          height: clamp(36px, 3.6vw, 54px);
          background: var(--accent); margin-left: 3px;
          vertical-align: middle;
          animation: blink 0.85s step-end infinite;
        }

        .mdesc {
          font-size: 16px; line-height: 1.75;
          color: var(--ink2); font-weight: 400;
          max-width: 440px; margin-bottom: 40px;
          opacity: ${loaded ? 1 : 0};
          transform: translateY(${loaded ? 0 : 16}px);
          transition: opacity 0.7s 0.55s ease, transform 0.7s 0.55s ease;
        }

        .mcta-row {
          display: flex; align-items: center; gap: 14px; margin-bottom: 48px;
          opacity: ${loaded ? 1 : 0};
          transform: translateY(${loaded ? 0 : 16}px);
          transition: opacity 0.7s 0.65s ease, transform 0.7s 0.65s ease;
        }
        .mcta-main {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--accent); color: #fff;
          font-family: var(--sans); font-size: 14px; font-weight: 600;
          letter-spacing: -0.01em;
          padding: 13px 28px; border-radius: 10px; border: none; cursor: pointer;
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
        }
        .mcta-main:hover {
          background: #1344B8; transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(26,86,219,0.25);
        }
        .mcta-main svg { width: 16px; height: 16px; }
        .mcta-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 14px; font-weight: 500; color: var(--ink2);
          background: none; border: none; cursor: pointer;
          padding: 13px 4px;
          text-decoration: none;
          transition: color 0.15s;
        }
        .mcta-link:hover { color: var(--ink); }
        .mcta-link svg { width: 14px; height: 14px; transition: transform 0.2s; }
        .mcta-link:hover svg { transform: translateX(3px); }

        /* Social proof */
        .msocial-proof {
          display: flex; align-items: center; gap: 16px;
          opacity: ${loaded ? 1 : 0};
          transition: opacity 0.7s 0.8s ease;
        }
        .mavatar-stack {
          display: flex;
        }
        .mavatar {
          width: 32px; height: 32px; border-radius: 50%;
          border: 2px solid var(--bg);
          margin-left: -8px; overflow: hidden;
          background: var(--bg2);
        }
        .mavatar:first-child { margin-left: 0; }
        .mavatar img { width: 100%; height: 100%; object-fit: cover; }
        .mproof-text {
          font-size: 13px; color: var(--muted); line-height: 1.4;
        }
        .mproof-text strong { color: var(--ink2); font-weight: 600; }
        .mstars { color: #F59E0B; font-size: 11px; letter-spacing: 1px; }

        /* ─── RIGHT ─── */
        .mright {
          position: relative;
          height: 560px;
          opacity: ${loaded ? 1 : 0};
          transform: translateY(${loaded ? 0 : 24}px) scale(${loaded ? 1 : 0.97});
          transition: opacity 0.9s 0.5s ease, transform 0.9s 0.5s ease;
        }

        /* Main laptop image */
        .mphoto-main {
          position: absolute;
          top: 0; left: 0; right: 40px; bottom: 40px;
          border-radius: 16px; overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08);
        }
        .mphoto-main img {
          width: 100%; height: 100%; object-fit: cover;
          display: block;
          transform: translateY(${-scrollY * 0.04}px);
          transition: transform 0.1s linear;
        }
        .mphoto-main::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(160deg, transparent 60%, rgba(250,250,248,0.15));
        }

        /* Secondary photo */
        .mphoto-sec {
          position: absolute;
          bottom: 0; right: 0;
          width: 200px; height: 160px;
          border-radius: 12px; overflow: hidden;
          box-shadow: 0 16px 48px rgba(0,0,0,0.14);
          border: 3px solid var(--bg);
        }
        .mphoto-sec img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }

        /* Floating card: metric */
        .mfloat-metric {
          position: absolute;
          top: 32px; right: 0;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 14px 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          min-width: 170px;
          animation: floatY 4s ease-in-out infinite;
        }
        .mfloat-top {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 8px;
        }
        .mfloat-label {
          font-size: 11px; font-weight: 500;
          color: var(--muted); letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .mfloat-badge {
          font-size: 10px; font-weight: 600;
          color: var(--green); background: #F0FDF4;
          padding: 2px 7px; border-radius: 100px;
        }
        .mfloat-num {
          font-family: var(--serif);
          font-size: 32px; font-weight: 600;
          color: var(--ink); line-height: 1; margin-bottom: 6px;
        }
        .mfloat-bar-wrap {
          height: 4px; background: var(--border); border-radius: 2px; overflow: hidden;
        }
        .mfloat-bar {
          height: 100%; width: 92%; background: var(--accent); border-radius: 2px;
        }

        /* Floating card: service tag */
        .mfloat-service {
          position: absolute;
          bottom: 56px; left: -28px;
          background: var(--ink);
          color: #fff;
          border-radius: 10px;
          padding: 12px 16px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.2);
          display: flex; align-items: center; gap: 10px;
          animation: floatY 5s 1s ease-in-out infinite;
          white-space: nowrap;
        }
        .mfloat-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; flex-shrink: 0;
        }
        .mfloat-stitle {
          font-size: 12px; font-weight: 600; color: #fff;
          letter-spacing: -0.01em;
        }
        .mfloat-ssub {
          font-size: 10px; color: rgba(255,255,255,0.5);
          margin-top: 1px;
        }

        /* ─── LOGOS BAR ─── */
        .mlogos-bar {
          border-top: 1px solid var(--border);
          padding: 28px 48px;
          display: flex; align-items: center;
          gap: 48px;
          max-width: 1320px;
          margin: 0 auto; width: 100%;
          opacity: ${loaded ? 1 : 0};
          transition: opacity 0.8s 1s ease;
        }
        .mlogos-label {
          font-size: 12px; color: var(--muted);
          font-weight: 500; white-space: nowrap;
          flex-shrink: 0;
        }
        .mlogos-divider {
          width: 1px; height: 20px; background: var(--border); flex-shrink: 0;
        }
        .mlogos-list {
          display: flex; align-items: center; gap: 40px; flex-wrap: wrap;
        }
        .mlogo-item {
          font-family: var(--serif);
          font-size: 15px; font-weight: 600;
          color: var(--muted); letter-spacing: -0.02em;
          transition: color 0.2s; cursor: default;
        }
        .mlogo-item:hover { color: var(--ink2); }

        /* ─── KEYFRAMES ─── */
        @keyframes blink {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }
        @keyframes greenPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(22,163,74,0.4); }
          50%      { box-shadow: 0 0 0 5px rgba(22,163,74,0); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 960px) {
          .mnav { padding: 0 24px; }
          .mnav-links { display: none; }
          .mhero-body {
            grid-template-columns: 1fr;
            padding: 48px 24px;
            padding-top: 40px;
          }
          .mleft { padding-right: 0; margin-bottom: 48px; }
          .mright { height: 340px; }
          .mfloat-service { display: none; }
          .mlogos-bar { padding: 24px; gap: 24px; }
          .mlogos-list { gap: 24px; }
        }
      `}</style>

      <div className="mhero">

        {/* ── NAV ── */}
        <nav className="mnav">
          <div className="mnav-logo">
            <div className="mlogo-mark">
              <svg viewBox="0 0 18 18" fill="none">
                <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white"/>
                <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" opacity="0.5"/>
                <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" opacity="0.5"/>
                <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white"/>
              </svg>
            </div>
            <span className="mlogo-text">Muchyz<span>.</span></span>
          </div>
          <ul className="mnav-links">
            {["Services","Work","About","Pricing","Blog"].map(l => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
          <div className="mnav-right">
            <button className="mbtn-ghost">Sign in</button>
            <button className="mbtn-solid">Get a Quote →</button>
          </div>
        </nav>

        {/* ── HERO BODY ── */}
        <div className="mhero-body">

          {/* LEFT */}
          <div className="mleft">
            <div className="mtag">
              <span className="mtag-dot"/>
              Now accepting new projects — 2025
            </div>

            <h1 className="mh1">
              We design & build<br/>
              <em>exceptional</em>
            </h1>
            <div className="mh1-accent">
              {displayed}<span className="tw-cursor"/>
            </div>

            <p className="mdesc">
              Muchyz is a full-service digital agency crafting websites, AI chatbots,
              and custom software that help ambitious businesses grow faster.
              Strategy, design, and engineering — all under one roof.
            </p>

            <div className="mcta-row">
              <button className="mcta-main">
                Start a Project
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </button>
              <a href="#" className="mcta-link">
                See our work
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M2 7h10M8 3l4 4-4 4"/>
                </svg>
              </a>
            </div>

            <div className="msocial-proof">
              <div className="mavatar-stack">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
                ].map((src, i) => (
                  <div className="mavatar" key={i}>
                    <img src={src} alt="client"/>
                  </div>
                ))}
              </div>
              <div className="mproof-text">
                <div className="mstars">★★★★★</div>
                <div><strong>150+ clients</strong> trust Muchyz</div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="mright">
            {/* Main photo */}
            <div className="mphoto-main">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=700&fit=crop&crop=center"
                alt="Muchyz office team"
              />
            </div>

            {/* Secondary photo */}
            <div className="mphoto-sec">
              <img
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=320&fit=crop&crop=center"
                alt="Laptop workspace"
              />
            </div>

            {/* Floating metric */}
            <div className="mfloat-metric">
              <div className="mfloat-top">
                <span className="mfloat-label">Client satisfaction</span>
                <span className="mfloat-badge">↑ 98%</span>
              </div>
              <div className="mfloat-num">150<span style={{fontSize:18,color:"var(--muted)"}}>+</span></div>
              <div className="mfloat-bar-wrap">
                <div className="mfloat-bar"/>
              </div>
            </div>

            {/* Floating service tag */}
            <div className="mfloat-service">
              <div className="mfloat-icon">🤖</div>
              <div>
                <div className="mfloat-stitle">AI Chatbot deployed</div>
                <div className="mfloat-ssub">Just now · for TechCorp Inc.</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── LOGOS BAR ── */}
        <div className="mlogos-bar">
          <span className="mlogos-label">Trusted by teams at</span>
          <div className="mlogos-divider"/>
          <div className="mlogos-list">
            {["Accenture","Shopify","Notion","Figma","Vercel","Linear"].map(n => (
              <span className="mlogo-item" key={n}>{n}</span>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
