import { useState, useRef, useEffect } from "react";
import "./FAQ.css";

const FAQS = [
  { q: "How long does it take to build a website?",     a: "Most of our websites are built and delivered within just 3 business days. E-commerce stores and custom software take 1-2 weeks depending on complexity." },
  { q: "Do you offer website hosting?",                 a: "Yes! We can set up and manage hosting for you. We recommend fast, reliable platforms like Vercel, Netlify or cPanel hosting depending on your needs." },
  { q: "What do I need to get started?",                a: "Just your business name, logo (if you have one), and a brief description of what you do. We guide you through everything else in our discovery call." },
  { q: "Can you redesign my existing website?",         a: "Absolutely. Website redesign is one of our most popular services. We audit your current site and rebuild it to be faster, modern and higher converting." },
  { q: "Do you build mobile-friendly websites?",        a: "Every single project we deliver is fully responsive and mobile-first. Over 70% of web traffic is mobile — we never compromise on this." },
  { q: "What happens after my website goes live?",      a: "All plans include 30 days of free post-launch support. We fix any bugs, make minor tweaks and ensure everything runs perfectly after delivery." },
  { q: "How do I pay?",                                 a: "We accept M-Pesa, bank transfer and international payments. A 50% deposit is required to start, with the balance due on delivery." },
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

export default function FAQ() {
  const [sectionRef, inView] = useInView();
  const [open, setOpen]   = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <section className="faq-section" id="faq" ref={sectionRef}>

      <div className="faq-bg-grid" />
      <div className="faq-bg-blob faq-bg-blob--a" />
      <div className="faq-bg-blob faq-bg-blob--b" />
      <div className="faq-bg-blob faq-bg-blob--c" />

      <div className="faq-inner">

        {/* LEFT: Sticky heading */}
        <div className={inView ? "faq-aside faq-aside--in" : "faq-aside"}>
          <div className="faq-badge">
            <span className="faq-badge__ring" />
            <span className="faq-badge__text">FAQ</span>
          </div>

          <h2 className="faq-title">
            Questions<br />
            <span className="faq-title__em">We Get</span><br />
            Asked a Lot
          </h2>

          <p className="faq-desc">
            Everything you need to know before getting started with us.
          </p>

          <div className="faq-stat-row">
            <div className="faq-stat">
              <span className="faq-stat__num">3 Days</span>
              <span className="faq-stat__label">Avg. delivery time</span>
            </div>
            <div className="faq-stat-divider" />
            <div className="faq-stat">
              <span className="faq-stat__num">200+</span>
              <span className="faq-stat__label">Projects delivered</span>
            </div>
          </div>

          <a
            href="https://wa.me/254705427449"
            target="_blank"
            rel="noreferrer"
            className="faq-cta"
          >
            <span className="faq-cta__inner">
              <span>Ask on WhatsApp</span>
              <svg className="faq-cta__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
            <span className="faq-cta__shine" />
          </a>
        </div>

        {/* RIGHT: Accordion */}
        <div className="faq-list">
          {FAQS.map((f, i) => {
            const isOpen  = open  === i;
            const isHover = hover === i;
            return (
              <div
                key={i}
                className={
                  "faq-item" +
                  (isOpen ? " faq-item--open" : "") +
                  (inView ? " faq-item--in"   : "")
                }
                style={{ "--i": i }}
                onClick={() => setOpen(o => o === i ? null : i)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <div className="faq-item__glow" />

                <div className="faq-item__head">
                  <div className="faq-item__meta">
                    <span className="faq-item__idx">{"0" + (i + 1)}</span>
                  </div>
                  <span className="faq-item__q">{f.q}</span>
                  <div className={"faq-item__btn" + (isOpen ? " faq-item__btn--open" : "")}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <line x1="6" y1="0.5" x2="6" y2="11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <line x1="0.5" y1="6" x2="11.5" y2="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Answer — only rendered in DOM when open, fully hidden otherwise */}
                {isOpen && (
                  <div className="faq-item__body">
                    <p className="faq-item__ans">{f.a}</p>
                  </div>
                )}

                <div className={"faq-item__bar" + ((isOpen || isHover) ? " faq-item__bar--on" : "")} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
