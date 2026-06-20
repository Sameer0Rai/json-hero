/**
 * Navbar – sticky top navigation bar
 * Props:
 *   theme          – 'dark' | 'light'
 *   onToggleTheme  – callback to switch theme
 *   onOpenDocs     – callback to open Docs modal
 *   onOpenHelp     – callback to open Help modal
 */
export default function Navbar({ theme, onToggleTheme, onOpenDocs, onOpenHelp }) {
  const isDark = theme === 'dark';

  return (
    <header className="navbar" role="banner">
      {/* Brand */}
      <a className="navbar__brand" href="/" aria-label="JSON Hero Home">
        <div className="navbar__logo-icon" aria-hidden="true">{'{}'}</div>
        <span className="navbar__title">
          JSON <span>Hero</span>
        </span>
      </a>

      {/* Nav links – open modals */}
      <nav className="navbar__nav" aria-label="Primary navigation">
        <button
          className="navbar__link"
          onClick={onOpenDocs}
          aria-label="Open Docs"
        >
          📄 Docs
        </button>
        <button
          className="navbar__link"
          onClick={onOpenHelp}
          aria-label="Open Help"
        >
          ❓ Help
        </button>
      </nav>

      {/* Actions – theme toggle only */}
      <div className="navbar__actions">
        <button
          className="navbar__icon-btn"
          onClick={onToggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}
