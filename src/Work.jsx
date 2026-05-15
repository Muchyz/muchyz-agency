import { useState, useEffect, useRef, useCallback } from "react";

/* ─── DATA ─── */
const PROJECTS = [
  {
    id: 1, num: "01",
    title: "Peekaboo Kenya",
    category: "E-commerce",
    tags: ["React", "E-commerce", "Online Store"],
    desc: "Online store for baby products in Kenya, featuring a clean product showcase and smooth checkout experience.",
    live: "https://peekaboo.ke",
    year: "2026",
    stat: "95%", statLabel: "Customer Satisfaction",
    accent: "#FF6F61", accentRgb: "255,111,97",
  },
  {
    id: 2, num: "02",
    title: "Purpink",
    category: "E-commerce",
    tags: ["React", "Beauty Store", "Online Shopping"],
    desc: "Beauty and personal care e-commerce store with clean UI and smooth checkout, optimized for mobile users.",
    live: "https://purpink.co.ke",
    year: "2026",
    stat: "90%", statLabel: "Conversion Rate",
    accent: "#E8694A", accentRgb: "232,105,74",
  },
  {
    id: 3, num: "03",
    title: "Beauty Hub",
    category: "E-commerce",
    tags: ["React", "Cosmetics", "Online Store"],
    desc: "Kenyan beauty products online store with landing pages, product catalog, and smooth payment flow.",
    live: "https://beautyhub.co.ke",
    year: "2026",
    stat: "85%", statLabel: "Repeat Customers",
    accent: "#FF9900", accentRgb: "255,153,0",
  },
  {
    id: 4, num: "04",
    title: "Zuricart",
    category: "E-commerce",
    tags: ["React", "Online Shopping", "Marketplace"],
    desc: "Online marketplace for Kenyan shoppers featuring multiple categories, clean UI, and smooth checkout.",
    live: "https://zuricart.co.ke",
    year: "2026",
    stat: "80%", statLabel: "Customer Engagement",
    accent: "#3DB87A", accentRgb: "61,184,122",
  },
  {
    id: 5, num: "05",
    title: "Green Spoon",
    category: "E-commerce",
    tags: ["React", "Food Delivery", "Online Store"],
    desc: "Online store for healthy meals and groceries in Kenya, featuring product categories and smooth checkout.",
    live: "https://greenspoon.co.ke",
    year: "2026",
    stat: "92%", statLabel: "On-Time Delivery",
    accent: "#9B6FE8", accentRgb: "155,111,232",
  },
  {
    id: 6, num: "06",
    title: "Phone Place Kenya",
    category: "E-commerce",
    tags: ["React", "Electronics", "Mobile Phones"],
    desc: "Kenyan mobile phone store with product listings, landing pages, and integrated payment options.",
    live: "https://phoneplacekenya.com",
    year: "2026",
    stat: "90%", statLabel: "Customer Engagement",
    accent: "#FF6F61", accentRgb: "255,111,97",
  },
  {
    id: 7, num: "07",
    title: "Naturally Good Health",
    category: "Health",
    tags: ["React", "Pharmaceuticals", "Health Products"],
    desc: "Health enriching products platform for Naturally Good Health by Raypharm, showcasing JointGuard, Immuwell, OsteoVite and more wellness supplements.",
    live: "https://naturallygoodhealth.co",
    year: "2026",
    stat: "2.4K", statLabel: "Happy Followers",
    accent: "#34C789", accentRgb: "52,199,137",
  },
  {
    id: 8, num: "08",
    title: "Barista Lab Centre",
    category: "Education",
    tags: ["React", "Training", "Hospitality"],
    desc: "Modern school for baristas and mixologists in Kenya, training students to master coffee and craft beverages through hands-on courses.",
    live: "https://baristalab.co.ke",
    year: "2026",
    stat: "100%", statLabel: "Course Completion",
    accent: "#C8813A", accentRgb: "200,129,58",
  },
  {
    id: 9, num: "09",
    title: "Novustell Travel",
    category: "Travel",
    tags: ["React", "Tours", "Travel Agency"],
    desc: "Small travel agency in Kenya showcasing travel packages, online booking, and visual landing pages.",
    live: "https://novustelltravel.com",
    year: "2026",
    stat: "90%", statLabel: "Customer Satisfaction",
    accent: "#4F8EF7", accentRgb: "79,142,247",
  },
  {
    id: 10, num: "10",
    title: "Safitime Cleaning",
    category: "Cleaning",
    tags: ["React", "Booking", "Service Management"],
    desc: "Cleaning services company in Kenya with online booking and service showcase, modern landing page design.",
    live: "https://safitimecleaning.com",
    year: "2026",
    stat: "99%", statLabel: "Service Satisfaction",
    accent: "#9B6FE8", accentRgb: "155,111,232",
  },
  {
    id: 11, num: "11",
    title: "Onside Tech Solutions",
    category: "IT",
    tags: ["React", "Web Design", "Automation"],
    desc: "Small IT company providing software solutions, web apps, and automation tools for Kenyan SMEs.",
    live: "https://onsidetechsolutions.co.ke",
    year: "2026",
    stat: "24/7", statLabel: "Operational Support",
    accent: "#2E9CEB", accentRgb: "46,156,235",
  },
  {
    id: 12, num: "12",
    title: "Favoured K Suppliers",
    category: "Supply",
    tags: ["React", "Wholesale", "B2B"],
    desc: "Building materials supplier in Kenya stocking sand, ballast, machine cut stones, aggregates and all types of building stones, with an online product catalogue and inquiry forms.",
    live: "https://favouredksuppliers.co.ke",
    year: "2026",
    stat: "2×", statLabel: "Order Efficiency",
    accent: "#C8A96E", accentRgb: "200,169,110",
  }
];

const CATS = ["All", "E-commerce", "Health", "Education", "Travel", "Cleaning", "IT", "Supply"];
const TICKER = ["React","Node.js","M-Pesa","PostgreSQL","Vercel","Figma","OpenAI","WhatsApp API","Next.js","MongoDB","TypeScript","Tailwind CSS","Stripe","AWS","Firebase","Supabase"];

/* ─── HOOKS ─── */
function useInView(ref, threshold = 0.08) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return vis;
}

