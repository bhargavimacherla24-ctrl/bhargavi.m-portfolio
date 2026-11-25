import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { EASE } from './motion.jsx';
import { profile } from '../data/profile.js';

const links = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['projects', 'Work'],
  ['education', 'Education'],
  ['contact', 'Contact'],
];

export default function Nav({ ready }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Hide while scrolling down, reveal on the way back up.
  useMotionValueEvent(scrollY, 'change', y => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setSolid(y > 40);
  });

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const onKey = e => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <motion.header
        className={`site-header${solid ? ' is-solid' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: ready && (!hidden || open) ? 0 : -100 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="wrap nav">
          <a className="brand" href="#home" aria-label="Bhargavi Macharla, back to top">
            BM<sup>©</sup>
          </a>
          <nav className="nav-links" aria-label="Primary">
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="roll-link">
                <span data-text={label}>{label}</span>
              </a>
            ))}
          </nav>
          <a className="nav-resume" href={profile.resume.download}>
            Resume <span aria-hidden="true">↓</span>
          </a>
          <a className="nav-cta" href="#contact">
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(o => !o)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav aria-label="Mobile">
              {links.map(([id, label], i) => (
                <span className="mask" key={id}>
                  <motion.a
                    href={`#${id}`}
                    className="mask-inner"
                    onClick={() => setOpen(false)}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: EASE }}
                  >
                    <span className="mono">0{i + 1}</span>
                    {label}
                  </motion.a>
                </span>
              ))}
              <span className="mask">
                <motion.a
                  href={profile.resume.download}
                  className="mask-inner mobile-resume"
                  onClick={() => setOpen(false)}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.8, delay: 0.25 + links.length * 0.06, ease: EASE }}
                >
                  <span className="mono">PDF</span>
                  Resume ↓
                </motion.a>
              </span>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
