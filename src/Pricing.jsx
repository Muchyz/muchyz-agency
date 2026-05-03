import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════
   SVG ICON LIBRARY — no emojis
═══════════════════════════════════════ */
const FlagUS = () => (
  <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="13" rx="2" fill="#B22234"/>
    <rect y="1" width="18" height="1" fill="white"/>
    <rect y="3" width="18" height="1" fill="white"/>
    <rect y="5" width="18" height="1" fill="white"/>
    <rect y="7" width="18" height="1" fill="white"/>
    <rect y="9" width="18" height="1" fill="white"/>
    <rect y="11" width="18" height="1" fill="white"/>
    <rect width="7" height="7" rx="1" fill="#3C3B6E"/>
    <g fill="white" fontSize="2">
      <circle cx="1.2" cy="1.2" r="0.5"/><circle cx="2.4" cy="1.2" r="0.5"/><circle cx="3.6" cy="1.2" r="0.5"/>
      <circle cx="4.8" cy="1.2" r="0.5"/><circle cx="6" cy="1.2" r="0.5"/>
      <circle cx="1.8" cy="2.2" r="0.5"/><circle cx="3" cy="2.2" r="0.5"/><circle cx="4.2" cy="2.2" r="0.5"/><circle cx="5.4" cy="2.2" r="0.5"/>
      <circle cx="1.2" cy="3.2" r="0.5"/><circle cx="2.4" cy="3.2" r="0.5"/><circle cx="3.6" cy="3.2" r="0.5"/>
      <circle cx="4.8" cy="3.2" r="0.5"/><circle cx="6" cy="3.2" r="0.5"/>
      <circle cx="1.8" cy="4.2" r="0.5"/><circle cx="3" cy="4.2" r="0.5"/><circle cx="4.2" cy="4.2" r="0.5"/><circle cx="5.4" cy="4.2" r="0.5"/>
      <circle cx="1.2" cy="5.2" r="0.5"/><circle cx="2.4" cy="5.2" r="0.5"/><circle cx="3.6" cy="5.2" r="0.5"/>
      <circle cx="4.8" cy="5.2" r="0.5"/><circle cx="6" cy="5.2" r="0.5"/>
    </g>
  </svg>
);

const FlagKE = () => (
  <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="13" rx="2" fill="#006600"/>
    <rect y="4" width="18" height="5" fill="#CC0000"/>
    <rect y="4.5" width="18" height="4" fill="#CC0000"/>
    <rect y="5.5" width="18" height="2" fill="black"/>
    <rect y="4" width="18" height="1" fill="white"/>
    <rect y="8" width="18" height="1" fill="white"/>
    <rect width="18" height="4" rx="1" fill="#006600"/>
    <rect y="9" width="18" height="4" rx="1" fill="#006600"/>
    <path d="M9 2.5 L9 10.5 M7.5 4 Q9 6.5 10.5 4 M7.5 9 Q9 6.5 10.5 9" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <ellipse cx="9" cy="6.5" rx="1.2" ry="1.8" fill="#CC0000" stroke="white" strokeWidth="0.6"/>
  </svg>
);

const Icons = {
  Globe: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Cloud: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Code: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  BarChart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  Bot: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 15h.01M16 15h.01"/><path d="M6 11V9a6 6 0 0 1 12 0v2"/>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Zap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Check: ({ size = 10 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  Info: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  Server: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  Cpu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  ),
  Activity: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Package: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  Infinity: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4z"/><path d="M12 12c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z"/>
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Repeat: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  ),
  Layers: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  Sparkle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"/>
      <path d="M5 3l.75 2.75L8.5 7l-2.75.75L5 10.5l-.75-2.75L1.5 7l2.75-.75L5 3z" opacity=".4"/>
      <path d="M19 14l.75 2.75L22.5 18l-2.75.75L19 21.5l-.75-2.75L15.5 18l2.75-.75L19 14z" opacity=".4"/>
    </svg>
  ),
  CreditCard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  RefreshCw: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  ),
  MessageCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  TrendingUp: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
};

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const PLANS = [
  {
    id: "starter", num: "01", name: "Starter", price: 120,
    caption: "Launch your presence",
    tagline: "For creators & small businesses taking their first step online with confidence.",
    hot: false,
    accent: "#22d3ee",
    accentRgb: "34,211,238",
    accentDim: "rgba(34,211,238,0.12)",
    turnaround: "3", support: "7 days", pages: "5", revisions: "1",
    cta: "Get Started",
    includes: [
      { Icon: Icons.Globe,    label: "Domain",      value: "Free .com / .co.ke setup",  detail: "We register & connect your domain — 1 year free" },
      { Icon: Icons.Cloud,    label: "Hosting",     value: "Shared cloud hosting",       detail: "99.9% uptime on Hostinger / Namecheap" },
      { Icon: Icons.Lock,     label: "SSL / HTTPS", value: "Free SSL certificate",       detail: "Auto-issued via Let's Encrypt, always renews" },
      { Icon: Icons.Mail,     label: "Email",       value: "1 professional email",       detail: "e.g. hello@yourbrand.com via Zoho Mail" },
      { Icon: Icons.Code,     label: "Tech stack",  value: "HTML · CSS · JS",            detail: "Clean hand-coded or WordPress CMS" },
      { Icon: Icons.Phone,    label: "Mobile",      value: "Fully responsive",           detail: "Pixel-perfect on phones, tablets & desktops" },
    ],
    features: [
      { text: "5 Custom Pages",       detail: "Home · About · Services · Portfolio · Contact" },
      { text: "Contact Form",         detail: "Spam-protected, email notifications included" },
      { text: "Basic SEO Setup",      detail: "Meta tags, Open Graph & XML sitemap" },
      { text: "Google Maps Embed",    detail: "Location map on your contact page" },
      { text: "Social Media Links",   detail: "All platforms styled & linked" },
      { text: "Speed Optimised",      detail: "Images compressed, lazy-loaded, CDN-ready" },
    ],
    stack: ["HTML5","CSS3","JS","WP"],
    stackAccents: ["#e34c26","#264de4","#f7df1e","#21759b"],
  },
  {
    id: "business", num: "02", name: "Business", price: 250,
    caption: "Built to convert",
    tagline: "A conversion-focused powerhouse for growing businesses ready to dominate online.",
    hot: true,
    accent: "#818cf8",
    accentRgb: "129,140,248",
    accentDim: "rgba(129,140,248,0.15)",
    turnaround: "5", support: "30 days", pages: "10", revisions: "3",
    cta: "Start Building",
    includes: [
      { Icon: Icons.Globe,    label: "Domain",      value: "Free .com domain — 1 yr",   detail: "Premium domain reg. with full DNS control" },
      { Icon: Icons.Server,   label: "Hosting",     value: "Premium shared / VPS",      detail: "2× faster — guaranteed 99.95% uptime" },
      { Icon: Icons.Lock,     label: "SSL",         value: "Wildcard SSL certificate",  detail: "Covers all subdomains automatically" },
      { Icon: Icons.Mail,     label: "Email",       value: "5 business emails",         detail: "Full G Suite or Zoho Mail workspace" },
      { Icon: Icons.Code,     label: "Tech stack",  value: "React · Next.js",           detail: "Modern, blazing-fast SSR frontend" },
      { Icon: Icons.BarChart, label: "Analytics",   value: "GA4 + Heatmaps",            detail: "Hotjar or Microsoft Clarity installed" },
    ],
    features: [
      { text: "10 Custom Pages",         detail: "Full site incl. blog, team & case studies" },
      { text: "Full SEO Suite",          detail: "On-page, schema markup & canonical tags" },
      { text: "90+ Lighthouse Score",    detail: "Performance · Accessibility · Best Practices" },
      { text: "CTA Funnel Setup",        detail: "Lead forms, WhatsApp button & call-to-action flows" },
      { text: "Blog / CMS Section",      detail: "Easy self-publish, no developer needed" },
      { text: "3 Revision Rounds",       detail: "Unlimited scope within each session" },
    ],
    stack: ["React","Next.js","Tailwind","Vercel"],
    stackAccents: ["#61dafb","#e2e8f0","#38bdf8","#e2e8f0"],
  },
  {
    id: "premium", num: "03", name: "Premium", price: 500,
    caption: "No limits, no ceiling",
    tagline: "Enterprise-grade architecture with bespoke animations, custom features & lifetime care.",
    hot: false,
    accent: "#c084fc",
    accentRgb: "192,132,252",
    accentDim: "rgba(192,132,252,0.12)",
    turnaround: "7", support: "Lifetime", pages: "∞", revisions: "∞",
    cta: "Go Premium",
    includes: [
      { Icon: Icons.Globe,     label: "Domain",      value: "Premium domain + privacy",  detail: "WHOIS privacy guard included, always" },
      { Icon: Icons.Cpu,       label: "Hosting",     value: "Dedicated VPS + CDN",       detail: "Cloudflare CDN + dedicated server resources" },
      { Icon: Icons.Shield,    label: "SSL / Sec",   value: "EV SSL + DDoS shield",      detail: "Enterprise-grade firewall & bot protection" },
      { Icon: Icons.Mail,      label: "Email",       value: "Unlimited emails",          detail: "Full Google Workspace setup & migration" },
      { Icon: Icons.Layers,    label: "Tech stack",  value: "Next.js + Headless CMS",    detail: "Sanity or Contentful — fully managed" },
      { Icon: Icons.Bot,       label: "AI Chatbot",  value: "Included ($150 value)",     detail: "24/7 intelligent lead capture & support bot" },
    ],
    features: [
      { text: "Unlimited Pages",              detail: "Scale forever — zero extra cost, ever" },
      { text: "Advanced Animations",          detail: "GSAP / Framer Motion premium interactions" },
      { text: "E-commerce Integration",       detail: "Stripe, M-Pesa & WooCommerce payments" },
      { text: "Custom Portal / Dashboard",    detail: "Client login, booking or admin system" },
      { text: "Monthly SEO Audit",            detail: "Ranking report + active improvements" },
      { text: "Lifetime Updates",             detail: "We maintain & evolve your site indefinitely" },
    ],
    stack: ["Next.js","TypeScript","Sanity","Cloudflare"],
    stackAccents: ["#e2e8f0","#3178c6","#f03e2f","#f38020"],
  },
];

