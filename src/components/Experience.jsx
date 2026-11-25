import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Reveal, SectionHead } from './motion.jsx';
import { experience } from '../data/profile.js';

export default function Experience() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.75', 'end 0.6'] });
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionHead index="03" kicker="Experience" title="Where I’ve *put* it to *work*" />
        <div className="timeline" ref={listRef}>
          <div className="timeline-rail" aria-hidden="true">
            <motion.div className="timeline-fill" style={{ scaleY: line }} />
          </div>
          <ol>
            {experience.map((job, i) => (
              <Reveal as="li" className="job" key={job.title} delay={i * 0.1}>
                <span className="job-node" aria-hidden="true" />
                <div className="job-side">
                  <span className="job-index">0{i + 1}</span>
                  <span className="mono job-date">{job.date}</span>
                  <span className="mono job-place">{job.place}</span>
                </div>
                <div className="job-main">
                  <h3>{job.title}</h3>
                  <p className="job-org">{job.org}</p>
                  <ul className="dash-list">
                    {job.points.map(p => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <ul className="tool-tags" aria-label="Tools used">
                    {job.tools.map(t => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                {job.highlight && (
                  <div className="job-highlight">
                    <strong>{job.highlight.value}</strong>
                    <span className="mono">{job.highlight.label}</span>
                  </div>
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
