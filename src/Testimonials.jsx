import { useInView } from "./hooks";
import "./Testimonials.css";

const TESTI = [
  {
    q: "Muchyz built us a stunning website and our sales enquiries tripled within the first month. Absolutely world-class work.",
    a: "Wanjiru Kamau",
    r: "CEO, Kamau Enterprises",
    av: "WK",
    service: "Web Design",
    metric: "3×",
    metricLabel: "More Leads",
  },
  {
    q: "The AI chatbot handles 80% of our customer queries automatically. Best investment we have made for our business.",
    a: "Daniel Otieno",
    r: "Founder, SwiftMart",
    av: "DO",
    service: "AI Chatbot",
    metric: "80%",
    metricLabel: "Automated",
  },
  {
    q: "Our old site was holding us back. Muchyz transformed it completely — we are genuinely proud to share it now.",
    a: "Fatuma Ali",
    r: "Director, Alisafi Spa",
    av: "FA",
    service: "Full Redesign",
    metric: "100%",
    metricLabel: "Brand Refresh",
  },
];

function StarIcon() {
  return (
    <svg viewBox="0 0 13 13" fill="currentColor" width="13" height="13" aria-hidden="true">
      <path d="M6.5 1l1.44 2.92 3.22.47-2.33 2.27.55 3.21L6.5 8.25 3.62 9.87l.55-3.21L1.84 4.39z" />
    </svg>
  );
}

export default function Testimonials() {
  const [ref, v] = useInView();

  return (
    <section className="ts" id="testimonials" ref={ref}>

      {/* Glass background blobs */}
      <div className="ts__blobs" aria-hidden="true">
        <div className="ts__blob ts__blob--1" />
        <div className="ts__blob ts__blob--2" />
        <div className="ts__blob ts__blob--3" />
      </div>

      <div className="ts__wrap">

        {/* ── Header ── */}
        <div className={`ts__hd${v ? " ts__hd--in" : ""}`}>
          <span className="ts__eyebrow">Client Stories</span>
          <span className="ts__eyebrow-line" aria-hidden="true" />
          <h2 className="ts__title">
            Trusted by Businesses
            <em>Across the Region</em>
          </h2>
          <p className="ts__sub">
            From startups to established enterprises — here is what our clients
            say about working with Muchyz Digital Agency.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className={`ts__grid${v ? " ts__grid--in" : ""}`}>
          {TESTI.map((t, i) => (
            <article className="tc" key={t.a} style={{ "--i": i }}>

              {/* Animated shimmer top bar */}
              <div className="tc__accent" aria-hidden="true" />

              <div className="tc__body">
                {/* Badge + Stars */}
                <div className="tc__top">
                  <span className="tc__badge">{t.service}</span>
                  <div className="tc__stars" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span key={s} className="tc__star"><StarIcon /></span>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="tc__qblock">
                  <blockquote className="tc__quote">{t.q}</blockquote>
                </div>
              </div>

              {/* Footer strip */}
              <div className="tc__foot">
                <div className="tc__metric">
                  <span className="tc__mval">{t.metric}</span>
                  <span className="tc__mlbl">{t.metricLabel}</span>
                </div>
                <div className="tc__author">
                  <div className="tc__av" aria-hidden="true">{t.av}</div>
                  <div>
                    <strong className="tc__name">{t.a}</strong>
                    <span className="tc__role">{t.r}</span>
                  </div>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
