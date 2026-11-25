import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { EASE, Reveal, SectionHead, useMediaQuery } from './motion.jsx';
import ProjectModal from './ProjectModal.jsx';
import { projects, categoryLabels } from '../data/projects.js';

const filters = [
  { key: 'all', label: 'All', count: projects.length },
  { key: 'data', label: 'Data Analytics', count: projects.filter(p => p.category === 'data').length },
  { key: 'business', label: 'Business Analysis', count: projects.filter(p => p.category === 'business').length },
];

const projectFromHash = () => {
  const match = window.location.hash.match(/^#(project-0[1-8])$/);
  return match ? projects.find(p => p.id === match[1]) ?? null : null;
};

function ProjectCard({ project, onOpen }) {
  return (
    <button type="button" className="project-card" data-cursor="view" onClick={() => onOpen(project)}>
      <span className="project-no" aria-hidden="true">
        {project.no}
      </span>
      <div className="project-thumb">
        <img src={project.image} alt="" loading="lazy" />
      </div>
      <div className="project-body">
        <span className={`project-cat mono cat-${project.category}`}>{categoryLabels[project.category]}</span>
        <h3 className="project-question">{project.question}</h3>
        <p className="project-title">{project.title}</p>
        <dl className="metric-row">
          {project.metrics.map(m => (
            <div key={m.label}>
              <dd>{m.value}</dd>
              <dt className="mono">{m.label}</dt>
            </div>
          ))}
        </dl>
        <span className="project-open">
          Read case study <span aria-hidden="true">→</span>
        </span>
      </div>
    </button>
  );
}

function Filters({ filter, setFilter }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter case studies">
      <LayoutGroup id="filters">
        {filters.map(f => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            className={`filter${filter === f.key ? ' is-active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {filter === f.key && <motion.span layoutId="filter-pill" className="filter-pill" transition={{ duration: 0.5, ease: EASE }} />}
            <span className="filter-text">
              {f.label} <sup>{f.count}</sup>
            </span>
          </button>
        ))}
      </LayoutGroup>
    </div>
  );
}

// Desktop: the section pins and the cards travel sideways as you scroll down.
function HorizontalTrack({ items, onOpen, filter, setFilter }) {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const distance = useMotionValue(0);
  const [height, setHeight] = useState('100vh');
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const x = useTransform([smooth, distance], ([p, d]) => -p * d);

  useLayoutEffect(() => {
    const measure = () => {
      const d = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
      distance.set(d);
      setHeight(`${d + window.innerHeight}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [distance, items.length]);

  return (
    <div ref={outerRef} className="h-outer" style={{ height }}>
      <div className="h-sticky">
        <div className="wrap h-head">
          <SectionHead index="04" kicker="Selected work" title="Eight business *questions*, worked end to end" />
          <Filters filter={filter} setFilter={setFilter} />
        </div>
        <motion.ul ref={trackRef} className="h-track" style={{ x }}>
          <li className="h-intro">
            <p>
              Each case study sets out the business question, the practice data, the analysis steps, a dashboard concept and what
              the numbers show.
            </p>
            <p className="mono">Learning projects on synthetic data — not client engagements.</p>
            <span className="h-hint mono" aria-hidden="true">
              Keep scrolling →
            </span>
          </li>
          <AnimatePresence mode="popLayout">
            {items.map(p => (
              <motion.li
                key={p.id}
                layout
                className="h-item"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <ProjectCard project={p} onOpen={onOpen} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        <div className="wrap h-progress" aria-hidden="true">
          <motion.div style={{ scaleX: smooth }} />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [openProject, setOpenProject] = useState(projectFromHash);
  const wide = useMediaQuery('(min-width: 961px)');
  const reduced = useReducedMotion();
  const horizontal = wide && !reduced;

  // Keep the open case study in sync with the URL so links like #project-03 can be shared.
  useEffect(() => {
    const sync = () => setOpenProject(projectFromHash());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  const open = useCallback(project => {
    history.pushState(null, '', `#${project.id}`);
    setOpenProject(project);
  }, []);

  const close = useCallback(() => {
    history.replaceState(null, '', '#projects');
    setOpenProject(null);
  }, []);

  const step = useCallback(dir => {
    setOpenProject(current => {
      const idx = projects.findIndex(p => p.id === current.id);
      const next = projects[(idx + dir + projects.length) % projects.length];
      history.replaceState(null, '', `#${next.id}`);
      return next;
    });
  }, []);

  const visible = projects.filter(p => filter === 'all' || p.category === filter);

  return (
    <section id="projects" className="projects">
      {horizontal ? (
        <HorizontalTrack items={visible} onOpen={open} filter={filter} setFilter={setFilter} />
      ) : (
        <div className="wrap section">
          <SectionHead index="04" kicker="Selected work" title="Eight business *questions*, worked end to end">
            Each case study sets out the business question, the practice data, the analysis steps, a dashboard concept and what the
            numbers show. These are learning projects built on synthetic data, not client engagements.
          </SectionHead>
          <Filters filter={filter} setFilter={setFilter} />
          <ul className="project-grid">
            {visible.map(p => (
              <Reveal as="li" key={p.id}>
                <ProjectCard project={p} onOpen={open} />
              </Reveal>
            ))}
          </ul>
        </div>
      )}

      <AnimatePresence>
        {openProject && <ProjectModal key="modal" project={openProject} onClose={close} onStep={step} />}
      </AnimatePresence>
    </section>
  );
}