const HOSTING_TIERS = [
  { plan:"Starter",  tier:"Shared Cloud",        uptime:"99.9%",  speed:"Fast",    ssl:"Let's Encrypt SSL", Icon: Icons.Cloud,  rgb:"34,211,238"   },
  { plan:"Business", tier:"Premium Shared / VPS", uptime:"99.95%", speed:"2× Faster",  ssl:"Wildcard SSL",      Icon: Icons.Server, rgb:"129,140,248"  },
  { plan:"Premium",  tier:"Dedicated VPS + CDN",  uptime:"99.99%", speed:"Fastest", ssl:"EV + DDoS Shield",  Icon: Icons.Cpu,    rgb:"192,132,252"  },
];

const TLD_LIST = [".com",".co.ke",".net",".org",".io",".dev"];

const KES = 130;
const fmt = (amt, cur) => cur === "KES"
  ? { sym: "KSh", val: (amt * KES).toLocaleString("en-US") }
  : { sym: "$", val: String(amt) };

/* ═══════════════════════════════════════
   HOOKS
═══════════════════════════════════════ */
function useInView(thr = 0.08) {
  const ref = useRef(null);
  const [v, sv] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) sv(true); }, { threshold: thr });
    o.observe(el); return () => o.disconnect();
  }, [thr]);
  return [ref, v];
}

function useCountUp(target, on, dur = 1400) {
  const [v, sv] = useState("0");
  useEffect(() => {
    if (!on) return;
    const raw = String(target).replace(/,/g, "");
    const end = parseFloat(raw);
    if (isNaN(end)) { sv(String(target)); return; }
    let t0 = null;
    const tick = ts => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      sv(Math.round((1 - Math.pow(1 - p, 3)) * end).toLocaleString("en-US"));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [on, target, dur]);
  return v;
}

function useCurrency() {
  const [currency, set] = useState("USD");
  const [country, setC] = useState(null);
  const [loading, setL] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("https://ipwho.is/"); const d = await r.json();
        if (d.success) { set(d.country_code === "KE" ? "KES" : "USD"); setC(d.country); return; }
      } catch (_) {}
      try {
        const r = await fetch("https://freeipapi.com/api/json"); const d = await r.json();
        set(d.countryCode === "KE" ? "KES" : "USD"); setC(d.countryName);
      } catch (_) {}
    })().finally(() => setL(false));
  }, []);
  return { currency, set, country, loading };
}

