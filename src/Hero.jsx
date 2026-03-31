import { useState, useEffect } from "react";

const WORDS = ["Websites", "AI Chatbots", "Software", "Mobile Apps", "Automation"];

const FEED = [
  { icon: "🤖", title: "AI Chatbot deployed",  sub: "TechCorp Inc.",  time: "just now", color: "#1A56DB" },
  { icon: "🚀", title: "Website launched",      sub: "Bloom Studio",  time: "2m ago",   color: "#16A34A" },
  { icon: "📱", title: "App submitted",         sub: "NovaPay Ltd.",  time: "5m ago",   color: "#D97706" },
  { icon: "✨", title: "Design approved",       sub: "Arkflow SaaS",  time: "12m ago",  color: "#9333EA" },
];

const SPARK = [28,42,38,55,48,62,58,74,68,82,78,92];

function useCounter(target, delay, duration, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf, start = null;
    const t = setTimeout(() => {
      raf = requestAnimationFrame(function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) raf = requestAnimationFrame(step);
      });
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [active]);
  return val;
}

export default function MuchyzHero() {
  const [wordIdx,   setWordIdx]   = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting,  setDeleting]  = useState(false);
  const [scrollY,   setScrollY]   = useState(0);
  const [loaded,    setLoaded]    = useState(false);
  const [feedIdx,   setFeedIdx]   = useState(0);
  const [feedVis,   setFeedVis]   = useState(true);

  const clients  = useCounter(150, 900,  1400, loaded);
  const projects = useCounter(320, 1100, 1600, loaded);
  const rating   = useCounter(49,  1300, 1200, loaded);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const w = WORDS[wordIdx];
    let t;
    if (!deleting && displayed.length < w.length)
      t = setTimeout(() => setDisplayed(w.slice(0, displayed.length + 1)), 72);
    else if (!deleting && displayed.length === w.length)
      t = setTimeout(() => setDeleting(true), 2600);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 34);
    else { setDeleting(false); setWordIdx(c => (c + 1) % WORDS.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, wordIdx]);

  useEffect(() => {
    const t = setInterval(() => {
      setFeedVis(false);
      setTimeout(() => { setFeedIdx(i => (i + 1) % FEED.length); setFeedVis(true); }, 400);
    }, 3800);
    return () => clearInterval(t);
  }, []);

  const s = (i, extra = {}) => ({
    opacity: loaded ? 1 : 0,
    transform: `translateY(${loaded ? 0 : 18}px)`,
    transition: `opacity .6s ${.1 + i * .11}s ease, transform .6s ${.1 + i * .11}s ease`,
    ...extra,
  });

  const feed = FEED[feedIdx];
  const logos = ["Accenture","Shopify","Notion","Figma","Vercel","Linear","Stripe","Loom","Intercom","Raycast"];

  const spkMin = Math.min(...SPARK), spkMax = Math.max(...SPARK);
  const spkX = i => (i / (SPARK.length - 1)) * 160;
  const spkY = v => 32 - ((v - spkMin) / (spkMax - spkMin)) * 28;
  const spkPath = SPARK.map((v,i) => `${i===0?'M':'L'}${spkX(i)},${spkY(v)}`).join(' ');
  const spkArea = spkPath + ` L160,36 L0,36 Z`;

  const donutOffset = loaded ? 14 : 133;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,200;0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,500;1,9..144,600;1,9..144,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --bg:#F7F6F2;--bg2:#EEECEA;--bg3:#E4E1D9;
          --ink:#0D0D0B;--ink2:#38352F;--ink3:#6A6760;--muted:#9C9890;
          --accent:#1A56DB;--aclt:#EEF3FF;--acmd:#BFCFFF;
          --green:#16A34A;--glt:#F0FDF4;--gbd:#BBF7D0;
          --amber:#D97706;--purple:#9333EA;
          --bd:#E0DDD6;--bd2:#CECBC2;
          --serif:'Fraunces',Georgia,serif;
          --sans:'DM Sans',sans-serif;
          --mono:'DM Mono',monospace;
          --sfloat:0 20px 60px rgba(0,0,0,.1),0 4px 16px rgba(0,0,0,.06);
          --sheavy:0 40px 100px rgba(0,0,0,.14),0 8px 28px rgba(0,0,0,.08);
        }

        .M{font-family:var(--sans);color:var(--ink);background:var(--bg);overflow:hidden;position:relative}
        .M::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity:.026}

        .Mblob{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;z-index:0}
        .Mb1{width:700px;height:700px;top:-200px;right:-150px;background:radial-gradient(circle,rgba(26,86,219,.08) 0%,transparent 65%)}
        .Mb2{width:500px;height:500px;bottom:0;left:-100px;background:radial-gradient(circle,rgba(22,163,74,.06) 0%,transparent 65%)}
        .Mb3{width:300px;height:300px;top:45%;left:42%;background:radial-gradient(circle,rgba(217,119,6,.04) 0%,transparent 65%)}

        .Mdiag{position:absolute;top:0;right:0;width:50%;height:100%;pointer-events:none;z-index:0;overflow:hidden}
        .Mdiag::before{content:'';position:absolute;top:-10%;left:-15%;width:1px;height:130%;
          background:linear-gradient(to bottom,transparent 0%,var(--bd) 30%,var(--bd) 70%,transparent 100%);
          transform:rotate(8deg);transform-origin:top left}

        /* body grid */
        .Mbody{display:grid;grid-template-columns:1fr 1fr;align-items:center;
          max-width:1360px;margin:0 auto;width:100%;padding:88px 56px 80px;
          position:relative;z-index:1}

        /* left */
        .Mleft{padding-right:80px}

        .Mtag{display:inline-flex;align-items:center;gap:8px;
          font-family:var(--mono);font-size:10px;letter-spacing:.08em;font-weight:500;
          color:var(--green);background:var(--glt);border:1px solid var(--gbd);
          padding:5px 14px;border-radius:100px;margin-bottom:30px;cursor:default;transition:background .15s}
        .Mtag:hover{background:#DCFCE7}
        .Mtdot{width:6px;height:6px;border-radius:50%;background:var(--green);animation:gpulse 2.2s infinite}

        .Mhlight{font-family:var(--serif);font-size:clamp(44px,4.6vw,70px);
          font-weight:300;line-height:1.07;letter-spacing:-.035em;color:var(--ink)}
        .Mhlight em{font-style:italic;font-weight:500}
        .Mhtyped{display:flex;align-items:baseline;min-height:clamp(50px,5.2vw,78px);margin-bottom:30px}
        .Mhword{font-family:var(--serif);font-size:clamp(44px,4.6vw,70px);
          font-weight:700;font-style:italic;line-height:1.07;letter-spacing:-.035em;
          background:linear-gradient(130deg,#1A56DB 0%,#3B82F6 50%,#60A5FA 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .Mcursor{display:inline-block;width:3px;margin-left:3px;
          height:clamp(36px,3.8vw,56px);vertical-align:middle;
          background:var(--accent);border-radius:2px;animation:blink .85s step-end infinite}

        .Mdesc{font-size:15px;line-height:1.82;color:var(--ink3);max-width:420px;
          margin-bottom:36px;font-weight:400}
        .Mdesc b{color:var(--ink2);font-weight:500}

        .Mctarow{display:flex;align-items:center;gap:10px;margin-bottom:44px;flex-wrap:wrap}
        .Mctarow-sub{display:contents}

        .Mbtn1{display:inline-flex;align-items:center;gap:9px;
          font-family:var(--sans);font-size:13.5px;font-weight:600;letter-spacing:-.01em;
          color:#fff;background:var(--ink);border:none;border-radius:12px;padding:13px 26px;cursor:pointer;
          position:relative;overflow:hidden;transition:transform .15s,box-shadow .15s}
        .Mbtn1::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.08) 0%,transparent 55%)}
        .Mbtn1:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(13,13,11,.25)}
        .Mbtn1:active{transform:translateY(0)}
        .Mbtn1 .arr,.Mbtn2 .arr,.Mbtn3 .arr{transition:transform .2s}
        .Mbtn1:hover .arr,.Mbtn2:hover .arr{transform:translateX(4px)}

        .Mbtn2{display:inline-flex;align-items:center;gap:8px;
          font-family:var(--sans);font-size:13.5px;font-weight:600;letter-spacing:-.01em;
          color:var(--accent);background:var(--aclt);border:1px solid var(--acmd);
          border-radius:12px;padding:12px 22px;cursor:pointer;text-decoration:none;
          transition:background .15s,transform .15s,box-shadow .15s}
        .Mbtn2:hover{background:#E5ECFF;transform:translateY(-2px);box-shadow:0 8px 24px rgba(26,86,219,.15)}

        .Mbtn3{display:inline-flex;align-items:center;gap:7px;
          font-family:var(--sans);font-size:13.5px;font-weight:500;letter-spacing:-.01em;
          color:var(--ink3);background:transparent;border:1px solid var(--bd2);
          border-radius:12px;padding:12px 20px;cursor:pointer;text-decoration:none;
          transition:background .15s,color .15s,border-color .15s}
        .Mbtn3:hover{background:var(--bg2);color:var(--ink2);border-color:var(--bd)}

        /* proof bar */
        .Mproof{display:flex;align-items:center;flex-wrap:wrap;
          padding:16px 20px;background:#fff;border:1px solid var(--bd);border-radius:16px;
          width:fit-content;box-shadow:0 2px 8px rgba(0,0,0,.04)}
        .Mpsec{display:flex;align-items:center;gap:10px;padding:0 16px}
        .Mpsec:not(:last-child){border-right:1px solid var(--bd)}
        .Mavs{display:flex}
        .Mav{width:30px;height:30px;border-radius:50%;border:2px solid #fff;margin-left:-8px;
          overflow:hidden;background:var(--bg2);transition:transform .2s}
        .Mav:first-child{margin-left:0}
        .Mav:hover{transform:translateY(-3px) scale(1.12);z-index:10}
        .Mav img{width:100%;height:100%;object-fit:cover}
        .Mplabel{font-size:12px;color:var(--ink3);line-height:1.4}
        .Mplabel strong{color:var(--ink2);font-weight:600;display:block}
        .Mstars{display:flex;gap:1px;margin-bottom:2px}
        .Mstar{color:#F59E0B;font-size:10px}
        .Msval{font-family:var(--serif);font-size:22px;font-weight:600;
          color:var(--ink);letter-spacing:-.04em;line-height:1}
        .Mskey{font-size:10.5px;color:var(--muted);margin-top:2px;font-family:var(--mono);letter-spacing:.04em}

        /* right */
        .Mright{position:relative;height:600px}

        .Mimgmain{position:absolute;top:0;left:0;right:64px;bottom:64px;
          border-radius:28px;overflow:hidden;box-shadow:var(--sheavy)}
        .Mimgmain img{width:100%;height:100%;object-fit:cover;display:block;
          transform:translateY(VAR_SCROLL) scale(1.05);
          transition:transform .08s linear;will-change:transform}
        .Mimgmain::after{content:'';position:absolute;inset:0;
          background:linear-gradient(160deg,rgba(26,86,219,.04) 0%,transparent 40%,rgba(13,13,11,.18) 100%)}
        .Mimgcap{position:absolute;bottom:76px;left:16px;z-index:2;
          display:flex;align-items:center;gap:6px;
          background:rgba(13,13,11,.72);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
          border:1px solid rgba(255,255,255,.1);color:#fff;border-radius:100px;
          padding:6px 13px;font-size:11px;font-weight:500;letter-spacing:.01em}
        .Mimgcap-dot{width:6px;height:6px;border-radius:50%;background:#4ADE80;flex-shrink:0;animation:gpulse 2s infinite}

        .Mimgsec{position:absolute;bottom:0;right:0;width:220px;height:178px;
          border-radius:20px;overflow:hidden;box-shadow:var(--sfloat);border:4px solid var(--bg)}
        .Mimgsec img{width:100%;height:100%;object-fit:cover;display:block}

        /* metric card */
        .Mcmetric{position:absolute;top:24px;right:-4px;
          background:#fff;border:1px solid var(--bd);border-radius:20px;padding:18px 22px;
          min-width:196px;box-shadow:var(--sfloat);animation:floatA 5.5s ease-in-out infinite}
        .Mcmetric::before{content:'';position:absolute;inset:0;border-radius:20px;
          background:linear-gradient(140deg,rgba(255,255,255,.9) 0%,rgba(247,246,242,.6) 100%);
          backdrop-filter:blur(20px);z-index:0}
        .Mcmetric>*{position:relative;z-index:1}

        .Mctop{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
        .Mclbl{font-family:var(--mono);font-size:9.5px;letter-spacing:.07em;text-transform:uppercase;color:var(--muted)}
        .Mcbadge{font-family:var(--mono);font-size:9px;font-weight:500;padding:2px 8px;border-radius:100px;
          color:var(--green);background:var(--glt);border:1px solid var(--gbd)}
        .Mcnum{font-family:var(--serif);font-size:46px;font-weight:700;
          letter-spacing:-.05em;color:var(--ink);line-height:1;margin-bottom:12px}
        .Mcnum sup{font-size:18px;opacity:.35;font-family:var(--sans);vertical-align:super}

        .Mspk{width:100%;height:36px}

        .Mdrow{display:flex;align-items:center;gap:14px;margin-top:10px}
        .Mdwrap{position:relative;width:52px;height:52px;flex-shrink:0}
        .Mdwrap svg{width:52px;height:52px;transform:rotate(-90deg)}
        .Mdtrack{fill:none;stroke:var(--bg3);stroke-width:6}
        .Mdfill{fill:none;stroke:var(--accent);stroke-width:6;stroke-linecap:round;
          stroke-dasharray:133;transition:stroke-dashoffset 1.4s 1.2s ease}
        .Mdlabel{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
          font-family:var(--mono);font-size:10px;font-weight:500;color:var(--ink2)}
        .Mdleg{display:flex;flex-direction:column;gap:4px}
        .Mdlegrow{display:flex;align-items:center;gap:6px;font-size:10.5px;color:var(--ink3)}
        .Mddot{width:7px;height:7px;border-radius:50%;flex-shrink:0}

        /* feed card */
        .Mcfeed{position:absolute;bottom:72px;left:-44px;
          background:var(--ink);color:#fff;border-radius:16px;padding:14px 16px;
          display:flex;align-items:center;gap:12px;
          box-shadow:0 24px 64px rgba(0,0,0,.28);
          border:1px solid rgba(255,255,255,.07);
          white-space:nowrap;min-width:248px;
          animation:floatB 6s .6s ease-in-out infinite;overflow:hidden}
        .Mcfeed::before{content:'';position:absolute;inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,.05) 0%,transparent 50%)}
        .Mcfeed>*{position:relative;z-index:1}
        .Mfinner{display:flex;align-items:center;gap:12px;width:100%;transition:opacity .35s,transform .35s}
        .Mficon{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;
          justify-content:center;font-size:18px;flex-shrink:0;border:1px solid rgba(255,255,255,.1);transition:background .4s}
        .Mftitle{font-size:12.5px;font-weight:600;letter-spacing:-.01em}
        .Mfmeta{font-size:10.5px;color:rgba(255,255,255,.45);margin-top:2px}
        .Mftime{margin-left:auto;font-family:var(--mono);font-size:9.5px;color:rgba(255,255,255,.3)}
        .Mflive{position:absolute;top:12px;right:14px;width:7px;height:7px;border-radius:50%;
          background:#4ADE80;animation:gpulse 2s infinite}

        /* pill */
        .Mpill{position:absolute;top:48%;right:-6px;transform:translateY(-50%);
          background:var(--aclt);border:1px solid var(--acmd);color:var(--accent);
          border-radius:100px;padding:7px 14px;
          display:flex;align-items:center;gap:7px;
          font-size:11.5px;font-weight:600;letter-spacing:-.01em;
          animation:floatC 4.8s .2s ease-in-out infinite;
          box-shadow:0 4px 20px rgba(26,86,219,.14);white-space:nowrap}
        .Mpill svg{width:13px;height:13px}

        /* logos */
        .Mlogos{border-top:1px solid var(--bd);background:var(--bg2);position:relative;z-index:1}
        .Mloghdr{display:flex;align-items:center;gap:16px;padding:18px 56px 0}
        .Mloglbl{font-family:var(--mono);font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);white-space:nowrap;flex-shrink:0}
        .Mlogrule{flex:1;height:1px;background:var(--bd2)}
        .Mlogscroll{padding:16px 0 20px;overflow:hidden;
          -webkit-mask-image:linear-gradient(90deg,transparent 0%,black 7%,black 93%,transparent 100%);
          mask-image:linear-gradient(90deg,transparent 0%,black 7%,black 93%,transparent 100%)}
        .Mlogtrack{display:flex;width:max-content;animation:marquee 32s linear infinite}
        .Mlogtrack:hover{animation-play-state:paused}
        .Mlogitem{padding:0 40px;font-family:var(--serif);font-size:15.5px;font-weight:600;
          color:var(--ink3);letter-spacing:-.025em;border-right:1px solid var(--bd);
          white-space:nowrap;cursor:default;transition:color .2s}
        .Mlogitem:hover{color:var(--ink)}

        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes gpulse{0%,100%{box-shadow:0 0 0 0 rgba(22,163,74,.45)}60%{box-shadow:0 0 0 6px rgba(22,163,74,0)}}
        @keyframes floatA{0%,100%{transform:translateY(0) rotate(0)}33%{transform:translateY(-9px) rotate(.5deg)}66%{transform:translateY(-5px) rotate(-.4deg)}}
        @keyframes floatB{0%,100%{transform:translateY(0)}50%{transform:translateY(-13px)}}
        @keyframes floatC{0%,100%{transform:translateY(-50%) translateX(0)}50%{transform:translateY(-50%) translateX(-7px)}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* ── TABLET ── */
        @media(max-width:1060px) and (min-width:641px){
          .Mbody{grid-template-columns:1fr;padding:52px 32px 48px}
          .Mleft{padding-right:0;margin-bottom:44px}
          .Mright{height:420px}
          .Mcfeed{left:-8px;bottom:12px;min-width:220px}
          .Mpill{right:8px}
          .Mloghdr{padding:18px 32px 0}
        }

        /* ── MOBILE: everything in one screen ── */
        @media(max-width:640px){
          /* Shell fills exactly the screen */
          .M{height:100svh;min-height:0;display:flex;flex-direction:column;overflow:hidden}

          /* Body: single column, fills remaining height, split between left+right */
          .Mbody{
            grid-template-columns:1fr !important;
            padding:12px 18px 12px !important;
            flex:1;display:flex !important;flex-direction:column;
            gap:10px;min-height:0;overflow:hidden;
            align-items:stretch;
          }

          /* LEFT column */
          .Mleft{padding-right:0 !important;margin-bottom:0 !important;flex-shrink:0}

          .Mtag{margin-bottom:8px;font-size:9px;padding:3px 10px;line-height:1.4}
          .Mtdot{width:5px;height:5px}

          .Mhlight{font-size:24px;line-height:1.1}
          .Mhword{font-size:24px;line-height:1.1}
          .Mcursor{height:20px}
          .Mhtyped{min-height:28px;margin-bottom:6px}

          .Mdesc{font-size:12.5px;line-height:1.55;margin-bottom:10px;
            display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}

          .Mctarow{flex-direction:row;gap:7px;margin-bottom:10px;flex-wrap:nowrap;align-items:stretch}
          .Mctarow-sub{display:contents}
          .Mbtn1{flex:1;justify-content:center;padding:11px 10px;font-size:12.5px;border-radius:9px}
          .Mbtn2{flex:1;justify-content:center;padding:10px 10px;font-size:12px;border-radius:9px}
          .Mbtn3{display:none}

          .Mproof{width:100%;padding:9px 12px;display:flex;flex-direction:row;align-items:center;
            gap:0;border-radius:10px;margin-bottom:0}
          .Mpsec{padding:0 9px;flex-direction:column;align-items:center;text-align:center;gap:2px}
          .Mpsec:first-child{flex-direction:row;text-align:left;gap:7px;flex:1;
            border-right:1px solid var(--bd)!important;padding:0 10px 0 0;margin-bottom:0}
          .Mpsec:nth-child(2){border-right:1px solid var(--bd)!important}
          .Mpsec:last-child{border-right:none!important}
          .Msval{font-size:16px}
          .Mskey{font-size:8.5px}
          .Mplabel{font-size:10.5px}
          .Mav{width:24px;height:24px}
          .Mstars{margin-bottom:1px}
          .Mstar{font-size:9px}

          /* RIGHT: image area fills remaining space */
          .Mright{
            flex:1;min-height:0;
            display:flex !important;flex-direction:column;
            position:relative;height:auto !important;padding-bottom:0;
            gap:8px;
          }

          /* Main image fills the flex space */
          .Mimgmain{
            flex:1;min-height:0;
            position:relative !important;
            top:auto !important;left:auto !important;right:auto !important;bottom:auto !important;
            border-radius:14px;overflow:hidden;
            box-shadow:0 8px 24px rgba(0,0,0,.12);
          }
          .Mimgmain img{transform:none !important}
          .Mimgcap{bottom:10px;left:10px;font-size:10px;padding:5px 10px}

          /* Secondary: corner overlay on main image */
          .Mimgsec{
            position:absolute;bottom:8px;right:8px;
            width:80px;height:66px;border-radius:9px;border-width:3px;
          }

          /* Feed: compact strip at bottom of right */
          .Mcmetric{display:none !important}
          .Mpill{display:none !important}
          .Mcfeed{
            flex-shrink:0;
            position:relative !important;bottom:auto !important;left:auto !important;
            animation:none !important;
            width:100%;min-width:0;border-radius:11px;padding:10px 12px;
            white-space:normal;
          }
          .Mfinner{gap:9px}
          .Mficon{width:30px;height:30px;font-size:14px;border-radius:7px;flex-shrink:0}
          .Mftitle{font-size:11.5px}
          .Mfmeta{font-size:10px;margin-top:1px}
          .Mftime{display:none}
          .Mflive{top:9px;right:10px;width:6px;height:6px}

          /* Logos: slim strip */
          .Mlogos{flex-shrink:0}
          .Mloghdr{padding:8px 18px 0}
          .Mloglbl{font-size:8.5px}
          .Mlogscroll{padding:6px 0 10px}
          .Mlogitem{padding:0 20px;font-size:12.5px}
        }

        @media(max-width:390px){
          .Mbody{padding:10px 16px 10px !important}
          .Mhlight{font-size:22px}
          .Mhword{font-size:22px}
          .Mcursor{height:18px}
          .Mhtyped{min-height:26px}
        }
      `}</style>

      <div className="M">
        <div className="Mblob Mb1"/><div className="Mblob Mb2"/><div className="Mblob Mb3"/>
        <div className="Mdiag"/>

        <div className="Mbody">

          {/* ── LEFT ── */}
          <div className="Mleft">

            <div className="Mtag" style={s(0)}>
              <span className="Mtdot"/>
              Accepting new projects — 2025
            </div>

            <div style={s(1)}>
              <div className="Mhlight">
                We design &amp; build<br/><em>exceptional</em>
              </div>
              <div className="Mhtyped">
                <span className="Mhword">{displayed}</span>
                <span className="Mcursor"/>
              </div>
            </div>

            <p className="Mdesc" style={s(3)}>
              Muchyz is a full-service digital agency crafting <b>websites, AI chatbots,
              and custom software</b> that help ambitious businesses grow faster —
              strategy, design, and engineering all under one roof.
            </p>

            <div className="Mctarow" style={s(4)}>
              <button className="Mbtn1">
                Start a Project
                <svg className="arr" viewBox="0 0 15 15" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7.5h9M9 3.5l4 4-4 4"/>
                </svg>
              </button>
              <div className="Mctarow-sub">
                <a href="#" className="Mbtn2">
                  See our work
                  <svg className="arr" viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 7h10M8 3l4 4-4 4"/>
                  </svg>
                </a>
                <a href="#" className="Mbtn3">
                  <svg viewBox="0 0 14 14" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <polygon points="2,2 12,7 2,12"/>
                  </svg>
                  Watch demo
                </a>
              </div>
            </div>

            <div className="Mproof" style={s(5)}>
              <div className="Mpsec">
                <div className="Mavs">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
                  ].map((src,i) => (
                    <div className="Mav" key={i} style={{zIndex:5-i}}>
                      <img src={src} alt=""/>
                    </div>
                  ))}
                </div>
                <div className="Mplabel">
                  <div className="Mstars">{[...Array(5)].map((_,i)=><span key={i} className="Mstar">★</span>)}</div>
                  <strong>{clients}+ clients</strong>trust Muchyz
                </div>
              </div>
              <div className="Mpsec">
                <div><div className="Msval">{projects}+</div><div className="Mskey">PROJECTS</div></div>
              </div>
              <div className="Mpsec">
                <div><div className="Msval">{(rating/10).toFixed(1)}</div><div className="Mskey">RATING</div></div>
              </div>
            </div>

          </div>

          {/* ── RIGHT ── */}
          <div className="Mright" style={s(2, { transitionDelay: '.4s' })}>

            <div className="Mimgmain">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=960&h=760&fit=crop&crop=center"
                alt="Muchyz office"
                style={{ transform: `translateY(${-scrollY * 0.032}px) scale(1.05)` }}
              />
              <div className="Mimgcap">
                <span className="Mimgcap-dot"/>
                Live team workspace
              </div>
            </div>

            <div className="Mimgsec">
              <img
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=440&h=360&fit=crop&crop=center"
                alt="workspace"
              />
            </div>

            {/* metric card */}
            <div className="Mcmetric">
              <div className="Mctop">
                <span className="Mclbl">Clients served</span>
                <span className="Mcbadge">↑ 24% YoY</span>
              </div>
              <div className="Mcnum">{clients}<sup>+</sup></div>

              <svg className="Mspk" viewBox="0 0 160 36" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1A56DB" stopOpacity=".18"/>
                    <stop offset="100%" stopColor="#1A56DB" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d={spkArea} fill="url(#sg)"/>
                <path d={spkPath} fill="none" stroke="#1A56DB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx={spkX(SPARK.length-1)} cy={spkY(SPARK[SPARK.length-1])} r="3" fill="#1A56DB"/>
              </svg>

              <div className="Mdrow">
                <div className="Mdwrap">
                  <svg viewBox="0 0 52 52">
                    <circle className="Mdtrack" cx="26" cy="26" r="21"/>
                    <circle className="Mdfill"  cx="26" cy="26" r="21"
                      style={{ strokeDashoffset: donutOffset }}
                    />
                  </svg>
                  <div className="Mdlabel">98%</div>
                </div>
                <div className="Mdleg">
                  {[{c:"#1A56DB",l:"Satisfied"},{c:"#E4E1D9",l:"Other"}].map(d=>(
                    <div className="Mdlegrow" key={d.l}>
                      <div className="Mddot" style={{background:d.c}}/>{d.l}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* activity feed */}
            <div className="Mcfeed">
              <div className="Mflive"/>
              <div className="Mfinner" style={{ opacity: feedVis ? 1 : 0, transform: `translateY(${feedVis ? 0 : 8}px)` }}>
                <div className="Mficon" style={{ background: feed.color + "28" }}>{feed.icon}</div>
                <div>
                  <div className="Mftitle">{feed.title}</div>
                  <div className="Mfmeta">{feed.sub}</div>
                </div>
                <div className="Mftime">{feed.time}</div>
              </div>
            </div>

            {/* pill */}
            <div className="Mpill">
              <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1,7 4,10 12,2"/>
              </svg>
              On-time delivery
            </div>

          </div>
        </div>

        {/* logos */}
        <div className="Mlogos" style={{ opacity: loaded ? 1 : 0, transition: 'opacity .6s 1s ease' }}>
          <div className="Mloghdr">
            <span className="Mloglbl">Trusted by teams at</span>
            <div className="Mlogrule"/>
          </div>
          <div className="Mlogscroll">
            <div className="Mlogtrack">
              {[...logos,...logos].map((n,i)=>(
                <span className="Mlogitem" key={i}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
