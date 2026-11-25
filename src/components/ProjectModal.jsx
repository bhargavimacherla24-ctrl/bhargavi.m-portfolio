import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { categoryLabels, projects } from '../data/projects.js';

export default function ProjectModal({ project, onClose, onStep }) {
  const dialogRef = useRef(null);
  const scrollRef = useRef(null);
  const index = projects.findIndex(p => p.id === project.id);

  useEffect(() => {
    const returnFocus = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
      if (e.key === 'Tab') {
        // Keep keyboard focus inside the dialog.
        const focusable = dialogRef.current.querySelectorAll('button, a[href]');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      returnFocus?.focus?.();
    };
  }, [onClose, onStep]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="modal-bar">
          <span className="mono modal-count">
            Case {project.no} / {String(projects.length).padStart(2, '0')}
          </span>
          <div className="modal-controls">
            <button type="button" className="icon-btn" onClick={() => onStep(-1)} aria-label="Previous case study">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button type="button" className="icon-btn" onClick={() => onStep(1)} aria-label="Next case study">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Close case study">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="modal-scroll" ref={scrollRef}>
          <AnimatePresence mode="wait">
            <motion.article
              key={project.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
            >
              <header className="case-head">
                <span className={`project-cat cat-${project.category}`}>{categoryLabels[project.category]}</span>
                <h2 id="modal-title">{project.title}</h2>
                <p className="case-question">“{project.question}”</p>
                <p className="case-overview">{project.overview}</p>
                <dl className="metric-row metric-row-lg">
                  {project.metrics.map(m => (
                    <div key={m.label}>
                      <dt>{m.label}</dt>
                      <dd>{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </header>

              <div className="case-grid">
                <section>
                  <h3>Business problem</h3>
                  <p>{project.problem}</p>
                </section>
                <section>
                  <h3>Objectives</h3>
                  <ul className="dash-list">
                    {project.objectives.map(o => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3>Dataset &amp; fields</h3>
                  <p>{project.dataset}</p>
                </section>
                <section>
                  <h3>Data source</h3>
                  <p>{project.source}</p>
                </section>
              </div>

              <section className="case-approach">
                <h3>Analysis approach</h3>
                <ol className="steps">
                  {project.approach.map((s, i) => (
                    <li key={s}>
                      <span className="step-no mono">{String(i + 1).padStart(2, '0')}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <figure className="case-figure">
                <div className="case-figure-head">
                  <span className="mono">Report preview</span>
                  <span className="tag-warn">Illustrative mockup</span>
                </div>
                <img src={project.image} alt={`Illustrative dashboard chart for ${project.title}`} />
                <figcaption>
                  <strong>Dashboard design.</strong> {project.dashboard}
                  <span className="figure-note">
                    Layout preview created for this portfolio — not a screenshot from Power BI Desktop or Power BI
                    Service.
                  </span>
                </figcaption>
              </figure>

              <div className="case-grid">
                <section className="callout callout-find">
                  <h3>Sample findings</h3>
                  <p>{project.findings}</p>
                </section>
                <section className="callout callout-rec">
                  <h3>Recommendations</h3>
                  <p>{project.recommendations}</p>
                </section>
              </div>

              <footer className="case-foot">
                <span>
                  SQL reference: <code>{project.sql}</code>
                </span>
                <span>Tools: Excel · SQL Server · Power BI</span>
              </footer>

              <button type="button" className="next-case" onClick={() => onStep(1)}>
                <span className="mono">Next case study</span>
                <strong>{projects[(index + 1) % projects.length].title} →</strong>
              </button>
            </motion.article>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
