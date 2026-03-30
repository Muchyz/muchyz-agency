import { useState, useEffect, useRef } from "react";
import logo from "./assets/Logo.png";
import "./Navbar.css";

const LINKS = ["services", "work", "pricing", "why", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState("");
  const ctaRef = useRef(null);

  /* ── Scroll detection ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35 }
    );
    LINKS.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* ── Lock body scroll when sheet open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── Prime Tawk API — hide widget bubble, keep API ready ── */
  useEffect(() => {
    window.Tawk_API = window.Tawk_API || {};
    const prev = window.Tawk_API.onLoad;
    window.Tawk_API.onLoad = function () {
      window.tawkReady = true;
      window.Tawk_API.hideWidget();
      if (typeof prev === "function") prev();
    };
  }, []);

  /* ── Magnetic CTA effect (desktop only) ── */
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;
    const onMove = e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.20;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.20;
      btn.style.transform = `translate(${dx}px,${dy}px) translateY(-2px)`;
    };
    const onLeave = () => { btn.style.transform = ""; };
    btn.addEventListener("mousemove",  onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove",  onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  /* ── Open Tawk chat; fallback to WhatsApp if not ready ── */
  const handleTawk = (e) => {
    e.preventDefault();
    if (typeof window.Tawk_API?.maximize === "function") {
      window.Tawk_API.maximize();
    } else {
      window.open("https://wa.me/254705427449", "_blank");
    }
  };

  return (
    <>
      {/* ═══════════════════ FLOATING NAV ═══════════════════ */}
      <nav className={`nav${scrolled ? " nav--s" : ""}`} aria-label="Main navigation">
        <div className="nav__glass-bar">

          {/* ── Logo ── */}
          <a href="#top" className="nav__logo" aria-label="Muchyz Digital Agency — home">
            <img src={logo} alt="Muchyz Digital Agency" className="nav__logo-img" />
          </a>

          {/* ── Desktop links ── */}
          <ul className="nav__ul" role="list">
            {LINKS.map(s => (
              <li key={s}>
                <a href={`#${s}`} className={active === s ? "active" : ""}>{s}</a>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ── */}
          <a
            ref={ctaRef}
            href="https://wa.me/254705427449"
            className="nav__cta"
            target="_blank"
            rel="noreferrer"
          >
            <span className="nav__cta-bg"    aria-hidden="true" />
            <span className="nav__cta-shine" aria-hidden="true" />
            <span className="nav__cta-dot"   aria-hidden="true" />
            <span className="nav__cta-label">Start a Project</span>
            <svg className="nav__cta-arr" viewBox="0 0 16 16" fill="none"
                 stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/>
            </svg>
          </a>

          {/* ── Mobile right: slim chip + burger ── */}
          <div className="nav__mobile-right">

            {/* "Let's Talk" chip — opens Tawk.to, fallback to WhatsApp */}
            <a
              href="https://wa.me/254705427449"
              className="nav__cta-chip"
              target="_blank"
              rel="noreferrer"
              aria-label="Open live chat"
              onClick={handleTawk}
            >
              <span className="nav__cta-chip-bg"  aria-hidden="true" />
              <span className="nav__cta-chip-dot" aria-hidden="true" />
              <span>Let's Talk</span>
            </a>

            <button
              className={`burger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="nav-sheet"
            >
              <span className="burger__icon" aria-hidden="true">
                <span className="burger__line burger__line--t" />
                <span className="burger__line burger__line--m" />
                <span className="burger__line burger__line--b" />
              </span>
            </button>

          </div>
        </div>
      </nav>

      {/* ═══════════════════ BACKDROP ═══════════════════ */}
      <div
        className={`nav__backdrop${menuOpen ? " open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ═══════════════════ BOTTOM SHEET ═══════════════════ */}
      <div
        id="nav-sheet"
        className={`nav__sheet${menuOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="sheet__handle" aria-hidden="true">
          <span className="sheet__handle-bar" />
        </div>

        <div className="sheet__logo-wrap" aria-hidden="true">
          <img src={logo} alt="" className="sheet__logo" />
        </div>

        <ul className="sheet__links" role="list">
          {LINKS.map((s, i) => (
            <li key={s}>
              <a href={`#${s}`} onClick={closeMenu}>
                <span>{s}</span>
                <span className="sheet__link-num" aria-hidden="true">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="sheet__cta-wrap">
          <a
            href="https://wa.me/254705427449"
            className="sheet__cta"
            target="_blank"
            rel="noreferrer"
            onClick={(e) => { closeMenu(); handleTawk(e); }}
          >
            <span className="sheet__cta-bg"    aria-hidden="true" />
            <span className="sheet__cta-shine" aria-hidden="true" />
            <span className="sheet__cta-dot"   aria-hidden="true" />
            <span>Start a Project</span>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"
                 stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/>
            </svg>
          </a>
        </div>

        <div className="sheet__footer" aria-hidden="true">
          <span className="sheet__footer-brand">Muchyz Digital Agency</span>
          <span className="sheet__footer-year">Est. 2021</span>
        </div>
      </div>
    </>
  );
}