function useCountUp(target, started, duration = 1600) {
  const [val, setVal] = useState("0");
  const ran = useRef(false);
  useEffect(() => {
    if (!started || ran.current) return;
    ran.current = true;
    const m = target.match(/[\d.]+/);
    if (!m) { setVal(target); return; }
    const end = parseFloat(m[0]);
    const idx = target.indexOf(m[0]);
    const pre = target.slice(0, idx);
    const suf = target.slice(idx + m[0].length);
    let ts0 = null;
    const step = ts => {
      if (!ts0) ts0 = ts;
      const p = Math.min((ts - ts0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const c = m[0].includes('.') ? (ease * end).toFixed(1) : Math.round(ease * end);
      setVal(`${pre}${c}${suf}`);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return val;
}

/* ─── MOBILE CARD (vertical stacked) ─── */
function MobileCard({ p, index, statsStarted }) {
  const ref = useRef(null);
  const vis = useInView(ref, 0.1);
  const display = useCountUp(p.stat, statsStarted);
  return (
    <div
      ref={ref}
      className="mob-card"
      style={{
        "--accent": p.accent,
        "--accent-rgb": p.accentRgb,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(28px)",
        transition: `opacity .6s ${index * 0.07}s cubic-bezier(0.16,1,0.3,1), transform .6s ${index * 0.07}s cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      {/* Number display */}
      <div className="mob-card__img-wrap">
        <div className="mob-card__img-fallback">
          <span>{p.num}</span>
        </div>
        <div className="mob-card__img-overlay" style={{ background: `linear-gradient(180deg, transparent 30%, rgba(6,8,16,.85) 100%)` }} />
        <div className="mob-card__img-top-stripe" style={{ background: p.accent }} />
        <div className="mob-card__img-badge">
          <span className="mob-card__badge-dot" style={{ background: p.accent }} />
          <span style={{ color: p.accent }}>{p.num}</span>
          <span className="mob-card__badge-sep" />
          <span style={{ color: "rgba(238,242,255,.7)" }}>{p.category}</span>
        </div>
        <div className="mob-card__stat-overlay">
          <span className="mob-card__stat-val" style={{ color: p.accent }}>{display}</span>
          <span className="mob-card__stat-key">{p.statLabel}</span>
        </div>
      </div>

      {/* Body */}
      <div className="mob-card__body">
        <div className="mob-card__cat" style={{ color: p.accent }}>{p.category}</div>
        <h3 className="mob-card__title">{p.title}</h3>
        <p className="mob-card__desc">{p.desc}</p>
        <div className="mob-card__tags">
          {p.tags.map(t => (
            <span key={t} className="mob-card__tag">{t}</span>
          ))}
          <span className="mob-card__year">{p.year}</span>
        </div>
        <div className="mob-card__actions">
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            className="mob-card__btn-primary"
            style={{ background: p.accent, boxShadow: `0 8px 28px rgba(${p.accentRgb},.35)` }}
          >
            Get a Quote
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            className="mob-card__btn-secondary"
            style={{ borderColor: `rgba(${p.accentRgb},.3)`, color: p.accent }}
          >
            Visit Site
            <svg viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1.5 8.5L8.5 1.5M5 1.5h3v3" />
            </svg>
          </a>
        </div>
      </div>

      <div className="mob-card__bottom-accent" style={{ background: `linear-gradient(90deg, transparent, rgba(${p.accentRgb},.5), transparent)` }} />
    </div>
  );
}

/* ─── DESKTOP PROJECT CARD ─── */
function ProjectCard({ p, index, activeCard, setActiveCard, statsStarted, view }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const rafRef  = useRef(null);
  const wrapRef = useRef(null);
  const vis     = useInView(wrapRef, 0.06);
  const display = useCountUp(p.stat, statsStarted);
  const isActive = activeCard === p.id;
  const isDimmed = activeCard !== null && activeCard !== p.id;

  const onMouseMove = useCallback(e => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    const rotX = ((y - cy) / cy) * -4;
    const rotY = ((x - cx) / cx) * 4;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
    });
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(520px circle at ${x}px ${y}px, rgba(${p.accentRgb},0.16) 0%, transparent 60%)`;
      glowRef.current.style.opacity = "1";
    }
  }, [p.accentRgb]);

  const onMouseLeave = useCallback(() => {
    setActiveCard(null);
    const card = cardRef.current;
    if (card) {
      card.style.transition = "transform 0.7s cubic-bezier(0.16,1,0.3,1)";
      card.style.transform = "";
      setTimeout(() => { if (card) card.style.transition = ""; }, 700);
    }
    if (glowRef.current) glowRef.current.style.opacity = "0";
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, [setActiveCard]);

  /* LIST VIEW */
  if (view === "list") {
    return (
      <div
        ref={wrapRef}
        className={`wk-row${isActive ? " wk-row--active" : ""}${isDimmed ? " wk-row--dim" : ""}`}
        style={{
          "--accent": p.accent, "--accent-rgb": p.accentRgb,
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(20px)",
          transition: `opacity .65s ${index * 0.06}s cubic-bezier(0.16,1,0.3,1), transform .65s ${index * 0.06}s cubic-bezier(0.16,1,0.3,1)`,
        }}
        onMouseEnter={() => setActiveCard(p.id)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="wk-row__bg" style={{ opacity: isActive ? 1 : 0, background: `radial-gradient(ellipse at 15% 50%, rgba(${p.accentRgb},.07) 0%, transparent 65%)` }}/>
        <div className="wk-row__num" style={{ color: isActive ? p.accent : "rgba(238,242,255,.18)" }}>{p.num}</div>
        <div className="wk-row__thumb">
          <div style={{ width:"100%",height:"100%",background:`rgba(${p.accentRgb},.15)`,display:"flex",alignItems:"center",justifyContent:"center",color:p.accent,fontFamily:"'DM Serif Display',serif",fontSize:"28px",fontStyle:"italic" }}>{p.num}</div>
          <div className="wk-row__thumb-overlay" style={{ background: `linear-gradient(135deg,rgba(${p.accentRgb},.28) 0%,transparent 55%)`, opacity: isActive ? 1 : 0 }}/>
          <div className="wk-row__thumb-stripe" style={{ background: p.accent }}/>
        </div>
        <div className="wk-row__body">
          <div className="wk-row__cat" style={{ color: p.accent }}>{p.category}</div>
          <h3 className="wk-row__title">{p.title}</h3>
          <p className="wk-row__desc">{p.desc}</p>
          <div className="wk-row__tags">{p.tags.map(t => <span key={t} className="wk-row__tag" style={{ borderColor: isActive ? `rgba(${p.accentRgb},.3)` : undefined }}>{t}</span>)}</div>
        </div>
        <div className="wk-row__end">
          <div className="wk-row__stat">
            <span className="wk-row__stat-val" style={{ color: p.accent }}>{display}</span>
            <span className="wk-row__stat-key">{p.statLabel}</span>
          </div>
          <span className="wk-row__year">{p.year}</span>
          <a href={p.live} target="_blank" rel="noopener noreferrer"
            className="wk-row__btn"
            style={isActive ? { borderColor: p.accent, color: "#fff", background: p.accent, boxShadow: `0 8px 28px rgba(${p.accentRgb},.4)` } : {}}>
            Visit Site
            <svg viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1.5 8.5L8.5 1.5M5 1.5h3v3"/>
            </svg>
          </a>
        </div>
        <div className="wk-row__line" style={{ background: isActive ? `linear-gradient(90deg,transparent,rgba(${p.accentRgb},.6),transparent)` : "rgba(255,255,255,.06)" }}/>
      </div>
    );
  }

  /* GRID CARD */
  return (
    <div ref={wrapRef} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(32px) scale(0.96)",
      transition: `opacity .75s ${index * 0.09}s cubic-bezier(0.16,1,0.3,1), transform .75s ${index * 0.09}s cubic-bezier(0.16,1,0.3,1)`,
    }}>
      <a
        ref={cardRef}
        href={p.live}
        target="_blank"
        rel="noreferrer"
        className={`wk-card${p.wide ? " wk-card--wide" : ""}${isActive ? " wk-card--active" : ""}${isDimmed ? " wk-card--dim" : ""}`}
        style={{ "--accent": p.accent, "--accent-rgb": p.accentRgb }}
        onMouseEnter={() => setActiveCard(p.id)}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div className="wk-card__glow" ref={glowRef}/>
        <span className="wk-card__bg-num">{p.num}</span>

        <div className={`wk-card__media${p.wide ? " wk-card__media--wide" : ""}`}>
          <div style={{ width:"100%",height:"100%",background:`rgba(${p.accentRgb},.12)`,display:"flex",alignItems:"center",justifyContent:"center",color:p.accent,fontFamily:"'DM Serif Display',serif",fontSize:"48px",fontStyle:"italic" }}>{p.num}</div>
          <div className="wk-card__vignette"/>
          <div className="wk-card__img-accent" style={{ background: `linear-gradient(135deg,rgba(${p.accentRgb},.22) 0%,transparent 55%)` }}/>
          <div className="wk-card__stripe" style={{ background: p.accent }}/>
          <div className="wk-card__badge">
            <span className="wk-card__badge-dot" style={{ background: p.accent, boxShadow: `0 0 7px ${p.accent}` }}/>
            <span style={{ color: p.accent }}>{p.num}</span>
          </div>
          <div className="wk-card__img-tag" style={{ background: `rgba(${p.accentRgb},.45)` }}>
            <span className="wk-card__tag-pulse" style={{ background: p.accent }}/>
            {p.category.split(" ")[0]}
          </div>
          <div className="wk-card__hover-cta">
            <svg viewBox="0 0 10 10" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1.5 8.5L8.5 1.5M5 1.5h3v3"/>
            </svg>
            View Live Site
          </div>
        </div>

        <div className="wk-card__body">
          <div className="wk-card__meta">
            <div className="wk-card__icon" style={{ background: `rgba(${p.accentRgb},.1)`, borderColor: `rgba(${p.accentRgb},.25)` }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={p.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
              </svg>
            </div>
            <div className="wk-card__stat-box" style={{ background: `rgba(${p.accentRgb},.07)`, borderColor: `rgba(${p.accentRgb},.18)` }}>
              <span className="wk-card__stat-val" style={{ color: p.accent }}>{display}</span>
              <span className="wk-card__stat-key">{p.statLabel}</span>
            </div>
          </div>
          <div className="wk-card__cat" style={{ color: p.accent }}>{p.category}</div>
          <h3 className="wk-card__title">{p.title}</h3>
          <p className="wk-card__desc">{p.desc}</p>
          <div className="wk-card__footer">
            <div className="wk-card__tags">{p.tags.map(t => <span key={t} className="wk-card__tag">{t}</span>)}</div>
            <span className="wk-card__year">{p.year}</span>
          </div>
          <div className="wk-card__cta-row">
            <span className="wk-card__cta" style={{ background: `rgba(${p.accentRgb},.8)`, borderColor: `rgba(${p.accentRgb},.45)`, boxShadow: `0 4px 20px rgba(${p.accentRgb},.28)` }}>
              Get a Quote
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
            <span className="wk-card__corner" style={{ color: `rgba(${p.accentRgb},.35)` }}>↗</span>
          </div>
        </div>

        <div className="wk-card__bottom-line"/>
        <svg className="wk-card__svg-border" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x=".5" y=".5" width="99" height="99" rx="5" ry="5"/>
        </svg>
      </a>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function Work() {
  const [active, setActive]         = useState("All");
  const [view, setView]             = useState("grid");
  const [loaded, setLoaded]         = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [statsStarted, setStats]    = useState(false);
  const [heroCount, setHeroCount]   = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const sectionRef = useRef(null);
  const sectionVis = useInView(sectionRef, 0.05);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 40); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    if (sectionVis && !statsStarted) { const t = setTimeout(() => setStats(true), 300); return () => clearTimeout(t); }
  }, [sectionVis, statsStarted]);
  useEffect(() => {
    let raf, ts0 = null;
    const target = PROJECTS.length;
    const step = ts => { if (!ts0) ts0 = ts; const p = Math.min((ts - ts0) / 1400, 1); setHeroCount(Math.round((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) raf = requestAnimationFrame(step); };
    const t = setTimeout(() => { raf = requestAnimationFrame(step); }, 800);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, []);
  useEffect(() => {
    if (!filterOpen) return;
    const fn = e => { if (!e.target.closest('.wk__filter-dropdown-wrap')) setFilterOpen(false); };
    document.addEventListener('click', fn);
    return () => document.removeEventListener('click', fn);
  }, [filterOpen]);

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;600;700;800&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700&display=swap');

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        a{text-decoration:none;color:inherit}
        button{font-family:'Syne',sans-serif;cursor:pointer}

        :root{
          --bg:#060810;
          --surface:#0b0e1c;
          --surface-2:#0f1225;
          --border:rgba(255,255,255,.07);
          --border-hi:rgba(255,255,255,.14);
          --ink:#eef2ff;
          --ink-2:rgba(238,242,255,.52);
          --ink-3:rgba(238,242,255,.26);
          --blue:#4f8ef7;
          --ease:cubic-bezier(0.16,1,0.3,1);
          --spring:cubic-bezier(0.34,1.56,0.64,1);
        }

        .wk{min-height:100svh;background:var(--bg);font-family:'Cabinet Grotesk',sans-serif;color:var(--ink);overflow-x:clip;position:relative;isolation:isolate}

        .wk__noise{position:fixed;inset:0;z-index:9999;pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
          background-size:256px;mix-blend-mode:overlay;opacity:.55}

        .wk::before{content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
          background-image:linear-gradient(rgba(255,255,255,.017) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.017) 1px,transparent 1px);
          background-size:64px 64px;
          mask-image:radial-gradient(ellipse 80% 50% at 50% 0%,black 0%,transparent 80%);
          -webkit-mask-image:radial-gradient(ellipse 80% 50% at 50% 0%,black 0%,transparent 80%)}

        .wk__orb{position:fixed;border-radius:50%;filter:blur(100px);pointer-events:none;z-index:0}
        .wk__orb--a{width:700px;height:700px;top:-280px;left:-180px;background:radial-gradient(circle,rgba(37,99,235,.16) 0%,transparent 65%);animation:orbA 22s ease-in-out infinite alternate}
        .wk__orb--b{width:500px;height:500px;bottom:-80px;right:-100px;background:radial-gradient(circle,rgba(109,40,217,.12) 0%,transparent 65%);animation:orbB 28s ease-in-out infinite alternate}
        .wk__orb--c{width:380px;height:380px;top:50%;left:55%;background:radial-gradient(circle,rgba(6,182,212,.07) 0%,transparent 65%);animation:orbC 18s ease-in-out infinite alternate}
        @keyframes orbA{to{transform:translate(60px,80px) scale(1.1)}}
        @keyframes orbB{to{transform:translate(-60px,-80px) scale(1.06)}}
        @keyframes orbC{to{transform:translate(-30px,50px) scale(1.14)}}

        @keyframes wkRise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
        @keyframes gradShift{0%{background-position:0%}100%{background-position:100%}}
        @keyframes bannerShim{0%,100%{background-position:100%;opacity:.4}50%{background-position:-60%;opacity:1}}
        @keyframes tickerScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes dotPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.6)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

        /* ── NAV ── */
        .wk__nav{position:sticky;top:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:0 56px;height:68px;transition:background .35s,border-color .35s,box-shadow .35s}
        .wk__nav.is-scrolled{background:rgba(6,8,16,.88);border-bottom:1px solid rgba(255,255,255,.07);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);box-shadow:0 1px 0 rgba(79,142,247,.1)}
        .wk__nav-logo{font-family:'DM Serif Display',serif;font-size:22px;color:var(--ink);display:flex;align-items:baseline}
        .wk__nav-logo em{font-style:italic;color:var(--blue)}
        .wk__nav-back{display:inline-flex;align-items:center;gap:0;overflow:hidden;font-family:'Syne',sans-serif;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-2);border:1px solid var(--border-hi);border-radius:100px;background:rgba(255,255,255,.04);backdrop-filter:blur(16px);transition:border-color .3s,background .3s,transform .35s var(--ease),box-shadow .3s;text-decoration:none}
        .wk__nav-back>span:first-child{padding:10px 18px}
        .wk__nav-back-arr{display:flex;align-items:center;justify-content:center;background:rgba(79,142,247,.15);padding:10px 13px;border-left:1px solid rgba(255,255,255,.1);transition:background .3s}
        .wk__nav-back:hover{border-color:rgba(79,142,247,.4);background:rgba(79,142,247,.06);transform:translateY(-1px);box-shadow:0 8px 32px rgba(79,142,247,.15)}
        .wk__nav-back:hover .wk__nav-back-arr{background:var(--blue)}

        /* ── HERO ── */
        .wk__hero{position:relative;z-index:1;max-width:1380px;margin:0 auto;padding:88px 56px 72px;display:grid;grid-template-columns:1fr 340px;align-items:start;gap:72px}
        .wk__hero::after{content:'';position:absolute;bottom:0;left:56px;right:56px;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.13) 20%,rgba(255,255,255,.13) 80%,transparent)}

        .wk__eyebrow{display:inline-flex;align-items:center;gap:12px;font-family:'Syne',sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--blue);margin-bottom:32px;opacity:0}
        .is-loaded .wk__eyebrow{animation:wkRise .8s .05s var(--ease) forwards}
        .wk__eyebrow-rule{display:block;width:32px;height:1px;background:var(--blue)}
        .wk__eyebrow-badge{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:rgba(79,142,247,.12);border:1px solid rgba(79,142,247,.3);font-size:9px;letter-spacing:0;color:var(--blue)}

        .wk__hero-hed{font-family:'DM Serif Display',serif;font-size:clamp(56px,7.5vw,110px);line-height:.93;letter-spacing:-.028em;opacity:0;margin:0 0 28px}
        .is-loaded .wk__hero-hed{animation:wkRise .9s .12s var(--ease) forwards}
        .wk__hero-hed .pre{display:block;font-family:'Syne',sans-serif;font-size:clamp(11px,1.2vw,14px);font-weight:600;letter-spacing:4px;text-transform:uppercase;color:var(--ink-3);margin-bottom:14px}
        .wk__hero-hed .line-a{display:block;font-weight:400;color:var(--ink-2)}
        .wk__hero-hed .line-b{display:block;font-weight:400;font-style:italic;background:linear-gradient(135deg,#60a5fa 0%,#a78bfa 50%,#38bdf8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;background-size:200%;animation:gradShift 6s ease infinite alternate}

        .wk__hero-sub{font-size:15.5px;line-height:1.88;color:var(--ink-2);max-width:46ch;opacity:0}
        .is-loaded .wk__hero-sub{animation:wkRise .7s .22s var(--ease) forwards}

        .wk__hero-metrics{display:flex;gap:0;border:1px solid var(--border);border-radius:14px;overflow:hidden;width:fit-content;background:rgba(255,255,255,.025);backdrop-filter:blur(12px);margin-top:32px;opacity:0;flex-wrap:wrap}
        .is-loaded .wk__hero-metrics{animation:wkRise .7s .32s var(--ease) forwards}
        .wk__metric{display:flex;flex-direction:column;align-items:center;gap:4px;padding:14px 22px;border-right:1px solid var(--border);transition:background .2s;cursor:default}
        .wk__metric:last-child{border-right:none}
        .wk__metric:hover{background:rgba(255,255,255,.04)}
        .wk__metric strong{font-family:'DM Serif Display',serif;font-size:22px;font-weight:400;color:var(--ink);line-height:1;letter-spacing:-.5px}
        .wk__metric span{font-family:'Syne',sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--ink-3)}

        .wk__hero-right{opacity:0}
        .is-loaded .wk__hero-right{animation:wkRise .7s .36s var(--ease) forwards}
        .wk__stat-card{background:var(--surface);border:1px solid var(--border);border-radius:24px;padding:32px 28px 26px;position:relative;overflow:hidden}
        .wk__stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(79,142,247,.8),rgba(167,139,250,.6),transparent);background-size:200%;animation:bannerShim 5s ease-in-out infinite}
        .wk__stat-num{font-family:'DM Serif Display',serif;font-size:88px;font-weight:400;letter-spacing:-.04em;line-height:1;background:linear-gradient(135deg,var(--ink) 0%,rgba(238,242,255,.45) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .wk__stat-label{font-family:'Syne',sans-serif;font-size:9px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--ink-3);margin-top:6px}
        .wk__stat-divider{height:1px;background:var(--border);margin:20px 0}
        .wk__stat-row{display:flex;align-items:center;gap:10px;font-family:'Syne',sans-serif;font-size:11.5px;font-weight:600;color:var(--ink-2);margin-bottom:10px}
        .wk__stat-row:last-child{margin-bottom:0}
        .wk__stat-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
        .dot-green{background:#34d399;box-shadow:0 0 8px rgba(52,211,153,.7);animation:dotPulse 2s ease-in-out infinite}
        .dot-blue{background:var(--blue);box-shadow:0 0 8px rgba(79,142,247,.6);animation:dotPulse 2s .4s ease-in-out infinite}
        .dot-purple{background:#a78bfa;box-shadow:0 0 8px rgba(167,139,250,.6);animation:dotPulse 2s .8s ease-in-out infinite}

        .wk__testimonial{margin:20px 0 0;padding:18px 20px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-left:3px solid rgba(79,142,247,.55);border-radius:14px;position:relative;overflow:hidden}
        .wk__testimonial::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,rgba(79,142,247,.5),rgba(167,139,250,.3),transparent)}
        .wk__t-quote{font-family:'DM Serif Display',serif;font-size:60px;line-height:0.4;color:var(--blue);opacity:.18;position:absolute;top:14px;left:14px;pointer-events:none;user-select:none}
        .wk__testimonial blockquote{margin:0 0 12px;font-size:12.5px;color:var(--ink-2);line-height:1.75;font-style:italic;padding-left:4px}
        .wk__testimonial figcaption{display:flex;align-items:center;gap:10px}
        .wk__avatar{width:30px;height:30px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#3b82f6,#8b5cf6);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:9px;font-weight:800;color:#fff}
        .wk__testimonial figcaption strong{display:block;font-size:12px;font-weight:700;color:var(--ink);font-family:'Syne',sans-serif}
        .wk__testimonial figcaption span{display:block;font-size:10px;color:var(--ink-3);margin-top:1px}

        /* ── TOOLBAR ── */
        .wk__toolbar{position:relative;z-index:10;max-width:1380px;margin:0 auto;padding:22px 56px;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;opacity:0}
        .wk__toolbar::after{content:'';position:absolute;bottom:0;left:56px;right:56px;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.1) 20%,rgba(255,255,255,.1) 80%,transparent)}
        .is-loaded .wk__toolbar{animation:wkRise .6s .44s var(--ease) forwards}

        .wk__filters{display:flex;align-items:center;gap:5px;flex-wrap:wrap}
        .wk__filter{font-family:'Syne',sans-serif;font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:7px 15px;border-radius:100px;border:1px solid var(--border);background:transparent;color:var(--ink-3);transition:all .18s}
        .wk__filter:hover{color:var(--ink-2);border-color:var(--border-hi);background:rgba(255,255,255,.04)}
        .wk__filter.is-active{color:var(--bg);border-color:var(--blue);background:var(--blue);box-shadow:0 0 18px rgba(79,142,247,.35)}

        .wk__filter-dropdown-wrap{position:relative;display:none}
        .wk__filter-dropdown-btn{display:flex;align-items:center;gap:8px;font-family:'Syne',sans-serif;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:9px 16px;border-radius:100px;border:1px solid var(--border-hi);background:rgba(255,255,255,.04);color:var(--ink-2);cursor:pointer;transition:all .2s}
        .wk__filter-dropdown-btn.has-active{border-color:var(--blue);color:var(--blue)}
        .wk__filter-dropdown-chevron{transition:transform .25s var(--ease)}
        .wk__filter-dropdown-chevron.is-open{transform:rotate(180deg)}
        .wk__filter-dropdown-menu{position:absolute;top:calc(100% + 8px);left:0;min-width:200px;background:rgba(11,14,28,.98);border:1px solid var(--border-hi);border-radius:16px;padding:6px;z-index:200;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);box-shadow:0 20px 60px rgba(0,0,0,.7);animation:fadeIn .2s var(--ease) forwards}
        .wk__filter-dropdown-item{display:block;width:100%;text-align:left;font-family:'Syne',sans-serif;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;padding:10px 14px;border-radius:10px;border:none;background:transparent;color:var(--ink-3);cursor:pointer;transition:background .15s,color .15s}
        .wk__filter-dropdown-item:hover{background:rgba(255,255,255,.06);color:var(--ink-2)}
        .wk__filter-dropdown-item.is-active{background:rgba(79,142,247,.12);color:var(--blue)}

        .wk__view-toggle{display:flex;align-items:center;gap:3px;border:1px solid var(--border);border-radius:10px;padding:3px;background:var(--surface)}
        .wk__toggle-btn{width:32px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:7px;border:none;background:transparent;color:var(--ink-3);transition:background .15s,color .15s}
        .wk__toggle-btn.is-active{background:rgba(255,255,255,.09);color:var(--ink-2);box-shadow:0 1px 4px rgba(0,0,0,.4)}

        /* ── DESKTOP GRID ── */
        .wk__grid{position:relative;z-index:1;max-width:1380px;margin:0 auto;padding:40px 56px 90px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        .wk__grid .wk-card--wide{grid-column:span 2}

        /* ── MOBILE VERTICAL STACK ── */
        .wk__mobile-stack{display:none;position:relative;z-index:1;padding:20px 20px 60px}

        /* ── MOBILE CARD ── */
        .mob-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;overflow:hidden;position:relative;margin-bottom:16px;will-change:opacity,transform}
        .mob-card:last-child{margin-bottom:0}
        .mob-card__img-wrap{position:relative;height:220px;overflow:hidden}
        .mob-card__img{width:100%;height:100%;object-fit:cover;display:block}
        .mob-card__img-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',serif;font-size:80px;font-style:italic;color:rgba(var(--accent-rgb),.55);background:linear-gradient(135deg,rgba(var(--accent-rgb),.1) 0%,rgba(var(--accent-rgb),.04) 100%);letter-spacing:-.04em;text-shadow:0 2px 40px rgba(var(--accent-rgb),.3)}
        .mob-card__img-overlay{position:absolute;inset:0;z-index:1}
        .mob-card__img-top-stripe{position:absolute;top:0;left:0;right:0;height:3px;z-index:3}
        .mob-card__img-badge{position:absolute;top:12px;left:12px;z-index:4;display:inline-flex;align-items:center;gap:6px;background:rgba(6,8,16,.7);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:5px 11px;font-family:'Syne',sans-serif;font-size:10px;font-weight:700;letter-spacing:.03em}
        .mob-card__badge-dot{width:5px;height:5px;border-radius:50%;animation:dotPulse 2s ease-in-out infinite;flex-shrink:0}
        .mob-card__badge-sep{width:1px;height:10px;background:rgba(255,255,255,.15)}
        .mob-card__stat-overlay{position:absolute;bottom:14px;right:14px;z-index:4;display:flex;flex-direction:column;align-items:flex-end;background:rgba(6,8,16,.72);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:8px 12px}
        .mob-card__stat-val{font-family:'DM Serif Display',serif;font-size:22px;line-height:1;letter-spacing:-.5px}
        .mob-card__stat-key{font-family:'Syne',sans-serif;font-size:8px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink-3);white-space:nowrap}
        .mob-card__body{padding:18px 18px 20px;position:relative;z-index:2}
        .mob-card__cat{font-family:'Syne',sans-serif;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px}
        .mob-card__title{font-family:'DM Serif Display',serif;font-size:22px;font-weight:400;letter-spacing:-.02em;color:var(--ink);margin-bottom:10px;line-height:1.2}
        .mob-card__desc{font-size:13.5px;line-height:1.8;color:var(--ink-2);margin-bottom:14px}
        .mob-card__tags{display:flex;flex-wrap:wrap;gap:5px;align-items:center;margin-bottom:16px}
        .mob-card__tag{font-family:'Syne',sans-serif;font-size:9.5px;font-weight:700;padding:3px 9px;border-radius:100px;border:1px solid var(--border);color:var(--ink-3);background:rgba(255,255,255,.03)}
        .mob-card__year{font-family:'Syne',sans-serif;font-size:10px;color:var(--ink-3);margin-left:auto;letter-spacing:.04em}
        .mob-card__actions{display:flex;gap:10px;align-items:center}
        .mob-card__btn-primary{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;letter-spacing:.03em;color:#fff;border-radius:12px;padding:13px 20px;border:none;text-decoration:none;transition:filter .2s,transform .2s var(--ease)}
        .mob-card__btn-primary:active{transform:scale(.97);filter:brightness(.9)}
        .mob-card__btn-secondary{display:inline-flex;align-items:center;justify-content:center;gap:7px;font-family:'Syne',sans-serif;font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;border:1px solid;border-radius:12px;padding:12px 18px;background:transparent;text-decoration:none;transition:background .2s,transform .2s var(--ease)}
        .mob-card__btn-secondary:active{transform:scale(.97)}
        .mob-card__bottom-accent{position:absolute;bottom:0;left:0;right:0;height:1px;z-index:3}

        /* ── CARD (desktop) ── */
        .wk-card{position:relative;display:flex;flex-direction:column;text-decoration:none;background:var(--surface);border:1px solid var(--border);border-radius:22px;overflow:hidden;transition:border-color .35s,box-shadow .45s,filter .4s;will-change:transform,opacity;transform-style:preserve-3d;cursor:pointer}
        .wk-card:focus-visible{outline:2px solid rgba(var(--accent-rgb),.8);outline-offset:3px}
        .wk-card--active{border-color:rgba(var(--accent-rgb),.38);box-shadow:0 0 0 1px rgba(var(--accent-rgb),.1),0 32px 72px rgba(0,0,0,.55),0 0 80px -24px rgba(var(--accent-rgb),.5),inset 0 1px 0 rgba(255,255,255,.08);z-index:4}
        .wk-card--active::before{content:'';position:absolute;top:-1px;left:15%;right:15%;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--accent-rgb),.85),transparent);filter:blur(.5px);z-index:8;pointer-events:none}
        .wk-card--dim{opacity:.2;filter:saturate(.25) brightness(.5);transform:scale(.976)}

        .wk-card__glow{position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0;transition:opacity .25s}
        .wk-card__bg-num{position:absolute;bottom:6px;right:12px;font-family:'DM Serif Display',serif;font-size:120px;font-style:italic;color:rgba(var(--accent-rgb),.055);line-height:1;letter-spacing:-4px;pointer-events:none;z-index:1;user-select:none;transition:color .4s}
        .wk-card--active .wk-card__bg-num{color:rgba(var(--accent-rgb),.14)}

        .wk-card__media{position:relative;height:240px;overflow:hidden;flex-shrink:0}
        .wk-card__media--wide{height:310px}
        .wk-card__media img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1s var(--ease),filter .5s;filter:brightness(.92) saturate(1.05)}
        .wk-card--active .wk-card__media img{transform:scale(1.08);filter:brightness(1) saturate(1.1)}
        .wk-card__vignette{position:absolute;inset:0;z-index:2;pointer-events:none;background:linear-gradient(180deg,rgba(6,8,16,0) 0%,rgba(6,8,16,.55) 100%)}
        .wk-card__img-accent{position:absolute;inset:0;z-index:3;pointer-events:none;transition:opacity .3s}
        .wk-card__stripe{position:absolute;top:0;left:0;right:0;height:2px;z-index:5}
        .wk-card__badge{position:absolute;top:13px;left:13px;z-index:6;display:inline-flex;align-items:center;gap:6px;background:rgba(6,8,16,.65);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:4px 10px;font-family:'Syne',sans-serif;font-size:10px;font-weight:700;letter-spacing:.04em}
        .wk-card__badge-dot{width:5px;height:5px;border-radius:50%;animation:dotPulse 2s ease-in-out infinite}
        .wk-card__img-tag{position:absolute;top:13px;right:13px;z-index:6;display:inline-flex;align-items:center;gap:7px;font-family:'Syne',sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#fff;backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.15);padding:4px 11px;border-radius:100px;transition:background .3s}
        .wk-card__tag-pulse{width:5px;height:5px;border-radius:50%;animation:dotPulse 2s ease-in-out infinite}
        .wk-card__hover-cta{position:absolute;inset:0;z-index:7;display:flex;align-items:center;justify-content:center;gap:8px;font-family:'Syne',sans-serif;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#fff;background:rgba(6,8,16,.5);backdrop-filter:blur(4px);opacity:0;transition:opacity .28s}
        .wk-card--active .wk-card__hover-cta{opacity:1}

        .wk-card__body{display:flex;flex-direction:column;flex:1;padding:18px 22px 22px;position:relative;z-index:2}
        .wk-card__meta{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:12px}
        .wk-card__icon{width:42px;height:42px;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border:1px solid;transition:transform .45s var(--spring),box-shadow .4s}
        .wk-card--active .wk-card__icon{transform:scale(1.12) rotate(-6deg)}
        .wk-card__stat-box{display:flex;flex-direction:column;align-items:flex-end;border:1px solid;border-radius:11px;padding:7px 12px;transition:background .3s,border-color .3s,transform .4s var(--spring)}
        .wk-card--active .wk-card__stat-box{transform:scale(1.05)}
        .wk-card__stat-val{font-family:'DM Serif Display',serif;font-size:20px;line-height:1;letter-spacing:-.5px}
        .wk-card__stat-key{font-family:'Syne',sans-serif;font-size:8px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink-3);white-space:nowrap}
        .wk-card__cat{font-family:'Syne',sans-serif;font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}
        .wk-card__title{font-family:'DM Serif Display',serif;font-size:20px;font-weight:400;letter-spacing:-.015em;line-height:1.15;color:var(--ink);margin-bottom:9px;transition:color .3s}
        .wk-card--wide .wk-card__title{font-size:24px}
        .wk-card--active .wk-card__title{color:#fff}
        .wk-card__desc{font-size:13px;line-height:1.82;color:var(--ink-2);flex:1;margin-bottom:14px}
        .wk-card__footer{display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--border);padding-top:12px;margin-bottom:14px}
        .wk-card__tags{display:flex;flex-wrap:wrap;gap:4px}
        .wk-card__tag{font-family:'Syne',sans-serif;font-size:9.5px;font-weight:700;padding:3px 9px;border-radius:100px;border:1px solid var(--border);color:var(--ink-3);background:rgba(255,255,255,.03)}
        .wk-card__year{font-family:'Syne',sans-serif;font-size:10px;color:var(--ink-3);letter-spacing:.04em;white-space:nowrap}
        .wk-card__cta-row{display:flex;align-items:center;justify-content:space-between}
        .wk-card__cta{display:inline-flex;align-items:center;gap:8px;font-family:'Syne',sans-serif;font-size:12px;font-weight:700;color:#fff;border:1px solid;border-radius:9px;padding:9px 16px;transition:gap .3s var(--ease),filter .3s}
        .wk-card--active .wk-card__cta{gap:14px;filter:brightness(1.12)}
        .wk-card__corner{font-size:20px;transition:color .3s,transform .35s var(--ease)}
        .wk-card--active .wk-card__corner{transform:translate(3px,-3px)}
        .wk-card__bottom-line{position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent 0%,rgba(var(--accent-rgb),.6) 25%,var(--accent) 50%,rgba(var(--accent-rgb),.6) 75%,transparent 100%);transform:scaleX(0);transform-origin:center;transition:transform .8s var(--ease);z-index:5}
        .wk-card--active .wk-card__bottom-line{transform:scaleX(1)}
        .wk-card__svg-border{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:6}
        .wk-card__svg-border rect{fill:none;stroke:var(--accent);stroke-width:1;stroke-dasharray:480;stroke-dashoffset:480;transition:stroke-dashoffset 1s var(--ease);opacity:.5}
        .wk-card--active .wk-card__svg-border rect{stroke-dashoffset:0}

        /* ── LIST VIEW ── */
        .wk__list{position:relative;z-index:1;max-width:1380px;margin:0 auto;padding:0 56px 90px}
        .wk-row{position:relative;display:grid;grid-template-columns:52px 148px 1fr 190px;align-items:center;gap:30px;padding:26px 0;will-change:opacity,transform;transition:filter .3s}
        .wk-row--dim{opacity:.2;filter:saturate(.25) brightness(.5)}
        .wk-row__bg{position:absolute;inset:-2px;border-radius:8px;pointer-events:none;transition:opacity .35s}
        .wk-row__line{position:absolute;bottom:0;left:0;right:0;height:1px;transition:background .35s}
        .wk-row__num{font-family:'DM Serif Display',serif;font-style:italic;font-size:30px;letter-spacing:-.03em;transition:color .25s}
        .wk-row__thumb{position:relative;width:148px;height:96px;border-radius:14px;overflow:hidden;flex-shrink:0;box-shadow:0 4px 24px rgba(0,0,0,.48);border:1px solid var(--border)}
        .wk-row__thumb img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .7s var(--ease);filter:brightness(.9) saturate(1.05)}
        .wk-row--active .wk-row__thumb img{filter:brightness(1) saturate(1.1)}
        .wk-row__thumb-overlay{position:absolute;inset:0;border-radius:14px;transition:opacity .35s}
        .wk-row__thumb-stripe{position:absolute;top:0;left:0;right:0;height:2px;z-index:3}
        .wk-row__body{min-width:0}
        .wk-row__cat{font-family:'Syne',sans-serif;font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}
        .wk-row__title{font-family:'DM Serif Display',serif;font-size:22px;font-weight:400;letter-spacing:-.02em;color:var(--ink);margin-bottom:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .3s}
        .wk-row--active .wk-row__title{color:#fff}
        .wk-row__desc{font-size:12.5px;line-height:1.72;color:var(--ink-2);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .wk-row__tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:8px}
        .wk-row__tag{font-family:'Syne',sans-serif;font-size:9px;font-weight:700;padding:2px 8px;border-radius:100px;border:1px solid var(--border);color:var(--ink-3);background:rgba(255,255,255,.025);transition:border-color .3s}
        .wk-row__end{display:flex;flex-direction:column;align-items:flex-end;gap:10px;flex-shrink:0}
        .wk-row__stat{display:flex;flex-direction:column;align-items:flex-end}
        .wk-row__stat-val{font-family:'DM Serif Display',serif;font-size:22px;line-height:1;letter-spacing:-.5px}
        .wk-row__stat-key{font-family:'Syne',sans-serif;font-size:8px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink-3)}
        .wk-row__year{font-family:'Syne',sans-serif;font-size:10px;color:var(--ink-3);letter-spacing:.06em}
        .wk-row__btn{display:inline-flex;align-items:center;gap:6px;font-family:'Syne',sans-serif;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;border:1px solid var(--border);border-radius:8px;padding:9px 16px;background:transparent;color:var(--ink-3);transition:all .25s;white-space:nowrap;text-decoration:none}
        .wk-row__btn:hover{transform:translateY(-1px)}

        /* ── TICKER ── */
        .wk__ticker{position:relative;z-index:1;border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:40px 0}
        .wk__ticker::before{content:'';position:absolute;top:-1px;left:50%;transform:translateX(-50%);width:240px;height:1px;background:linear-gradient(90deg,transparent,rgba(79,142,247,.7),transparent)}
        .wk__ticker-label{display:flex;align-items:center;gap:18px;justify-content:center;margin-bottom:26px;font-family:'Syne',sans-serif;font-size:9px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--ink-3)}
        .wk__ticker-rule{flex:1;max-width:60px;height:1px;background:var(--border)}
        .wk__ticker-mask{overflow:hidden;mask-image:linear-gradient(90deg,transparent,black 7%,black 93%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,black 7%,black 93%,transparent)}
        .wk__ticker-track{display:flex;width:max-content;animation:tickerScroll 30s linear infinite}
        .wk__ticker-track:hover{animation-play-state:paused}
        .wk__ticker-item{display:flex;align-items:center;gap:10px;padding:0 36px;opacity:.72;transition:opacity .3s,transform .3s var(--ease);white-space:nowrap;cursor:default;user-select:none}
        .wk__ticker-item:hover{opacity:1;transform:translateY(-2px)}
        .wk__ticker-name{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:rgba(238,242,255,.85)}
        .wk__ticker-sep{width:4px;height:4px;border-radius:50%;background:rgba(79,142,247,.4);flex-shrink:0}

        /* ── EMPTY ── */
        .wk__empty{grid-column:1/-1;display:flex;flex-direction:column;align-items:center;padding:100px 0;gap:14px;color:var(--ink-3);font-family:'Syne',sans-serif;font-size:13px;font-weight:600}
        .wk__empty-glyph{font-size:32px;opacity:.18;margin-bottom:4px}
        .wk__empty-mobile{display:flex;flex-direction:column;align-items:center;padding:80px 0;gap:14px;color:var(--ink-3);font-family:'Syne',sans-serif;font-size:13px;font-weight:600}

        /* ── RESPONSIVE 1200px ── */
        @media(max-width:1200px){
          .wk__grid{grid-template-columns:repeat(2,1fr)}
          .wk__grid .wk-card--wide{grid-column:span 2}
        }

        /* ── RESPONSIVE 900px ── */
        @media(max-width:900px){
          .wk__nav{padding:0 24px;height:60px}
          .wk__hero{grid-template-columns:1fr;padding:48px 24px 52px;gap:32px}
          .wk__hero::after{left:24px;right:24px}
          .wk__hero-right{display:none}
          .wk__toolbar{padding:16px 24px}
          .wk__toolbar::after{left:24px;right:24px}
          .wk__filters{display:none}
          .wk__filter-dropdown-wrap{display:block}
          /* Hide desktop grid on tablet, show mobile stack */
          .wk__grid{display:none}
          .wk__mobile-stack{display:block;padding:20px 24px 60px}
          .wk__list{padding:0 24px 64px}
          .wk-row{grid-template-columns:40px 1fr 140px;gap:14px}
          .wk-row__thumb{display:none}
          .wk-row__end{gap:7px}
          .wk-row__btn{font-size:10px;padding:7px 12px}
        }

        /* ── RESPONSIVE 600px ── */
        @media(max-width:600px){
          .wk__nav{padding:0 16px}
          .wk__nav-back>span:first-child{display:none}
          .wk__nav-back-arr{border-left:none;border-radius:100px;padding:10px 13px}
          .wk__nav-back{border-radius:100px}
          .wk__hero{padding:40px 16px 44px}
          .wk__hero::after{left:16px;right:16px}
          .wk__hero-hed{font-size:clamp(44px,13vw,64px);margin-bottom:18px}
          .wk__hero-sub{font-size:14.5px}
          .wk__hero-metrics{width:100%}
          .wk__metric{flex:1;padding:11px 10px}
          .wk__metric strong{font-size:18px}
          .wk__metric span{font-size:7.5px;letter-spacing:1.5px}
          .wk__toolbar{padding:12px 16px}
          .wk__toolbar::after{left:16px;right:16px}
          .wk__mobile-stack{padding:16px 16px 52px}
          .mob-card__img-wrap{height:190px}
          .mob-card__title{font-size:20px}
          .mob-card__desc{font-size:13px}
          .wk__list{padding:0 16px 52px}
          .wk-row{grid-template-columns:32px 1fr;gap:10px}
          .wk-row__end{display:none}
          .wk-row__num{font-size:22px}
          .wk__ticker{padding:28px 0}
          .wk__ticker-label{margin-bottom:18px;font-size:8px}
        }

        @media(max-width:380px){
          .wk__hero-hed{font-size:clamp(38px,12vw,52px)}
          .mob-card__img-wrap{height:170px}
        }
      `}</style>

      <div className={`wk${loaded ? " is-loaded" : ""}`}>
        <div className="wk__noise"/>
        <div className="wk__orb wk__orb--a"/>
        <div className="wk__orb wk__orb--b"/>
        <div className="wk__orb wk__orb--c"/>

        {/* NAV */}
        <nav className={`wk__nav${scrolled ? " is-scrolled" : ""}`}>
          <div className="wk__nav-logo">Muchyz<em>.</em></div>
          <a href="/" className="wk__nav-back">
            <span>Back home</span>
            <span className="wk__nav-back-arr">
              <svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 2L4 7l5 5"/>
              </svg>
            </span>
          </a>
        </nav>

        {/* HERO */}
        <header className="wk__hero">
          <div>
            <div className="wk__eyebrow">
              <span className="wk__eyebrow-rule"/>
              Selected Work — 2024 / 2025
              <span className="wk__eyebrow-badge">{PROJECTS.length}</span>
            </div>
            <h1 className="wk__hero-hed">
              <span className="pre">Muchyz Digital Agency</span>
              <span className="line-a">Work we're</span>
              <span className="line-b">proud of.</span>
            </h1>
            <p className="wk__hero-sub">
              Every project is a collaboration built on trust. Here's a sample
              of what we've shipped — fast, custom-coded websites and software
              built for ambitious Kenyan businesses.
            </p>
            <div className="wk__hero-metrics">
              {[
                { n: `${PROJECTS.length}+`, l: "Shipped" },
                { n: "98%", l: "Satisfaction" },
                { n: "React", l: "Stack" },
                { n: "0", l: "WordPress" },
              ].map(m => (
                <div className="wk__metric" key={m.l}>
                  <strong>{m.n}</strong>
                  <span>{m.l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="wk__hero-right">
            <div className="wk__stat-card">
              <div className="wk__stat-num">{heroCount}</div>
              <div className="wk__stat-label">Projects shipped</div>
              <div className="wk__stat-divider"/>
              <div className="wk__stat-row"><span className="wk__stat-dot dot-green"/>All built in React</div>
              <div className="wk__stat-row"><span className="wk__stat-dot dot-blue"/>Zero WordPress</div>
              <div className="wk__stat-row"><span className="wk__stat-dot dot-purple"/>Pay on completion</div>
              <figure className="wk__testimonial">
                <div className="wk__t-quote">"</div>
                <blockquote>Revenue up 140% in just 3 months. They delivered results, not just a website.</blockquote>
                <figcaption>
                  <div className="wk__avatar">JM</div>
                  <div>
                    <strong>James M.</strong>
                    <span>CEO, NovaTech Ltd</span>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </header>

        {/* TOOLBAR */}
        <div className="wk__toolbar">
          <div className="wk__filters">
            {CATS.map(c => (
              <button key={c} className={`wk__filter${active === c ? " is-active" : ""}`} onClick={() => setActive(c)}>{c}</button>
            ))}
          </div>
          <div className="wk__filter-dropdown-wrap">
            <button
              className={`wk__filter-dropdown-btn${active !== "All" ? " has-active" : ""}`}
              onClick={() => setFilterOpen(o => !o)}
            >
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="2" y1="4" x2="14" y2="4"/><line x1="4" y1="8" x2="12" y2="8"/><line x1="6" y1="12" x2="10" y2="12"/>
              </svg>
              {active === "All" ? "Filter" : active}
              <svg className={`wk__filter-dropdown-chevron${filterOpen ? " is-open" : ""}`} viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3.5L5 6.5L8 3.5"/>
              </svg>
            </button>
            {filterOpen && (
              <div className="wk__filter-dropdown-menu">
                {CATS.map(c => (
                  <button key={c} className={`wk__filter-dropdown-item${active === c ? " is-active" : ""}`}
                    onClick={() => { setActive(c); setFilterOpen(false); }}>{c}</button>
                ))}
              </div>
            )}
          </div>
          <div className="wk__view-toggle">
            <button className={`wk__toggle-btn${view === "grid" ? " is-active" : ""}`} onClick={() => setView("grid")} title="Grid view">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
                <rect x="1" y="1" width="6" height="6" rx="1.5"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5"/>
              </svg>
            </button>
            <button className={`wk__toggle-btn${view === "list" ? " is-active" : ""}`} onClick={() => setView("list")} title="List view">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <line x1="1" y1="4" x2="15" y2="4"/>
                <line x1="1" y1="8" x2="15" y2="8"/>
                <line x1="1" y1="12" x2="15" y2="12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div ref={sectionRef}>
          {view === "grid" ? (
            <>
              {/* Desktop grid (hidden on mobile via CSS) */}
              <div className="wk__grid">
                {filtered.length === 0
                  ? <div className="wk__empty"><div className="wk__empty-glyph">◎</div>No projects in this category yet.</div>
                  : filtered.map((p, i) => (
                    <ProjectCard key={p.id} p={p} index={i} view="grid"
                      activeCard={activeCard} setActiveCard={setActiveCard} statsStarted={statsStarted}/>
                  ))}
              </div>

              {/* Mobile vertical stack (hidden on desktop via CSS) */}
              <div className="wk__mobile-stack">
                {filtered.length === 0
                  ? <div className="wk__empty-mobile"><div className="wk__empty-glyph">◎</div>No projects in this category yet.</div>
                  : filtered.map((p, i) => (
                    <MobileCard key={p.id} p={p} index={i} statsStarted={statsStarted} />
                  ))}
              </div>
            </>
          ) : (
            <div className="wk__list">
              {filtered.length === 0
                ? <div className="wk__empty" style={{ padding: "80px 0" }}><div className="wk__empty-glyph">◎</div>No projects in this category yet.</div>
                : filtered.map((p, i) => (
                  <ProjectCard key={p.id} p={p} index={i} view="list"
                    activeCard={activeCard} setActiveCard={setActiveCard} statsStarted={statsStarted}/>
                ))}
            </div>
          )}
        </div>

        {/* TICKER */}
        <div className="wk__ticker">
          <p className="wk__ticker-label">
            <span className="wk__ticker-rule"/>Technologies we build with<span className="wk__ticker-rule"/>
          </p>
          <div className="wk__ticker-mask">
            <div className="wk__ticker-track">
              {[...TICKER, ...TICKER].map((name, i) => (
                <div className="wk__ticker-item" key={i}>
                  <span className="wk__ticker-sep"/>
                  <span className="wk__ticker-name">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
