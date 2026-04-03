import { useState, useRef, useEffect, useCallback } from "react";
import "./FAQ.css";

const FAQS = [
  { q: "How long does it take to build a website?",     a: "Most of our websites are built and delivered within just 3 business days. E-commerce stores and custom software take 1–2 weeks depending on complexity." },
  { q: "Do you offer website hosting?",                 a: "Yes! We can set up and manage hosting for you. We recommend fast, reliable platforms like Vercel, Netlify or cPanel hosting depending on your needs." },
  { q: "What do I need to get started?",                a: "Just your business name, logo (if you have one), and a brief description of what you do. We guide you through everything else in our discovery call." },
  { q: "Can you redesign my existing website?",         a: "Absolutely. Website redesign is one of our most popular services. We audit your current site and rebuild it to be faster, modern and higher converting." },
  { q: "Do you build mobile-friendly websites?",        a: "Every single project we deliver is fully responsive and mobile-first. Over 70% of web traffic is mobile — we never compromise on this." },
  { q: "What happens after my website goes live?",      a: "All plans include 30 days of free post-launch support. We fix any bugs, make minor tweaks and ensure everything runs perfectly after delivery." },
  { q: "How do I pay?",                                 a: "We accept M-Pesa, bank transfer and international payments. A 50% deposit is required to start, with the balance due on delivery. Alternatively we offer flexible payments on agreements." },
  { q: "Can I update the website myself after launch?", a: "Yes. We build sites with easy-to-use CMS systems and provide a handover session so you can manage your own content confidently." },
];

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* 3D tilt card component */
function FaqItem({ f, i, isOpen, isHover, onToggle, onMouseEnter, onMouseLeave, inView }) {
  const itemRef  = useRef(null);
  const glowRef  = useRef(null);
  const rafRef   = useRef(null);

  const onMouseMove = useCallback(e => {
    const card = itemRef.current;
    if (!card) return;
    const r  = card.getBoundingClientRect();
    const x  = e.clientX - r.left;
    const y  = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    const rotX = ((y - cy) / cy) * -3;
    const rotY = ((x - cx) / cx) * 3;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (card) card.style.transform =
        `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
    });
    if (glowRef.current) {
      glowRef.current.style.background =
        `radial-gradient(320px circle at ${x}px ${y}px, rgba(30,70,212,0.08) 0%, transparent 65%)`;
      glowRef.current.style.opacity = '1';
    }
  }, []);

  const handleLeave = useCallback(() => {
    const card = itemRef.current;
    if (card) {
      card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
      card.style.transform = '';
      setTimeout(() => { if (card) card.style.transition = ''; }, 600);
    }
    if (glowRef.current) glowRef.current.style.opacity = '0';
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    onMouseLeave();
  }, [onMouseLeave]);

  return (
    <div
      ref={itemRef}
      className={
        "faq-item" +
        (isOpen  ? " faq-item--open" : "") +
        (inView  ? " faq-item--in"   : "")
      }
      style={{ "--i": i }}
      onClick={onToggle}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={handleLeave}
    >
      {/* Layers */}
      <div className="faq-item__rail" />
      <div className="faq-item__glow" />
      <div className="faq-item__mouse-glow" ref={glowRef} />
      <span className="faq-item__watermark" aria-hidden="true">{"0"+(i+1)}</span>

      {/* Head */}
      <div className="faq-item__head">
        <div className="faq-item__meta">
          <span className="faq-item__idx">{"0"+(i+1)}</span>
        </div>
        <span className="faq-item__q">{f.q}</span>
        <div className={"faq-item__btn" + (isOpen ? " faq-item__btn--open" : "")}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="0.5" x2="6" y2="11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            <line x1="0.5" y1="6" x2="11.5" y2="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Answer — CSS max-height transition, always in DOM */}
      <div className="faq-item__body">
        <p className="faq-item__ans">{f.a}</p>
      </div>

      {/* Bottom bar */}
      <div className={"faq-item__bar" + (isOpen || isHover ? " faq-item__bar--on" : "")} />

      {/* SVG border trace */}
      <svg className="faq-item__border" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect x=".75" y=".75" width="98.5" height="98.5" rx="5" ry="5"/>
      </svg>
    </div>
  );
}

export default function FAQ() {
  const [sectionRef, inView] = useInView();
  const secElRef = useRef(null);
  const [open,  setOpen]  = useState(null);
  const [hover, setHover] = useState(null);

  /* Section-wide mouse spotlight */
  useEffect(() => {
    const el = secElRef.current;
    if (!el) return;
    const onMove = e => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  * 100).toFixed(1);
      const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      className="faq-section"
      id="faq"
      ref={el => { sectionRef.current = el; secElRef.current = el; }}
    >
      {/* Background */}
      <div className="faq-bg-grid" aria-hidden="true" />
      <div className="faq-bg-blob faq-bg-blob--a" aria-hidden="true" />
      <div className="faq-bg-blob faq-bg-blob--b" aria-hidden="true" />
      <div className="faq-bg-blob faq-bg-blob--c" aria-hidden="true" />

      <div className="faq-inner">

        {/* ── LEFT: Sticky aside ── */}
        <div className={`faq-aside${inView ? " faq-aside--in" : ""}`}>

          {/* Eyebrow */}
          <div className="faq-badge">
            <span className="faq-badge__ring" aria-hidden="true" />
            <span className="faq-badge__text">FAQ</span>
            <span className="faq-badge__count">08</span>
          </div>

          {/* Heading */}
          <span className="faq-eyebrow-pre">Common Questions</span>
          <h2 className="faq-title">
            Questions<br />
            <span className="faq-title__em">We Get</span><br />
            Asked a Lot
          </h2>

          <p className="faq-desc">
            Everything you need to know before working with us.
            Can't find your answer? Chat with us directly.
          </p>

          {/* Stats strip */}
          <div className="faq-stat-row">
            {[
              { n: "3 Days", l: "Delivery" },
              { n: "200+",   l: "Projects" },
              { n: "98%",    l: "Satisfied" },
            ].map(m => (
              <div className="faq-stat" key={m.l}>
                <span className="faq-stat__num">{m.n}</span>
                <span className="faq-stat__label">{m.l}</span>
              </div>
            ))}
          </div>

          {/* Mini testimonial */}
          <div className="faq-testi">
            <div className="faq-testi__mark" aria-hidden="true">"</div>
            <p className="faq-testi__q">
              At Muchyz Digital Agency, we believe in transparency, quality, and delivering what we promise.
            </p>
            <div className="faq-testi__foot">
              <div className="faq-testi__av" aria-hidden="true">KM</div>
              <div>
                <span className="faq-testi__name">Kelvin Muchiri Wanjuki</span>
                <span className="faq-testi__role">CEO, Muchyz Digital Agency</span>
              </div>
            </div>
          </div>

          {/* Live availability */}
          <div className="faq-live">
            <span className="faq-live__dot" aria-hidden="true" />
            <span>Available for new projects now</span>
          </div>

          {/* CTA */}
          <a
            href="https://wa.me/254705427449"
            target="_blank"
            rel="noreferrer"
            className="faq-cta"
          >
            <span className="faq-cta__inner">
              <span>Ask on WhatsApp</span>
              <svg className="faq-cta__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
            <span className="faq-cta__arrow-wrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </a>

        </div>

        {/* ── RIGHT: Accordion ── */}
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <FaqItem
              key={i}
              f={f} i={i}
              isOpen={open === i}
              isHover={hover === i}
              onToggle={() => setOpen(o => o === i ? null : i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              inView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