/* ═══════════════════════════════════════
   CARD COMPONENT
═══════════════════════════════════════ */
function PricingCard({ plan, i, currency, inView }) {
  const cardRef = useRef(null);
  const shineRef = useRef(null);
  const rafRef = useRef(null);
  const [tab, setTab] = useState("includes");
  const [tip, setTip] = useState(null);
  const { sym, val } = fmt(plan.price, currency);
  const count = useCountUp(val, inView);

  const onMM = useCallback(e => {
    const card = cardRef.current; if (!card) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rX = ((y - r.height / 2) / (r.height / 2)) * -6;
    const rY = ((x - r.width / 2) / (r.width / 2)) * 6;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!card) return;
      card.style.transform = plan.hot
        ? `perspective(1400px) rotateX(${rX}deg) rotateY(${rY}deg) translateY(-28px) scale(1.018)`
        : `perspective(1400px) rotateX(${rX}deg) rotateY(${rY}deg) translateZ(12px)`;
      if (shineRef.current) {
        const px = (x / r.width) * 100, py = (y / r.height) * 100;
        shineRef.current.style.background = `radial-gradient(420px circle at ${px}% ${py}%, rgba(${plan.accentRgb},0.13) 0%, transparent 70%)`;
        shineRef.current.style.opacity = "1";
      }
    });
  }, [plan.hot, plan.accentRgb]);

  const onML = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.transition = "transform 0.8s cubic-bezier(0.16,1,0.3,1)";
      card.style.transform = plan.hot ? "translateY(-24px) scale(1.018)" : "";
      setTimeout(() => { if (card) card.style.transition = ""; }, 800);
    }
    if (shineRef.current) shineRef.current.style.opacity = "0";
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, [plan.hot]);

  const list = tab === "includes" ? plan.includes : plan.features;

  return (
    <div
      ref={cardRef}
      onMouseMove={onMM}
      onMouseLeave={onML}
      className={`card ${plan.hot ? "card--hot" : ""} ${inView ? "card--in" : ""}`}
      style={{
        "--a": plan.accent,
        "--ar": plan.accentRgb,
        "--ad": plan.accentDim,
        animationDelay: inView ? `${i * 0.13}s` : "0s",
      }}
    >
      {/* ── layered bg effects ── */}
      <div className="card-noise" />
      <div className="card-mesh" />
      <div ref={shineRef} className="card-shine" />
      <div className="card-rim" />
      <div className="card-wm">{plan.num}</div>

      {/* ── animated SVG border ── */}
      <svg className="card-svgborder" viewBox="0 0 1 1" preserveAspectRatio="none">
        <rect x="0.5%" y="0.5%" width="99%" height="99%" rx="1.8%" ry="1.8%"/>
      </svg>

      {/* ── HEADER ── */}
      <div className="card-head">
        <div className="card-head-left">
          <span className="card-num">{plan.num}</span>
          <h3 className="card-name">{plan.name}</h3>
          <p className="card-cap">{plan.caption}</p>
        </div>
        {plan.hot && (
          <div className="card-badge">
            <span className="card-badge-pulse" />
            <Icons.Star />
            <span>Popular</span>
          </div>
        )}
      </div>

      {/* ── TAGLINE ── */}
      <p className="card-tagline">{plan.tagline}</p>

      {/* ── PRICE ── */}
      <div className="card-price-area">
        <div className="card-price-main">
          <span className="card-sym">{sym}</span>
          <span className={`card-amount ${currency === "KES" ? "card-amount--kes" : ""} ${plan.hot ? "card-amount--hot" : ""}`}>
            {count}
          </span>
        </div>
        <div className="card-price-meta">
          <span className="card-freq">one-time fee</span>
          <span className="card-tag-nosub">
            <Icons.Check size={8} /> no subscription
          </span>
          <span className="card-deposit">
            <Icons.CreditCard /> {sym}{currency === "KES"
              ? Math.round(plan.price * 130 * 0.1).toLocaleString("en-US")
              : Math.round(plan.price * 0.1)} deposit to start
          </span>
        </div>
      </div>

      {/* ── STAT ROW ── */}
      <div className="card-stats">
        {[
          { Icon: Icons.Layers, val: plan.pages,      label: "Pages"     },
          { Icon: Icons.Clock,  val: `${plan.turnaround}d`, label: "Delivery"  },
          { Icon: Icons.Repeat, val: plan.revisions,  label: "Revisions" },
          { Icon: Icons.Shield, val: plan.support,    label: "Support"   },
        ].map((s, si) => (
          <div key={s.label} className="stat-item">
            {si > 0 && <div className="stat-divider" />}
            <div className="stat-content">
              <span className="stat-icon"><s.Icon /></span>
              <span className="stat-val">{s.val}</span>
              <span className="stat-lbl">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── TECH STACK ── */}
      <div className="card-stack">
        <span className="stack-label">
          <Icons.Cpu /> Stack
        </span>
        <div className="stack-tags">
          {plan.stack.map((s, si) => (
            <span key={s} className="stack-tag" style={{ "--tc": plan.stackAccents[si] }}>{s}</span>
          ))}
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="card-tabs">
        <button
          className={`card-tab ${tab === "includes" ? "card-tab--on" : ""}`}
          onClick={() => setTab("includes")}
        >
          <Icons.Package /> Included
        </button>
        <button
          className={`card-tab ${tab === "features" ? "card-tab--on" : ""}`}
          onClick={() => setTab("features")}
        >
          <Icons.Sparkle /> Features
        </button>
      </div>

      {/* ── LIST ── */}
      <ul className="card-list" key={tab}>
        {list.map((item, fi) => (
          <li
            key={item.text || item.label}
            className="list-item"
            style={{ animationDelay: `${fi * 0.05}s` }}
            onMouseEnter={() => setTip(fi)}
            onMouseLeave={() => setTip(null)}
          >
            {tab === "includes" ? (
              <>
                <span className="list-icon">
                  <item.Icon />
                </span>
                <span className="list-body">
                  <span className="list-label">{item.label}</span>
                  <span className="list-value">{item.value}</span>
                </span>
                <span className="list-info"><Icons.Info /></span>
              </>
            ) : (
              <>
                <span className="list-check">
                  <Icons.Check size={9} />
                </span>
                <span className="list-feat">{item.text}</span>
                <span className="list-info"><Icons.Info /></span>
              </>
            )}
            {tip === fi && (
              <div className="list-tooltip">
                <span>{item.detail}</span>
                <div className="tooltip-arrow" />
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* ── CTA ── */}
      <a
        href="https://wa.me/254705427449"
        target="_blank" rel="noreferrer"
        className={`card-cta ${plan.hot ? "card-cta--hot" : ""}`}
      >
        <span className="cta-text">{plan.cta}</span>
        <span className="cta-icon"><Icons.ArrowRight /></span>
      </a>

      {/* ── PAY NOTE ── */}
      <div className="card-pay-note">
        <Icons.Shield />
        <span>10% deposit to start — 90% only when you love it</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════ */
export default function Pricing() {
  const [gridRef, gridInView] = useInView();
  const [domRef, domInView] = useInView();
  const [hsRef, hsInView] = useInView();
  const secRef = useRef(null);
  const { currency, set: setCurrency, country, loading } = useCurrency();

  useEffect(() => {
    const el = secRef.current; if (!el) return;
    const fn = e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
    };
    el.addEventListener("mousemove", fn, { passive: true });
    return () => el.removeEventListener("mousemove", fn);
  }, []);

  return (
    <section ref={secRef} id="pricing">
      <style>{STYLES}</style>

      {/* ── BG LAYER ── */}
      <div className="bg-layer" aria-hidden="true">
        <div className="orb orb-1" /><div className="orb orb-2" />
        <div className="orb orb-3" /><div className="orb orb-4" />
        <div className="grid-overlay" />
      </div>

      {/* ═══ HEADER ═══ */}
      <header className="section-header">
        <div className="header-left">
          <div className="eyebrow">
            <div className="eyebrow-line" />
            <span>Transparent Pricing</span>
            <div className="eyebrow-badge">03</div>
          </div>
          <h2 className="section-h2">
            <span className="h2-light">What's included.</span>
            <em className="h2-em">Every detail,<br />covered.</em>
          </h2>
        </div>

        <div className="header-right">
          <p className="header-desc">
            No surprises. Domain, hosting, SSL, email — every deliverable itemised per plan.
            A small 10% deposit secures your slot, with the remaining 90% due only once
            your site is live and you love it.
          </p>

          {/* Currency toggle */}
          <div className="currency-row">
            {!loading && country && (
              <div className="location-pill">
                <span className="location-dot" />
                <span>{country}</span>
              </div>
            )}
            <div className="toggle-track">
              <button className={`toggle-opt ${currency === "USD" ? "toggle-opt--on" : ""}`} onClick={() => setCurrency("USD")}>
                <span className="flag-icon"><FlagUS /></span> USD
              </button>
              <button className={`toggle-opt ${currency === "KES" ? "toggle-opt--on" : ""}`} onClick={() => setCurrency("KES")}>
                <span className="flag-icon"><FlagKE /></span> KES
              </button>
            </div>
          </div>

          <ul className="trust-list">
            {[
              { Icon: Icons.Globe,         text: "Free domain registration" },
              { Icon: Icons.Shield,        text: "10% deposit to start, 90% on delivery" },
              { Icon: Icons.MessageCircle, text: "Free consultation included" },
              { Icon: Icons.Activity,      text: "Dedicated WhatsApp support" },
            ].map(({ Icon, text }) => (
              <li key={text}>
                <span className="trust-icon"><Icon /></span>
                {text}
              </li>
            ))}
          </ul>

          <a href="https://wa.me/254705427449" className="header-cta" target="_blank" rel="noreferrer">
            <span>Get a Free Quote</span>
            <span className="header-cta-arrow"><Icons.ArrowRight /></span>
          </a>
        </div>
      </header>

      {/* ═══ CARDS ═══ */}
      <div ref={gridRef} className="card-grid">
        {PLANS.map((plan, i) => (
          <PricingCard key={plan.id} plan={plan} i={i} currency={currency} inView={gridInView} />
        ))}
      </div>

      {/* ═══ DOMAIN BANNER ═══ */}
      <div ref={domRef} className={`domain-banner ${domInView ? "domain-banner--in" : ""}`}>
        <div className="domain-banner-glow" />
        <div className="domain-banner-icon">
          <Icons.Globe />
        </div>
        <div className="domain-banner-body">
          <strong>Free domain registration included on every plan</strong>
          <span>We register, connect & configure your domain — choose from any extension below</span>
        </div>
        <div className="tld-list">
          {TLD_LIST.map(t => (
            <span key={t} className="tld-pill">{t}</span>
          ))}
        </div>
        <a href="https://wa.me/254705427449" className="domain-cta" target="_blank" rel="noreferrer">
          Claim yours <Icons.ArrowRight />
        </a>
      </div>

      {/* ═══ HOSTING TIERS ═══ */}
      <div ref={hsRef} className={`hosting-section ${hsInView ? "hosting-section--in" : ""}`}>
        <div className="hosting-header">
          <div className="hosting-title-row">
            <span className="hosting-icon"><Icons.Server /></span>
            <div>
              <strong className="hosting-title">Hosting included on every plan</strong>
              <p className="hosting-sub">Fully managed — no server setup, no cPanel, no headaches</p>
            </div>
          </div>
        </div>
        <div className="hosting-grid">
          {HOSTING_TIERS.map((h, hi) => (
            <div
              key={h.plan}
              className={`hosting-card ${hsInView ? "hosting-card--in" : ""}`}
              style={{ "--hr": h.rgb, animationDelay: `${hi * 0.1 + 0.2}s` }}
            >
              <div className="hosting-card-rim" />
              <div className="hosting-card-top">
                <span className="hosting-card-icon"><h.Icon /></span>
                <div>
                  <strong className="hosting-plan">{h.plan}</strong>
                  <span className="hosting-tier">{h.tier}</span>
                </div>
              </div>
              <div className="hosting-pills">
                <span className="hpill hpill--speed">
                  <Icons.Zap /> {h.speed}
                </span>
                <span className="hpill hpill--ssl">
                  <Icons.Lock /> {h.ssl}
                </span>
                <span className="hpill hpill--uptime">
                  <Icons.Activity /> {h.uptime} uptime
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   STYLES
═══════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap');

/* ─── tokens ─── */
:root {
  --bg0: #03040a;
  --bg1: #070910;
  --bg2: #0b0d1a;
  --bg3: #0f1220;
  --bdr: rgba(255,255,255,0.06);
  --bhi: rgba(255,255,255,0.11);
  --bho: rgba(255,255,255,0.18);
  --ink: #f0f2ff;
  --ink2: rgba(240,242,255,0.52);
  --ink3: rgba(240,242,255,0.24);
  --ink4: rgba(240,242,255,0.12);
  --blue: #818cf8;
  --cyan: #22d3ee;
  --pur:  #c084fc;
  --grn:  #34d399;
  --ease: cubic-bezier(0.16,1,0.3,1);
  --spr:  cubic-bezier(0.34,1.56,0.64,1);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

#pricing {
  position: relative;
  background: var(--bg0);
  padding: 120px 60px 100px;
  overflow: hidden;
  isolation: isolate;
  font-family: 'DM Sans', 'Satoshi', sans-serif;
}

/* ─── BG LAYER ─── */
.bg-layer { position: absolute; inset: 0; z-index: 0; pointer-events: none; }

.orb { position: absolute; border-radius: 50%; }
.orb-1 { width: 1000px; height: 1000px; background: radial-gradient(circle, rgba(67,56,202,0.16) 0%, rgba(67,56,202,0.03) 50%, transparent 70%); filter: blur(140px); top: -420px; left: -280px; animation: orb1 30s ease-in-out infinite alternate; }
.orb-2 { width: 700px; height: 700px; background: radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%); filter: blur(130px); bottom: -200px; right: -160px; animation: orb2 36s ease-in-out infinite alternate; }
.orb-3 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 65%); filter: blur(120px); top: 40%; left: 55%; animation: orb3 24s ease-in-out infinite alternate; }
.orb-4 { width: 380px; height: 380px; background: radial-gradient(circle, rgba(192,132,252,0.07) 0%, transparent 70%); filter: blur(100px); bottom: 80px; left: 48%; transform: translateX(-50%); animation: orb1 20s ease-in-out infinite alternate-reverse; }
@keyframes orb1 { to { transform: translate(90px, 110px) scale(1.09); } }
@keyframes orb2 { to { transform: translate(-90px, -110px) scale(1.07); } }
@keyframes orb3 { to { transform: translate(-50px, 70px) scale(1.15); } }

.grid-overlay {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse 85% 50% at 50% 0%, black, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 85% 50% at 50% 0%, black, transparent 80%);
}

/* mouse spotlight */
#pricing::after {
  content: '';
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background: radial-gradient(800px circle at var(--mx,50%) var(--my,30%), rgba(99,102,241,0.06) 0%, transparent 65%);
}

/* ─── HEADER ─── */
.section-header {
  display: grid;
  grid-template-columns: 1fr 440px;
  gap: 100px;
  align-items: start;
  max-width: 1160px;
  margin: 0 auto 72px;
  position: relative; z-index: 2;
}
.header-left { display: flex; flex-direction: column; }

.eyebrow {
  display: inline-flex; align-items: center; gap: 14px;
  font-family: 'Satoshi', sans-serif;
  font-size: 10px; font-weight: 700; letter-spacing: 3.5px; text-transform: uppercase;
  color: var(--blue); margin-bottom: 32px;
}
.eyebrow-line { width: 40px; height: 1px; background: linear-gradient(90deg, transparent, var(--blue)); }
.eyebrow-badge {
  width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  background: rgba(129,140,248,0.10); border: 1px solid rgba(129,140,248,0.28);
  font-size: 9px; color: var(--blue); letter-spacing: 0;
}

.section-h2 {
  font-family: 'Playfair Display', 'Georgia', serif;
  font-weight: 400; line-height: 0.92; letter-spacing: -2px;
  color: var(--ink); margin-bottom: 0;
  font-size: clamp(58px, 7vw, 104px);
}
.h2-light {
  display: block;
  font-family: 'Satoshi', sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 500; letter-spacing: 4px; text-transform: uppercase;
  color: var(--ink3); margin-bottom: 12px;
}
.h2-em {
  display: block; font-style: italic;
  background: linear-gradient(130deg, #a5b4fc 0%, #c084fc 40%, #67e8f9 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; background-size: 200% 200%;
  animation: gradAnim 8s ease infinite alternate;
}
@keyframes gradAnim { 0%{background-position:0%0%} 100%{background-position:100%100%} }

.header-right { display: flex; flex-direction: column; gap: 28px; padding-top: 12px; }

.header-desc {
  font-size: 15.5px; color: var(--ink2); line-height: 1.85; font-weight: 400;
}

/* currency */
.currency-row { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
.location-pill {
  display: inline-flex; align-items: center; gap: 9px;
  font-family: 'Satoshi', sans-serif; font-size: 11px; font-weight: 600;
  letter-spacing: 1.2px; text-transform: uppercase; color: var(--ink2);
  background: rgba(255,255,255,0.05); border: 1px solid var(--bhi);
  padding: 8px 18px 8px 12px; border-radius: 100px; backdrop-filter: blur(16px);
}
.location-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--grn); box-shadow: 0 0 10px var(--grn);
  animation: locPing 2.5s ease-in-out infinite;
}
@keyframes locPing { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.85;transform:scale(1.25);box-shadow:0 0 0 5px rgba(52,211,153,0)} }

.toggle-track {
  display: flex; background: rgba(255,255,255,0.04); border: 1px solid var(--bhi);
  border-radius: 100px; padding: 4px; gap: 3px; backdrop-filter: blur(20px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.2);
}
.toggle-opt {
  display: flex; align-items: center; gap: 7px;
  padding: 9px 22px; border-radius: 100px; border: none;
  font-family: 'Satoshi', sans-serif; font-size: 11.5px; font-weight: 700;
  letter-spacing: 0.5px; color: var(--ink3); background: transparent;
  cursor: pointer; transition: all 0.32s var(--ease); white-space: nowrap;
}
.flag-icon { display:inline-flex; align-items:center; border-radius:2px; overflow:hidden; box-shadow:0 0 0 1px rgba(255,255,255,0.15); flex-shrink:0; }
.toggle-opt--on {
  background: rgba(129,140,248,0.18);
  color: #a5b4fc;
  border: 1px solid rgba(129,140,248,0.38);
  box-shadow: 0 4px 20px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.12);
  text-shadow: 0 0 14px rgba(165,180,252,0.5);
}
.toggle-opt:hover:not(.toggle-opt--on) { background: rgba(255,255,255,0.06); color: var(--ink2); }

/* trust list */
.trust-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.trust-list li {
  display: flex; align-items: center; gap: 12px;
  font-family: 'Satoshi', sans-serif; font-size: 13px; font-weight: 500;
  color: var(--ink2);
}
.trust-icon {
  width: 28px; height: 28px; flex-shrink: 0; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(129,140,248,0.08); border: 1px solid rgba(129,140,248,0.2);
  color: var(--blue);
}
.trust-icon svg { width: 13px; height: 13px; }

/* header cta */
.header-cta {
  display: inline-flex; align-items: center; align-self: flex-start;
  text-decoration: none; border-radius: 100px; overflow: hidden;
  font-family: 'Satoshi', sans-serif; font-size: 13.5px; font-weight: 700;
  color: var(--ink); border: 1px solid var(--bhi);
  background: rgba(255,255,255,0.04); backdrop-filter: blur(24px);
  transition: all 0.4s var(--ease);
}
.header-cta > span:first-child { padding: 14px 26px; transition: padding 0.35s var(--ease); }
.header-cta-arrow {
  display: flex; align-items: center; justify-content: center;
  background: var(--blue); color: #fff; padding: 14px 20px;
  transition: all 0.3s;
}
.header-cta-arrow svg { width: 14px; height: 14px; }
.header-cta:hover { border-color: rgba(129,140,248,0.5); background: rgba(129,140,248,0.08); transform: translateY(-3px); box-shadow: 0 16px 48px rgba(99,102,241,0.22); }
.header-cta:hover > span:first-child { padding: 14px 34px; }
.header-cta:hover .header-cta-arrow { background: #6366f1; padding: 14px 24px; }

/* ─── CARD GRID ─── */
.card-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 22px; align-items: stretch;
  max-width: 1160px; margin: 0 auto 22px;
  position: relative; z-index: 2;
}

/* ══════════════════
   PRICING CARD
══════════════════ */
.card {
  position: relative; z-index: 1;
  display: flex; flex-direction: column;
  border-radius: 28px; overflow: hidden;
  background: linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
  border: 1px solid var(--bdr);
  opacity: 0;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.07),
    inset 0 -1px 0 rgba(0,0,0,0.4),
    0 20px 60px rgba(0,0,0,0.55),
    0 4px 12px rgba(0,0,0,0.3);
  transition: transform 0.5s var(--ease), box-shadow 0.5s var(--ease), border-color 0.3s;
  cursor: default;
  transform-style: preserve-3d;
  will-change: transform;
}
.card--in { animation: cardReveal 0.9s var(--ease) both; }
@keyframes cardReveal {
  from { opacity: 0; transform: translateY(60px) scale(0.92); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}
.card:hover {
  border-color: rgba(var(--ar), 0.32);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.10),
    inset 0 -1px 0 rgba(0,0,0,0.55),
    0 0 0 1px rgba(var(--ar), 0.08),
    0 48px 96px rgba(0,0,0,0.65),
    0 0 100px -20px rgba(var(--ar), 0.55);
}

/* hot card */
.card--hot {
  background: linear-gradient(160deg, rgba(99,102,241,0.12) 0%, rgba(109,40,217,0.06) 50%, rgba(6,10,25,0.98) 100%);
  border-color: rgba(129,140,248,0.28);
  transform: translateY(-24px) scale(1.016);
  z-index: 3;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.12),
    inset 0 -1px 0 rgba(0,0,0,0.6),
    0 0 0 1px rgba(129,140,248,0.12),
    0 60px 120px rgba(0,0,0,0.75),
    0 0 130px -24px rgba(129,140,248,0.65);
}
.card--hot:hover { transform: translateY(-32px) scale(1.016); }

/* decorative layers */
.card-noise {
  position: absolute; inset: 0; pointer-events: none; z-index: 1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  background-size: 180px 180px; mix-blend-mode: overlay; opacity: 0.6;
}
.card-mesh {
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background: radial-gradient(ellipse 80% 50% at 50% -10%, var(--ad, rgba(129,140,248,0.12)) 0%, transparent 70%);
}
.card-shine {
  position: absolute; inset: 0; pointer-events: none; z-index: 2;
  opacity: 0; transition: opacity 0.3s;
}
.card-rim {
  position: absolute; top: 0; left: 15%; right: 15%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(var(--ar,129,140,248), 0.9) 40%, rgba(var(--ar,129,140,248), 0.9) 60%, transparent);
  pointer-events: none; z-index: 6;
}
.card-wm {
  position: absolute; bottom: -16px; right: 8px;
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: 180px; color: rgba(var(--ar,129,140,248), 0.035);
  line-height: 1; letter-spacing: -6px;
  pointer-events: none; user-select: none; z-index: 0;
  transition: color 0.6s, transform 0.6s var(--ease);
}
.card:hover .card-wm { color: rgba(var(--ar,129,140,248), 0.09); transform: scale(1.05) translateY(-8px); }

/* SVG animated border */
.card-svgborder { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 7; }
.card-svgborder rect {
  fill: none;
  stroke: rgba(var(--ar,129,140,248), 0.6);
  stroke-width: 0.01;
  stroke-dasharray: 4;
  stroke-dashoffset: 4;
  transition: stroke-dashoffset 1.5s var(--ease);
  vector-effect: non-scaling-stroke;
}
.card:hover .card-svgborder rect, .card--hot .card-svgborder rect { stroke-dashoffset: 0; }

/* ── card content (padded zone) ── */
.card-head, .card-tagline, .card-price-area, .card-stats,
.card-stack, .card-tabs, .card-cta, .card-pay-note {
  position: relative; z-index: 3; padding-left: 30px; padding-right: 30px;
}
.card-list { position: relative; z-index: 3; padding: 0 30px; }

/* header */
.card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; padding-top: 34px; margin-bottom: 12px; }
.card-num { display: block; font-family: 'Satoshi', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 3.5px; text-transform: uppercase; color: var(--ink3); margin-bottom: 10px; }
.card-name { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: var(--ink); letter-spacing: -0.5px; margin-bottom: 5px; }
.card-cap { font-size: 12px; color: var(--ink2); font-weight: 400; }

