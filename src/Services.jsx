import "./Services.css";
import { useInView } from "./hooks";
import { useState, useRef, useEffect, useCallback } from "react";

const SERVICES = [
  {
    num: "01",
    title: "Website Development",
    desc: "Fast, modern websites engineered to turn every visitor into a paying customer. We obsess over speed, structure, and conversion at every pixel.",
    img: "/website-dev.jpg",
    tag: "Web",
    stat: "3×",
    statLabel: "Faster Load",
    wide: true,
    priority: true,
    hue: "214",
    accent: "#3b82f6",
    accentRgb: "59,130,246",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "E-commerce Stores",
    desc: "Conversion-obsessed shops that make buying irresistible at every step of the journey.",
    img: "/ecommerce.jpg",
    tag: "Commerce",
    stat: "+68%",
    statLabel: "Conversions",
    hue: "199",
    accent: "#06b6d4",
    accentRgb: "6,182,212",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "AI Chatbots",
    desc: "24/7 intelligent agents that capture every lead and never miss a sale while you sleep.",
    img: "/ai-chatbots.jpg",
    tag: "AI",
    stat: "24/7",
    statLabel: "Always On",
    hue: "258",
    accent: "#8b5cf6",
    accentRgb: "139,92,246",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a8 8 0 0 1 8 8v4a8 8 0 0 1-16 0v-4a8 8 0 0 1 8-8z"/><path d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Custom Software",
    desc: "Bespoke platforms built around your exact operations — no templates, no shortcuts.",
    img: "/custom-software.jpg",
    tag: "Dev",
    stat: "100%",
    statLabel: "Custom Built",
    hue: "158",
    accent: "#10b981",
    accentRgb: "16,185,129",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    num: "05",
    title: "Business Automation",
    desc: "Eliminate repetitive work, reclaim hours and scale without adding headcount.",
    img: "/automation.jpg",
    tag: "Automation",
    stat: "80%",
    statLabel: "Less Manual Work",
    hue: "32",
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
  },
  {
    num: "06",
    title: "Website Redesign",
    desc: "Gut your outdated site. Replace it with something sharp that earns trust on first look.",
    img: "/redesign.jpg",
    tag: "Design",
    stat: "2×",
    statLabel: "Engagement",
    hue: "346",
    accent: "#f43f5e",
    accentRgb: "244,63,94",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    num: "07",
    title: "Google SEO",
    desc: "Dominate search rankings and pull in ready-to-buy traffic without paying per click.",
    img: "/seo.jpg",
    tag: "SEO",
    stat: "Top 3",
    statLabel: "Rankings",
    hue: "142",
    accent: "#22c55e",
    accentRgb: "34,197,94",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
      </svg>
    ),
  },
  {
    num: "08",
    title: "Mobile Apps",
    desc: "Sleek iOS & Android apps your users will actually open — built for speed, retention and revenue.",
    img: "/mobile-apps.jpg",
    tag: "Mobile",
    stat: "4.9★",
    statLabel: "Avg Rating",
    hue: "271",
    accent: "#a855f7",
    accentRgb: "168,85,247",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
      </svg>
    ),
  },
  {
    num: "09",
    title: "Branding & Logo Design",
    desc: "Memorable identities that make your brand impossible to ignore — from logo to full visual system.",
    img: "/branding.jpg",
    tag: "Branding",
    stat: "50+",
    statLabel: "Brands Built",
    hue: "24",
    accent: "#f97316",
    accentRgb: "249,115,22",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
  },
  {
    num: "10",
    title: "Web Hosting & Maintenance",
    desc: "Your site stays fast, secure and online 24/7 — we handle updates, backups and everything in between.",
    img: "/hosting.jpg",
    tag: "Hosting",
    stat: "99.9%",
    statLabel: "Uptime",
    hue: "174",
    accent: "#14b8a6",
    accentRgb: "20,184,166",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
  },
  {
    num: "11",
    title: "UI/UX Design",
    desc: "Interfaces so intuitive your users never get lost — crafted with research, wireframes and pixel-perfect prototypes.",
    img: "/ui-ux.jpg",
    tag: "UI/UX",
    stat: "4×",
    statLabel: "Retention",
    hue: "328",
    accent: "#ec4899",
    accentRgb: "236,72,153",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z"/><path d="M7 7h.01"/>
      </svg>
    ),
  },
];

const LOGOS = [
  "Shopify","WordPress","React","OpenAI","Google","AWS","Stripe","Figma","Next.js",
];

