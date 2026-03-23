import "./App.css";
import Navbar       from "./Navbar";
import Hero         from "./Hero";
import Services     from "./Services";
import Process      from "./Process";
import Work         from "./Work";
import Pricing      from "./Pricing";
import WhyUs        from "./WhyUs";
import Testimonials from "./Testimonials";
import FAQ          from "./FAQ";
import ContactForm  from "./ContactForm";
import CTA          from "./CTA";
import Footer       from "./Footer";
import WAFab        from "./WAFab";

export default function App() {
  return (
    <div className="app">
      <Navbar /><Hero />
      <Services /><Process /><Work /><Pricing />
      <WhyUs /><Testimonials /><FAQ /><ContactForm />
      <CTA /><Footer /><WAFab />
    </div>
  );
}
