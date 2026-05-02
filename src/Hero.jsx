import { useState, useEffect, useRef } from "react";

const SERVICES = [
  "Websites", "E-Commerce Stores", "Mobile Apps",
  "AI Chatbots", "Custom Software", "Digital Marketing",
  "Branding & Logos", "Google SEO"
];

const STATS = [
  { v: "150+", l: "Clients" },
  { v: "320+", l: "Projects" },
  { v: "4.9★", l: "Rating" },
  { v: "98%",  l: "Retention" },
];

const MARQUEE = [
  "Web Development","E-Commerce","Mobile Apps","AI Chatbots",
  "Business Automation","Web Redesign","Custom Software",
  "Digital Marketing","Branding","Logo Design","Google SEO",
  "Web Hosting","Maintenance"
];

const BG = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80&fit=crop&crop=center";

export default function MuchyzHero() {
  const [idx, setIdx]     = useState(0);
  const [text, setText]   = useState("");
  const [del, setDel]     = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef(null);

  useEffect(() => { setTimeout(() => setReady(true), 80); }, []);

  useEffect(() => {
    const w = SERVICES[idx]; let t;
    if (!del && text.length < w.length)
      t = setTimeout(() => setText(w.slice(0, text.length + 1)), 72);
    else if (!del && text.length === w.length)
      t = setTimeout(() => setDel(true), 2200);
    else if (del && text.length > 0)
      t = setTimeout(() => setText(text.slice(0, -1)), 36);
    else { setDel(false); setIdx(c => (c + 1) % SERVICES.length); }
    return () => clearTimeout(t);
  }, [text, del, idx]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .mh * { box-sizing:border-box; margin:0; padding:0; -webkit-tap-highlight-color:transparent; }
        .mh a { text-decoration:none; color:inherit; }

        /* ── ROOT ── */
        .mh {
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow: hidden;
          background: #080810;
        }

        /* ── BG IMAGE ── */
        .mh__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .mh__bg img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          filter: brightness(.55) saturate(1.2);
        }
        /* gradient: dark top (for contrast), light middle (glass pops), dark bottom */
        .mh__bg::after {
          content: '';
          position: absolute; inset: 0;
          background:
            linear-gradient(180deg,
              rgba(8,8,16,.70) 0%,
              rgba(8,8,16,.25) 30%,
              rgba(8,8,16,.15) 55%,
              rgba(8,8,16,.60) 100%
            );
        }

        /* ── CONTENT WRAPPER ── */
        .mh__inner {
          position: relative;
          z-index: 10;
          padding: 20px 16px 0;
        }

        /* ── GLASS CARD ── */
        .mh__card {
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(40px) saturate(1.8);
          -webkit-backdrop-filter: blur(40px) saturate(1.8);
          border: 1px solid rgba(255,255,255,.95);
          border-radius: 20px;
          padding: 28px 22px 24px;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,1),
            0 24px 60px rgba(0,0,0,.35),
            0 4px 16px rgba(0,0,0,.15);
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .6s .1s ease, transform .6s .1s ease;
        }
        .mh--ready .mh__card {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── EYEBROW TAG ── */
        .mh__tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #5b5ef4;
          background: rgba(91,94,244,.09);
          border: 1px solid rgba(91,94,244,.22);
          padding: 5px 12px;
          border-radius: 100px;
          margin-bottom: 18px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity .5s .25s ease, transform .5s .25s ease;
        }
        .mh--ready .mh__tag { opacity:1; transform:translateY(0); }
        .mh__tag-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #5b5ef4;
          flex-shrink: 0;
          animation: mhPulse 2s ease infinite;
        }

        /* ── HEADLINE ── */
        .mh__h1 {
          font-family: 'Syne', sans-serif;
          font-style: normal;
          margin-bottom: 6px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .6s .32s ease, transform .6s .32s ease;
        }
        .mh--ready .mh__h1 { opacity:1; transform:translateY(0); }

        .mh__h1-soft {
          display: block;
          font-family: 'Syne', sans-serif;
          font-weight: 400;
          font-style: normal;
          font-size: clamp(26px, 7vw, 52px);
          line-height: 1.15;
          color: #5a5a80;
          letter-spacing: -.02em;
        }
        .mh__h1-bold {
          display: block;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-style: normal;
          font-size: clamp(32px, 8.5vw, 64px);
          line-height: 1.05;
          color: #0a0a14;
          letter-spacing: -.03em;
        }

        /* ── TYPED ROW ── */
        .mh__typed {
          display: flex;
          align-items: center;
          min-height: clamp(36px, 9vw, 70px);
          margin-bottom: 16px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .6s .42s ease, transform .6s .42s ease;
        }
        .mh--ready .mh__typed { opacity:1; transform:translateY(0); }

        .mh__typed-word {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-style: normal;
          font-size: clamp(32px, 8.5vw, 64px);
          line-height: 1.05;
          letter-spacing: -.03em;
          background: linear-gradient(135deg, #5b5ef4 0%, #8b5cf6 60%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .mh__caret {
          display: inline-block;
          width: 3px;
          height: clamp(28px, 7vw, 54px);
          background: #5b5ef4;
          border-radius: 2px;
          margin-left: 4px;
          vertical-align: middle;
          animation: mhBlink .9s step-end infinite;
          flex-shrink: 0;
        }

        /* ── DESCRIPTION ── */
        .mh__desc {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 400;
          line-height: 1.75;
          color: #5a5a80;
          margin-bottom: 22px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity .5s .52s ease, transform .5s .52s ease;
        }
        .mh--ready .mh__desc { opacity:1; transform:translateY(0); }
        .mh__desc strong {
          color: #1e1e30;
          font-weight: 600;
        }

        /* ── BUTTONS ── */
        .mh__btns {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity .5s .60s ease, transform .5s .60s ease;
        }
        .mh--ready .mh__btns { opacity:1; transform:translateY(0); }

        .mh__btn-primary {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 16px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
          background: linear-gradient(135deg, #5b5ef4, #7c3aed);
          border-radius: 12px;
          border: none;
          box-shadow: 0 4px 18px rgba(91,94,244,.45);
          transition: transform .15s, box-shadow .15s;
        }
        .mh__btn-primary:active { transform: scale(.96); }

        .mh__btn-secondary {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 13px 14px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #1e1e30;
          white-space: nowrap;
          background: rgba(255,255,255,.7);
          border: 1.5px solid rgba(10,10,20,.14);
          border-radius: 12px;
          transition: background .15s, transform .15s;
        }
        .mh__btn-secondary:active { transform: scale(.96); }

        .mh__arrow {
          display: flex;
          flex-shrink: 0;
          transition: transform .2s;
        }
        .mh__btn-primary:hover .mh__arrow,
        .mh__btn-secondary:hover .mh__arrow { transform: translateX(3px); }

        /* ── STATS ── */
        .mh__stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(91,94,244,.10);
          padding-top: 18px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity .5s .68s ease, transform .5s .68s ease;
        }
        .mh--ready .mh__stats { opacity:1; transform:translateY(0); }

        .mh__stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 0 10px;
          position: relative;
          min-width: 0;
        }
        .mh__stat:first-child { padding-left: 0; }
        .mh__stat:last-child  { padding-right: 0; }
        .mh__stat + .mh__stat::before {
          content: '';
          position: absolute;
          left: 0; top: 10%; bottom: 10%;
          width: 1px;
          background: rgba(91,94,244,.12);
        }
        .mh__stat-val {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-style: normal;
          font-size: 17px;
          line-height: 1;
          letter-spacing: -.03em;
          white-space: nowrap;
          background: linear-gradient(135deg, #0a0a14 0%, #5b5ef4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .mh__stat-label {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 8px;
          font-weight: 600;
          color: #8888a8;
          letter-spacing: .06em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* ── MARQUEE ── */
        .mh__marq {
          position: relative;
          z-index: 10;
          background: rgba(6,6,14,.82);
          border-top: 1px solid rgba(255,255,255,.06);
          overflow: hidden;
          padding: 13px 0;
          -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
          opacity: 0;
          transition: opacity .5s .8s ease;
        }
        .mh--ready .mh__marq { opacity: 1; }

        .mh__marq-track {
          display: flex;
          width: max-content;
          animation: mhMarq 24s linear infinite;
        }
        .mh__marq-item {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: rgba(255,255,255,.38);
          padding: 0 6px;
          white-space: nowrap;
        }
        .mh__marq-dot {
          color: #5b5ef4;
          font-size: 4px;
          flex-shrink: 0;
        }

        /* ── KEYFRAMES ── */
        @keyframes mhBlink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes mhPulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.7)} }
        @keyframes mhMarq   { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* ── TABLET / DESKTOP ── */
        @media (min-width: 640px) {
          .mh__inner { padding: 28px 28px 0; }
          .mh__card  { padding: 36px 32px 30px; }
          .mh__h1-soft { font-size: clamp(28px, 4vw, 48px); }
          .mh__h1-bold { font-size: clamp(36px, 5vw, 60px); }
          .mh__typed-word { font-size: clamp(36px, 5vw, 60px); }
          .mh__stat-val { font-size: 20px; }
        }

        @media (min-width: 1024px) {
          .mh__inner { padding: 48px 48px 0; max-width: 900px; margin: 0 auto; }
        }
      `}</style>

      <div className={`mh${ready ? " mh--ready" : ""}`} ref={ref}>

        {/* Background */}
        <div className="mh__bg">
          <img src={BG} alt="" aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="mh__inner">
          <div className="mh__card">

            {/* Tag */}
            <div className="mh__tag">
              <span className="mh__tag-dot" />
              Full-Service Digital Studio · Kenya
            </div>

            {/* Headline */}
            <h1 className="mh__h1">
              <span className="mh__h1-soft">We design &amp; build</span>
              <span className="mh__h1-bold">exceptional</span>
            </h1>

            {/* Typed */}
            <div className="mh__typed">
              <span className="mh__typed-word">{text}</span>
              <span className="mh__caret" />
            </div>

            {/* Description */}
            <p className="mh__desc">
              From <strong>websites &amp; e-commerce</strong> to <strong>AI chatbots, apps,
              branding &amp; SEO</strong> — everything your business needs to grow, under one roof.
            </p>

            {/* Buttons */}
            <div className="mh__btns">
              <a
                href="https://wa.me/254705427449?text=Hi%20Muchyz%2C%20I%20want%20to%20start%20a%20project"
                target="_blank" rel="noopener noreferrer"
                className="mh__btn-primary"
              >
                Start a Project
                <span className="mh__arrow">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                  </svg>
                </span>
              </a>
              <a href="/work" className="mh__btn-secondary">
                View Work
                <span className="mh__arrow">
                  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                  </svg>
                </span>
              </a>
            </div>

            {/* Stats */}
            <div className="mh__stats">
              {STATS.map((s, i) => (
                <div className="mh__stat" key={i}>
                  <div className="mh__stat-val">{s.v}</div>
                  <div className="mh__stat-label">{s.l}</div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Marquee */}
        <div className="mh__marq">
          <div className="mh__marq-track">
            {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
              <span className="mh__marq-item" key={i}>
                {item}<span className="mh__marq-dot">◆</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
