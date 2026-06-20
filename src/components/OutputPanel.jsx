import { useRef, useEffect } from 'react';
import LineNumbers from './LineNumbers';
import StatsBar from './StatsBar';

/**
 * OutputPanel – right read-only editor panel with Copy & Download controls.
 *
 * @param {string}   value       - formatted / minified / validated output
 * @param {Function} onCopy      - Copy action
 * @param {Function} onDownload  - Download action
 */
export default function OutputPanel({ value, onCopy, onDownload }) {
  const textareaRef = useRef(null);

  // Sync line numbers gutter scroll with textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const handleScroll = () => {
      const gutter = ta.previousSibling;
      if (gutter) gutter.scrollTop = ta.scrollTop;
    };
    ta.addEventListener('scroll', handleScroll);
    return () => ta.removeEventListener('scroll', handleScroll);
  }, []);

  const isEmpty = !value;

  return (
    <section className="panel" aria-label="Output JSON viewer">
      {/* Header */}
      <div className="panel__header">
        <div className="panel__title-group">
          <span className="panel__title-icon" aria-hidden="true">⊞</span>
          <h2 className="panel__title">Output</h2>
        </div>
        {!isEmpty && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              id="btn-download"
              className="btn btn--download"
              onClick={onDownload}
              aria-label="Download output as JSON file"
              title="Download as .json file"
            >
              ↓ Download
            </button>
            <button
              id="btn-copy"
              className="btn btn--copy"
              onClick={onCopy}
              aria-label="Copy output to clipboard"
              title="Copy to clipboard"
            >
              ⎘ Copy
            </button>
          </div>
        )}
      </div>

      {/* Editor or placeholder */}
      {isEmpty ? (
        <div className="output-placeholder" aria-label="No output yet">
          <span className="output-placeholder__icon" aria-hidden="true">{'{ }'}</span>
          <span className="output-placeholder__text">Formatted JSON will appear here.</span>
        </div>
      ) : (
        <>
          <div className="editor-wrapper">
            <LineNumbers value={value} />
            <textarea
              ref={textareaRef}
              id="output-editor"
              className="editor-textarea"
              value={value}
              readOnly
              spellCheck={false}
              aria-label="JSON output (read only)"
              aria-multiline="true"
              aria-readonly="true"
            />
          </div>
          <StatsBar value={value} />
        </>
      )}
    </section>
  );
}
