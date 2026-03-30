import { useEffect, useRef, useState } from "react";
import "./Hero.css";

export default function Hero() {
  const videoRef  = useRef(null);
  const cursorRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v) { v.muted = true; v.play().catch(() => {}); }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(hover:none)").matches) return;
    let raf;
    let cx = -100, cy = -100, tx = -100, ty = -100;
    const onMove = e => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cx - 10}px, ${cy - 10}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section className={`hero${ready ? " is-ready" : ""}`} id="top">

      {/* ── Custom cursor ── */}
      <div className="cursor" ref={cursorRef} aria-hidden="true">
        <div className="cursor__ring" />
        <div className="cursor__dot" />
      </div>

      {/* ══════════ BACKGROUND ══════════ */}
      <div className="hero__bg" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero__vid"
          autoPlay muted loop playsInline
          poster="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&q=80"
        >
          <source src="https://videos.pexels.com/video-files/3255384/3255384-hd_1920_1080_25fps.mp4" type="video/mp4"/>
        </video>

        {/* Multi-layer grade — left heavy for text legibility, right open */}
        <div className="hero__grade" />
        <div className="hero__grade-left" />
        <div className="hero__vignette" />

        <div className="hero__aurora">
          <span className="au au--tl" />
          <span className="au au--tr" />
          <span className="au au--br" />
          <span className="au au--mid" />
        </div>

        {/* Decorative editorial number behind headline */}
        <div className="hero__deco-num" aria-hidden="true">01</div>

        <div className="hero__rules">
          <span className="rule rule--top" />
          <span className="rule rule--bot" />
          <span className="rule rule--vert" />
        </div>

        <div className="hero__grain" />
      </div>

      {/* ══════════ CONTENT ══════════ */}
      <div className="hero__stage">

        <div className="hero__left">

          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            <span className="eyebrow__label">Muchyz Digital Agency</span>
            <span className="eyebrow__pipe" aria-hidden="true" />
            <span className="eyebrow__status">Open for work</span>
          </p>

          <h1 className="hed">
            <span className="hed__l1">
              <span className="hed__word">Most</span>
              <span className="hed__word">websites</span>
              <span className="hed__word">explain.</span>
            </span>
            <span className="hed__l2">
              <span className="hed__word hed__glow">Ours</span>
              <span className="hed__word">persuade.</span>
            </span>
          </h1>

          <p className="sub">
            We design and engineer websites, software, and AI systems
            that turn visitors into revenue — for companies that
            refuse to be invisible.
          </p>

          <div className="ctas">
            <a
              href="https://wa.me/254705427449"
              className="btn btn--primary"
              target="_blank"
              rel="noreferrer"
            >
              <span className="btn__bg"    aria-hidden="true" />
              <span className="btn__shine" aria-hidden="true" />
              <span className="btn__label">Start a project</span>
              <svg className="btn__arr" viewBox="0 0 18 18" fill="none"
                   stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M3.5 9h11M10 4.5l4.5 4.5L10 13.5"/>
              </svg>
            </a>
            <a href="#work" className="btn btn--ghost">
              <span>See our work</span>
              <svg viewBox="0 0 18 18" fill="none" stroke="currentColor"
                   strokeWidth="1.6" aria-hidden="true">
                <path d="M3.5 9h11M10 4.5l4.5 4.5L10 13.5"/>
              </svg>
            </a>
          </div>

          <div className="proof">
            <div className="proof__rating">
              <span className="proof__stars" aria-label="5 stars">★★★★★</span>
              <span className="proof__score">5.0</span>
              <span className="proof__sep" aria-hidden="true" />
              <span className="proof__detail">50+ projects · Est. 2021</span>
              <span className="proof__sep" aria-hidden="true" />
              <span className="proof__location">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                Kenya · Worldwide
              </span>
            </div>
          </div>

        </div>

        {/* ── Right column — desktop only ── */}
        <aside className="hero__right" aria-label="Agency statistics">
          <div className="vstat__track">
            {/* Accent line at top of card */}
            <div className="vstat__accent" aria-hidden="true" />
            <div className="vstat" style={{"--vi": 0}}>
              <strong className="bar__val">50<span className="bar__sfx">+</span></strong>
              <span className="bar__lbl">Projects delivered</span>
            </div>
            <span className="vstat__rule" aria-hidden="true" />
            <div className="vstat" style={{"--vi": 1}}>
              <strong className="bar__val">100<span className="bar__sfx">%</span></strong>
              <span className="bar__lbl">Client satisfaction</span>
            </div>
            <span className="vstat__rule" aria-hidden="true" />
            <div className="vstat" style={{"--vi": 2}}>
              <strong className="bar__val">48<span className="bar__sfx">h</span></strong>
              <span className="bar__lbl">Avg. turnaround</span>
            </div>
            <span className="vstat__rule" aria-hidden="true" />
            <div className="vstat" style={{"--vi": 3}}>
              <strong className="bar__val">3<span className="bar__sfx">×</span></strong>
              <span className="bar__lbl">Avg. ROI lift</span>
            </div>
          </div>
        </aside>

      </div>

      {/* Scroll cue — above marquee */}
      <div className="scroll-cue" aria-hidden="true">
        <div className="scroll-cue__rail">
          <span className="scroll-cue__pip" />
        </div>
        <span className="scroll-cue__label">scroll</span>
      </div>

      {/* ══════════ MARQUEE ══════════ */}
      <div className="mq" aria-hidden="true">
        {/* Shimmer sweep across marquee */}
        <div className="mq__shimmer" />
        <div className="mq__track">
          {[
            "Web Design","Mobile Apps","AI Systems","Custom Software",
            "E-commerce","APIs","UI / UX","Automation","Websites","SaaS Products",
            "Web Design","Mobile Apps","AI Systems","Custom Software",
            "E-commerce","APIs","UI / UX","Automation","Websites","SaaS Products",
            "Web Design","Mobile Apps","AI Systems","Custom Software",
            "E-commerce","APIs","UI / UX","Automation","Websites","SaaS Products",
          ].map((item, i) => (
            <span className="mq__item" key={i}>
              {item}<span className="mq__dot">◆</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
