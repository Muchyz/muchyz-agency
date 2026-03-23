import "./TrustBar.css";
const TECHS = [
  {name:"React",icon:"⚛️"},{name:"WordPress",icon:"🌐"},{name:"Shopify",icon:"🛍️"},
  {name:"Node.js",icon:"🟩"},{name:"OpenAI",icon:"🤖"},{name:"Flutter",icon:"💙"},
  {name:"Firebase",icon:"🔥"},{name:"Stripe",icon:"💳"},
];
function TrustBar() {
  const items = [...TECHS,...TECHS];
  return (
    <div className="trust-bar"><div className="trust-bar__track-wrap"><div className="trust-bar__track">
      {items.map((t,i) => (
        <div className="trust-bar__item" key={i}>
          <span className="trust-bar__icon">{t.icon}</span>
          <span className="trust-bar__name">{t.name}</span>
        </div>
      ))}
    </div></div></div>
  );
}
export default TrustBar;
