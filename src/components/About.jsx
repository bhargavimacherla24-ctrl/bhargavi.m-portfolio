import { CountUp, Reveal, ScrollText, SectionHead } from './motion.jsx';
import { profile, stats, toolkit } from '../data/profile.js';

const statement =
  'I work where reporting meets business operations — checking and organising data in SQL and Excel, building Power BI views that track the measures that matter, and explaining what the numbers mean to the people who use them.';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <SectionHead index="01" kicker="About" title="Making data *easier* to *understand*" />
        <ScrollText text={statement} className="statement" />

        <div className="about-grid">
          <Reveal className="about-text">
            {profile.about.map(p => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
          <Reveal className="toolkit" delay={0.1}>
            {toolkit.map((group, i) => (
              <div className="toolkit-row" key={group.title}>
                <span className="mono toolkit-no">0{i + 1}</span>
                <h3>{group.title}</h3>
                <p>{group.items.join(' · ')}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <dl className="stats">
          {stats.map((s, i) => (
            <Reveal className="stat" key={s.label} delay={i * 0.08}>
              <dd>
                <CountUp to={s.value} suffix={s.suffix} />
              </dd>
              <dt>{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
