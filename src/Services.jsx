import "./Services.css";
import { useInView } from "./hooks";
import { useState, useRef, useEffect } from "react";

const SERVICES = [
  {
    num: "01",
    title: "Website Development",
    desc: "Fast, modern websites engineered to turn every visitor into a paying customer. We obsess over speed, structure, and conversion at every pixel.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=90",
    tag: "Web",
    stat: "3×",
    statLabel: "faster load",
    wide: true,
  },
  {
    num: "02",
    title: "E-commerce Stores",
    desc: "Conversion-obsessed shops that make buying irresistible at every step.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=90",
    tag: "Commerce",
    stat: "+68%",
    statLabel: "conversions",
  },
  {
    num: "03",
    title: "AI Chatbots",
    desc: "24/7 intelligent agents that capture every lead and never miss a sale.",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=90",
    tag: "AI",
    stat: "24/7",
    statLabel: "active",
  },
  {
    num: "04",
    title: "Custom Software",
    desc: "Bespoke platforms built around your exact operations — no templates, no shortcuts.",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=90",
    tag: "Dev",
    stat: "100%",
    statLabel: "custom",
  },
  {
    num: "05",
    title: "Business Automation",
    desc: "Eliminate repetitive work, reclaim hours and scale without adding headcount.",
    img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&q=90",
    tag: "Automation",
    stat: "−80%",
    statLabel: "manual work",
  },
  {
    num: "06",
    title: "Website Redesign",
    desc: "Gut your outdated site. Replace it with something sharp that earns trust on first look.",
    img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&q=90",
    tag: "Design",
    stat: "2×",
    statLabel: "engagement",
  },
];

