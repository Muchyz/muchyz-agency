import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import "./Footer.css";

const SERVICES = [
  "Website Development",
  "E-commerce Stores",
  "AI Chatbots",
  "Custom Software",
  "Business Automation",
  "Website Redesign",
];

const COMPANY = [
  { label: "Portfolio",     href: "#work" },
  { label: "Pricing",       href: "#pricing" },
  { label: "Testimonials",  href: "#testimonials" },
  { label: "Contact",       href: "#contact" },
  { label: "Request Quote", href: "#contact" },
];

const WA = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 2.107.546 4.14 1.587 5.932L.057 24l6.233-1.607A11.938 11.938 0 0012 24c6.626 0 12-5.374 12-12S18.626 0 12 0zm0 21.818a9.814 9.814 0 01-5.003-1.366l-.357-.214-3.703.954.983-3.596-.234-.37A9.761 9.761 0 012.182 12c0-5.421 4.397-9.818 9.818-9.818 5.422 0 9.818 4.397 9.818 9.818 0 5.422-4.396 9.818-9.818 9.818z"/>
  </svg>
);

const SocialBtn = ({ Icon }) => (
  <a href="#" className="f-social">
    <Icon size={14} />
  </a>
);

const ColHead = ({ children }) => (
  <div className="f-col-head">
    <h4>{children}</h4>
    <div className="f-col-bar" />
  </div>
);

export default function Footer() {
  const yr = new Date().getFullYear();

  return (
    <footer className="f-footer">
      {/* vertical line texture */}
      <div className="f-texture" />
      {/* top blue accent */}
      <div className="f-top-accent" />
      {/* corner glow */}
      <div className="f-corner-glow" />

      <div className="f-inner">
        <div className="f-grid">

          {/* ── Brand ── */}
          <div className="f-brand">
            <div className="f-brand-row">
              <div className="f-hex">M</div>
              <div>
                <div className="f-brand-name">Muchyz</div>
                <div className="f-brand-sub">Digital Agency · Web &amp; AI</div>
              </div>
            </div>

            <p className="f-tagline">
              Building world-class digital experiences for ambitious businesses across Africa and beyond.
            </p>

            {/* Stats strip */}
            <div className="f-stats">
              {[["3 Days","Delivery"], ["200+","Clients"], ["2h","Response"]].map(([num, label]) => (
                <div className="f-stat" key={label}>
                  <div className="f-stat-num">{num}</div>
                  <div className="f-stat-label">{label}</div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="f-socials">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <SocialBtn key={i} Icon={Icon} />
              ))}
            </div>
          </div>

          {/* ── Services ── */}
          <div className="f-col">
            <ColHead>Services</ColHead>
            {SERVICES.map(s => (
              <a key={s} href="#services" className="f-link">
                <span className="f-dot" />
                {s}
              </a>
            ))}
          </div>

          {/* ── Company ── */}
          <div className="f-col">
            <ColHead>Company</ColHead>
            {COMPANY.map(c => (
              <a key={c.label} href={c.href} className="f-link">
                <span className="f-dot" />
                {c.label}
              </a>
            ))}
          </div>

          {/* ── Contact ── */}
          <div className="f-col">
            <ColHead>Get In Touch</ColHead>
            <div className="f-contact-list">
              <a href="tel:+254705427449" className="f-link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .94h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                +254 705 427 449
              </a>
              <a href="mailto:info@muchyz.co.ke" className="f-link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                info@muchyz.co.ke
              </a>
              <div className="f-link f-link--static">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                Nairobi, Kenya
              </div>
            </div>

            <a
              href="https://wa.me/254705427449"
              target="_blank"
              rel="noreferrer"
              className="f-btn-wa"
            >
              <WA />
              Chat on WhatsApp
            </a>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="f-bottom">
          <span className="f-copy">
            {"© " + yr + " Muchyz Digital Agency. All rights reserved."}
          </span>
          <div className="f-location">
            <div className="f-location-dot" />
            <span>Nairobi, Kenya · Digital Agency</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
