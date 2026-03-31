/* ═══════════════════════════════════════════════════════
   SERVICES — All upgrades: count-up · skeleton · 
   horizontal mobile scroll · traced border · 
   trusted logos · background texture
   ═══════════════════════════════════════════════════════ */
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,700;12..96,800&display=swap');

.sv {
  --blue:    #1d4ed8;
  --blue-m:  #2563eb;
  --blue-l:  #3b82f6;
  --blue-p:  #eff6ff;
  --ink:     #060c1a;
  --muted:   #94a3b8;
  --rule:    #e2e8f0;
  --white:   #ffffff;
  --ease:    cubic-bezier(0.16,1,0.3,1);
  --r:       20px;

  position: relative;
  background: #f4f7ff;
  padding: 40px 36px 80px; /* ← was 100px */
  overflow: hidden;
  font-family: 'Bricolage Grotesque', sans-serif;
  cursor: none;
}

/* ── Background texture: dot grid + mesh ── */
.sv::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle, rgba(37,99,235,0.085) 1.5px, transparent 1.5px);
  background-size: 30px 30px;
  mask-image:
    radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 80%);
  -webkit-mask-image:
    radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 80%);
  pointer-events: none;
  z-index: 0;
}

/* Colour mesh on top of dots */
.sv::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 800px 500px at 5% 0%,   rgba(37,99,235,0.07)  0%, transparent 65%),
    radial-gradient(ellipse 600px 400px at 95% 100%, rgba(29,78,216,0.055) 0%, transparent 65%);
  pointer-events: none;
  z-index: 0;
}

.sv__wrap {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
}

/* ════════════════════════
   CURSOR CARD
   ════════════════════════ */
.sv__cursor {
  position: absolute;
  top: 0; left: 0;
  width: 280px; height: 185px;
  border-radius: 14px;
  overflow: hidden;
  pointer-events: none;
  z-index: 200;
  margin-top: -92px;
  margin-left: -140px;
  opacity: 0;
  transform: scale(0.84);
  transition: opacity 0.22s, transform 0.32s var(--ease);
  box-shadow: 0 28px 72px rgba(6,12,26,0.22), 0 0 0 1.5px rgba(37,99,235,0.18);
  will-change: transform;
}
.sv__cursor--show { opacity: 1; transform: scale(1); }
.sv__cursor img   { width:100%; height:100%; object-fit:cover; display:block; }
.sv__cursor-tag {
  position: absolute; bottom:10px; left:12px;
  font-size:10px; font-weight:800; letter-spacing:2.5px; text-transform:uppercase;
  color:#fff; background:rgba(37,99,235,0.72); backdrop-filter:blur(8px);
  padding:4px 11px; border-radius:100px;
}

/* ════════════════════════
   HEADER
   ════════════════════════ */
.sv__hd {
  display: grid;
  grid-template-columns: 1fr 380px;
  align-items: flex-end;
  gap: 48px;
  margin-bottom: 32px; /* ← was 52px */
}

.sv__badge {
  display: inline-flex; align-items: center; gap: 9px;
  font-size: 11px; font-weight: 700; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--blue-m); margin-bottom: 10px; /* ← was 20px */
}
.sv__badge-dot {
  width: 7px; height: 7px;
  background: var(--blue-m); border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(37,99,235,0.2);
  animation: svPulse 2.4s ease infinite;
}
@keyframes svPulse {
  0%,100% { box-shadow: 0 0 0 3px rgba(37,99,235,0.2); }
  50%      { box-shadow: 0 0 0 7px rgba(37,99,235,0.05); }
}

.sv__h2 {
  margin: 0; display: flex; flex-direction: column;
  font-weight: 800; font-size: clamp(50px,7vw,104px);
  line-height: 0.93; letter-spacing: -4px; color: var(--ink);
}
.sv__h2 em { font-style: italic; color: var(--blue-m); }
.sv__h2-b  { display: flex; align-items: center; gap: 20px; }
.sv__h2-rule {
  flex: 1; height: 5px; max-width: 180px; margin-bottom: 5px;
  background: linear-gradient(90deg, var(--blue-m), transparent);
  border-radius: 3px;
}