.card-badge {
  display: inline-flex; align-items: center; gap: 7px;
  font-family: 'Satoshi', sans-serif; font-size: 9.5px; font-weight: 700;
  letter-spacing: 1px; text-transform: uppercase; color: var(--blue);
  padding: 7px 14px; border-radius: 100px;
  background: rgba(129,140,248,0.12); border: 1px solid rgba(129,140,248,0.3);
  white-space: nowrap; flex-shrink: 0; position: relative;
  animation: badgePulse 3.5s ease-in-out infinite;
}
.card-badge svg { width: 10px; height: 10px; fill: var(--blue); }
.card-badge-pulse {
  position: absolute; inset: -2px; border-radius: 100px;
  background: transparent; border: 1px solid rgba(129,140,248,0.4);
  animation: badgeRing 2s ease-out infinite;
}
@keyframes badgeRing { 0%{opacity:.7;transform:scale(1)} 100%{opacity:0;transform:scale(1.3)} }
@keyframes badgePulse { 0%,100%{border-color:rgba(129,140,248,0.3)} 50%{border-color:rgba(129,140,248,0.6);box-shadow:0 0 20px rgba(129,140,248,0.22)} }

.card-tagline { font-size: 12px; color: var(--ink3); line-height: 1.7; margin-bottom: 20px; }

