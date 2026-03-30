import "./App.css";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Muchyz Digital Agency | Web Design & Software Development in Kenya</title>
        <meta name="description" content="Muchyz Digital Agency builds stunning websites, mobile apps, AI systems and custom software for businesses in Kenya and worldwide. Get a free quote today." />
        <meta name="keywords" content="web design Kenya, software development Nairobi, mobile app development Kenya, digital agency Kenya, website design Nairobi, Muchyz Digital Agency" />
        <meta property="og:title" content="Muchyz Digital Agency | Web Design & Software Development in Kenya" />
        <meta property="og:description" content="We design and build websites, apps and AI systems that turn visitors into revenue." />
        <meta property="og:url" content="https://muchyz.com" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://muchyz.com" />
      </Helmet>
      <Navbar /><Hero />
      <Services /><Process /><Pricing />
      <WhyUs /><Testimonials /><FAQ /><ContactForm />
      <CTA /><Footer /><WAFab />
    </div>
  );
}