import { Reveal, SectionHead } from './motion.jsx';
import { education } from '../data/profile.js';

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="wrap">
        <SectionHead index="05" kicker="Education" title="Academic *background*" />
        <ul className="edu-list">
          {education.map((e, i) => (
            <Reveal as="li" className="edu-row" key={e.title} delay={i * 0.08}>
              <span className="mono edu-date">{e.date}</span>
              <div className="edu-main">
                <h3>{e.title}</h3>
                <p>{e.place}</p>
              </div>
              <span className="mono edu-level">{e.level}</span>
              <span className="edu-grade">{e.grade}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
