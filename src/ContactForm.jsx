import { useState, useRef, useEffect, useCallback } from "react";
import "./ContactForm.css";

/* ══════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════ */
function useInView(threshold = 0.06) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useTypewriter(phrases, speed = 75, pause = 2600) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = phrases[idx % phrases.length];
    let t;
    if (!del) {
      if (display.length < cur.length) t = setTimeout(() => setDisplay(cur.slice(0, display.length + 1)), speed);
      else t = setTimeout(() => setDel(true), pause);
    } else {
      if (display.length > 0) t = setTimeout(() => setDisplay(display.slice(0, -1)), speed / 2.2);
      else { setDel(false); setIdx(i => i + 1); }
    }
    return () => clearTimeout(t);
  }, [display, del, idx, phrases, speed, pause]);
  return display;
}

function useMagneticCursor() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) * 0.28, dy = (e.clientY - cy) * 0.28;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onLeave = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);
  return ref;
}

/* ══════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════ */
const Ico = {
  Wa: ({ s = 18 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.57A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zm-8.52 18.4a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.69.93.98-3.58-.24-.37A9.9 9.9 0 0 1 2.1 12c0-5.46 4.44-9.9 9.9-9.9a9.84 9.84 0 0 1 7 2.9A9.84 9.84 0 0 1 21.9 12c0 5.46-4.44 9.88-9.9 9.88zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.57-.48-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.06 2.85 1.2 3.05c.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.11.56-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"/>
    </svg>
  ),
  Phone: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16z"/>
    </svg>
  ),
  Mail: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Pin: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  ),
  Clock: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Arrow: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Check: ({ s = 16 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Star: ({ s = 11 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
};

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const INFO = [
  { Icon: Ico.Phone, label: "Phone & WhatsApp", val: "+254 705 427 449",       href: "tel:+254705427449",                        highlight: true  },
  { Icon: Ico.Mail,  label: "Email",            val: "Muchyzdigital@gmail.com", href: "mailto:Muchyzdigital@gmail.com",           highlight: false },
  { Icon: Ico.Pin,   label: "Location",         val: "Nairobi, Kenya",          href: "https://maps.google.com/?q=Nairobi,Kenya", highlight: true  },
  { Icon: Ico.Clock, label: "Response Time",    val: "Within 2 hours",          href: null,                                       highlight: false },
];

const SERVICES = ["Business Website","E-Commerce Store","Landing Page","Website Redesign","Custom Web App","Other"];
const PHRASES   = ["Something Incredible","Your Dream Website","An Online Store","A Stunning Brand","Your Digital Future"];

const TESTIMONIALS = [
  { init: "AZ", quote: "Muchyz delivered our site ahead of schedule — clean, fast, and exactly what we envisioned.", name: "Amina Z.", role: "CEO, StartupKE" },
  { init: "BM", quote: "Professional, responsive, genuinely talented. Our conversions doubled after the redesign.", name: "Brian M.", role: "Founder, BrandKE" },
  { init: "CN", quote: "Best investment we made. The site looks incredible and loads in under a second.", name: "Clara N.", role: "Director, NairobiShops" },
];

/* ══════════════════════════════════════════════
   FIELD — floating label
══════════════════════════════════════════════ */
function Field({ id, label, value, onChange, type = "text", full, children, textarea, select, maxLength }) {
  const [focused, setFocused] = useState(false);
  const filled = value && value.length > 0;
  const cls = [
    "cfield",
    full ? "cfield--full" : "",
    select ? "cfield--select" : "",
    textarea ? "cfield--ta" : "",
    focused ? "cfield--focused" : "",
    filled ? "cfield--filled" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={cls}>
      {textarea ? (
        <textarea id={id} placeholder=" " rows={4} value={value} onChange={onChange}
          maxLength={maxLength || 500}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      ) : select ? (
        <select id={id} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
          {children}
        </select>
      ) : (
        <input id={id} type={type} placeholder=" " value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      )}
      <label htmlFor={id}>{label}</label>
      <div className="cfield__bar" />
      {select && (
        <div className={`cfield__chevron ${focused ? "cfield__chevron--open" : ""}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </div>
      )}
      {textarea && <div className="cfield__count">{value.length}/{maxLength || 500}</div>}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function Contact() {
  const [sectionRef, visible] = useInView();
  const waRef     = useMagneticCursor();
  const submitRef = useMagneticCursor();

  const [form, setForm]         = useState({ name: "", email: "", service: "", msg: "" });
  const [sent, setSent]         = useState(false);
  const [submitting, setSubmit] = useState(false);
  const [tIdx, setTIdx]         = useState(0);

  const typed = useTypewriter(PHRASES);
  const set   = useCallback((k) => (e) => setForm(f => ({ ...f, [k]: e.target.value })), []);

  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 4800);
    return () => clearInterval(t);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    try {
      const res = await fetch("https://formspree.io/f/mdapdbdr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, service: form.service, message: form.msg }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      setForm({ name: "", email: "", service: "", msg: "" });
      setTimeout(() => setSent(false), 9000);
    } catch {
      alert("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setSubmit(false);
    }
  };

  const reveal = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(36px)",
    transition: `opacity .9s ${delay}s cubic-bezier(.16,1,.3,1), transform .9s ${delay}s cubic-bezier(.16,1,.3,1)`,
  });

  const testi = TESTIMONIALS[tIdx];

  return (
    <section id="contact" className="cs">

      {/* Background — matches Services exactly */}
      <div className="cs__noise" aria-hidden="true" />
      <div className="cs__stripe" aria-hidden="true" />
      <div className="cs__orb cs__orb--a" aria-hidden="true" />
      <div className="cs__orb cs__orb--b" aria-hidden="true" />
      <div className="cs__orb cs__orb--c" aria-hidden="true" />

      <div className="cs__inner" ref={sectionRef}>

        {/* ════ HEADER — two-column Services style ════ */}
        <header className="cs__hdr" style={reveal(0)}>

          {/* Left — eyebrow + giant heading */}
          <div>
            <div className="cs__eyebrow">
              <span className="cs__eyebrow-pulse" aria-hidden="true" />
              <span className="cs__eyebrow-text">Get In Touch</span>
              <span className="cs__eyebrow-count">04</span>
            </div>

            <h2 className="cs__h2">
              <span className="cs__h2-plain">Let's Build</span>
              <span className="cs__typed-wrap">
                <em className="cs__typed">{typed}</em>
                <span className="cs__caret" aria-hidden="true" />
              </span>
            </h2>
          </div>

          {/* Right — body copy */}
          <div className="cs__hdr-right">
            <p className="cs__sub">
              Kenya's premier digital agency delivering world-class web experiences —
              built to convert, designed to impress, engineered to last.
            </p>
          </div>

        </header>

        {/* ════ GRID ════ */}
        <div className="cs__grid">

          {/* ── LEFT ── */}
          <div className="cs__left" style={reveal(0.18)}>

            <ul className="cs__info">
              {INFO.map((item) => {
                const rowClass = [
                  "cs__info-row",
                  item.href ? "cs__info-row--link" : "",
                  item.highlight ? "cs__info-row--highlight" : "",
                ].filter(Boolean).join(" ");
                const inner = (
                  <>
                    <span className="cs__info-ico"><item.Icon /></span>
                    <span className="cs__info-body">
                      <span className="cs__info-lbl">{item.label}</span>
                      <span className="cs__info-val">{item.val}</span>
                    </span>
                    {item.href && <span className="cs__info-arr"><Ico.Arrow /></span>}
                  </>
                );
                return item.href ? (
                  <li key={item.label}><a href={item.href} className={rowClass}>{inner}</a></li>
                ) : (
                  <li key={item.label}><div className={rowClass}>{inner}</div></li>
                );
              })}
            </ul>

            <div className="cs__stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="cs__star" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                  <Ico.Star s={14} />
                </span>
              ))}
              <span className="cs__stars-txt">5.0 — Rated by 50+ clients</span>
            </div>

            <div className="cs__divider">
              <span /><span className="cs__divider-txt">or reach us directly</span><span />
            </div>

            <a ref={waRef}
              href="https://wa.me/254705427449?text=Hi%2C+I%27d+like+a+quote+for+a+website."
              target="_blank" rel="noreferrer" className="cs__wa">
              <span className="cs__wa-ripple" />
              <span className="cs__wa-ripple cs__wa-ripple--2" />
              <span className="cs__wa-ico"><Ico.Wa s={22} /></span>
              <span className="cs__wa-body">
                <span className="cs__wa-title">Instant WhatsApp Quote</span>
                <span className="cs__wa-sub">Reply in under 15 minutes</span>
              </span>
              <span className="cs__wa-arrow"><Ico.Arrow /></span>
            </a>

            <div className="cs__live">
              <span className="cs__live-dot" />
              <span>Available for new projects · Starting from KES 15,000</span>
            </div>

          </div>

          {/* ── RIGHT ── */}
          <div className="cs__right" style={reveal(0.3)}>

            <div className="cs__testi" key={tIdx}>
              <div className="cs__testi-top">
                <div className="cs__testi-av">{testi.init}</div>
                <div className="cs__testi-meta">
                  <div className="cs__testi-stars">
                    {[...Array(5)].map((_, i) => <Ico.Star key={i} s={11} />)}
                  </div>
                  <div className="cs__testi-who"><strong>{testi.name}</strong> · {testi.role}</div>
                </div>
                <div className="cs__testi-mark">"</div>
              </div>
              <p className="cs__testi-q">"{testi.quote}"</p>
              <div className="cs__testi-dots">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} className={`cs__tdot${i === tIdx ? " cs__tdot--on" : ""}`}
                    onClick={() => setTIdx(i)} aria-label={`Review ${i + 1}`} />
                ))}
              </div>
            </div>

            {sent ? (
              <div className="cs__success">
                <div className="cs__success-circle">
                  <div className="cs__success-check"><Ico.Check s={28} /></div>
                </div>
                <h3 className="cs__success-h">Message Received!</h3>
                <p className="cs__success-p">We'll be in touch within 2 hours.<br />You can also continue on WhatsApp.</p>
                <a href="https://wa.me/254705427449" target="_blank" rel="noreferrer" className="cs__success-wa">
                  <Ico.Wa s={15} /> Continue on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={submit} className="cs__form" noValidate>
                <Field id="cf-name"  label="Your Name *"          value={form.name}    onChange={set("name")} />
                <Field id="cf-email" label="Email Address *"       value={form.email}   onChange={set("email")} type="email" />
                <Field id="cf-svc"   label="Select a Service"      value={form.service} onChange={set("service")} full select>
                  <option value="" disabled hidden />
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </Field>
                <Field id="cf-msg"   label="Tell us about your project…" value={form.msg} onChange={set("msg")} full textarea maxLength={500} />
                <button ref={submitRef} type="submit" className="cs__submit" disabled={submitting}>
                  <span className="cs__submit-bg" />
                  <span className="cs__submit-content">
                    {submitting
                      ? <><span className="cs__spin" />Sending…</>
                      : <>Send Message <Ico.Arrow /></>
                    }
                  </span>
                </button>
                <div className="cs__form-trust">
                  {["Free consultation", "No obligation", "2-hour response"].map(t => (
                    <span key={t} className="cs__trust-chip"><Ico.Check s={11} />{t}</span>
                  ))}
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
