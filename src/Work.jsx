import "./Work.css";
import { useInView } from "./hooks";
const WORK = [
  {img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85",cat:"Fintech",    title:"NexaBank",sub:"Financial Intelligence Dashboard",big:true},
  {img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85",cat:"E-commerce",title:"Velour",  sub:"Premium Fashion Store",          big:false},
  {img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85",cat:"Hospitality",title:"Ember",  sub:"Restaurant Ordering Platform",   big:false},
];
function Work() {
  const [ref, v] = useInView();
  return (
    <section className="sec sec--light" id="work" ref={ref}>
      <div className="sec__head">
        <div className="chip chip--blue">Our Portfolio</div>
        <h2 className="sec__h2">Projects That <em>Set the Benchmark</em></h2>
        <p className="sec__lead">A curated selection of digital experiences built for ambitious brands.</p>
      </div>
      <div className={v ? "work-grid work-grid--in" : "work-grid"}>
        {WORK.map((p,i) => (
          <div className={`work-card${p.big?" work-card--big":""}`} key={p.title} style={{"--i":i}}>
            <div className="work-card__img" style={{backgroundImage:`url(${p.img})`}}></div>
            <div className="work-card__info">
              <span className="work-card__cat">{p.cat}</span>
              <h3>{p.title}</h3><p>{p.sub}</p>
              <a href="https://wa.me/254705427449" className="work-card__btn" target="_blank" rel="noreferrer">
                Build Similar <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Work;