/* ── Inline SVG logos — zero external dependencies ── */
const LOGOS = [
  {
    name: "Shopify",
    icon: (
      <svg viewBox="0 0 109.5 124.5" width="26" height="26">
        <path fill="#95BF47" d="M95.5 23.7c-.1-.7-.7-1.1-1.2-1.1s-10.1-.7-10.1-.7-6.7-6.6-7.4-7.3c-.7-.7-2.1-.5-2.6-.3l-3.6 1.1c-.4-1.3-1.1-2.9-2-4.4-2.9-5.5-7.1-8.4-12.2-8.4h-.6c-.2-.2-.4-.5-.6-.7-2.4-2.6-5.4-3.8-9-3.7-7 .2-14 5.2-19.6 14.2-4 6.2-7 14-7.9 20.1l-13.5 4.2c-4 1.2-4.1 1.3-4.6 5.1C4.6 45 0 80.2 0 80.2l64 11.4 34.7-7.5s-3.1-59.7-3.2-60.4zM63.2 17.5l-5.8 1.8c0-.5 0-.9-.1-1.4-.3-4.8-1.3-8.7-3-11.8 3.6.5 6.1 4.5 8.9 11.4zm-11.3 3.5l-12.4 3.8c1.2-4.6 3.5-9.1 6.3-12.1 1-1.1 2.5-2.3 4.1-2.9.8 2.8 2 6.5 2 11.2zm-8.7-15c1.3 0 2.4.3 3.3.8-1.5.8-3 2-4.4 3.5-3.6 3.9-6.4 9.9-7.5 15.7l-10 3.1c1.9-9.7 9.3-22.7 18.6-23.1z"/>
        <path fill="#5E8E3E" d="M94.3 22.6c-.5 0-10.1-.7-10.1-.7s-6.7-6.6-7.4-7.3c-.3-.3-.6-.4-.9-.4l-4.7 96.4 34.7-7.5S94.8 23.3 94.7 23c-.2-.3-.3-.4-.4-.4z"/>
        <path fill="#FFF" d="M56.2 43.1l-4.3 12.8s-3.7-2-8.3-2c-6.7 0-7 4.2-7 5.2 0 5.7 14.9 7.9 14.9 21.3 0 10.6-6.7 17.4-15.7 17.4-10.8 0-16.3-6.7-16.3-6.7l2.9-9.6s5.7 4.9 10.5 4.9c3.1 0 4.4-2.5 4.4-4.3 0-7.5-12.2-7.8-12.2-20.1 0-10.3 7.4-20.3 22.4-20.3 5.7 0 8.7 1.4 8.7 1.4z"/>
      </svg>
    ),
  },
  {
    name: "WordPress",
    icon: (
      <svg viewBox="0 0 122.5 122.5" width="26" height="26">
        <path fill="#21759B" d="M61.25 0C27.43 0 0 27.43 0 61.25s27.43 61.25 61.25 61.25 61.25-27.43 61.25-61.25S95.07 0 61.25 0zM8.5 61.25c0-8.64 1.9-16.83 5.3-24.2l29.2 80c-20.2-9.6-34.5-30.3-34.5-55.8zm52.75 52.75c-5.84 0-11.47-.85-16.8-2.42l17.84-51.82 18.28 50.1a9.3 9.3 0 01.18.37c-6.2 2.4-12.9 3.77-19.5 3.77zm7.35-78.17c3.2-.17 6.1-.5 6.1-.5 2.86-.34 2.53-4.54-.34-4.37 0 0-8.63.68-14.2.68-5.23 0-14.03-.68-14.03-.68-2.87-.17-3.2 4.2-.34 4.37 0 0 2.73.33 5.6.5l8.32 22.8-11.7 35.1-19.45-57.9c3.2-.17 6.1-.5 6.1-.5 2.86-.34 2.53-4.54-.34-4.37 0 0-8.63.68-14.2.68-.99 0-2.16-.02-3.4-.07C24.22 17.95 41.75 8.5 61.25 8.5c14.6 0 27.9 5.6 37.9 14.76-.24-.02-.48-.05-.74-.05-5.23 0-8.94 4.54-8.94 9.43 0 4.37 2.53 8.07 5.22 12.44 2.02 3.54 4.37 8.07 4.37 14.63 0 4.54-1.74 9.8-4.04 17.15l-5.3 17.7-19.12-56.78zm34.1 11.52c4.05 7.4 6.36 15.85 6.36 24.9 0 19.18-10.38 35.97-25.9 45.1l18.17-52.5c3.4-8.5 4.54-15.3 4.54-21.35 0-2.2-.15-4.24-.42-6.1l-2.75 9.95z"/>
      </svg>
    ),
  },
  {
    name: "React",
    icon: (
      <svg viewBox="-11.5 -10.23 23 20.46" width="28" height="28">
        <circle r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    ),
  },
  {
    name: "OpenAI",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="#000">
        <path d="M22.28 9.78a5.88 5.88 0 00-.52-4.86 6.06 6.06 0 00-6.52-2.91A5.88 5.88 0 0011.27 0a6.06 6.06 0 00-5.78 4.2 5.88 5.88 0 00-3.93 2.86 6.06 6.06 0 00.75 7.1 5.88 5.88 0 00.52 4.87 6.06 6.06 0 006.52 2.9A5.88 5.88 0 0012.73 24a6.06 6.06 0 005.79-4.2 5.88 5.88 0 003.93-2.86 6.06 6.06 0 00-.17-7.16zM12.73 22.5a4.5 4.5 0 01-2.88-1.04l.14-.08 4.78-2.76a.78.78 0 00.4-.68v-6.73l2.02 1.17a.07.07 0 01.04.06v5.58a4.52 4.52 0 01-4.5 4.48zm-9.68-4.13a4.5 4.5 0 01-.54-3.01l.14.09 4.78 2.76a.78.78 0 00.79 0l5.83-3.37v2.33a.07.07 0 01-.03.07L9.2 20.01a4.52 4.52 0 01-6.15-1.64zm-1.26-10.5a4.5 4.5 0 012.35-1.98v5.68a.78.78 0 00.39.68l5.83 3.37-2.02 1.16a.07.07 0 01-.07 0L3.6 13.97a4.52 4.52 0 01-.81-6.1zm16.6 3.88l-5.83-3.37 2.02-1.16a.07.07 0 01.07 0l4.87 2.81a4.5 4.5 0 01-.7 8.12V12.4a.78.78 0 00-.43-.65zm2.01-3.03l-.14-.09-4.78-2.75a.78.78 0 00-.79 0L9.05 9.75V7.42a.07.07 0 01.03-.07l4.87-2.81a4.52 4.52 0 016.45 4.68zm-12.64 4.16L5.74 11.7a.07.07 0 01-.04-.06V6.07a4.52 4.52 0 017.39-3.47l-.14.08-4.78 2.76a.78.78 0 00-.4.68v6.73l-2-.74zm1.1-2.35L12 9.17l2.14 1.24v2.47L12 14.12l-2.14-1.24V10.53z"/>
      </svg>
    ),
  },
  {
    name: "Google",
    icon: (
      <svg viewBox="0 0 48 48" width="26" height="26">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        <path fill="none" d="M0 0h48v48H0z"/>
      </svg>
    ),
  },
  {
    name: "AWS",
    icon: (
      <svg viewBox="0 0 60 36" width="36" height="22">
        <path fill="#F90" d="M16.7 13.9c0 .7.1 1.3.2 1.7.2.4.4.9.7 1.4.1.2.2.4.2.5 0 .2-.1.4-.4.6l-1.2.8c-.2.1-.4.2-.5.2-.2 0-.4-.1-.6-.3-.3-.3-.5-.6-.7-1-.2-.4-.4-.8-.6-1.4-1.5 1.8-3.4 2.7-5.6 2.7-1.6 0-2.9-.5-3.8-1.4-.9-.9-1.4-2.2-1.4-3.7 0-1.6.6-3 1.7-4 1.1-1 2.6-1.5 4.5-1.5.6 0 1.2.1 1.9.2.7.1 1.4.3 2.1.5V8.5c0-1.4-.3-2.4-.9-3-.6-.6-1.6-.9-3-.9-.6 0-1.3.1-2 .3-.7.2-1.4.4-2 .7-.3.1-.5.2-.6.2H4.1c-.2 0-.3-.2-.3-.5v-.9c0-.2.1-.4.2-.5.1-.1.3-.2.6-.3.6-.3 1.4-.6 2.3-.8.9-.2 1.9-.3 2.9-.3 2.2 0 3.8.5 4.9 1.5 1 1 1.6 2.5 1.6 4.5v5.9h.4zm-7.7 2.9c.6 0 1.2-.1 1.9-.4.6-.2 1.2-.7 1.7-1.3.3-.3.5-.7.6-1.1.1-.4.2-1 .2-1.6v-.8c-.5-.1-1.1-.3-1.7-.3-.6-.1-1.2-.1-1.7-.1-1.2 0-2.1.2-2.7.7-.6.5-.9 1.2-.9 2 0 .8.2 1.4.6 1.8.4.5.9.9 2 1.1zm14.6 2c-.2 0-.4 0-.5-.1-.1-.1-.2-.3-.3-.5L19.3 5.6c-.1-.3-.1-.5-.1-.6 0-.2.1-.4.4-.4h1.9c.2 0 .4 0 .5.1.1.1.2.3.3.5l2.8 11 2.6-11c.1-.3.2-.5.3-.5.1-.1.3-.1.5-.1h1.5c.2 0 .4 0 .5.1.1.1.2.3.3.5l2.6 11.2L35.4 5.2c.1-.3.2-.5.3-.5.1-.1.3-.1.5-.1H38c.3 0 .4.1.4.4 0 .1 0 .2-.1.3l-4.6 13.6c-.1.3-.2.5-.3.5-.1.1-.3.1-.5.1H31c-.2 0-.4 0-.5-.1-.1-.1-.2-.3-.3-.5l-2.6-10.8-2.5 10.8c-.1.3-.2.5-.3.5-.1.1-.3.1-.5.1h-1.7zm23.5.5c-1.1 0-2.2-.1-3.2-.4-1-.3-1.8-.6-2.3-1-.3-.2-.4-.4-.4-.6v-.9c0-.3.1-.5.4-.5.1 0 .2 0 .4.1.1.1.3.1.4.2.6.3 1.3.5 2 .7.8.2 1.5.3 2.3.3 1.2 0 2.1-.2 2.8-.6.6-.4 1-.9 1-1.7 0-.5-.2-.9-.5-1.2-.4-.3-1-.6-2-.9l-2.9-.9c-1.4-.4-2.5-1.1-3.1-1.9-.7-.8-1-1.8-1-2.8 0-.8.2-1.5.5-2.1.4-.6.8-1.1 1.4-1.6.6-.4 1.3-.7 2-.9.8-.2 1.6-.3 2.5-.3.4 0 .9 0 1.3.1.4.1.9.2 1.3.3.4.1.8.2 1.1.4.3.1.6.3.7.4.2.1.4.3.5.5.1.2.1.4.1.6v.8c0 .3-.1.5-.4.5-.1 0-.4-.1-.7-.3-.9-.4-1.9-.6-3-.6-1.1 0-1.9.2-2.5.5-.6.3-.9.9-.9 1.6 0 .5.2.9.6 1.3.4.3 1.1.7 2.2 1l2.8.9c1.4.4 2.4 1.1 3 1.8.6.8.9 1.7.9 2.7 0 .8-.2 1.6-.5 2.2-.3.6-.8 1.2-1.4 1.6-.6.4-1.3.8-2.1 1-.9.3-1.8.4-2.8.4z"/>
        <path fill="#F90" d="M54.3 29.5c-6.3 4.7-15.5 7.1-23.4 7.1-11.1 0-21.1-4.1-28.6-10.9-.6-.5-.1-1.2.6-.8 8.1 4.7 18.2 7.6 28.6 7.6 7 0 14.7-1.5 21.8-4.5.9-.5 1.8.6.9 1.5z"/>
        <path fill="#F90" d="M56.9 26.5c-.8-1.1-5.4-.5-7.5-.2-.6.1-.7-.5-.2-.8 3.7-2.6 9.7-1.8 10.4-.9.7.9-.2 6.9-3.6 9.8-.5.4-1 .2-.8-.4.8-1.9 2.5-6.3 1.7-7.5z"/>
      </svg>
    ),
  },
  {
    name: "Stripe",
    icon: (
      <svg viewBox="0 0 60 25" width="40" height="18">
        <path fill="#635BFF" d="M59.6 13c0-4.4-2.1-7.8-6.2-7.8-4.1 0-6.6 3.4-6.6 7.7 0 5.1 2.9 7.7 7.1 7.7 2 0 3.6-.5 4.7-1.2v-3.3c-1.1.6-2.4 1-4 1-1.6 0-3-.6-3.2-2.6h8.1c0-.2.1-.9.1-1.5zm-8.2-1.6c0-1.9 1.2-2.7 2.3-2.7 1.1 0 2.2.8 2.2 2.7h-4.5zM37 5.2c-1.6 0-2.6.7-3.2 1.3l-.2-1h-3.6v19.8l4.1-.9V19c.6.4 1.4 1 2.8 1 2.9 0 5.5-2.3 5.5-7.5C42.4 7.6 39.8 5.2 37 5.2zm-1 11.5c-.9 0-1.5-.3-1.9-.8V9.6c.4-.5 1-.8 1.9-.8 1.5 0 2.5 1.6 2.5 3.9 0 2.4-1 4-2.5 4zm-10.9-13l4.1-.9V0l-4.1.9v2.8zm0 1.8h4.1V20h-4.1V5.5zm-4.5 1.3l-.3-1.3H17v14.5h4.1V9.9c1-1.3 2.6-1.1 3.1-.9V5.5c-.5-.2-2.4-.5-3.6 1.3zm-8.6-2.6L9.1 16.4l-2.8-12h-4.4L6 20h3.9l5.2-13.8h-3.1z"/>
      </svg>
    ),
  },
  {
    name: "Figma",
    icon: (
      <svg viewBox="0 0 38 57" width="18" height="26">
        <path fill="#F24E1E" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
        <path fill="#FF7262" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z"/>
        <path fill="#1ABCFE" d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z"/>
        <path fill="#0ACF83" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
        <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
      </svg>
    ),
  },
];

