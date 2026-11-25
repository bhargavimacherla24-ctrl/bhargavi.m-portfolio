import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE, EASE_OUT, Reveal, SectionHead } from './motion.jsx';
import { skillGroups, skills } from '../data/skills.js';

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="bars" role="img" aria-label={data.map(d => `${d.label}: ${d.display}`).join(', ')}>
      {data.map((d, i) => (
        <div className="bar-row" key={d.label}>
          <span className="bar-label">{d.label}</span>
          <div className="bar-track">
            <motion.div
              className="bar-fill"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: Math.max(0.03, d.value / max) }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: EASE }}
            />
          </div>
          <span className="bar-value mono">{d.display}</span>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  const [selected, setSelected] = useState('sql');
  const skill = skills[selected];

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <SectionHead index="02" kicker="Skills" title="Pick a skill, *see* how I *use* it">
          Each skill opens a short explanation of how I apply it, with a worked example for the core analysis tools.
        </SectionHead>

        <div className="explorer">
          <Reveal className="explorer-list" role="tablist" aria-label="Skills" aria-orientation="vertical">
            {skillGroups.map(group => (
              <div className="explorer-group" key={group.name}>
                <p className="explorer-group-name mono">{group.name}</p>
                <div className="chip-set">
                  {group.keys.map(key => (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      id={`skill-tab-${key}`}
                      aria-selected={selected === key}
                      aria-controls="skill-panel"
                      className={`chip${selected === key ? ' is-active' : ''}`}
                      onClick={() => setSelected(key)}
                    >
                      {selected === key && <motion.span layoutId="chip-bg" className="chip-bg" transition={{ duration: 0.5, ease: EASE }} />}
                      <span className="chip-text">
                        {skills[key].title}
                        {skills[key].chart && <sup aria-hidden="true">✳</sup>}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <p className="explorer-hint mono">✳ includes a worked example</p>
          </Reveal>

          <Reveal className="explorer-panel" delay={0.1} id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${selected}`} aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className="console-body"
                initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <p className="query mono">
                  <span className="kw">SELECT</span> * <span className="kw">FROM</span> skills <span className="kw">WHERE</span> name ={' '}
                  <span className="str">'{skill.title}'</span>;
                </p>
                <h3>{skill.title}</h3>
                <p className="console-copy">{skill.copy}</p>
                <ul className="check-list">
                  {skill.points.map(p => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {skill.chart && (
                  <div className="example">
                    <div className="example-head">
                      <strong>{skill.exampleTitle}</strong>
                      <span className="mono">Illustrative example</span>
                    </div>
                    <p className="formula mono">{skill.formula}</p>
                    <BarChart data={skill.chart} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
