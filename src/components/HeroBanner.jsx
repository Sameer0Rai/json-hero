/**
 * HeroBanner – short introductory section below the navbar
 */
export default function HeroBanner() {
  return (
    <section className="hero-banner" aria-label="Tool introduction">
      <div className="hero-banner__badge">
        <span aria-hidden="true">⚡</span> Developer Tool
      </div>
      <h1 className="hero-banner__title">
        JSON <span>Formatter</span> &amp; Validator
      </h1>
      <p className="hero-banner__subtitle">
        Format, validate and minify JSON instantly.<br />
        Runs entirely in your browser. No data leaves your machine.
      </p>
    </section>
  );
}
