import { useRef, useEffect } from 'react';
import LineNumbers from './LineNumbers';
import StatsBar from './StatsBar';

const INPUT_PLACEHOLDER = `{
  "message": "Paste your JSON here..."
}`;

/**
 * InputPanel – left editor panel with Format / Validate / Minify controls.
 *
 * @param {string}   value            - current input text
 * @param {Function} onChange         - setter for value
 * @param {Function} onFormat         - Format action
 * @param {Function} onValidate       - Validate action
 * @param {Function} onMinify         - Minify action
 * @param {string|null} validationMsg - validation message to display
 * @param {'success'|'error'|null} validationState
 */
export default function InputPanel({
  value,
  onChange,
  onFormat,
  onValidate,
  onMinify,
  validationMsg,
  validationState,
}) {
  const textareaRef = useRef(null);

  // Keep line-numbers in sync by scrolling the gutter alongside the textarea
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

  const handleKeyDown = (e) => {
    // Insert 2 spaces on Tab key press
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end   = e.target.selectionEnd;
      const newVal = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newVal);
      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      });
    }
  };

  return (
    <section className="panel" aria-label="Input JSON editor">
      {/* Header */}
      <div className="panel__header">
        <div className="panel__title-group">
          <span className="panel__title-icon" aria-hidden="true">&lt;&gt;</span>
          <h2 className="panel__title">Input JSON</h2>
        </div>
      </div>

      {/* Toolbar */}
      <div className="panel__toolbar" role="toolbar" aria-label="JSON actions">
        <button
          id="btn-format"
          className="btn btn--format"
          onClick={onFormat}
          aria-label="Format JSON"
          title="Pretty-print the JSON (Ctrl+Shift+F)"
        >
          ✦ Format
        </button>
        <button
          id="btn-validate"
          className="btn btn--validate"
          onClick={onValidate}
          aria-label="Validate JSON"
          title="Check if the JSON is valid"
        >
          ✓ Validate
        </button>
        <button
          id="btn-minify"
          className="btn btn--minify"
          onClick={onMinify}
          aria-label="Minify JSON"
          title="Compact the JSON onto one line"
        >
          ⚡ Minify
        </button>
        <button
          id="btn-clear"
          className="btn btn--clear"
          onClick={() => onChange('')}
          aria-label="Clear input"
          title="Clear the editor"
          style={{ marginLeft: 'auto' }}
        >
          ✕ Clear
        </button>
      </div>

      {/* Validation banner */}
      {validationMsg && (
        <div
          className={`validation-banner validation-banner--${validationState}`}
          role="status"
          aria-live="polite"
        >
          {validationMsg}
        </div>
      )}

      {/* Editor with line numbers */}
      <div className="editor-wrapper">
        <LineNumbers value={value} />
        <textarea
          ref={textareaRef}
          id="input-editor"
          className="editor-textarea"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={INPUT_PLACEHOLDER}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          aria-label="JSON input editor"
          aria-multiline="true"
          aria-required="true"
        />
      </div>

      {/* Stats */}
      <StatsBar value={value} />
    </section>
  );
}
