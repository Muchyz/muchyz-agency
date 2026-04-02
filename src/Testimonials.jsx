import { useInView } from "./hooks";
import "./Testimonials.css";
import { useRef, useCallback } from "react";

const TESTI = [
  {
    q: "Muchyz built us a stunning website and our sales enquiries tripled within the first month. Absolutely world-class work.",
    a: "Wanjiru Kamau",
    r: "CEO, Kamau Enterprises",
    av: "WK",
    service: "Web Design",
    metric: "3×",
    metricLabel: "More Leads",
    num: "01",
  },
  {
    q: "The AI chatbot handles 80% of our customer queries automatically. Best investment we have made for our business.",
    a: "Daniel Otieno",
    r: "Founder, SwiftMart",
    av: "DO",
    service: "AI Chatbot",
    metric: "80%",
    metricLabel: "Automated",
    num: "02",
  },
  {
    q: "Our old site was holding us back. Muchyz transformed it completely — we are genuinely proud to share it now.",
    a: "Fatuma Ali",
    r: "Director, Alisafi Spa",
    av: "FA",
    service: "Full Redesign",
    metric: "100%",
    metricLabel: "Brand Refresh",
    num: "03",
  },
];

function StarIcon() {
  return (
    <svg viewBox="0 0 13 13" fill="currentColor" width="13" height="13" aria-hidden="true">
      <path d="M6.5 1l1.44 2.92 3.22.47-2.33 2.27.55 3.21L6.5 8.25 3.62 9.87l.55-3.21L1.84 4.39z" />
    </svg>
  );
}

function TestiCard({ t, i }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const rafRef  = useRef(null);

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
      if (card) card.style.transform =
        `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
    });
    if (glowRef.current) {
      glowRef.current.style.background =
        `radial-gradient(380px circle at ${x}px ${y}px, rgba(79,142,247,0.11) 0%, transparent 60%)`;
      glowRef.current.style.opacity = "1";
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.transition = "transform 0.7s cubic-bezier(0.16,1,0.3,1)";
      card.style.transform = "";
      setTimeout(() => { if (card) card.style.transition = ""; }, 700);
    }
    if (glowRef.current) glowRef.current.style.opacity = "0";
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <article
      ref={cardRef}
      className="tc"
      style={{ "--i": i }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* top accent bar — traces on hover */}
      <div className="tc__accent" aria-hidden="true" />

      {/* mouse glow */}
      <div className="tc__glow" ref={glowRef} aria-hidden="true" />

      {/* watermark number */}
      <span className="tc__watermark" aria-hidden="true">{t.num}</span>

      {/* body */}
      <div className="tc__body">
        <div className="tc__top">
          <span className="tc__badge">{t.service}</span>
          <div className="tc__stars" aria-label="5 stars">
            {Array.from({ length: 5 }).map((_, s) => (
              <span key={s} className="tc__star"><StarIcon /></span>
            ))}
          </div>
        </div>

        <div className="tc__qblock">
          <blockquote className="tc__quote">{t.q}</blockquote>
        </div>
      </div>

      {/* footer */}
      <div className="tc__foot">
        <div className="tc__metric">
          <span className="tc__mval">{t.metric}</span>
          <span className="tc__mlbl">{t.metricLabel}</span>
        </div>
        <div className="tc__author">
          <div className="tc__av" aria-hidden="true">{t.av}</div>
          <div>
            <strong className="tc__name">{t.a}</strong>
            <span className="tc__role">{t.r}</span>
          </div>
        </div>
      </div>

      {/* SVG border trace */}
      <svg className="tc__border" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect x="0.5" y="0.5" width="99" height="99" rx="5" ry="5" />
      </svg>
    </article>
  );
}

export default function Testimonials() {
  const [ref, v] = useInView();

  return (
    <section className="ts" id="testimonials">

      {/* Orbs */}
      <div className="ts__blobs" aria-hidden="true">
        <div className="ts__blob ts__blob--1" />
        <div className="ts__blob ts__blob--2" />
        <div className="ts__blob ts__blob--3" />
      </div>

      <div className="ts__wrap" ref={ref}>

        {/* ── Header — two-column Services style ── */}
        <div className={`ts__hd${v ? " ts__hd--in" : ""}`}>

          {/* Left */}
          <div className="ts__hd-left">
            <div className="ts__eyebrow">
              <span className="ts__eyebrow-rule" aria-hidden="true" />
              <span>Client Stories</span>
              <span className="ts__eyebrow-count">03</span>
            </div>

            <h2 className="ts__title">
              <span className="ts__title-pre">Trusted by Businesses</span>
              <em>Across the<br/>Region.</em>
            </h2>
          </div>

          {/* Right */}
          <div className="ts__hd-right">
            <p className="ts__sub">
              From startups to established enterprises — here is what our
              clients say about working with Muchyz Digital Agency.
            </p>

            {/* Metrics strip */}
            <div className="ts__metrics">
              {[
                { n: "50+", l: "Clients" },
                { n: "98%", l: "Satisfaction" },
                { n: "140%", l: "Avg Revenue ↑" },
              ].map(m => (
                <div className="ts__metric-item" key={m.l}>
                  <strong>{m.n}</strong>
                  <span>{m.l}</span>
                </div>
              ))}
            </div>

            <a href="https://wa.me/254705427449" className="ts__cta" target="_blank" rel="noreferrer">
              <span>See More Work</span>
              <span className="ts__cta-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
          </div>

        </div>

        {/* ── Cards ── */}
        <div className={`ts__grid${v ? " ts__grid--in" : ""}`}>
          {TESTI.map((t, i) => (
            <TestiCard key={t.a} t={t} i={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
