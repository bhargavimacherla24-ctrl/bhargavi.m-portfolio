import { profile } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot">
        <span className="foot-name">{profile.name}</span>
        <span className="mono">
          © {new Date().getFullYear()} · Data &amp; Business Analytics Portfolio
        </span>
        <a href="#home" className="mono">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
