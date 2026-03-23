import "./Marquee.css";

const ITEMS = [
  "Web Design", "Mobile Apps", "AI Systems", "Custom Software",
  "E-commerce", "APIs", "UI / UX", "Automation", "Websites", "SaaS Products",
];

export default function Marquee() {
  const track = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="mq" aria-hidden="true">
      <div className="mq__track">
        {track.map((t, i) => (
          <span key={i} className="mq__item">
            {t}
            <span className="mq__dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
