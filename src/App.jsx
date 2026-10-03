import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import { Trust, Audience, Services, Projects, Compare, Process, About, Faq } from './components/Sections.jsx';
import Pricing from './components/Pricing.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Trust />
        <Audience />
        <Services />
        <Pricing />
        <Projects />
        <Compare />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
