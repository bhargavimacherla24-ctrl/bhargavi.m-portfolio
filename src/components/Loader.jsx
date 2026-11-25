import { useEffect, useState } from 'react';
import { animate, motion } from 'framer-motion';
import { EASE } from './motion.jsx';

const PANELS = 6;
const BARS = [0.34, 0.52, 0.44, 0.68, 0.58, 0.82, 0.74, 0.96];
const STEPS = ['Connecting to data', 'Cleaning & validating', 'Building dashboard', 'Ready'];

// Trend line through the top-centre of each bar (viewBox 800 × 300).
const points = BARS.map((h, i) => [((i + 0.5) / BARS.length) * 800, 300 - h * 300]);
const linePath = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

const clamp01 = v => Math.min(1, Math.max(0, v));
const easeOut = t => 1 - Math.pow(1 - t, 3);

export default function Loader({ onReveal, onDone }) {
  // Float progress 0–100; every part of the chart is driven from it so they all finish together.
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const pct = Math.round(progress);

  useEffect(() => {
    const timers = [];
    const controls = animate(0, 100, {
      duration: 2.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: setProgress,
      onComplete: () => {
        timers.push(setTimeout(() => setLeaving(true), 350));
        timers.push(setTimeout(onReveal, 750));
        timers.push(setTimeout(onDone, 1600));
      },
    });
    return () => {
      controls.stop();
      timers.forEach(clearTimeout);
    };
  }, [onReveal, onDone]);

  const stepIndex = pct < 30 ? 0 : pct < 60 ? 1 : pct < 100 ? 2 : 3;
  const lineDrawn = clamp01((progress - 45) / 50);

  return (
    <div className="pl" role="status" aria-label={`Loading portfolio, ${pct}%`}>
      <div className="pl-panels" aria-hidden="true">
        {Array.from({ length: PANELS }, (_, i) => (
          <motion.div
            key={i}
            className="pl-panel"
            animate={leaving ? { y: '-100%' } : { y: '0%' }}
            transition={{ duration: 0.85, delay: leaving ? 0.15 + i * 0.07 : 0, ease: EASE }}
          />
        ))}
      </div>

      <motion.div
        className="pl-content"
        animate={leaving ? { opacity: 0, y: -60 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="pl-top mono">
          <span>
            BM<sup>©</sup> — Portfolio {new Date().getFullYear()}
          </span>
          <span>Data &amp; Business Analyst</span>
        </div>

        <div className="pl-chart" aria-hidden="true">
          <div className="pl-bars">
            {BARS.map((h, i) => (
              <span
                key={i}
                className="pl-bar"
                style={{ height: `${h * 100}%`, transform: `scaleY(${easeOut(clamp01((progress - i * 7) / 30))})` }}
              />
            ))}
          </div>
          <svg className="pl-line" viewBox="0 0 800 300" preserveAspectRatio="none">
            <path d={linePath} pathLength="1" strokeDasharray="1" strokeDashoffset={1 - lineDrawn} />
          </svg>
          {points.map(([x, y], i) => (
            <i
              key={i}
              className={`pl-dot${lineDrawn >= i / (BARS.length - 1) ? ' is-on' : ''}`}
              style={{ left: `${(x / 800) * 100}%`, top: `${(y / 300) * 100}%` }}
            />
          ))}
        </div>

        <div className="pl-bottom">
          <ul className="pl-steps mono">
            {STEPS.map((s, i) => {
              const done = i < stepIndex || pct === 100;
              return (
                <li key={s} className={done ? 'is-done' : i === stepIndex ? 'is-active' : ''}>
                  <span className="pl-tick">{done ? '✓' : i === stepIndex ? '›' : '·'}</span>
                  {s}
                </li>
              );
            })}
          </ul>
          <div className="pl-count">
            {String(pct).padStart(3, '0')}
            <span>%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
