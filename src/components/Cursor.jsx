import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from './motion.jsx';

// A follower dot that grows over links and shows "View" over case-study cards.
export default function Cursor() {
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.35 });
  const [mode, setMode] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!finePointer) return;
    const move = e => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target.closest?.('[data-cursor], a, button');
      setMode(target ? target.dataset.cursor || 'link' : '');
    };
    const leave = () => setVisible(false);
    window.addEventListener('pointermove', move);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [finePointer, x, y]);

  if (!finePointer) return null;
  return (
    <motion.div
      className={`cursor${mode ? ` is-${mode}` : ''}${visible ? '' : ' is-hidden'}`}
      style={{ x: sx, y: sy }}
      aria-hidden="true"
    >
      <span>View</span>
    </motion.div>
  );
}