/* ── Fixed: starts at 0, never flashes final value ── */
function useCountUp(target, started, duration = 1800) {
  const [val, setVal] = useState("0");
  const hasRun = useRef(false);

  useEffect(() => {
    if (!started || hasRun.current) return;
    hasRun.current = true;

    const match = target.match(/[\d.]+/);
    if (!match) { setVal(target); return; }

    const end    = parseFloat(match[0]);
    const idx    = target.indexOf(match[0]);
    const prefix = target.slice(0, idx);
    const suffix = target.slice(idx + match[0].length);
    let startTs  = null;

    const step = ts => {
      if (!startTs) startTs = ts;
      const prog = Math.min((ts - startTs) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      const cur  = match[0].includes('.')
        ? (ease * end).toFixed(1)
        : Math.round(ease * end);
      setVal(`${prefix}${cur}${suffix}`);
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return val;
}

function ServiceCard({ s, i, activeCard, setActiveCard, statsStarted }) {
  const [loaded, setLoaded] = useState(false);
  const cardRef  = useRef(null);
  const glowRef  = useRef(null);
  const rafRef   = useRef(null);
  const display  = useCountUp(s.stat, statsStarted);
  const isActive = activeCard === i;
  const isDimmed = activeCard !== null && activeCard !== i;

  const onMouseMove = useCallback(e => {
    const card = cardRef.current;
    if (!card) return;
    const r    = card.getBoundingClientRect();
    const x    = e.clientX - r.left;
    const y    = e.clientY - r.top;
    const cx   = r.width / 2, cy = r.height / 2;
    /* reduced tilt from 5 → 4 deg so it's subtler */
    const rotX = ((y - cy) / cy) * -4;
    const rotY = ((x - cx) / cx) *  4;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      card.style.transform =
        `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
    });
    if (glowRef.current) {
      glowRef.current.style.background =
        `radial-gradient(480px circle at ${x}px ${y}px, rgba(${s.accentRgb},0.13) 0%, transparent 60%)`;
      glowRef.current.style.opacity = '1';
    }
  }, [s.accentRgb]);

  const onMouseLeave = useCallback(() => {
    setActiveCard(null);
    const card = cardRef.current;
    if (card) {
      card.style.transition = 'transform 0.7s cubic-bezier(0.16,1,0.3,1)';
      card.style.transform  = '';
      setTimeout(() => { if (card) card.style.transition = ''; }, 700);
    }
    if (glowRef.current) glowRef.current.style.opacity = '0';
    if (rafRef.current)  cancelAnimationFrame(rafRef.current);
  }, [setActiveCard]);

  const onMouseEnter = useCallback(() => setActiveCard(i), [i, setActiveCard]);

  const onKeyDown = useCallback(e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.open('https://wa.me/254705427449', '_blank', 'noreferrer');
    }
  }, []);

  return (
    <a
      ref={cardRef}
      className={[
        'sv__card',
        s.wide   ? 'sv__card--wide'   : '',
        isActive ? 'sv__card--active' : '',
        isDimmed ? 'sv__card--dim'    : '',
      ].filter(Boolean).join(' ')}
      href="https://wa.me/254705427449"
      target="_blank"
      rel="noreferrer"
      aria-label={`Get a quote for ${s.title}`}
      style={{ '--accent': s.accent, '--accent-rgb': s.accentRgb, '--hue': s.hue, '--i': i }}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
    >
      <div className="sv__card-glow" ref={glowRef} aria-hidden="true" />
      <span className="sv__card-num" aria-hidden="true">{s.num}</span>

      <div className="sv__img-wrap">
        {!loaded && <div className="sv__img-skeleton" aria-hidden="true" />}
        <img
          src={s.img}
          alt={s.title}
          width="600"
          height={s.wide ? 310 : 240}
          loading={s.priority ? 'eager' : 'lazy'}
          fetchpriority={s.priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
        <div className="sv__img-vignette" aria-hidden="true" />
        <div className="sv__img-tag" aria-hidden="true">
          <span className="sv__tag-dot" />
          {s.tag}
        </div>
      </div>

      <div className="sv__card-body">
        <div className="sv__card-top">
          <div className="sv__card-icon" aria-hidden="true">{s.icon}</div>
          <h3 className="sv__card-title">{s.title}</h3>
          <div className="sv__card-stat" aria-label={`${s.stat} ${s.statLabel}`}>
            <span className="sv__stat-val" aria-hidden="true">{display}</span>
            <span className="sv__stat-key">{s.statLabel}</span>
          </div>
        </div>
        <p className="sv__card-desc">{s.desc}</p>
        <div className="sv__card-foot">
          <span className="sv__card-cta">
            Get a Quote
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
          <span className="sv__card-corner" aria-hidden="true">↗</span>
        </div>
      </div>

      <div className="sv__card-line" aria-hidden="true" />
      <svg className="sv__card-border" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <rect x="0.5" y="0.5" width="99" height="99" rx="5" ry="5" />
      </svg>
    </a>
  );
}

function ScrollDots({ total, active }) {
  return (
    <div className="sv__dots" role="tablist" aria-label="Service pages">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          role="tab"
          aria-selected={i === active}
          aria-label={`Page ${i + 1}`}
          className={`sv__dot${i === active ? ' sv__dot--on' : ''}`}
        />
      ))}
    </div>
  );
}

/* auto-hides after 3 s on first render */
function SwipeHint() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`sv__swipe-hint${show ? '' : ' sv__swipe-hint--gone'}`} aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
      Swipe to explore
    </div>
  );
}

export default function Services() {
  const [wrapRef, inView]           = useInView();
  const [activeCard, setActiveCard] = useState(null);
  const [statsStarted, setStats]    = useState(false);
  const [activeSlide, setSlide]     = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (inView && !statsStarted) {
      const t = setTimeout(() => setStats(true), 300);
      return () => clearTimeout(t);
    }
  }, [inView, statsStarted]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () =>
      setSlide(Math.min(
        Math.round(el.scrollLeft / (el.offsetWidth * 0.88)),
        SERVICES.length - 1
      ));
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="sv" id="services" aria-labelledby="sv-heading">
      <div className="sv__noise"    aria-hidden="true" />
      <div className="sv__orb sv__orb--a" aria-hidden="true" />
      <div className="sv__orb sv__orb--b" aria-hidden="true" />
      <div className="sv__orb sv__orb--c" aria-hidden="true" />

      <div className="sv__inner" ref={wrapRef}>

        {/* ══ HEADER ══ */}
        <header className="sv__header">
          <div className="sv__header-left">
            <div className="sv__eyebrow" aria-hidden="true">
              <span className="sv__eyebrow-rule" />
              <span>Our Services</span>
              {/* always in sync with the array */}
              <span className="sv__eyebrow-count">{SERVICES.length}</span>
            </div>

            <h2 className="sv__heading" id="sv-heading">
              <span className="sv__heading-pre">We Build</span>
              <span className="sv__heading-main">
                Things<br/>
                <em>That Win.</em>
              </span>
            </h2>

            <div className="sv__metrics" aria-label="Key statistics">
              {[
                { n: "50+", l: "Projects"    },
                { n: "98%", l: "Satisfaction" },
                { n: "12+", l: "Countries"   },
                { n: "6yr", l: "Experience"  },
              ].map(m => (
                <div className="sv__metric" key={m.l}>
                  <strong>{m.n}</strong>
                  <span>{m.l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sv__header-right">
            <p className="sv__header-body">
              {SERVICES.length} battle-tested specialisations. One obsessive focus on
              outcomes that move the needle for your business. We don't just
              build — we engineer growth.
            </p>

            <figure className="sv__testimonial">
              <div className="sv__testimonial-quote" aria-hidden="true">"</div>
              <blockquote>
                They didn't just deliver a website — they delivered results.
                Revenue up 140% in just 3 months.
              </blockquote>
              <figcaption>
                <div className="sv__avatar" aria-hidden="true">JM</div>
                <div>
                  <strong>James M.</strong>
                  <span>CEO, NovaTech Ltd</span>
                </div>
              </figcaption>
            </figure>

            <a href="https://wa.me/254705427449" className="sv__header-cta" target="_blank" rel="noreferrer">
              <span>Start a Project</span>
              <span className="sv__cta-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
          </div>
        </header>

        {/* ══ DESKTOP GRID ══ */}
        <div className={`sv__grid${inView ? ' sv__grid--in' : ''}`}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} s={s} i={i}
              activeCard={activeCard} setActiveCard={setActiveCard}
              statsStarted={statsStarted} />
          ))}
        </div>

        {/* ══ MOBILE SCROLL ══ */}
        <div className="sv__mobile-wrap">
          <SwipeHint />
          <div className="sv__scroll" ref={scrollRef}>
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.num} s={s} i={i}
                activeCard={activeCard} setActiveCard={setActiveCard}
                statsStarted={statsStarted} />
            ))}
          </div>
          <ScrollDots total={SERVICES.length} active={activeSlide} />
        </div>

        {/* ══ TECH LOGOS ══ */}
        <div className="sv__tech" aria-label="Technologies we use">
          <p className="sv__tech-label">
            <span className="sv__tech-rule" aria-hidden="true" />
            Technologies we build with
            <span className="sv__tech-rule" aria-hidden="true" />
          </p>
          <div className="sv__logos-mask">
            <div className="sv__logos-track" aria-hidden="true">
              {[...LOGOS, ...LOGOS].map((name, i) => (
                <div className="sv__logo" key={i}>
                  <span className="sv__logo-name">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ FOOTER BANNER ══ */}
        <div className="sv__banner">
          <div className="sv__banner-glow" aria-hidden="true" />
          <div className="sv__banner-inner">
            <div className="sv__banner-left">
              <p className="sv__banner-kicker">
                <span className="sv__kicker-line" aria-hidden="true" />
                Ready to grow?
              </p>
              <h3 className="sv__banner-heading">
                Not sure<br/><em>where to start?</em>
              </h3>
              <p className="sv__banner-body">
                Let's figure it out together — no pressure, just clarity.
              </p>
              <ul className="sv__trust-list">
                {["Free consultation", "No commitment", "Reply within 24h"].map(t => (
                  <li key={t}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sv__banner-right">
              <a href="https://wa.me/254705427449" className="sv__banner-cta" target="_blank" rel="noreferrer">
                <span>Let's talk through it</span>
                <span className="sv__banner-arrow" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </a>
              <p className="sv__banner-note">Free · No commitment · 24h reply</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
