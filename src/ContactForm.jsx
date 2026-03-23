import { useRef, useEffect, useState } from "react";
import "./ContactForm.css";

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

const WhatsAppIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.57A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zm-8.52 18.4a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.69.93.98-3.58-.24-.37A9.9 9.9 0 0 1 2.1 12c0-5.46 4.44-9.9 9.9-9.9a9.84 9.84 0 0 1 7 2.9A9.84 9.84 0 0 1 21.9 12c0 5.46-4.44 9.88-9.9 9.88zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.57-.48-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.06 2.85 1.2 3.05c.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.11.56-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" fill={color} />
  </svg>
);

const LocationIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={color} />
    <circle cx="12" cy="9" r="2.5" stroke={color} />
  </svg>
);

const ClockIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" stroke={color} />
    <polyline points="12 6 12 12 16 14" stroke={color} />
  </svg>
);

const DETAILS = [
  {
    Icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "+254 705 427 449",
    href: "https://wa.me/254705427449",
    color:    "#25d366",
    bg:       "rgba(37,211,102,0.10)",
    border:   "rgba(37,211,102,0.25)",
    bgHover:  "linear-gradient(135deg,#1ebe5d,#25d366)",
  },
  {
    Icon: LocationIcon,
    label: "Location",
    value: "Nairobi, Kenya",
    href: null,
    color:    "#ef4444",
    bg:       "rgba(239,68,68,0.09)",
    border:   "rgba(239,68,68,0.22)",
    bgHover:  "linear-gradient(135deg,#dc2626,#ef4444)",
  },
  {
    Icon: ClockIcon,
    label: "Response Time",
    value: "Within 2 hours",
    href: null,
    color:    "#f59e0b",
    bg:       "rgba(245,158,11,0.10)",
    border:   "rgba(245,158,11,0.25)",
    bgHover:  "linear-gradient(135deg,#d97706,#f59e0b)",
  },
];

const SERVICES = [
  "Select a service",
  "Business Website",
  "E-Commerce Store",
  "Landing Page",
  "Website Redesign",
  "Custom Web App",
  "Other",
];

export default function Contact() {
  const [wrapRef, inView] = useInView();
  const [form, setForm]   = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    // Replace with your actual form endpoint (Formspree, EmailJS, etc.)
    await new Promise(r => setTimeout(r, 1200));
    setStatus("success");
    setForm({ name: "", email: "", service: "", message: "" });
  }

  const [hoveredDetail, setHoveredDetail] = useState(null);

  return (
    <section className="contact-section" id="contact">

      <div
        className={"contact-wrap" + (inView ? " contact-wrap--in" : "")}
        ref={wrapRef}
      >

        {/* ── LEFT: Info ── */}
        <div className="contact-info">
          <div className="contact-eyebrow">
            <span className="contact-eyebrow__dot" />
            <span className="contact-eyebrow__text">Get In Touch</span>
          </div>

          <h2 className="contact-info__h2">
            Let's Build Something<br />
            <em>Incredible</em>
          </h2>

          <p className="contact-info__p">
            Fill in your details and we'll reach out within 2 hours. No spam, ever.
          </p>

          <div className="contact-details">
            {DETAILS.map((d, i) => (
              <div
                className="contact-detail"
                key={i}
                onClick={() => d.href && window.open(d.href, "_blank")}
                onMouseEnter={() => setHoveredDetail(i)}
                onMouseLeave={() => setHoveredDetail(null)}
                style={d.href ? { cursor: "pointer" } : {}}
              >
                <div
                  className="contact-detail__icon"
                  style={{ background: d.bgHover }}
                >
                  <d.Icon color="#ffffff" />
                </div>
                <div className="contact-detail__text">
                  <strong>{d.label}</strong>
                  <span>{d.value}</span>
                </div>
                {d.href && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Form ── */}
        <form className="contact-form" onSubmit={handleSubmit} noValidate>

          <div>
            <p className="cf-heading">Send Us a Message</p>
            <p className="cf-subheading">We'll get back to you faster than you think.</p>
          </div>

          <div className="cf-row">
            <div className="cf-field">
              <label htmlFor="cf-name">Your Name</label>
              <input
                id="cf-name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>
            <div className="cf-field">
              <label htmlFor="cf-email">Email Address</label>
              <input
                id="cf-email"
                name="email"
                type="email"
                placeholder="john@company.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="cf-field">
            <label htmlFor="cf-service">Service Needed</label>
            <select
              id="cf-service"
              name="service"
              value={form.service}
              onChange={handleChange}
            >
              {SERVICES.map((s, i) => (
                <option key={i} value={i === 0 ? "" : s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="cf-field">
            <label htmlFor="cf-message">Message</label>
            <textarea
              id="cf-message"
              name="message"
              rows={4}
              placeholder="Tell us about your project..."
              value={form.message}
              onChange={handleChange}
            />
          </div>

          {status === "error" && (
            <p className="cf-error">Please fill in your name, email and message.</p>
          )}
          {status === "success" && (
            <p className="cf-success">Message sent! We will be in touch shortly.</p>
          )}

          <button className="cf-submit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? (
              "Sending..."
            ) : (
              <>
                Send Message
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>

        </form>

      </div>
    </section>
  );
}
