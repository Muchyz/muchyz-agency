import { useRef, useEffect, useState } from "react";
import "./CTA.css";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function CTA() {
  const [ref, inView] = useInView();
  const [waHover, setWaHover] = useState(false);

  return (
    <section className="cta" ref={ref}>

      {/* ── Background canvas ── */}
      <div className="cta__bg" />
      <div className="cta__aurora cta__aurora--1" />
      <div className="cta__aurora cta__aurora--2" />
      <div className="cta__aurora cta__aurora--3" />
      <div className="cta__dots" />
      <div className="cta__grain" />

      {/* ── Orbiting lines ── */}
      <div className="cta__orbit cta__orbit--1" />
      <div className="cta__orbit cta__orbit--2" />

      {/* ── Horizontal scan line ── */}
      <div className="cta__scan" />

      <div className="cta__inner">

        {/* Left: giant number / visual anchor */}
        <div className={inView ? "cta__left cta__left--in" : "cta__left"}>
          <div className="cta__counter-wrap">
            <span className="cta__counter">200<span className="cta__counter-plus">+</span></span>
            <span className="cta__counter-label">Websites delivered<br />across Africa</span>
          </div>
          <div className="cta__bar-group">
            <div className="cta__bar-row">
              <span className="cta__bar-tag">Delivery</span>
              <div className="cta__bar-track">
                <div className={inView ? "cta__bar-fill cta__bar-fill--in" : "cta__bar-fill"} style={{ "--w": "90%", "--d": "0.5s" }} />
              </div>
              <span className="cta__bar-val">3 Days</span>
            </div>
            <div className="cta__bar-row">
              <span className="cta__bar-tag">Response</span>
              <div className="cta__bar-track">
                <div className={inView ? "cta__bar-fill cta__bar-fill--in" : "cta__bar-fill"} style={{ "--w": "100%", "--d": "0.7s" }} />
              </div>
              <span className="cta__bar-val">2h</span>
            </div>
            <div className="cta__bar-row">
              <span className="cta__bar-tag">Satisfaction</span>
              <div className="cta__bar-track">
                <div className={inView ? "cta__bar-fill cta__bar-fill--in" : "cta__bar-fill"} style={{ "--w": "98%", "--d": "0.9s" }} />
              </div>
              <span className="cta__bar-val">98%</span>
            </div>
          </div>
        </div>

        {/* Right: content */}
        <div className="cta__right">

          <div className={inView ? "cta__tag cta__tag--in" : "cta__tag"}>
            <span className="cta__tag-dot" />
            Available Now
          </div>

          <h2 className={inView ? "cta__h2 cta__h2--in" : "cta__h2"}>
            Ready to Build<br />
            Your <em>Dream</em><br />
            Website?
          </h2>

          <p className={inView ? "cta__p cta__p--in" : "cta__p"}>
            We respond in under 2 hours. No gatekeepers, no lengthy proposals —
            just direct access to experts who build fast and build beautifully.
          </p>

          <div className={inView ? "cta__actions cta__actions--in" : "cta__actions"}>

            <a
              href="https://wa.me/254705427449"
              className={"cta__wa" + (waHover ? " cta__wa--hovered" : "")}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setWaHover(true)}
              onMouseLeave={() => setWaHover(false)}
            >
              <span className="cta__wa-ripple" />
              <span className="cta__wa-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 2.107.546 4.14 1.587 5.932L.057 24l6.233-1.607A11.938 11.938 0 0012 24c6.626 0 12-5.374 12-12S18.626 0 12 0zm0 21.818a9.814 9.814 0 01-5.003-1.366l-.357-.214-3.703.954.983-3.596-.234-.37A9.761 9.761 0 012.182 12c0-5.421 4.397-9.818 9.818-9.818 5.422 0 9.818 4.397 9.818 9.818 0 5.422-4.396 9.818-9.818 9.818z"/>
                </svg>
              </span>
              <span className="cta__wa-label">Chat on WhatsApp</span>
              <span className="cta__wa-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a href="#work" className="cta__ghost">
              <span>View Portfolio</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

          </div>

          <div className={inView ? "cta__trust cta__trust--in" : "cta__trust"}>
            {["No contracts", "No spam", "Results in 3 days"].map((t, i) => (
              <span className="cta__trust-item" key={i}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t}
              </span>
            ))}
          </div>

        </div>

      </div>

      {/* Bottom marquee strip */}
      <div className="cta__marquee-wrap">
        <div className="cta__marquee">
          {Array(3).fill(["Fast Delivery", "Beautiful Design", "Mobile First", "SEO Optimized", "3-Day Turnaround", "Trusted by 200+ Clients"]).flat().map((w, i) => (
            <span key={i} className="cta__marquee-item">
              {w} <span className="cta__marquee-dot">&#9679;</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}

export default CTA;