/* price */
.card-price-area { display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px; }
.card-price-main { display: flex; align-items: flex-start; gap: 3px; line-height: 1; }
.card-sym { font-family: 'Satoshi', sans-serif; font-size: 18px; font-weight: 700; color: var(--a); margin-top: 14px; }
.card-amount {
  font-family: 'Playfair Display', serif; font-size: 80px; font-weight: 700;
  color: var(--ink); letter-spacing: -5px; line-height: 1;
}
.card-amount--hot {
  background: linear-gradient(150deg, #f8faff 0%, #a5b4fc 45%, #c084fc 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.card-amount--kes { font-size: 48px !important; letter-spacing: -2px !important; }
.card-price-meta { display: flex; flex-direction: row; align-items: center; flex-wrap: wrap; gap: 8px; }
.card-freq { font-family: 'Satoshi', sans-serif; font-size: 9.5px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--ink3); width: 100%; }
.card-tag-nosub {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: 'Satoshi', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.5px;
  color: var(--grn); background: rgba(52,211,153,0.09); border: 1px solid rgba(52,211,153,0.22);
  border-radius: 100px; padding: 4px 10px; white-space: nowrap;
}
.card-tag-nosub svg { width: 8px; height: 8px; }
.card-deposit {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: 'Satoshi', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.5px;
  color: #fbbf24; background: rgba(251,191,36,0.09); border: 1px solid rgba(251,191,36,0.24);
  border-radius: 100px; padding: 4px 10px; white-space: nowrap;
}
.card-deposit svg { width: 9px; height: 9px; }

/* stats bar */
.card-stats {
  display: flex; align-items: stretch;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--bdr); border-radius: 16px;
  margin-bottom: 16px; overflow: hidden;
  backdrop-filter: blur(8px);
}
.stat-item { flex: 1; display: flex; }
.stat-divider { width: 1px; background: var(--bdr); flex-shrink: 0; }
.stat-content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 13px 6px; gap: 4px; transition: background 0.25s; }
.stat-item:hover .stat-content { background: rgba(var(--ar,129,140,248),0.06); }
.stat-icon { width: 16px; height: 16px; color: var(--a,var(--blue)); display: flex; }
.stat-icon svg { width: 14px; height: 14px; }
.stat-val { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: var(--ink); letter-spacing: -0.5px; }
.stat-lbl { font-family: 'Satoshi', sans-serif; font-size: 8px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--ink3); }