.sv__hd-r { display: flex; flex-direction: column; gap: 22px; padding-bottom: 6px; }
.sv__hd-body { font-size: 15.5px; color: #64748b; line-height: 1.8; margin: 0; }

.sv__hd-btn {
  display: inline-flex; align-items: center; align-self: flex-start;
  text-decoration: none; border-radius: 100px; overflow: hidden;
  border: 2px solid var(--ink);
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 13px; font-weight: 700; color: var(--ink);
  transition: border-color 0.25s; cursor: none;
}
.sv__hd-btn > span:first-child { padding: 12px 22px; transition: background 0.25s, color 0.25s; }
.sv__hd-btn-icon {
  display: flex; align-items: center; justify-content: center;
  background: var(--ink); color: var(--white); padding: 12px 14px;
  transition: background 0.25s;
}
.sv__hd-btn:hover { border-color: var(--blue-m); }
.sv__hd-btn:hover > span:first-child { background: var(--blue-p); color: var(--blue-m); }
.sv__hd-btn:hover .sv__hd-btn-icon { background: var(--blue-m); }

/* ════════════════════════
   DESKTOP GRID
   ════════════════════════ */
.sv__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.sv__scroll { display: none; }

/* ════════════════════════
   CARD
   ════════════════════════ */
.sv__card {
  position: relative;
  background: var(--white);
  border-radius: var(--r);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border: 1.5px solid var(--rule);
  box-shadow: 0 2px 16px rgba(6,12,26,0.05);
  opacity: 0;
  transform: translateY(28px);
  transition: transform 0.4s var(--ease), box-shadow 0.4s, border-color 0.3s, opacity 0.3s;
  cursor: none;
}

.sv__grid--in .sv__card,
.sv__scroll .sv__card {
  animation: svIn 0.6s calc(var(--i,0)*0.08s) var(--ease) both;
}
@keyframes svIn {
  from { opacity: 0; transform: translateY(32px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.sv__card--wide { grid-column: span 2; }
.sv__card--wide .sv__photo { height: 280px; }

.sv__card--on {
  transform: translateY(-8px);
  box-shadow: 0 32px 72px rgba(37,99,235,0.15);
  border-color: transparent;
}
.sv__card--dim { opacity: 0.42; transform: scale(0.985); }

/* ─ Traced SVG border ─ */
.sv__border-trace {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 5;
}
.sv__border-trace rect {
  fill: none;
  stroke: var(--blue-l);
  stroke-width: 1.5;
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  transition: stroke-dashoffset 0.7s var(--ease);
}
.sv__card--on .sv__border-trace rect {
  stroke-dashoffset: 0;
}

/* ─ Photo ─ */
.sv__photo {
  position: relative;
  height: 220px;
  overflow: hidden;
  flex-shrink: 0;
  background: #e2e8f0;
}
.sv__photo img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform 0.65s var(--ease), filter 0.5s, opacity 0.4s;
  filter: brightness(0.96) saturate(0.9);
}
.sv__card--on .sv__photo img {
  transform: scale(1.07);
  filter: brightness(1) saturate(1.05);
}

/* ─ Skeleton shimmer ─ */
.sv__skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    #e2e8f0 25%,
    #f1f5f9 50%,
    #e2e8f0 75%
  );
  background-size: 200% 100%;
  animation: svShimmer 1.4s ease infinite;
  z-index: 2;
}
@keyframes svShimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.sv__photo-tag {
  position: absolute; top: 14px; left: 16px;
  font-size: 10.5px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
  color: #fff; background: rgba(29,78,216,0.72); backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.18);
  padding: 5px 13px; border-radius: 100px; z-index: 3;
}
.sv__photo-num {
  position: absolute; top: 14px; right: 16px;
  font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
  color: rgba(255,255,255,0.8);
  background: rgba(6,12,26,0.45); backdrop-filter: blur(8px);
  padding: 4px 10px; border-radius: 100px; z-index: 3;
}

/* ─ Text body ─ */
.sv__body {
  display: flex; flex-direction: column; flex: 1;
  padding: 24px 24px 28px;
  background: var(--white);
}
.sv__body-top {
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 12px; margin-bottom: 10px;
}

.sv__title {
  font-size: 18px; font-weight: 800; color: var(--ink);
  margin: 0; letter-spacing: -0.4px; line-height: 1.2;
  transition: color 0.25s;
}
.sv__card--wide .sv__title { font-size: 22px; }
.sv__card--on .sv__title   { color: var(--blue-m); }

/* Animated stat badge */
.sv__stat {
  display: flex; flex-direction: column; align-items: flex-end;
  flex-shrink: 0; gap: 1px;
}
.sv__stat-num {
  font-size: 18px; font-weight: 800; line-height: 1;
  color: #16a34a; letter-spacing: -0.5px;
}
.sv__stat-lbl {
  font-size: 10px; font-weight: 700; letter-spacing: 1px;
  text-transform: uppercase; color: var(--muted);
}

.sv__desc {
  font-size: 14px; color: #64748b; line-height: 1.75;
  margin: 0 0 20px; font-weight: 400; flex: 1;
  transition: color 0.25s;
}
.sv__card--on .sv__desc { color: #475569; }

.sv__cta {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 700;
  color: var(--white); background: var(--blue-m);
  padding: 10px 18px; border-radius: 10px; align-self: flex-start;
  transition: background 0.2s, gap 0.2s, transform 0.3s var(--ease);
  box-shadow: 0 4px 16px rgba(37,99,235,0.3);
}
.sv__card--on .sv__cta { background: var(--blue); transform: translateY(-1px); gap: 12px; }

/* Sweep line */
.sv__sweep {
  position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--blue-m), #60a5fa, transparent);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.55s var(--ease); z-index: 4;
}
.sv__card--on .sv__sweep { transform: scaleX(1); }

/* ════════════════════════
   TRUSTED BY LOGOS
   ════════════════════════ */
.sv__trust {
  margin-top: 64px;
  padding: 40px 0;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}

.sv__trust-label {
  font-size: 11px; font-weight: 700; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--muted);
  text-align: center; margin: 0 0 28px;
}