/* ── Animated count-up hook ── */
function useCountUp(target, started, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    // Parse numeric part from strings like "+68%", "3×", "−80%", "24/7"
    const match = target.match(/[\d.]+/);
    if (!match) { setVal(target); return; }
    const end = parseFloat(match[0]);
    const prefix = target.slice(0, target.indexOf(match[0]));
    const suffix = target.slice(target.indexOf(match[0]) + match[0].length);
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 4);
      const cur = Math.round(ease * end);
      setVal(`${prefix}${cur}${suffix}`);
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started]);
  return val || target;
}

function StatBadge({ stat, statLabel, started }) {
  const display = useCountUp(stat, started);
  return (
    <span className="sv__stat">
      <span className="sv__stat-num">{display}</span>
      <span className="sv__stat-lbl">{statLabel}</span>
    </span>
  );
}

function ServiceCard({ s, i, hovered, setHovered, statsStarted }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <a
      className={`sv__card${s.wide ? " sv__card--wide" : ""}${hovered === i ? " sv__card--on" : ""}${hovered !== null && hovered !== i ? " sv__card--dim" : ""}`}
      href="https://wa.me/254705427449"
      target="_blank" rel="noreferrer"
      style={{ "--i": i }}
      onMouseEnter={() => setHovered(i)}
      onMouseLeave={() => setHovered(null)}
    >
      {/* Photo with skeleton */}
      <div className="sv__photo">
        {!loaded && <div className="sv__skeleton" />}
        <img
          src={s.img}
          alt={s.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
        <span className="sv__photo-tag">{s.tag}</span>
        <span className="sv__photo-num">{s.num}</span>
      </div>

      {/* Text body */}
      <div className="sv__body">
        <div className="sv__body-top">
          <h3 className="sv__title">{s.title}</h3>
          <StatBadge stat={s.stat} statLabel={s.statLabel} started={statsStarted} />
        </div>
        <p className="sv__desc">{s.desc}</p>
        <div className="sv__cta">
          Get a Quote
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>

      {/* Traced border SVG */}
      <svg className="sv__border-trace" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect x="0.75" y="0.75" width="98.5" height="98.5" rx="5" ry="5" />
      </svg>

      {/* Sweep line */}
      <div className="sv__sweep" />
    </a>
  );
}