/* stack */
.card-stack { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; flex-wrap: wrap; }
.stack-label {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: 'Satoshi', sans-serif; font-size: 9px; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase; color: var(--ink3);
  flex-shrink: 0;
}
.stack-label svg { width: 11px; height: 11px; }
.stack-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.stack-tag {
  font-family: 'Satoshi', sans-serif; font-size: 10px; font-weight: 700;
  padding: 4px 12px; border-radius: 100px;
  background: color-mix(in srgb, var(--tc) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--tc) 26%, transparent);
  color: color-mix(in srgb, var(--tc) 80%, #f0f2ff);
  white-space: nowrap; letter-spacing: 0.3px;
  transition: all 0.25s var(--ease);
}
.card:hover .stack-tag {
  background: color-mix(in srgb, var(--tc) 18%, transparent);
  border-color: color-mix(in srgb, var(--tc) 44%, transparent);
}

/* tabs */
.card-tabs {
  display: flex; gap: 0;
  background: rgba(255,255,255,0.03); border: 1px solid var(--bdr);
  border-radius: 14px; padding: 4px; margin-bottom: 12px;
}
.card-tab {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 7px;
  padding: 10px 8px; border: 1px solid transparent; background: transparent;
  font-family: 'Satoshi', sans-serif; font-size: 11px; font-weight: 700;
  letter-spacing: 0.3px; color: var(--ink3);
  cursor: pointer; border-radius: 10px; transition: all 0.28s var(--ease);
}
.card-tab svg { width: 12px; height: 12px; }
.card-tab--on {
  background: rgba(var(--ar,129,140,248), 0.14);
  color: var(--a, var(--blue));
  border-color: rgba(var(--ar,129,140,248), 0.28);
  box-shadow: 0 2px 12px rgba(var(--ar,129,140,248), 0.18), inset 0 1px 0 rgba(255,255,255,0.08);
}
.card-tab:hover:not(.card-tab--on) { background: rgba(255,255,255,0.05); color: var(--ink2); }

