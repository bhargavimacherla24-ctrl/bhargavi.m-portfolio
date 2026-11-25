import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EASE, EASE_OUT, Magnetic } from './motion.jsx';
import SkillSheet from './SkillSheet.jsx';
import { profile } from '../data/profile.js';
import photo from '../assets/profile.jpg';


function Letters({ word, offset, ready }) {
  return word.split('').map((ch, i) => (
    <span className="mask" key={i} aria-hidden="true">
      <motion.span
        className="mask-inner"
        initial={{ y: '115%' }}
        animate={ready ? { y: '0%' } : undefined}
        transition={{ duration: 1.1, delay: 0.15 + (i + offset) * 0.045, ease: EASE }}
      >
        {ch}
      </motion.span>
    </span>
  ));
}

export default function Hero({ ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const show = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  });

  return (
    <section className="hero" id="home" ref={ref}>
      <div className="wrap">
        <motion.div className="hero-meta mono" {...show(0.1)}>
          <span>Data &amp; Business Analyst</span>
          <span>{profile.location}</span>
          <span className="hero-open">
            <i aria-hidden="true" /> Open to junior roles
          </span>
        </motion.div>

        <div className="hero-stage">
          <motion.h1 className="hero-name" aria-label={profile.name} style={{ y: nameY, opacity: fade }}>
            <span className="hero-line">
              <Letters word="BHARGAVI" offset={0} ready={ready} />
            </span>
            <span className="hero-line hero-line-2">
              <Letters word="MACHARLA" offset={8} ready={ready} />
            </span>
          </motion.h1>

          <motion.figure className="hero-photo" style={{ y: photoY }}>
            <motion.div
              className="hero-photo-clip"
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={ready ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
              transition={{ duration: 1.3, delay: 0.45, ease: EASE }}
            >
              <motion.img
                src={photo}
                alt="Portrait of Bhargavi Macharla"
                style={{ scale: imgScale }}
                initial={{ scale: 1.35 }}
                animate={ready ? { scale: 1 } : undefined}
                transition={{ duration: 1.6, delay: 0.45, ease: EASE_OUT }}
              />
            </motion.div>
          </motion.figure>
        </div>

        <div className="hero-foot">
          <motion.p className="hero-lead" {...show(0.9)}>
            Reports that reconcile. Dashboards people actually read. I use <b>SQL</b>, <b>Power BI</b> and{' '}
            <b>Advanced Excel</b> to organise data, check results and make business performance easier to understand.
          </motion.p>
          <motion.div className="hero-actions" {...show(1.05)}>
            <Magnetic>
              <a className="btn btn-lime" href="#projects">
                See the work <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href="#contact">Get in touch</a>
            </Magnetic>
          </motion.div>
          <motion.a href="#about" className="scroll-cue mono" {...show(1.2)} aria-label="Scroll to About">
            Scroll
            <span aria-hidden="true">
              <i />
            </span>
          </motion.a>
        </div>
      </div>

      <div className="wrap">
        <SkillSheet />
      </div>
    </section>
  );
}
