import "./Ticker.css";
const TICKER = ["Website Development","E-commerce","AI Chatbots","Custom Software","Business Automation","Website Redesign","Mobile Design","UI/UX"];
function Ticker() {
  const items = [...TICKER,...TICKER,...TICKER];
  return (
    <div className="ticker"><div className="ticker__track">
      {items.map((t,i) => <span key={i} className="ticker__item">{t}<span className="ticker__dot">&#9679;</span></span>)}
    </div></div>
  );
}
export default Ticker;