/* list */
.card-list { list-style: none; margin: 0 0 18px; display: flex; flex-direction: column; }
.list-item {
  display: flex; align-items: center; gap: 11px;
  padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.045);
  position: relative; cursor: help;
  opacity: 0; transform: translateX(-8px);
  animation: listIn 0.4s var(--ease) both;
  transition: background 0.2s;
}
.list-item:last-child { border-bottom: none; }
@keyframes listIn { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }

/* includes mode */
.list-icon {
  width: 32px; height: 32px; flex-shrink: 0; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(var(--ar,129,140,248), 0.10);
  border: 1px solid rgba(var(--ar,129,140,248), 0.20);
  color: var(--a, var(--blue));
  transition: transform 0.3s var(--spr), box-shadow 0.3s, background 0.3s;
}
.list-icon svg { width: 14px; height: 14px; }
.list-item:hover .list-icon { transform: scale(1.12) rotate(-5deg); box-shadow: 0 0 14px rgba(var(--ar,129,140,248),0.4); background: rgba(var(--ar,129,140,248), 0.2); }
.list-body { display: flex; flex-direction: column; flex: 1; min-width: 0; }
.list-label { font-family: 'Satoshi', sans-serif; font-size: 8.5px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; color: var(--ink3); margin-bottom: 2px; }
.list-value { font-size: 13px; color: var(--ink); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* features mode */
.list-check {
  width: 22px; height: 22px; flex-shrink: 0; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(var(--ar,129,140,248), 0.10); border: 1px solid rgba(var(--ar,129,140,248), 0.24);
  color: var(--a, var(--blue));
  transition: transform 0.3s var(--spr), box-shadow 0.3s;
}
.list-item:hover .list-check { transform: scale(1.15) rotate(-5deg); box-shadow: 0 0 12px rgba(var(--ar,129,140,248),0.4); }
.list-feat { flex: 1; font-size: 13px; color: var(--ink2); font-weight: 400; transition: color 0.2s; }
.list-item:hover .list-feat { color: var(--ink); }

.list-info { flex-shrink: 0; color: var(--ink4); transition: color 0.2s, opacity 0.2s; }
.list-info svg { width: 13px; height: 13px; display: block; }
.list-item:hover .list-info { color: var(--a, var(--blue)); }

/* tooltip */
.list-tooltip {
  position: absolute; left: 0; bottom: calc(100% + 10px);
  background: #0e1225; border: 1px solid rgba(var(--ar,129,140,248), 0.4);
  border-radius: 12px; padding: 10px 16px;
  font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--ink2); line-height: 1.55;
  white-space: nowrap; z-index: 40;
  box-shadow: 0 16px 40px rgba(0,0,0,0.65), 0 0 0 1px rgba(var(--ar,129,140,248),0.12);
  animation: tipPop 0.18s var(--ease) both;
  pointer-events: none;
}
@keyframes tipPop { from{opacity:0;transform:translateY(6px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
.tooltip-arrow { position: absolute; top: 100%; left: 20px; border: 6px solid transparent; border-top-color: #0e1225; }

/* CTA */
.card-cta {
  display: flex; align-items: center; justify-content: space-between;
  padding: 17px 24px; border-radius: 16px;
  font-family: 'Satoshi', sans-serif; font-size: 13.5px; font-weight: 700;
  text-decoration: none; margin-top: auto;
  background: rgba(255,255,255,0.04); border: 1px solid var(--bhi);
  color: var(--ink2); position: relative; overflow: hidden;
  transition: all 0.4s var(--ease);
}
.card-cta::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg, rgba(255,255,255,0.0), rgba(255,255,255,0.05));
  transform: translateX(-110%); transition: transform 0.5s var(--ease);
}
.card-cta:hover::before { transform: translateX(0); }
.card-cta:hover { border-color: rgba(255,255,255,0.22); color: var(--ink); transform: translateY(-3px); box-shadow: 0 14px 40px rgba(0,0,0,0.5); }
.cta-text { position: relative; z-index: 1; }
.cta-icon { position: relative; z-index: 1; flex-shrink: 0; transition: transform 0.35s var(--ease); }
.cta-icon svg { width: 15px; height: 15px; display: block; }
.card-cta:hover .cta-icon { transform: translateX(8px); }

.card-cta--hot {
  background: linear-gradient(135deg, #3730a3 0%, #4f46e5 45%, #6366f1 100%);
  background-size: 200% 100%; border-color: rgba(99,102,241,0.5); color: #fff;
  box-shadow: 0 12px 48px rgba(67,56,202,0.45), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.2);
}
.card-cta--hot::after {
  content: ''; position: absolute; top: 0; left: -80%; width: 60%; height: 100%;
  background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.14) 50%, transparent 70%);
  transition: left 0.6s var(--ease); pointer-events: none;
}
.card-cta--hot:hover { background-position: 100% 0; border-color: rgba(99,102,241,0.7); box-shadow: 0 20px 64px rgba(67,56,202,0.58), inset 0 1px 0 rgba(255,255,255,0.25); }
.card-cta--hot:hover::after { left: 140%; }

/* pay note */
.card-pay-note {
  display: flex; align-items: center; gap: 8px;
  font-family: 'Satoshi', sans-serif; font-size: 10.5px; font-weight: 500;
  color: var(--ink3); padding-top: 12px; padding-bottom: 28px;
}
.card-pay-note svg { width: 12px; height: 12px; color: var(--grn); flex-shrink: 0; }

