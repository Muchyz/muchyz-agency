import "./Pricing.css";
import { useInView } from "./hooks";
import { useState, useEffect } from "react";

const USD_PLANS = [
  {
    id: "starter", num: "01", name: "Starter", price: 120,
    caption: "Launch your presence", hot: false,
    features: ["5 Custom Pages", "Mobile Responsive", "Contact Form", "Basic SEO", "1 Revision"],
    cta: "Get Started",
  },
  {
    id: "business", num: "02", name: "Business", price: 250,
    caption: "Built to convert", hot: true,
    features: ["10 Custom Pages", "Full SEO", "Performance Tuned", "Analytics", "3 Revisions", "30-Day Support"],
    cta: "Start Building",
  },
  {
    id: "premium", num: "03", name: "Premium", price: 500,
    caption: "No limits, no ceiling", hot: false,
    features: ["Unlimited Pages", "Advanced Animations", "Full SEO Suite", "Custom Features", "Priority Support", "Lifetime Updates"],
    cta: "Go Premium",
  },
];

const KES_RATE = 130; // 1 USD ≈ 130 KES — update anytime

function formatPrice(amount, currency) {
  if (currency === "KES") {
    return {
      sym: "KSh",
      val: (amount * KES_RATE).toLocaleString("en-KE"),
    };
  }
  return { sym: "$", val: amount.toString() };
}

function useCurrency() {
  const [currency, setCurrency] = useState("USD");
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detect = async () => {
      // All 3 support HTTPS + CORS — no auth needed
      const apis = [
        async () => {
          const r = await fetch("https://ipwho.is/");
          const d = await r.json();
          if (!d.success) throw new Error("failed");
          return { code: d.country_code, name: d.country };
        },
        async () => {
          const r = await fetch("https://freeipapi.com/api/json");
          const d = await r.json();
          return { code: d.countryCode, name: d.countryName };
        },
        async () => {
          const r = await fetch("https://ipinfo.io/json");
          const d = await r.json();
          return { code: d.country, name: d.country };
        },
      ];

      for (const api of apis) {
        try {
          const { code, name } = await api();
          if (code) {
            setCurrency(code === "KE" ? "KES" : "USD");
            setCountry(name || null);
            return;
          }
        } catch (_) {
          continue;
        }
      }
    };

    detect().finally(() => setLoading(false));
  }, []);

  return { currency, setCurrency, country, loading };
}

const Tick = ({ hot }) => (
  <span className={`p-tick${hot ? " p-tick--h" : ""}`}>
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

const Arr = () => (
  <svg className="p-arr" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Pricing() {
  const [ref, v] = useInView();
  const { currency, setCurrency, country, loading } = useCurrency();

  return (
    <section className="p-sec" id="pricing" ref={ref}>

      <div className="p-bg" aria-hidden="true">
        <div className="p-blob p-blob--1" />
        <div className="p-blob p-blob--2" />
        <div className="p-blob p-blob--3" />
        <div className="p-blob p-blob--4" />
        <div className="p-blob p-blob--5" />
        <div className="p-blob p-blob--6" />
        <div className="p-noise" />
      </div>

      <header className="p-hd">
        <div className="p-kicker">
          <span className="p-kicker__dot" />
          Transparent Pricing
        </div>
        <h2 className="p-h2">
          Simple prices.<br />
          <em className="p-h2__em">Serious results.</em>
        </h2>
        <p className="p-lead">No hidden fees. No contracts. Just work that delivers.</p>

        {/* currency toggle */}
        <div className="p-toggle">
          {!loading && country && (
            <span className="p-toggle__loc">
              📍 {country}
            </span>
          )}
          <div className="p-toggle__wrap">
            <button
              className={`p-toggle__btn${currency === "USD" ? " p-toggle__btn--on" : ""}`}
              onClick={() => setCurrency("USD")}
            >
              🇺🇸 USD
            </button>
            <button
              className={`p-toggle__btn${currency === "KES" ? " p-toggle__btn--on" : ""}`}
              onClick={() => setCurrency("KES")}
            >
              🇰🇪 KES
            </button>
          </div>
        </div>
      </header>

      <div className={`p-grid${v ? " p-grid--in" : ""}`}>
        {USD_PLANS.map((plan, i) => {
          const { sym, val } = formatPrice(plan.price, currency);
          return (
            <div
              key={plan.id}
              className={`p-card${plan.hot ? " p-card--hot" : ""}`}
              style={{ "--i": i }}
            >
              <div className="p-card__rim" />
              <div className="p-card__hd">
                <div>
                  <span className="p-card__num">{plan.num}</span>
                  <h3 className="p-card__name">{plan.name}</h3>
                  <p className="p-card__cap">{plan.caption}</p>
                </div>
                {plan.hot && <span className="p-badge">✦ Popular</span>}
              </div>

              <div className="p-card__price">
                <sup className="p-card__sym">{sym}</sup>
                <strong className={`p-card__amt${currency === "KES" ? " p-card__amt--kes" : ""}`}>{val}</strong>
              </div>
              <p className="p-card__freq">one-time project fee</p>

              <div className="p-card__sep" />

              <ul className="p-card__feats">
                {plan.features.map(f => (
                  <li key={f}><Tick hot={plan.hot} />{f}</li>
                ))}
              </ul>

              <a
                href="https://wa.me/254705427449"
                className={`p-btn${plan.hot ? " p-btn--h" : ""}`}
                target="_blank"
                rel="noreferrer"
              >
                <span>{plan.cta}</span><Arr />
              </a>
            </div>
          );
        })}
      </div>

      <div className="p-addon">
        <div className="p-addon__rim" />
        <div className="p-addon__l">
          <span className="p-addon__badge">Add-on</span>
          <div>
            <strong className="p-addon__name">AI Chatbot Integration</strong>
            <span className="p-addon__sub">
              24/7 smart support — from{" "}
              <b>{currency === "KES" ? `KSh ${(150 * KES_RATE).toLocaleString()}` : "$150"}</b>
            </span>
          </div>
        </div>
        <a href="https://wa.me/254705427449" className="p-addon__cta" target="_blank" rel="noreferrer">
          Get a Quote <Arr />
        </a>
      </div>

    </section>
  );
}
