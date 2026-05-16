import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const LINKS = [
  {
    label: "Home",
    href: "#top",
    color: "#3b82f6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H15v-6H9v6H4a1 1 0 01-1-1V9.5z" />
      </svg>
    ),
  },
  {
    label: "Work",
    href: "/work",
    color: "#8b5cf6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <path d="M2 12.5C7.333 14.5 11 15 12 15s4.667-.5 10-2.5" />
      </svg>
    ),
  },
  {
    label: "Services",
    href: "#services",
    color: "#06b6d4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
        <path d="M15.54 8.46a5 5 0 010 7.07M8.46 8.46a5 5 0 000 7.07" />
      </svg>
    ),
  },
  {
    label: "Pricing",
    href: "#pricing",
    color: "#f59e0b",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    label: "Why Us",
    href: "#why",
    color: "#10b981",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    label: "Contact",
    href: "#contact",
    color: "#ef4444",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.22 2 2 0 012.19 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
      </svg>
    ),
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/muchyzdigital?igsh=eHI4dWpicGVpM2Nj",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#f09433" />
            <stop offset="25%"  stopColor="#e6683c" />
            <stop offset="50%"  stopColor="#dc2743" />
            <stop offset="75%"  stopColor="#cc2366" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#ig)" strokeWidth="1.9" />
        <circle cx="12" cy="12" r="4.5" stroke="url(#ig)" strokeWidth="1.9" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="#cc2366" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@muchyzdigitalagency",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-6.33 6.33 6.34 6.34 0 006.33 6.34 6.34 6.34 0 006.34-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"
              fill="#69c9d0" transform="translate(1,0.5)" opacity="0.7" />
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-6.33 6.33 6.34 6.34 0 006.33 6.34 6.34 6.34 0 006.34-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"
              fill="#ee1d52" transform="translate(-1,-0.5)" opacity="0.7" />
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-6.33 6.33 6.34 6.34 0 006.33 6.34 6.34 6.34 0 006.34-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"
              fill="#010101" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/254705427449",
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#25d366" />
        <path
          d="M23.5 20.39c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01s-.52.07-.79.37c-.27.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.11 3.22 5.11 4.52.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.43-.08-.13-.28-.2-.58-.35z"
          fill="white"
        />
        <path
          d="M16.04 5.5C10.2 5.5 5.5 10.2 5.5 16.04c0 1.88.49 3.74 1.43 5.36L5.5 26.5l5.24-1.38a10.46 10.46 0 005.3 1.42c5.84 0 10.54-4.7 10.54-10.54C26.58 10.16 21.88 5.5 16.04 5.5zm0 19.08a8.55 8.55 0 01-4.36-1.19l-.31-.19-3.23.85.86-3.14-.2-.32a8.57 8.57 0 0113.9-9.84 8.57 8.57 0 01-6.66 13.83z"
          fill="white"
        />
      </svg>
    ),
  },
];

const BurnWord = ({ word }) => (
  <>
    {word.split("").map((ch, i) => (
      <span className="burn-letter" key={i}>{ch}</span>
    ))}
  </>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState("");
  const ctaRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35 }
    );
    LINKS.forEach(({ href }) => {
      if (!href.startsWith("#")) return;
      const el = document.getElementById(href.slice(1));
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;
    const onMove = (e) => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.18;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.18;
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
      <nav className={`nav${scrolled ? " nav--s" : ""}`} aria-label="Main navigation">
        <div className="nav__bar">

          <a href="#top" className="nav__wordmark" aria-label="Muchyz home">
            <BurnWord word="Muchyz" />
            <span className="nav__accent-dot">.</span>
          </a>

          <ul className="nav__ul" role="list">
            {LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className={active === href.slice(1) ? "active" : ""}>{label}</a>
              </li>
            ))}
          </ul>

          <div className="nav__right">
            <a ref={ctaRef} href="https://wa.me/254705427449"
               className="nav__cta" target="_blank" rel="noreferrer">
              <span className="nav__cta-shine" aria-hidden="true" />
              <span className="nav__cta-pulse" aria-hidden="true" />
              Start a Project
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9"
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
              </svg>
            </a>

            <div className="nav__mobile-right">
              <a href="https://wa.me/254705427449" className="nav__chip"
                 target="_blank" rel="noreferrer" onClick={handleTawk}>
                <span className="nav__chip-pulse" aria-hidden="true" />
                Let's Talk
              </a>
              <button
                className={`burger${menuOpen ? " burger--open" : ""}`}
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="nav-drawer"
              >
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`nav__backdrop${menuOpen ? " open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside
        id="nav-drawer"
        className={`drawer${menuOpen ? " drawer--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="drawer__strip" aria-hidden="true" />

        <div className="drawer__header">
          <a href="#top" className="drawer__wordmark" onClick={closeMenu}>
            <BurnWord word="Muchyz" />
            <span className="drawer__dot">.</span>
          </a>
          <button className="drawer__close" onClick={closeMenu} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="drawer__tagline">Digital Agency · Nairobi</p>
        <div className="drawer__rule" aria-hidden="true" />

        <nav className="drawer__nav" aria-label="Drawer navigation">
          <ul role="list">
            {LINKS.map(({ label, href, icon, color }, i) => (
              <li key={label} style={{ "--i": i, "--c": color }}>
                <a
                  href={href}
                  className={`drawer__link${active === href.slice(1) ? " drawer__link--active" : ""}`}
                  onClick={closeMenu}
                >
                  <span className="drawer__icon" style={{ "--c": color }} aria-hidden="true">
                    {icon}
                  </span>
                  <span className="drawer__label">{label}</span>
                  <span className="drawer__chevron" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3l5 5-5 5" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="drawer__rule drawer__rule--soft" aria-hidden="true" />

        <div className="drawer__contact">
          <a href="tel:+254705427449" className="drawer__contact-row">
            <span className="drawer__contact-icon drawer__contact-icon--blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.22 2 2 0 012.19 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </span>
            <div>
              <span className="drawer__contact-label">Call Now</span>
              <span className="drawer__contact-value">+254 705 427 449</span>
            </div>
          </a>

          <a href="https://maps.google.com/?q=Nairobi,Kenya"
             target="_blank" rel="noreferrer" className="drawer__contact-row">
            <span className="drawer__contact-icon drawer__contact-icon--green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <div>
              <span className="drawer__contact-label">Find Us</span>
              <span className="drawer__contact-value">Nairobi, Kenya</span>
            </div>
          </a>
        </div>

        <div className="drawer__rule drawer__rule--soft" aria-hidden="true" />

        <div className="drawer__socials">
          {SOCIALS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="drawer__social"
              aria-label={label}
            >
              <span className="drawer__social-icon">{icon}</span>
              <span className="drawer__social-label">{label}</span>
            </a>
          ))}
        </div>

        <div className="drawer__cta-wrap">
          <a
            href="https://wa.me/254705427449"
            className="drawer__cta"
            target="_blank"
            rel="noreferrer"
            onClick={(e) => { closeMenu(); handleTawk(e); }}
          >
            <span className="drawer__cta-shine" aria-hidden="true" />
            <span className="drawer__cta-pulse" aria-hidden="true" />
            Start a Project
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
                 strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
            </svg>
          </a>
        </div>
      </aside>
    </>
  );
}