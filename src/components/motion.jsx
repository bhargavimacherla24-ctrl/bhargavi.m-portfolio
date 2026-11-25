import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useInView,
  animate,
} from 'framer-motion';

export const EASE = [0.76, 0, 0.24, 1];
export const EASE_OUT = [0.22, 1, 0.36, 1];

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return matches;
}

// Fades content up the first time it scrolls into view.
export function Reveal({ as = 'div', delay = 0, y = 32, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Words slide up out of a clipping mask. Wrap a word in *asterisks* to accent it.
export function SplitWords({ text, as = 'h2', className = '', delay = 0, play }) {
  const Tag = motion[as];
  const words = text.split(' ');
  const controlled = play !== undefined;
  return (
    <Tag
      className={className}
      aria-label={text.replaceAll('*', '')}
      initial="hidden"
      {...(controlled ? { animate: play ? 'show' : 'hidden' } : { whileInView: 'show', viewport: { once: true, margin: '-40px' } })}
    >
      {words.map((w, i) => {
        const accent = w.startsWith('*');
        return (
          <span className="mask" key={i} aria-hidden="true">
            <motion.span
              className={`mask-inner${accent ? ' accent' : ''}`}
              variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
              transition={{ duration: 1, delay: delay + i * 0.05, ease: EASE }}
            >
              {w.replaceAll('*', '')}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

export function SectionHead({ index, kicker, title, children }) {
  return (
    <div className="section-head">
      <Reveal className="section-meta mono" y={12}>
        <span>({index})</span>
        <motion.span
          className="section-rule"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
        />
        <span>{kicker}</span>
      </Reveal>
      <SplitWords text={title} className="section-title" />
      {children && (
        <Reveal as="p" className="section-lead" delay={0.25}>
          {children}
        </Reveal>
      )}
    </div>
  );
}

// Each word brightens as the paragraph scrolls through the viewport.
export function ScrollText({ text, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <ScrollWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </ScrollWord>
      ))}
    </p>
  );
}

function ScrollWord({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

// Pulls its child toward the pointer while hovered.
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });
  const onMove = e => {
    if (e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.span ref={ref} className={`magnetic ${className}`} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}

// Infinite ticker that leans with scroll speed.
export function Marquee({ items, reverse = false, className = '' }) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skew = useSpring(useTransform(velocity, [-2500, 2500], [-7, 7], { clamp: true }), { stiffness: 300, damping: 50 });
  const group = (
    <div className="marquee-group">
      {items.map((t, i) => (
        <span className="marquee-item" key={i}>
          {t}
          <span className="marquee-sep">✳</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee${reverse ? ' is-reverse' : ''} ${className}`} aria-hidden="true">
      <motion.div className="marquee-track" style={{ skewX: skew }}>
        {group}
        {group}
      </motion.div>
    </div>
  );
}

export function CountUp({ to, suffix = '', prefix = '', duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration, ease: EASE_OUT, onUpdate: v => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
