import { useState, useRef, useEffect } from "react";
import "./WhyUs.css";

const ITEMS = [
  {
    id: "design",
    num: "01",
    tag: "Design Excellence",
    headline: "Interfaces that stop the scroll",
    desc: "Every pixel is deliberate. We craft award-level visual systems that build trust in under 3 seconds and turn visitors into paying customers — not just browsers.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=95",
    metric: "98%",
    metricLabel: "Client approval rate",
  },
  {
    id: "speed",
    num: "02",
    tag: "Rapid Delivery",
    headline: "Live in 1–3 days, guaranteed",
    desc: "While competitors are still in planning meetings, your product is live and earning. We ship complete, production-ready builds in 1 to 3 days — no exceptions.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=95",
    metric: "3d",
    metricLabel: "Max days to launch",
  },
  {
    id: "mobile",
    num: "03",
    tag: "Mobile First",
    headline: "Native feel on every screen",
    desc: "72% of your customers are on mobile right now. We architect mobile-first experiences that feel as polished as any native app — fast, fluid and frictionless.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=95",
    metric: "72%",
    metricLabel: "Traffic is mobile",
  },
  {
    id: "results",
    num: "04",
    tag: "Revenue Driven",
    headline: "Focused on your business results",
    desc: "Beautiful design is worthless without ROI. SEO, conversion strategy and performance are engineered into every build — not bolted on as an afterthought.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=95",
    metric: "3×",
    metricLabel: "Average ROI",
  },
];



function useVisible(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: 0.08 }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return v;
}

export default function WhyUs() {
  const [open, setOpen] = useState(null);
  const secRef = useRef(null);
  const vis = useVisible(secRef);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className="wy" id="why" ref={secRef}>

      {/* ══ HEADER ══ */}
      <div className={`wy-hd${vis ? " wy-hd--in" : ""}`}>

        <div className="wy-eyebrow-wrap">
          <span className="wy-eyebrow-dot" />
          <span className="wy-eyebrow">Why Muchyz</span>
        </div>

        <div className="wy-hd__row">
          <div className="wy-hd__l">
            <h2 className="wy-h2">
              Built different,<br />
              <em className="wy-h2__em">by design.</em>
            </h2>
          </div>
          <div className="wy-hd__r">
            <p className="wy-hd__p">
              Silicon Valley-level design meets relentless execution.
              We ship products that outrank, outconvert and outlast
              every competitor in your market — in days, not months.
            </p>
          </div>
        </div>



      </div>

      {/* ══ CARD GRID ══ */}
      <div className={`wy-grid${vis ? " wy-grid--in" : ""}`}>
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`wy-card${open === i ? " wy-card--open" : ""}`}
            style={{ "--i": i }}
          >
            <div className="wy-card__img-wrap">
              <img src={item.img} alt={item.tag} className="wy-card__img" loading="lazy" />
              <div className="wy-card__img-overlay" />
              <span className="wy-card__num">{item.num}</span>
              <div className="wy-card__badge">
                <strong className="wy-card__bv">{item.metric}</strong>
                <span className="wy-card__bl">{item.metricLabel}</span>
              </div>
            </div>

            <div className="wy-card__strip">
              <div className="wy-card__strip-l">
                <span className="wy-card__tag">{item.tag}</span>
                <h3 className="wy-card__title">{item.headline}</h3>
              </div>
              <button
                className="wy-card__btn"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
                aria-label={open === i ? "Collapse" : "Expand"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>

            <div className="wy-card__body">
              <p className="wy-card__desc">{item.desc}</p>
              <a href="https://wa.me/254705427449" className="wy-card__link" target="_blank" rel="noreferrer">
                Start a project
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>



    </section>
  );
}
