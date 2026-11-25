import { useState } from 'react';
import { Magnetic, Marquee, Reveal } from './motion.jsx';
import { profile } from '../data/profile.js';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <section id="contact" className="contact">
      <Marquee items={['Let’s talk', 'Open to junior roles', 'Let’s talk', 'Data & Business Analysis']} className="contact-marquee" />
      <div className="wrap contact-inner">
        <Reveal className="contact-copy">
          <p className="mono contact-kicker">(06) — Contact</p>
          <h2>
            Hiring a junior data or business analyst? <span className="accent">Let’s talk.</span>
          </h2>
          <p>For role enquiries or questions about any of the projects, please get in touch using the details here.</p>
        </Reveal>

        <Reveal className="contact-cta" delay={0.15}>
          <Magnetic strength={0.4}>
            <a className="big-circle" href={`mailto:${profile.email}`}>
              <span>Email me</span>
              <span aria-hidden="true">↗</span>
            </a>
          </Magnetic>
        </Reveal>

        <Reveal className="contact-links" delay={0.2}>
          <div className="contact-row">
            <span className="mono">Email</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button type="button" className="copy-btn mono" onClick={copyEmail} aria-live="polite">
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
          <div className="contact-row">
            <span className="mono">Phone</span>
            <a href={profile.phoneHref}>{profile.phone}</a>
          </div>
          <div className="contact-row">
            <span className="mono">Resume</span>
            <a href={profile.resume.download}>Download PDF ↓</a>
            <a className="copy-btn mono" href={profile.resume.view} target="_blank" rel="noopener noreferrer">
              View
            </a>
          </div>
          <div className="contact-row">
            <span className="mono">GitHub</span>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              bhargavimacherla24-ctrl ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