/* ─── DOMAIN BANNER ─── */
.domain-banner {
  display: flex; align-items: center; gap: 22px; flex-wrap: wrap;
  padding: 30px 36px;
  background: linear-gradient(135deg, rgba(34,211,238,0.07) 0%, rgba(129,140,248,0.05) 50%, rgba(192,132,252,0.05) 100%);
  border: 1px solid rgba(34,211,238,0.22); border-radius: 24px;
  position: relative; z-index: 2; overflow: hidden;
  max-width: 1160px; margin: 0 auto 20px;
  box-shadow: 0 8px 48px rgba(0,0,0,0.4), 0 0 70px -35px rgba(34,211,238,0.28);
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.6s 0.3s var(--ease), transform 0.6s 0.3s var(--ease);
}
.domain-banner--in { opacity: 1; transform: translateY(0); }
.domain-banner-glow {
  position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
  width: 600px; height: 260px;
  background: radial-gradient(ellipse, rgba(34,211,238,0.13) 0%, transparent 65%);
  pointer-events: none;
}
.domain-banner-icon {
  width: 56px; height: 56px; flex-shrink: 0; border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(34,211,238,0.12); border: 1px solid rgba(34,211,238,0.28);
  color: var(--cyan);
}
.domain-banner-icon svg { width: 24px; height: 24px; }
.domain-banner-body { display: flex; flex-direction: column; gap: 5px; flex: 1; min-width: 200px; }
.domain-banner-body strong { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--ink); }
.domain-banner-body span { font-size: 13px; color: var(--ink2); }
.tld-list { display: flex; gap: 8px; flex-wrap: wrap; }
.tld-pill {
  font-family: 'Satoshi', sans-serif; font-size: 11.5px; font-weight: 700; letter-spacing: 0.3px;
  padding: 6px 16px; border-radius: 100px;
  background: rgba(34,211,238,0.09); border: 1px solid rgba(34,211,238,0.24); color: var(--cyan);
  transition: all 0.25s var(--ease); cursor: default;
}
.tld-pill:hover { background: rgba(34,211,238,0.2); border-color: rgba(34,211,238,0.5); transform: translateY(-2px); }
.domain-cta {
  display: inline-flex; align-items: center; gap: 9px; padding: 14px 28px;
  background: linear-gradient(135deg, #0e7490, #06b6d4);
  border: 1px solid rgba(6,182,212,0.5); border-radius: 14px;
  font-family: 'Satoshi', sans-serif; font-size: 13px; font-weight: 700;
  color: #fff; text-decoration: none; white-space: nowrap; flex-shrink: 0;
  box-shadow: 0 10px 32px rgba(6,182,212,0.32), inset 0 1px 0 rgba(255,255,255,0.18);
  transition: all 0.32s var(--ease);
}
.domain-cta svg { width: 13px; height: 13px; }
.domain-cta:hover { transform: translateY(-3px); box-shadow: 0 18px 48px rgba(6,182,212,0.5); }

/* ─── HOSTING SECTION ─── */
.hosting-section {
  padding: 32px 36px;
  background: var(--bg1); border: 1px solid var(--bdr); border-radius: 24px;
  position: relative; z-index: 2; overflow: hidden;
  max-width: 1160px; margin: 0 auto;
  box-shadow: 0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.6s 0.4s var(--ease), transform 0.6s 0.4s var(--ease);
}
.hosting-section--in { opacity: 1; transform: translateY(0); }
.hosting-header { margin-bottom: 24px; }
.hosting-title-row { display: flex; align-items: center; gap: 16px; }
.hosting-icon {
  width: 48px; height: 48px; flex-shrink: 0; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(129,140,248,0.10); border: 1px solid rgba(129,140,248,0.22); color: var(--blue);
}
.hosting-icon svg { width: 20px; height: 20px; }
.hosting-title { display: block; font-family: 'Playfair Display', serif; font-size: 21px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
.hosting-sub { font-size: 13px; color: var(--ink2); }
.hosting-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }

.hosting-card {
  background: rgba(255,255,255,0.03); border: 1px solid var(--bdr); border-radius: 18px;
  padding: 22px 24px; display: flex; flex-direction: column; gap: 14px;
  position: relative; overflow: hidden;
  opacity: 0; transform: translateY(14px);
  transition: all 0.35s var(--ease);
}
.hosting-card--in { animation: hCardIn 0.5s var(--ease) both; }
@keyframes hCardIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
.hosting-card:hover {
  border-color: rgba(var(--hr,129,140,248), 0.3);
  background: rgba(var(--hr,129,140,248), 0.05);
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.45), 0 0 50px -24px rgba(var(--hr,129,140,248),0.35);
}
.hosting-card-rim { position: absolute; top: 0; left: 12%; right: 12%; height: 1px; background: linear-gradient(90deg,transparent,rgba(var(--hr,129,140,248),0.6),transparent); }

.hosting-card-top { display: flex; align-items: center; gap: 14px; }
.hosting-card-icon {
  width: 42px; height: 42px; flex-shrink: 0; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(var(--hr,129,140,248), 0.10); border: 1px solid rgba(var(--hr,129,140,248), 0.22);
  color: rgba(var(--hr,129,140,248), 1); transition: transform 0.3s var(--spr);
}
.hosting-card:hover .hosting-card-icon { transform: scale(1.1) rotate(-6deg); }
.hosting-card-icon svg { width: 18px; height: 18px; }
.hosting-plan { display: block; font-family: 'Satoshi', sans-serif; font-size: 14px; font-weight: 700; color: var(--ink); }
.hosting-tier { display: block; font-size: 12px; color: var(--ink2); margin-top: 2px; }

.hosting-pills { display: flex; gap: 7px; flex-wrap: wrap; }
.hpill {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: 'Satoshi', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.2px;
  padding: 5px 12px; border-radius: 100px;
  background: rgba(255,255,255,0.05); border: 1px solid var(--bdr); color: var(--ink3);
  transition: all 0.25s;
}
.hpill svg { width: 11px; height: 11px; flex-shrink: 0; }
.hpill--speed { background: rgba(251,191,36,0.07); border-color: rgba(251,191,36,0.2); color: #fbbf24; }
.hpill--ssl   { background: rgba(52,211,153,0.07); border-color: rgba(52,211,153,0.2); color: #34d399; }
.hpill--uptime{ background: rgba(129,140,248,0.07); border-color: rgba(129,140,248,0.22); color: #818cf8; }
.hosting-card:hover .hpill { border-color: rgba(var(--hr,129,140,248),0.3); }

/* ─── RESPONSIVE ─── */
@media(max-width:1050px){
  #pricing { padding:80px 32px 80px; }
  .section-header { grid-template-columns:1fr; gap:40px; margin-bottom:52px; }
  .section-h2 { font-size:clamp(54px,13vw,82px); }
}
@media(max-width:900px){
  .card-grid { grid-template-columns:1fr; max-width:500px; }
  .card--hot { transform:none; }
  .card--hot:hover { transform:translateY(-14px); }
  .hosting-grid { grid-template-columns:1fr; }
  .domain-banner { flex-direction:column; align-items:flex-start; }
  .domain-cta { width:100%; justify-content:center; }
}
@media(max-width:640px){
  #pricing { padding:60px 18px 60px; }
  .section-h2 { font-size:clamp(46px,14vw,70px); }
  .card-amount { font-size:68px; letter-spacing:-4px; }
  .hosting-grid { grid-template-columns:1fr 1fr; }
  .hosting-section, .domain-banner { padding:22px 20px; }
  .card-stats { flex-wrap:wrap; }
  .stat-item { min-width:45%; }
  .stat-divider { display:none; }
}
@media(max-width:430px){
  .hosting-grid { grid-template-columns:1fr; }
  .tld-list { gap:6px; }
}
`;