export default function Services() {
  const [ref, v] = useInView();
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);
  const posRef = useRef({ x: -999, y: -999 });
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const rafRef = useRef(null);

  // Stats count up when grid animates in
  const [statsStarted, setStatsStarted] = useState(false);
  useEffect(() => {
    if (v && !statsStarted) {
      const t = setTimeout(() => setStatsStarted(true), 400);
      return () => clearTimeout(t);
    }
  }, [v]);

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const loop = () => {
      setPos(p => ({
        x: lerp(p.x, posRef.current.x, 0.11),
        y: lerp(p.y, posRef.current.y, 0.11),
      }));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMove = e => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    posRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <section className="sv" id="services" ref={sectionRef} onMouseMove={onMove}>

      {/* Cursor preview */}
      <div
        className={`sv__cursor${hovered !== null ? " sv__cursor--show" : ""}`}
        style={{ transform: `translate(${pos.x}px,${pos.y}px)` }}
      >
        {hovered !== null && (
          <>
            <img src={SERVICES[hovered].img} alt="" />
            <span className="sv__cursor-tag">{SERVICES[hovered].tag}</span>
          </>
        )}
      </div>

      <div className="sv__wrap" ref={ref}>

        {/* Header */}
        <header className="sv__hd">
          <div className="sv__hd-l">
            <div className="sv__badge"><span className="sv__badge-dot" />Our Services</div>
            <h2 className="sv__h2">
              <span>We Build</span>
              <span className="sv__h2-b">
                <em>Things</em>
                <span className="sv__h2-rule" />
                <em>That</em>
              </span>
              <span>Win.</span>
            </h2>
          </div>
          <div className="sv__hd-r">
            <p className="sv__hd-body">
              Six battle-tested specialisations. One obsessive focus on outcomes that move the needle for your business.
            </p>
            <a href="https://wa.me/254705427449" className="sv__hd-btn" target="_blank" rel="noreferrer">
              <span>Start a Project</span>
              <span className="sv__hd-btn-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </a>
          </div>
        </header>

        {/* Desktop grid */}
        <div className={`sv__grid${v ? " sv__grid--in" : ""}`}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} s={s} i={i} hovered={hovered} setHovered={setHovered} statsStarted={statsStarted} />
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="sv__scroll">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} s={s} i={i} hovered={hovered} setHovered={setHovered} statsStarted={statsStarted} />
          ))}
        </div>

        {/* Trusted by */}
        <div className="sv__trust">
          <p className="sv__trust-label">Trusted technologies we build with</p>
          <div className="sv__logos-track-wrap">
            <div className="sv__logos-track">
              {[...LOGOS, ...LOGOS].map((l, i) => (
                <div className="sv__logo" key={i}>
                  {l.icon}
                  <span>{l.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sv__foot">
          <p className="sv__foot-copy">Not sure where to start?</p>
          <a href="https://wa.me/254705427449" className="sv__foot-btn" target="_blank" rel="noreferrer">
            Let's talk through it
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

      </div>
    </section>
  );
}
