import "./Pricing.css";
import { useInView } from "./hooks";
import { useState, useEffect, useRef, useCallback } from "react";

const PLANS = [
  {
    id: "starter", num: "01", name: "Starter", price: 120,
    caption: "Launch your presence", hot: false,
    accentRgb: "6,182,212",
    features: ["5 Custom Pages", "Mobile Responsive", "Contact Form", "Basic SEO", "1 Revision Round"],
    cta: "Get Started",
  },
  {
    id: "business", num: "02", name: "Business", price: 250,
    caption: "Built to convert", hot: true,
    accentRgb: "79,142,247",
    features: ["10 Custom Pages", "Full SEO Suite", "Performance Tuned", "Analytics Setup", "3 Revision Rounds", "30-Day Support"],
    cta: "Start Building",
  },
  {
    id: "premium", num: "03", name: "Premium", price: 500,
    caption: "No limits, no ceiling", hot: false,
    accentRgb: "167,139,250",
    features: ["Unlimited Pages", "Advanced Animations", "Full SEO Suite", "Custom Features", "Priority Support", "Lifetime Updates"],
    cta: "Go Premium",
  },
];

const COMPARE_ROWS = [
  { label: "Custom pages",       vals: ["5",    "10",    "∞"] },
  { label: "Mobile responsive",  vals: ["✓",    "✓",     "✓"] },
  { label: "SEO optimisation",   vals: ["Basic","Full",  "Full"] },
  { label: "Animations",         vals: ["—",    "—",     "✓"] },
  { label: "Custom features",    vals: ["—",    "—",     "✓"] },
  { label: "Support period",     vals: ["—",    "30 days","Lifetime"] },
  { label: "Revision rounds",    vals: ["1",    "3",     "∞"] },
];

const GUARANTEES = [
  {
    label: "Pay on completion",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    label: "Live in 3 days",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
  {
    label: "No hidden fees",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  },
  {
    label: "Free consultation",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  },
  {
    label: "100% satisfaction",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  },
];

const KES_RATE = 130;

function formatPrice(amount, currency) {
  if (currency === "KES") return { sym: "KSh", val: (amount * KES_RATE).toLocaleString("en-KE") };
  return { sym: "$", val: amount.toString() };
}

function useCurrency() {
  const [currency, setCurrency] = useState("USD");
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apis = [
      async () => { const r = await fetch("https://ipwho.is/"); const d = await r.json(); if (!d.success) throw 0; return { code: d.country_code, name: d.country }; },
      async () => { const r = await fetch("https://freeipapi.com/api/json"); const d = await r.json(); return { code: d.countryCode, name: d.countryName }; },
      async () => { const r = await fetch("https://ipinfo.io/json"); const d = await r.json(); return { code: d.country, name: d.country }; },
    ];
    (async () => {
      for (const api of apis) {
        try { const { code, name } = await api(); if (code) { setCurrency(code === "KE" ? "KES" : "USD"); setCountry(name || null); return; } }
        catch (_) { continue; }
      }
    })().finally(() => setLoading(false));
  }, []);

  return { currency, setCurrency, country, loading };
}

