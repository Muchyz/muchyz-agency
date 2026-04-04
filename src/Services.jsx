import "./Services.css";
import { useInView } from "./hooks";
import { useState, useRef, useEffect, useCallback } from "react";

const SERVICES = [
  {
    num: "01",
    title: "Website Development",
    desc: "Fast, modern websites engineered to turn every visitor into a paying customer. We obsess over speed, structure, and conversion at every pixel.",
    img: "/website-dev.jpg",
    tag: "Web",
    stat: "3×",
    statLabel: "Faster Load",
    wide: true,
    hue: "214",
    accent: "#3b82f6",
    accentRgb: "59,130,246",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "E-commerce Stores",
    desc: "Conversion-obsessed shops that make buying irresistible at every step of the journey.",
    img: "/ecommerce.jpg",
    tag: "Commerce",
    stat: "+68%",
    statLabel: "Conversions",
    hue: "199",
    accent: "#06b6d4",
    accentRgb: "6,182,212",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "AI Chatbots",
    desc: "24/7 intelligent agents that capture every lead and never miss a sale while you sleep.",
    img: "/ai-chatbots.jpg",
    tag: "AI",
    stat: "24/7",
    statLabel: "Always On",
    hue: "258",
    accent: "#8b5cf6",
    accentRgb: "139,92,246",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 1 8 8v4a8 8 0 0 1-16 0v-4a8 8 0 0 1 8-8z"/><path d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Custom Software",
    desc: "Bespoke platforms built around your exact operations — no templates, no shortcuts.",
    img: "/custom-software.jpg",
    tag: "Dev",
    stat: "100%",
    statLabel: "Custom Built",
    hue: "158",
    accent: "#10b981",
    accentRgb: "16,185,129",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    num: "05",
    title: "Business Automation",
    desc: "Eliminate repetitive work, reclaim hours and scale without adding headcount.",
    img: "/automation.jpg",
    tag: "Automation",
    stat: "−80%",
    statLabel: "Manual Work",
    hue: "32",
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
  },
  {
    num: "06",
    title: "Website Redesign",
    desc: "Gut your outdated site. Replace it with something sharp that earns trust on first look.",
    img: "/redesign.jpg",
    tag: "Design",
    stat: "2×",
    statLabel: "Engagement",
    hue: "346",
    accent: "#f43f5e",
    accentRgb: "244,63,94",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    num: "07",
    title: "Google SEO",
    desc: "Dominate search rankings and pull in ready-to-buy traffic without paying per click.",
    img: "/seo.jpg",
    tag: "SEO",
    stat: "#1",
    statLabel: "Rankings",
    hue: "142",
    accent: "#22c55e",
    accentRgb: "34,197,94",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
      </svg>
    ),
  },
  {
    num: "08",
    title: "Mobile Apps",
    desc: "Sleek iOS & Android apps your users will actually open — built for speed, retention and revenue.",
    img: "/mobile-apps.jpg",
    tag: "Mobile",
    stat: "5★",
    statLabel: "App Rating",
    hue: "271",
    accent: "#a855f7",
    accentRgb: "168,85,247",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
      </svg>
    ),
  },
  {
    num: "09",
    title: "Branding & Logo Design",
    desc: "Memorable identities that make your brand impossible to ignore — from logo to full visual system.",
    img: "/branding.jpg",
    tag: "Branding",
    stat: "∞",
    statLabel: "Brand Value",
    hue: "24",
    accent: "#f97316",
    accentRgb: "249,115,22",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
  },
  {
    num: "10",
    title: "Web Hosting & Maintenance",
    desc: "Your site stays fast, secure and online 24/7 — we handle updates, backups and everything in between.",
    img: "/hosting.jpg",
    tag: "Hosting",
    stat: "99.9%",
    statLabel: "Uptime",
    hue: "174",
    accent: "#14b8a6",
    accentRgb: "20,184,166",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
  },
  {
    num: "11",
    title: "UI/UX Design",
    desc: "Interfaces so intuitive your users never get lost — crafted with research, wireframes and pixel-perfect prototypes.",
    img: "/ui-ux.jpg",
    tag: "UI/UX",
    stat: "4×",
    statLabel: "Retention",
    hue: "328",
    accent: "#ec4899",
    accentRgb: "236,72,153",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z"/><path d="M7 7h.01"/>
      </svg>
    ),
  },
];

