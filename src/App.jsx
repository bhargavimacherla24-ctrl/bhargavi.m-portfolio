import { useCallback, useEffect, useState } from 'react';
import Loader from './components/Loader.jsx';
import Cursor from './components/Cursor.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Education from './components/Education.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  // The intro plays on every fresh page load.
  const [loading, setLoading] = useState(true);
  // The hero starts animating while the loader's curtain is still lifting.
  const [ready, setReady] = useState(false);
  const reveal = useCallback(() => setReady(true), []);
  const done = useCallback(() => {
    setLoading(false);
    // Arrived on a link like #experience: jump there once the intro is gone.
    const id = window.location.hash.slice(1);
    if (id && !id.startsWith('project-')) document.getElementById(id)?.scrollIntoView();
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', loading);
  }, [loading]);

  return (
    <>
      {loading && <Loader onReveal={reveal} onDone={done} />}
      <Cursor />
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav ready={ready} />
      <main id="main">
        <Hero ready={ready} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
