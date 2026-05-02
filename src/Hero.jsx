import { useState, useEffect, useRef } from "react";

const SERVICES_TYPED = [
  "Websites",
  "E-Commerce",
  "Mobile Apps",
  "AI Chatbots",
  "Custom Software",
  "Digital Marketing",
  "Branding & Logos",
  "Google SEO"
];

const MARQUEE_ITEMS = [
  "Web Development","E-Commerce","Mobile Apps","AI Chatbots",
  "Automation","Web Redesign","Custom Software","Digital Marketing",
  "Branding","Logo Design","Google SEO","Web Hosting","Maintenance"
];

const AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
];

export default function MuchyzHero() {
  const [idx, setIdx]     = useState(0);
  const [text, setText]   = useState("");
  const [del, setDel]     = useState(false);
  const [ready, setReady] = useState(false);
  const wordRef = useRef(null);

  useEffect(() => { setTimeout(() => setReady(true), 80); }, []);

  useEffect(() => {
    const w = SERVICES_TYPED[idx]; let t;
    if (!del && text.length < w.length)
      t = setTimeout(() => setText(w.slice(0, text.length + 1)), 72);
    else if (!del && text.length === w.length)
      t = setTimeout(() => setDel(true), 2200);
    else if (del && text.length > 0)
      t = setTimeout(() => setText(text.slice(0, -1)), 36);
    else { setDel(false); setIdx(c => (c + 1) % SERVICES_TYPED.length); }
    return () => clearTimeout(t);
  }, [text, del, idx]);

  useEffect(() => {
    const el = wordRef.current;
    if (!el || !el.parentElement) return;
    const container = el.parentElement;
    let size = 26;
    el.style.fontSize = size + "px";
    while (el.scrollWidth > container.clientWidth - 20 && size > 14) {
      size -= 0.5;
      el.style.fontSize = size + "px";
    }
  }, [text]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@400;500;700;800&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=cabinet-grotesk@400,500,700,800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,700;0,900;1,300;1,600&family=Outfit:wght@300;400;500;600;700;800&display=swap');

        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:#eef0f8; font-family:'Outfit', sans-serif; }

        .mh {
          position:relative; overflow:hidden;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(99,102,241,.13) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(167,139,250,.12) 0%, transparent 55%),
            radial-gradient(ellipse at 60% 90%, rgba(249,115,22,.08) 0%, transparent 50%),
            #eef0f8;
        }

        .mh__body { position:relative; z-index:10; padding:18px 14px 8px; }

        .mh__card {
          background: rgba(255,255,255,.35);
          backdrop-filter: blur(48px) saturate(2.2) brightness(1.08);
          -webkit-backdrop-filter: blur(48px) saturate(2.2) brightness(1.08);
          border: 1.5px solid rgba(255,255,255,.85);
          border-radius: 20px;
          padding: 22px 18px 18px;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.9),
            inset 0 -1px 0 rgba(255,255,255,.2),
            0 8px 40px rgba(79,70,229,.10),
            0 2px 8px rgba(0,0,0,.06);
          opacity:0; transform:translateY(16px);
          transition:opacity .55s .08s ease, transform .55s .08s ease;
          overflow:hidden;
        }
        .mh--ready .mh__card { opacity:1; transform:translateY(0); }

        .mh__tag {
          display:inline-flex; align-items:center; gap:10px;
          margin-bottom:18px;
          opacity:0; transition:opacity .45s .22s ease;
        }
        .mh--ready .mh__tag { opacity:1; }
        .mh__tag-rule {
          width:22px; height:1px;
          background:linear-gradient(90deg,transparent,#4f46e5);
          flex-shrink:0;
        }
        .mh__tag-rule--r {
          background:linear-gradient(90deg,#4f46e5,transparent);
        }
        .mh__tag-text {
          font-family:'Outfit', sans-serif;
          font-size:8px; font-weight:600; letter-spacing:.22em; text-transform:uppercase;
          color:#4f46e5; white-space:nowrap;
        }

        .mh__headline {
          margin-bottom:2px;
          opacity:0; transform:translateY(12px);
          transition:opacity .55s .30s ease, transform .55s .30s ease;
        }
        .mh--ready .mh__headline { opacity:1; transform:translateY(0); }

        .mh__line1 {
          display:block;
          font-family:'Fraunces', serif;
          font-size:19px; font-weight:300; font-style:italic;
          line-height:1.25; letter-spacing:-.01em;
          color:#64748b;
        }
        .mh__line2 {
          display:block;
          font-family:'Fraunces', serif;
          font-size:26px; font-weight:700;
          line-height:1.08; letter-spacing:-.03em;
          color:#0f0f1a;
        }

        .mh__typed {
          display:flex; align-items:center;
          height:34px; margin-bottom:14px;
          overflow:hidden;
          opacity:0; transform:translateY(10px);
          transition:opacity .5s .40s ease, transform .5s .40s ease;
        }
        .mh--ready .mh__typed { opacity:1; transform:translateY(0); }
        .mh__word {
          font-family:'Fraunces', serif;
          font-size:26px; font-weight:700;
          line-height:1; letter-spacing:-.03em;
          background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#a78bfa 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          white-space:nowrap; flex:0 0 auto;
        }
        .mh__caret {
          display:inline-block; width:2.5px; height:22px;
          background:#4f46e5; border-radius:2px; margin-left:3px; flex-shrink:0;
          animation:mhBlink .85s step-end infinite;
        }

        .mh__desc {
          font-family:'Outfit', sans-serif;
          font-size:13px; font-weight:400; line-height:1.75; color:#5e6e82;
          margin-bottom:16px;
          opacity:0; transition:opacity .5s .50s ease;
        }
        .mh--ready .mh__desc { opacity:1; }
        .mh__desc strong { color:#1e293b; font-weight:600; }

        .mh__btns {
          display:flex; gap:8px; margin-bottom:18px;
          opacity:0; transition:opacity .5s .57s ease;
        }
        .mh--ready .mh__btns { opacity:1; }

        .mh__btn-cta {
          flex:1; display:flex; align-items:center; justify-content:center; gap:7px;
          padding:12px 10px;
          font-family:'Outfit', sans-serif;
          font-size:12px; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
          color:#fff; white-space:nowrap;
          background:linear-gradient(135deg,#4f46e5,#7c3aed);
          border-radius:10px; border:none;
          box-shadow:0 4px 18px rgba(79,70,229,.42);
          cursor:pointer; transition:transform .14s, box-shadow .14s;
          text-decoration:none;
        }
        .mh__btn-cta:hover { box-shadow:0 6px 26px rgba(79,70,229,.52); transform:translateY(-1px); }
        .mh__btn-cta:active { transform:scale(.96); }

        .mh__btn-ghost {
          flex:1; display:flex; align-items:center; justify-content:center; gap:7px;
          padding:11px 10px;
          font-family:'Outfit', sans-serif;
          font-size:12px; font-weight:600; letter-spacing:.05em; text-transform:uppercase;
          color:#1e293b; white-space:nowrap;
          background:rgba(255,255,255,.8);
          border:1.5px solid rgba(15,15,26,.13);
          border-radius:10px; cursor:pointer; transition:transform .14s, border-color .2s;
          text-decoration:none;
        }
        .mh__btn-ghost:hover { border-color:rgba(79,70,229,.35); transform:translateY(-1px); }
        .mh__btn-ghost:active { transform:scale(.96); }

        .mh__arr { display:flex; flex-shrink:0; transition:transform .18s; }
        .mh__btn-cta:hover .mh__arr,
        .mh__btn-ghost:hover .mh__arr { transform:translateX(3px); }

        .mh__proof {
          display:flex; align-items:center; gap:8px;
          border-top:1px solid rgba(15,15,26,.08); padding-top:14px;
          opacity:0; transition:opacity .5s .64s ease;
        }
        .mh--ready .mh__proof { opacity:1; }

        .mh__proof-left { display:flex; align-items:center; gap:7px; flex:1 1 0; min-width:0; overflow:hidden; }

        .mh__avatars { display:flex; align-items:center; flex-shrink:0; }
        .mh__av {
          width:28px; height:28px; border-radius:50%;
          border:2px solid #fff; margin-left:-7px;
          overflow:hidden; flex-shrink:0;
          box-shadow:0 2px 5px rgba(0,0,0,.14); background:#e2e8f0;
        }
        .mh__av:first-child { margin-left:0; }
        .mh__av:nth-child(4) { display:none; }
        .mh__av img { width:100%; height:100%; object-fit:cover; display:block; }

        .mh__proof-text { display:flex; flex-direction:column; gap:1px; min-width:0; }
        .mh__stars { font-size:10px; color:#f59e0b; white-space:nowrap; line-height:1; margin-bottom:2px; }
        .mh__proof-strong {
          font-family:'Fraunces', serif;
          font-size:12px; font-weight:600; color:#0f0f1a; white-space:nowrap;
          letter-spacing:-.01em;
        }
        .mh__proof-sub {
          font-family:'Outfit', sans-serif;
          font-size:10px; color:#94a3b8; white-space:nowrap;
        }

        .mh__proof-right {
          display:flex; align-items:stretch; flex-shrink:0;
          border:1px solid rgba(15,15,26,.10); border-radius:10px; overflow:hidden;
        }
        .mh__metric {
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          gap:1px; padding:7px 11px;
        }
        .mh__metric + .mh__metric { border-left:1px solid rgba(15,15,26,.09); }
        .mh__metric-val {
          font-family:'Fraunces', serif;
          font-weight:700; font-size:17px; line-height:1; letter-spacing:-.03em;
          color:#0f0f1a; white-space:nowrap;
        }
        .mh__metric-lbl {
          font-family:'Outfit', sans-serif;
          font-size:6.5px; font-weight:600; color:#94a3b8;
          letter-spacing:.12em; text-transform:uppercase; white-space:nowrap;
        }

        .mh__marq {
          position:relative; z-index:10;
          background:#f97316;
          overflow:hidden; padding:11px 0;
        }
        .mh__marq-track { display:flex; width:max-content; animation:mhMarq 22s linear infinite; }
        .mh__marq-item {
          display:inline-flex; align-items:center; gap:12px;
          font-family:'Outfit', sans-serif;
          font-size:8px; font-weight:600; letter-spacing:.22em; text-transform:uppercase;
          color:rgba(255,255,255,.9); padding:0 4px; white-space:nowrap;
        }
        .mh__marq-dot { color:rgba(255,255,255,.6); font-size:6px; }

        @keyframes mhBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes mhPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.6)} }
        @keyframes mhMarq  { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        @media (min-width:480px) {
          .mh__body { padding:22px 18px 8px; }
          .mh__av:nth-child(4) { display:flex; }
          .mh__line1 { font-size:21px; }
          .mh__line2 { font-size:29px; }
          .mh__word  { font-size:29px; }
        }
        @media (min-width:768px) {
          .mh__body { padding:32px 32px 8px; }
          .mh__card  { padding:36px 36px 30px; border-radius:22px; }
          .mh__line1 { font-size:26px; }
          .mh__line2 { font-size:36px; }
          .mh__word  { font-size:36px; }
          .mh__typed { height:44px; }
          .mh__metric-val { font-size:20px; }
          .mh__metric { padding:9px 16px; }
        }
      `}</style>

      <div className={`mh${ready ? " mh--ready" : ""}`}>
        <div className="mh__body">
          <div className="mh__card">

            <div className="mh__tag">
              <span className="mh__tag-rule" />
              <span className="mh__tag-text">Full-Service Digital Studio · Kenya</span>
              <span className="mh__tag-rule mh__tag-rule--r" />
            </div>

            <h1 className="mh__headline">
              <span className="mh__line1">We design &amp; build</span>
              <span className="mh__line2">exceptional</span>
            </h1>

            <div className="mh__typed">
              <span ref={wordRef} className="mh__word">{text}</span>
              <span className="mh__caret" />
            </div>

            <p className="mh__desc">
              From <strong>websites &amp; e-commerce</strong> to{" "}
              <strong>AI chatbots, apps, branding &amp; SEO</strong> — everything
              your business needs to grow online, under one roof.
            </p>

            <div className="mh__btns">
              <a
                href="https://wa.me/254705427449?text=Hi%20Muchyz%2C%20I%20want%20to%20start%20a%20project"
                target="_blank" rel="noopener noreferrer"
                className="mh__btn-cta">
                Start a Project
                <span className="mh__arr">
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                  </svg>
                </span>
              </a>
              <a href="/work" className="mh__btn-ghost">
                See Our Work
                <span className="mh__arr">
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3v10M4 9l4 4 4-4"/>
                  </svg>
                </span>
              </a>
            </div>

            <div className="mh__proof">
              <div className="mh__proof-left">
                <div className="mh__avatars">
                  {AVATARS.map((src, i) => (
                    <div className="mh__av" key={i}>
                      <img src={src} alt={`Client ${i + 1}`} />
                    </div>
                  ))}
                </div>
                <div className="mh__proof-text">
                  <div className="mh__stars">★★★★<span style={{ opacity:.35 }}>★</span></div>
                  <div className="mh__proof-strong">150+ clients</div>
                  <div className="mh__proof-sub">trust Muchyz</div>
                </div>
              </div>

              <div className="mh__proof-right">
                <div className="mh__metric">
                  <div className="mh__metric-val">320+</div>
                  <div className="mh__metric-lbl">Projects</div>
                </div>
                <div className="mh__metric">
                  <div className="mh__metric-val">4.9</div>
                  <div className="mh__metric-lbl">Rating</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="mh__marq">
          <div className="mh__marq-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
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