/* Count-up hook */
function useCountUp(target, started, duration = 1600) {
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!started) return;
    const match = String(target).replace(/,/g, "").match(/[\d.]+/);
    if (!match) { setVal(String(target)); return; }
    const end = parseFloat(match[0]);
    const prefix = String(target).slice(0, String(target).replace(/,/g, "").indexOf(match[0]));
    const suffix = String(target).slice(String(target).replace(/,/g, "").indexOf(match[0]) + match[0].length);
    let startTs = null;
    const step = ts => {
      if (!startTs) startTs = ts;
      const prog = Math.min((ts - startTs) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      const cur = Math.round(ease * end);
      setVal(`${prefix}${cur.toLocaleString()}${suffix}`);
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return val;
}

const Arr = () => (
  <svg className="p-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function PricingCard({ plan, i, currency, countStarted }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const rafRef  = useRef(null);
  const { sym, val } = formatPrice(plan.price, currency);
  const displayVal = useCountUp(val, countStarted);

  const onMouseMove = useCallback(e => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (card) card.style.transform = plan.hot
        ? `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-26px) scale(1.035)`
        : `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
    });
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(380px circle at ${x}px ${y}px, rgba(${plan.accentRgb},0.11) 0%, transparent 60%)`;
      glowRef.current.style.opacity = "1";
    }
  }, [plan.hot, plan.accentRgb]);

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.transition = "transform 0.7s cubic-bezier(0.16,1,0.3,1)";
      card.style.transform = plan.hot ? "translateY(-18px) scale(1.035)" : "";
      setTimeout(() => { if (card) card.style.transition = ""; }, 700);
    }
    if (glowRef.current) glowRef.current.style.opacity = "0";
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, [plan.hot]);

  return (
    <div
      ref={cardRef}
      className={`p-card${plan.hot ? " p-card--hot" : ""}`}
      style={{ "--i": i, "--accent-rgb": plan.accentRgb }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-plan={plan.id}
    >
      <div className="p-card__rim" />
      <div className="p-card-glow" ref={glowRef} />
      <span className="p-card__watermark">{plan.num}</span>

      <div className="p-card__hd">
        <div>
          <span className="p-card__num">{plan.num}</span>
          <h3 className="p-card__name">{plan.name}</h3>
          <p className="p-card__cap">{plan.caption}</p>
        </div>
        {plan.hot && <span className="p-badge">✦ Popular</span>}
      </div>

      <div className="p-card__price">
        <sup className="p-card__sym">{sym}</sup>
        <strong className={`p-card__amt${currency === "KES" ? " p-card__amt--kes" : ""}`}>
          {displayVal}
        </strong>
      </div>
      <p className="p-card__freq">one-time project fee</p>

      <div className="p-card__sep" />

      <ul className="p-card__feats">
        {plan.features.map(f => (
          <li key={f}>
            <span className={`p-tick${plan.hot ? " p-tick--h" : ""}`}><CheckIcon /></span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href="https://wa.me/254705427449"
        className={`p-btn${plan.hot ? " p-btn--h" : ""}`}
        target="_blank" rel="noreferrer"
      >
        <span>{plan.cta}</span><Arr />
      </a>

      <svg className="p-card-border" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect x="0.5" y="0.5" width="99" height="99" rx="6" ry="6" />
      </svg>
    </div>
  );
}

export default function Pricing() {
  const [ref, inView] = useInView();
  const [compareRef, compareInView] = useInView();
  const { currency, setCurrency, country, loading } = useCurrency();
  const secRef = useRef(null);

  /* Section-wide mouse spotlight */
  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const onMove = e => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
      const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="p-sec" id="pricing" ref={secRef}>

      <div className="p-bg" aria-hidden="true">
        <div className="p-blob p-blob--1" />
        <div className="p-blob p-blob--2" />
        <div className="p-blob p-blob--3" />
        <div className="p-blob p-blob--4" />
        <div className="p-blob p-blob--5" />
        <div className="p-blob p-blob--6" />
      </div>
      <div className="p-noise" aria-hidden="true" />

      {/* ══ HEADER ══ */}
      <header className="p-hd">
        <div className="p-kicker">
          <span className="p-kicker__dot" />
          Transparent Pricing
        </div>
        <h2 className="p-h2">
          Simple prices.<br />
          <em className="p-h2__em">Serious results.</em>
        </h2>
        <p className="p-lead">No hidden fees. No contracts. Pay only when you're happy.</p>
        <div className="p-toggle">
          {!loading && country && <span className="p-toggle__loc">📍 {country}</span>}
          <div className="p-toggle__wrap">
            <button className={`p-toggle__btn${currency === "USD" ? " p-toggle__btn--on" : ""}`} onClick={() => setCurrency("USD")}>🇺🇸 USD</button>
            <button className={`p-toggle__btn${currency === "KES" ? " p-toggle__btn--on" : ""}`} onClick={() => setCurrency("KES")}>🇰🇪 KES</button>
          </div>
        </div>
      </header>

      {/* ══ CARDS ══ */}
      <div className={`p-grid${inView ? " p-grid--in" : ""}`} ref={ref}>
        {PLANS.map((plan, i) => (
          <PricingCard
            key={plan.id} plan={plan} i={i}
            currency={currency} countStarted={inView}
          />
        ))}
      </div>

      {/* ══ COMPARISON TABLE ══ */}
      <div className={`p-compare${compareInView ? " p-compare--in" : ""}`} ref={compareRef}>
        {/* header row */}
        <div className="p-compare__row">
          <div className="p-compare__cell p-compare__cell--head p-compare__cell--label">Feature</div>
          <div className="p-compare__cell p-compare__cell--head">Starter</div>
          <div className="p-compare__cell p-compare__cell--head mid">Business</div>
          <div className="p-compare__cell p-compare__cell--head">Premium</div>
        </div>
        {COMPARE_ROWS.map(row => (
          <div className="p-compare__row" key={row.label}>
            <div className="p-compare__cell p-compare__cell--label">{row.label}</div>
            {row.vals.map((v, i) => (
              <div key={i} className={`p-compare__cell${i === 1 ? " p-compare__cell--mid" : ""}`}>
                {v === "✓" ? <span className="p-check"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                : v === "—" ? <span className="p-dash">—</span>
                : v}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ══ ADD-ON ══ */}
      <div className="p-addon">
        <div className="p-addon__rim" />
        <div className="p-addon__l">
          <span className="p-addon__badge">Add-on</span>
          <div>
            <strong className="p-addon__name">AI Chatbot Integration</strong>
            <span className="p-addon__sub">
              24/7 intelligent lead capture — from{" "}
              <b>{currency === "KES" ? `KSh ${(150 * KES_RATE).toLocaleString()}` : "$150"}</b>
            </span>
          </div>
        </div>
        <a href="https://wa.me/254705427449" className="p-addon__cta" target="_blank" rel="noreferrer">
          Get a Quote <Arr />
        </a>
      </div>

      {/* ══ GUARANTEES ══ */}
      <div className="p-guarantee">
        {GUARANTEES.map(g => (
          <div className="p-guarantee__item" key={g.label}>
            <span className="p-guarantee__icon">{g.icon}</span>
            {g.label}
          </div>
        ))}
      </div>

    </section>
  );
}