const LOGOS = [
  { name: "Shopify", icon: (<svg viewBox="0 0 109.5 124.5" width="20" height="20"><path fill="#95BF47" d="M95.5 23.7c-.1-.7-.7-1.1-1.2-1.1s-10.1-.7-10.1-.7-6.7-6.6-7.4-7.3c-.7-.7-2.1-.5-2.6-.3l-3.6 1.1c-.4-1.3-1.1-2.9-2-4.4-2.9-5.5-7.1-8.4-12.2-8.4h-.6c-.2-.2-.4-.5-.6-.7-2.4-2.6-5.4-3.8-9-3.7-7 .2-14 5.2-19.6 14.2-4 6.2-7 14-7.9 20.1l-13.5 4.2c-4 1.2-4.1 1.3-4.6 5.1C4.6 45 0 80.2 0 80.2l64 11.4 34.7-7.5s-3.1-59.7-3.2-60.4z"/><path fill="#5E8E3E" d="M94.3 22.6c-.5 0-10.1-.7-10.1-.7s-6.7-6.6-7.4-7.3c-.3-.3-.6-.4-.9-.4l-4.7 96.4 34.7-7.5S94.8 23.3 94.7 23c-.2-.3-.3-.4-.4-.4z"/><path fill="#FFF" d="M56.2 43.1l-4.3 12.8s-3.7-2-8.3-2c-6.7 0-7 4.2-7 5.2 0 5.7 14.9 7.9 14.9 21.3 0 10.6-6.7 17.4-15.7 17.4-10.8 0-16.3-6.7-16.3-6.7l2.9-9.6s5.7 4.9 10.5 4.9c3.1 0 4.4-2.5 4.4-4.3 0-7.5-12.2-7.8-12.2-20.1 0-10.3 7.4-20.3 22.4-20.3 5.7 0 8.7 1.4 8.7 1.4z"/></svg>) },
  { name: "WordPress", icon: (<svg viewBox="0 0 122.5 122.5" width="20" height="20"><path fill="#21759B" d="M61.25 0C27.43 0 0 27.43 0 61.25s27.43 61.25 61.25 61.25 61.25-27.43 61.25-61.25S95.07 0 61.25 0zM8.5 61.25c0-8.64 1.9-16.83 5.3-24.2l29.2 80c-20.2-9.6-34.5-30.3-34.5-55.8zm52.75 52.75c-5.84 0-11.47-.85-16.8-2.42l17.84-51.82 18.28 50.1a9.3 9.3 0 01.18.37c-6.2 2.4-12.9 3.77-19.5 3.77zm7.35-78.17c3.2-.17 6.1-.5 6.1-.5 2.86-.34 2.53-4.54-.34-4.37 0 0-8.63.68-14.2.68-5.23 0-14.03-.68-14.03-.68-2.87-.17-3.2 4.2-.34 4.37 0 0 2.73.33 5.6.5l8.32 22.8-11.7 35.1-19.45-57.9c3.2-.17 6.1-.5 6.1-.5 2.86-.34 2.53-4.54-.34-4.37 0 0-8.63.68-14.2.68-.99 0-2.16-.02-3.4-.07C24.22 17.95 41.75 8.5 61.25 8.5c14.6 0 27.9 5.6 37.9 14.76-.24-.02-.48-.05-.74-.05-5.23 0-8.94 4.54-8.94 9.43 0 4.37 2.53 8.07 5.22 12.44 2.02 3.54 4.37 8.07 4.37 14.63 0 4.54-1.74 9.8-4.04 17.15l-5.3 17.7-19.12-56.78zm34.1 11.52c4.05 7.4 6.36 15.85 6.36 24.9 0 19.18-10.38 35.97-25.9 45.1l18.17-52.5c3.4-8.5 4.54-15.3 4.54-21.35 0-2.2-.15-4.24-.42-6.1l-2.75 9.95z"/></svg>) },
  { name: "React", icon: (<svg viewBox="-11.5 -10.23 23 20.46" width="24" height="24"><circle r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>) },
  { name: "OpenAI", icon: (<svg viewBox="0 0 24 24" width="20" height="20" fill="rgba(255,255,255,0.7)"><path d="M22.28 9.78a5.88 5.88 0 00-.52-4.86 6.06 6.06 0 00-6.52-2.91A5.88 5.88 0 0011.27 0a6.06 6.06 0 00-5.78 4.2 5.88 5.88 0 00-3.93 2.86 6.06 6.06 0 00.75 7.1 5.88 5.88 0 00.52 4.87 6.06 6.06 0 006.52 2.9A5.88 5.88 0 0012.73 24a6.06 6.06 0 005.79-4.2 5.88 5.88 0 003.93-2.86 6.06 6.06 0 00-.17-7.16z"/></svg>) },
  { name: "Google", icon: (<svg viewBox="0 0 48 48" width="20" height="20"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>) },
  { name: "AWS", icon: (<svg viewBox="0 0 60 36" width="30" height="18"><path fill="#F90" d="M16.7 13.9c0 .7.1 1.3.2 1.7.2.4.4.9.7 1.4.1.2.2.4.2.5 0 .2-.1.4-.4.6l-1.2.8c-.2.1-.4.2-.5.2-.2 0-.4-.1-.6-.3-.3-.3-.5-.6-.7-1-.2-.4-.4-.8-.6-1.4-1.5 1.8-3.4 2.7-5.6 2.7-1.6 0-2.9-.5-3.8-1.4-.9-.9-1.4-2.2-1.4-3.7 0-1.6.6-3 1.7-4 1.1-1 2.6-1.5 4.5-1.5.6 0 1.2.1 1.9.2.7.1 1.4.3 2.1.5V8.5c0-1.4-.3-2.4-.9-3-.6-.6-1.6-.9-3-.9-.6 0-1.3.1-2 .3-.7.2-1.4.4-2 .7-.3.1-.5.2-.6.2H4.1c-.2 0-.3-.2-.3-.5v-.9c0-.2.1-.4.2-.5.1-.1.3-.2.6-.3.6-.3 1.4-.6 2.3-.8.9-.2 1.9-.3 2.9-.3 2.2 0 3.8.5 4.9 1.5 1 1 1.6 2.5 1.6 4.5v5.9h.4zm-7.7 2.9c.6 0 1.2-.1 1.9-.4.6-.2 1.2-.7 1.7-1.3.3-.3.5-.7.6-1.1.1-.4.2-1 .2-1.6v-.8c-.5-.1-1.1-.3-1.7-.3-.6-.1-1.2-.1-1.7-.1-1.2 0-2.1.2-2.7.7-.6.5-.9 1.2-.9 2 0 .8.2 1.4.6 1.8.4.5.9.9 2 1.1zm14.6 2c-.2 0-.4 0-.5-.1-.1-.1-.2-.3-.3-.5L19.3 5.6c-.1-.3-.1-.5-.1-.6 0-.2.1-.4.4-.4h1.9c.2 0 .4 0 .5.1.1.1.2.3.3.5l2.8 11 2.6-11c.1-.3.2-.5.3-.5.1-.1.3-.1.5-.1h1.5c.2 0 .4 0 .5.1.1.1.2.3.3.5l2.6 11.2L35.4 5.2c.1-.3.2-.5.3-.5.1-.1.3-.1.5-.1H38c.3 0 .4.1.4.4 0 .1 0 .2-.1.3l-4.6 13.6c-.1.3-.2.5-.3.5-.1.1-.3.1-.5.1H31c-.2 0-.4 0-.5-.1-.1-.1-.2-.3-.3-.5l-2.6-10.8-2.5 10.8c-.1.3-.2.5-.3.5-.1.1-.3.1-.5.1h-1.7zm23.5.5c-1.1 0-2.2-.1-3.2-.4-1-.3-1.8-.6-2.3-1-.3-.2-.4-.4-.4-.6v-.9c0-.3.1-.5.4-.5.1 0 .2 0 .4.1.1.1.3.1.4.2.6.3 1.3.5 2 .7.8.2 1.5.3 2.3.3 1.2 0 2.1-.2 2.8-.6.6-.4 1-.9 1-1.7 0-.5-.2-.9-.5-1.2-.4-.3-1-.6-2-.9l-2.9-.9c-1.4-.4-2.5-1.1-3.1-1.9-.7-.8-1-1.8-1-2.8 0-.8.2-1.5.5-2.1.4-.6.8-1.1 1.4-1.6.6-.4 1.3-.7 2-.9.8-.2 1.6-.3 2.5-.3.4 0 .9 0 1.3.1.4.1.9.2 1.3.3.4.1.8.2 1.1.4.3.1.6.3.7.4.2.1.4.3.5.5.1.2.1.4.1.6v.8c0 .3-.1.5-.4.5-.1 0-.4-.1-.7-.3-.9-.4-1.9-.6-3-.6-1.1 0-1.9.2-2.5.5-.6.3-.9.9-.9 1.6 0 .5.2.9.6 1.3.4.3 1.1.7 2.2 1l2.8.9c1.4.4 2.4 1.1 3 1.8.6.8.9 1.7.9 2.7 0 .8-.2 1.6-.5 2.2-.3.6-.8 1.2-1.4 1.6-.6.4-1.3.8-2.1 1-.9.3-1.8.4-2.8.4z"/><path fill="#F90" d="M54.3 29.5c-6.3 4.7-15.5 7.1-23.4 7.1-11.1 0-21.1-4.1-28.6-10.9-.6-.5-.1-1.2.6-.8 8.1 4.7 18.2 7.6 28.6 7.6 7 0 14.7-1.5 21.8-4.5.9-.5 1.8.6.9 1.5z"/><path fill="#F90" d="M56.9 26.5c-.8-1.1-5.4-.5-7.5-.2-.6.1-.7-.5-.2-.8 3.7-2.6 9.7-1.8 10.4-.9.7.9-.2 6.9-3.6 9.8-.5.4-1 .2-.8-.4.8-1.9 2.5-6.3 1.7-7.5z"/></svg>) },
  { name: "Stripe", icon: (<svg viewBox="0 0 60 25" width="34" height="14"><path fill="#635BFF" d="M59.6 13c0-4.4-2.1-7.8-6.2-7.8-4.1 0-6.6 3.4-6.6 7.7 0 5.1 2.9 7.7 7.1 7.7 2 0 3.6-.5 4.7-1.2v-3.3c-1.1.6-2.4 1-4 1-1.6 0-3-.6-3.2-2.6h8.1c0-.2.1-.9.1-1.5zm-8.2-1.6c0-1.9 1.2-2.7 2.3-2.7 1.1 0 2.2.8 2.2 2.7h-4.5zM37 5.2c-1.6 0-2.6.7-3.2 1.3l-.2-1h-3.6v19.8l4.1-.9V19c.6.4 1.4 1 2.8 1 2.9 0 5.5-2.3 5.5-7.5C42.4 7.6 39.8 5.2 37 5.2zm-1 11.5c-.9 0-1.5-.3-1.9-.8V9.6c.4-.5 1-.8 1.9-.8 1.5 0 2.5 1.6 2.5 3.9 0 2.4-1 4-2.5 4zm-10.9-13l4.1-.9V0l-4.1.9v2.8zm0 1.8h4.1V20h-4.1V5.5zm-4.5 1.3l-.3-1.3H17v14.5h4.1V9.9c1-1.3 2.6-1.1 3.1-.9V5.5c-.5-.2-2.4-.5-3.6 1.3zm-8.6-2.6L9.1 16.4l-2.8-12H1.9L6 20h3.9l5.2-13.8h-3.1z"/></svg>) },
  { name: "Figma", icon: (<svg viewBox="0 0 38 57" width="13" height="20"><path fill="#F24E1E" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/><path fill="#FF7262" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z"/><path fill="#1ABCFE" d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z"/><path fill="#0ACF83" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/><path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/></svg>) },
  { name: "Next.js", icon: (<svg viewBox="0 0 180 180" width="20" height="20"><mask id="nm" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180"><circle cx="90" cy="90" r="90" fill="black"/></mask><g mask="url(#nm)"><circle cx="90" cy="90" r="90" fill="rgba(255,255,255,0.7)"/><path d="M149.508 157.52L69.142 54H54V125.97H66.1V69.3L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="#07090f"/><rect x="115" y="54" width="12" height="72" fill="#07090f"/></g></svg>) },
];

function useCountUp(target, started, duration = 1800) {
  const [val, setVal] = useState(target);
  useEffect(() => {
    if (!started) return;
    const match = target.match(/[\d.]+/);
    if (!match) return;
    const end = parseFloat(match[0]);
    const prefix = target.slice(0, target.indexOf(match[0]));
    const suffix = target.slice(target.indexOf(match[0]) + match[0].length);
    let startTs = null;
    const step = ts => {
      if (!startTs) startTs = ts;
      const prog = Math.min((ts - startTs) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setVal(`${prefix}${Math.round(ease * end)}${suffix}`);
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return val;
}

function ServiceCard({ s, i, activeCard, setActiveCard, statsStarted }) {
  const [loaded, setLoaded] = useState(false);
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const rafRef  = useRef(null);
  const display = useCountUp(s.stat, statsStarted);
  const isActive = activeCard === i;
  const isDimmed = activeCard !== null && activeCard !== i;

  const onMouseMove = useCallback(e => {
    const card = cardRef.current;
    if (!card) return;
    const r  = card.getBoundingClientRect();
    const x  = e.clientX - r.left;
    const y  = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
    });
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(480px circle at ${x}px ${y}px, rgba(${s.accentRgb},0.13) 0%, transparent 60%)`;
      glowRef.current.style.opacity = '1';
    }
  }, [s.accentRgb]);

  const onMouseLeave = useCallback(() => {
    setActiveCard(null);
    const card = cardRef.current;
    if (card) {
      card.style.transition = 'transform 0.7s cubic-bezier(0.16,1,0.3,1)';
      card.style.transform = '';
      setTimeout(() => { if (card) card.style.transition = ''; }, 700);
    }
    if (glowRef.current) glowRef.current.style.opacity = '0';
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, [setActiveCard]);

  const onMouseEnter = useCallback(() => setActiveCard(i), [i, setActiveCard]);

  return (
    <a
      ref={cardRef}
      className={[
        'sv__card',
        s.wide   ? 'sv__card--wide'   : '',
        isActive ? 'sv__card--active' : '',
        isDimmed ? 'sv__card--dim'    : '',
      ].filter(Boolean).join(' ')}
      href="https://wa.me/254705427449"
      target="_blank" rel="noreferrer"
      style={{ '--accent': s.accent, '--accent-rgb': s.accentRgb, '--hue': s.hue, '--i': i }}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="sv__card-glow" ref={glowRef} />
      <span className="sv__card-num">{s.num}</span>

      <div className="sv__img-wrap">
        {!loaded && <div className="sv__img-skeleton" />}
        <img src={s.img} alt={s.title} loading="lazy"
          onLoad={() => setLoaded(true)} style={{ opacity: loaded ? 1 : 0 }} />
        <div className="sv__img-vignette" />
        <div className="sv__img-tag">
          <span className="sv__tag-dot" />
          {s.tag}
        </div>
      </div>

      <div className="sv__card-body">
        <div className="sv__card-top">
          <div className="sv__card-icon">{s.icon}</div>
          <h3 className="sv__card-title">{s.title}</h3>
          <div className="sv__card-stat">
            <span className="sv__stat-val">{display}</span>
            <span className="sv__stat-key">{s.statLabel}</span>
          </div>
        </div>
        <p className="sv__card-desc">{s.desc}</p>
        <div className="sv__card-foot">
          <span className="sv__card-cta">
            Get a Quote
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
          <span className="sv__card-corner">↗</span>
        </div>
      </div>

      <div className="sv__card-line" />

      <svg className="sv__card-border" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect x="0.5" y="0.5" width="99" height="99" rx="5" ry="5" />
      </svg>
    </a>
  );
}

function ScrollDots({ total, active }) {
  return (
    <div className="sv__dots">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`sv__dot${i === active ? ' sv__dot--on' : ''}`} />
      ))}
    </div>
  );
}

export default function Services() {
  const [wrapRef, inView]           = useInView();
  const [activeCard, setActiveCard] = useState(null);
  const [statsStarted, setStats]    = useState(false);
  const [activeSlide, setSlide]     = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (inView && !statsStarted) {
      const t = setTimeout(() => setStats(true), 300);
      return () => clearTimeout(t);
    }
  }, [inView, statsStarted]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () =>
      setSlide(Math.min(Math.round(el.scrollLeft / (el.offsetWidth * 0.88)), SERVICES.length - 1));
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="sv" id="services">
      <div className="sv__noise" aria-hidden="true" />
      <div className="sv__orb sv__orb--a" aria-hidden="true" />
      <div className="sv__orb sv__orb--b" aria-hidden="true" />
      <div className="sv__orb sv__orb--c" aria-hidden="true" />

      <div className="sv__inner" ref={wrapRef}>

        {/* ══ HEADER ══ */}
        <header className="sv__header">
          <div className="sv__header-left">
            <div className="sv__eyebrow">
              <span className="sv__eyebrow-rule" />
              <span>Our Services</span>
              <span className="sv__eyebrow-count">11</span>
            </div>

            <h2 className="sv__heading">
              <span className="sv__heading-pre">We Build</span>
              <span className="sv__heading-main">
                Things<br/>
                <em>That Win.</em>
              </span>
            </h2>

            <div className="sv__metrics">
              {[
                { n: "50+", l: "Projects" },
                { n: "98%", l: "Satisfaction" },
                { n: "12+", l: "Countries" },
                { n: "6yr", l: "Experience" },
              ].map(m => (
                <div className="sv__metric" key={m.l}>
                  <strong>{m.n}</strong>
                  <span>{m.l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sv__header-right">
            <p className="sv__header-body">
              Eleven battle-tested specialisations. One obsessive focus on outcomes
              that move the needle for your business. We don't just build —
              we engineer growth.
            </p>

            <figure className="sv__testimonial">
              <div className="sv__testimonial-quote">"</div>
              <blockquote>
                They didn't just deliver a website — they delivered results.
                Revenue up 140% in just 3 months.
              </blockquote>
              <figcaption>
                <div className="sv__avatar">JM</div>
                <div>
                  <strong>James M.</strong>
                  <span>CEO, NovaTech Ltd</span>
                </div>
              </figcaption>
            </figure>

            <a href="https://wa.me/254705427449" className="sv__header-cta" target="_blank" rel="noreferrer">
              <span>Start a Project</span>
              <span className="sv__cta-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
          </div>
        </header>

        {/* ══ DESKTOP GRID ══ */}
        <div className={`sv__grid${inView ? ' sv__grid--in' : ''}`}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} s={s} i={i}
              activeCard={activeCard} setActiveCard={setActiveCard}
              statsStarted={statsStarted} />
          ))}
        </div>

        {/* ══ MOBILE SCROLL ══ */}
        <div className="sv__scroll" ref={scrollRef}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} s={s} i={i}
              activeCard={activeCard} setActiveCard={setActiveCard}
              statsStarted={statsStarted} />
          ))}
        </div>
        <ScrollDots total={SERVICES.length} active={activeSlide} />

        {/* ══ TECH LOGOS ══ */}
        <div className="sv__tech">
          <p className="sv__tech-label">
            <span className="sv__tech-rule" />
            Technologies we build with
            <span className="sv__tech-rule" />
          </p>
          <div className="sv__logos-mask">
            <div className="sv__logos-track">
              {[...LOGOS, ...LOGOS].map((l, i) => (
                <div className="sv__logo" key={i}>
                  <span className="sv__logo-icon">{l.icon}</span>
                  <span className="sv__logo-name">{l.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ FOOTER BANNER ══ */}
        <div className="sv__banner">
          <div className="sv__banner-glow" aria-hidden="true" />
          <div className="sv__banner-inner">
            <div className="sv__banner-left">
              <p className="sv__banner-kicker">
                <span className="sv__kicker-line" />
                Ready to grow?
              </p>
              <h3 className="sv__banner-heading">
                Not sure<br/><em>where to start?</em>
              </h3>
              <p className="sv__banner-body">
                Let's figure it out together — no pressure, just clarity.
              </p>
              <ul className="sv__trust-list">
                {["Free consultation", "No commitment", "Reply within 24h"].map(t => (
                  <li key={t}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sv__banner-right">
              <a href="https://wa.me/254705427449" className="sv__banner-cta" target="_blank" rel="noreferrer">
                <span>Let's talk through it</span>
                <span className="sv__banner-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </a>
              <p className="sv__banner-note">Free · No commitment · 24h reply</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