.sv__logos-track-wrap {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
}

.sv__logos-track {
  display: flex;
  gap: 0;
  width: max-content;
  animation: svLogos 28s linear infinite;
}

.sv__logos-track:hover { animation-play-state: paused; }

@keyframes svLogos {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.sv__logo {
  display: flex; align-items: center; gap: 10px;
  padding: 0 36px;
  opacity: 0.5;
  filter: grayscale(1);
  transition: opacity 0.3s, filter 0.3s;
  cursor: default;
  white-space: nowrap;
}
.sv__logo:hover { opacity: 1; filter: grayscale(0); }
.sv__logo svg   { flex-shrink: 0; }
.sv__logo span {
  font-size: 13px; font-weight: 700; color: var(--ink); letter-spacing: -0.2px;
}

/* ════════════════════════
   FOOTER
   ════════════════════════ */
.sv__foot {
  display: flex; align-items: center; justify-content: space-between;
  padding: 44px 0 0; gap: 16px; flex-wrap: wrap;
}
.sv__foot-copy { font-size: 15px; color: var(--muted); margin: 0; }
.sv__foot-btn {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 13.5px; font-weight: 700;
  color: var(--white); background: var(--blue-m);
  padding: 13px 26px; border-radius: 100px; text-decoration: none;
  box-shadow: 0 6px 26px rgba(37,99,235,0.28);
  transition: background 0.2s, transform 0.3s var(--ease), box-shadow 0.3s;
  cursor: none;
}
.sv__foot-btn:hover { background: var(--blue); transform: translateY(-3px); box-shadow: 0 14px 40px rgba(37,99,235,0.36); }

/* ════════════════════════
   RESPONSIVE
   ════════════════════════ */
@media (max-width: 1100px) {
  .sv__grid { grid-template-columns: repeat(2,1fr); }
  .sv__card--wide { grid-column: span 2; }
}

/* Mobile: hide desktop grid, show horizontal scroll */
@media (max-width: 768px) {
  .sv { padding: 32px 0 60px; cursor: auto; } /* ← was 72px */
  .sv__wrap { padding: 0 20px; }
  .sv__cursor { display: none; }

  .sv__hd { grid-template-columns: 1fr; gap: 28px; }

  /* Hide desktop grid */
  .sv__grid { display: none; }

  /* Show horizontal scroll strip */
  .sv__scroll {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding: 4px 20px 16px;
    margin: 0 -20px;
    scrollbar-width: none;
  }
  .sv__scroll::-webkit-scrollbar { display: none; }

  .sv__scroll .sv__card {
    flex: 0 0 80vw;
    min-width: 280px;
    scroll-snap-align: start;
    cursor: auto;
    opacity: 1;
    transform: none;
    animation: none !important;
  }
  .sv__scroll .sv__card--wide { flex: 0 0 88vw; }
  .sv__scroll .sv__card--dim  { opacity: 1; transform: none; }

  .sv__hd-btn, .sv__foot-btn { cursor: auto; }
  .sv__trust { margin-top: 48px; }
}
