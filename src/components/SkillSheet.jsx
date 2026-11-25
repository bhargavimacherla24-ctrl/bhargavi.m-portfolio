import { useState } from 'react';
import { skills } from '../data/skills.js';
import { useMediaQuery } from './motion.jsx';

const keys = ['sql', 'powerbi', 'excel', 'python', 'cleaning', 'kpi', 'trends', 'customer', 'business', 'process', 'crm', 'coordination'];
const groupOf = { sql: 'Tool', powerbi: 'Tool', excel: 'Tool', python: 'Tool', crm: 'Tool' };
const COLS = 'ABCDEF';

// Cell reference matching the visible grid (six columns on desktop, two on phones).
const cellRef = (i, cols) => `${COLS[i % cols]}${Math.floor(i / cols) + 1}`;

export default function SkillSheet() {
  const [active, setActive] = useState(0);
  const cols = useMediaQuery('(max-width: 640px)') ? 2 : 6;
  const ref = i => cellRef(i, cols);
  const skill = skills[keys[active]];

  return (
    <div className="sheet">
      <div className="sheet-bar" aria-live="polite">
        <span className="sheet-ref mono">{ref(active)}</span>
        <span className="sheet-fx mono">fx</span>
        <p className="sheet-formula">
          <span className="mono">=SKILL(</span>
          <strong>“{skill.title}”</strong>
          <span className="mono">)</span>
          <span className="sheet-copy">{skill.copy}</span>
        </p>
      </div>
      <ul className="sheet-grid" aria-label="Core skills">
        {keys.map((key, i) => (
          <li key={key}>
            <button
              type="button"
              className={`sheet-cell${active === i ? ' is-active' : ''}`}
              aria-pressed={active === i}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span className="cell-ref mono">{ref(i)}</span>
              <span className="cell-tag mono">{groupOf[key] ?? 'Skill'}</span>
              <span className="cell-name">{skills[key].title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
