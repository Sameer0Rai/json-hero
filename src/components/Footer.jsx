/**
 * Footer – site footer with branding, functional links, and Digital Heroes CTA.
 * Props:
 *   onOpenPrivacy – callback to open Privacy modal
 */
export default function Footer({ onOpenPrivacy }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      {/* Brand */}
      <div className="footer__brand">
        <span className="footer__name">Sameer Rai</span>
        <a
          className="footer__email"
          href="mailto:sameer.0rai0@gmail.com"
          aria-label="Email Sameer Rai"
        >
          sameer.0rai0@gmail.com
        </a>
      </div>

      {/* Footer links */}
      <nav className="footer__links" aria-label="Footer navigation">
        <a
          className="footer__link"
          href="https://www.linkedin.com/in/sameer--rai"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile in a new tab"
        >
          Contact
        </a>
        <span className="footer__sep" aria-hidden="true">·</span>
        <button
          className="footer__link"
          onClick={onOpenPrivacy}
          aria-label="View Privacy Policy"
        >
          Privacy
        </button>
        <span className="footer__sep" aria-hidden="true">·</span>
        <a
          className="footer__link"
          href="mailto:sameer.0rai0@gmail.com"
          aria-label="Seek support from Sameer Rai via email"
        >
          Support
        </a>
      </nav>

      <span className="footer__copy" aria-label={`Copyright ${currentYear}`}>
        © {currentYear} JSON Hero
      </span>
    </footer>
  );
}
