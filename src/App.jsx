import { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';
import ToastContainer from './components/ToastContainer';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { useToast } from './hooks/useToast';
import { parseJSON } from './utils/jsonUtils';

/* ---- Restore saved theme or default to dark ---- */
function getInitialTheme() {
  try {
    return localStorage.getItem('jh-theme') || 'dark';
  } catch {
    return 'dark';
  }
}

export default function App() {
  const [input, setInput]               = useState('');
  const [output, setOutput]             = useState('');
  const [validationMsg, setValidationMsg]       = useState(null);
  const [validationState, setValidationState]   = useState(null);
  const [theme, setTheme]               = useState(getInitialTheme);
  const [activeModal, setActiveModal]   = useState(null); // 'help' | 'docs' | 'privacy' | null
  const { toasts, showToast }           = useToast();

  /* Apply theme class to <html> and persist */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('jh-theme', theme); } catch { /* ignore */ }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }, []);

  const openModal  = useCallback((name) => setActiveModal(name), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  /* ---- Validation helpers ---- */
  const clearValidation = () => { setValidationMsg(null); setValidationState(null); };

  /* ---- FORMAT ---- */
  const handleFormat = useCallback(() => {
    clearValidation();
    const result = parseJSON(input);
    if (!result.ok) { showToast(result.error, 'error'); return; }
    setOutput(JSON.stringify(result.value, null, 2));
    showToast('JSON formatted successfully', 'success');
  }, [input, showToast]);

  /* ---- VALIDATE ---- */
  const handleValidate = useCallback(() => {
    const result = parseJSON(input);
    if (result.ok) {
      setValidationMsg('✓ Valid JSON');
      setValidationState('success');
      showToast('JSON is valid', 'success');
    } else {
      setValidationMsg(`❌ Invalid JSON:\n${result.error}`);
      setValidationState('error');
      showToast('Invalid JSON detected', 'error');
    }
  }, [input, showToast]);

  /* ---- MINIFY ---- */
  const handleMinify = useCallback(() => {
    clearValidation();
    const result = parseJSON(input);
    if (!result.ok) { showToast(result.error, 'error'); return; }
    setOutput(JSON.stringify(result.value));
    showToast('JSON minified successfully', 'success');
  }, [input, showToast]);

  /* ---- COPY ---- */
  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      showToast('Copied to clipboard', 'info');
    } catch {
      try {
        const ta = document.getElementById('output-editor');
        ta.select();
        document.execCommand('copy');
        showToast('Copied to clipboard', 'info');
      } catch {
        showToast('Copy failed – please copy manually', 'error');
      }
    }
  }, [output, showToast]);

  /* ---- DOWNLOAD ---- */
  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href     = url;
    link.download = 'formatted.json';
    link.click();
    URL.revokeObjectURL(url);
    showToast('File downloaded', 'success');
  }, [output, showToast]);

  /* ---- INPUT CHANGE ---- */
  const handleInputChange = useCallback((val) => {
    setInput(val);
    if (validationMsg) clearValidation();
  }, [validationMsg]);

  return (
    <>
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenDocs={() => openModal('docs')}
        onOpenHelp={() => openModal('help')}
      />

      <HeroBanner />

      {/* Digital Heroes CTA */}
      <div className="heroes-section">
        <a
          id="btn-digital-heroes"
          className="btn--heroes"
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Built for Digital Heroes – opens digitalheroesco.com in a new tab"
        >
          Built for Digital Heroes
        </a>
      </div>

      <main className="main-content" id="main" role="main">
        <div className="editor-grid">
          <InputPanel
            value={input}
            onChange={handleInputChange}
            onFormat={handleFormat}
            onValidate={handleValidate}
            onMinify={handleMinify}
            validationMsg={validationMsg}
            validationState={validationState}
          />
          <OutputPanel
            value={output}
            onCopy={handleCopy}
            onDownload={handleDownload}
          />
        </div>
      </main>

      <Footer onOpenPrivacy={() => openModal('privacy')} />

      <ToastContainer toasts={toasts} />

      {/* ---- Modals ---- */}
      {activeModal === 'help' && (
        <Modal title="How to Use JSON Hero" onClose={closeModal}>
          <ol className="modal__list">
            <li>Paste JSON into the <strong>Input</strong> panel.</li>
            <li>Click <strong>Validate</strong> to verify JSON syntax.</li>
            <li>Click <strong>Format</strong> to pretty-print.</li>
            <li>Click <strong>Minify</strong> to remove spaces.</li>
            <li>Click <strong>Copy</strong> to copy output.</li>
          </ol>
          <p className="modal__subtitle">Supported types:</p>
          <ul className="modal__checks">
            <li>✓ Objects</li>
            <li>✓ Arrays</li>
            <li>✓ Boolean</li>
            <li>✓ Null</li>
            <li>✓ Nested JSON</li>
          </ul>
        </Modal>
      )}

      {activeModal === 'docs' && (
        <Modal title="About JSON Hero" onClose={closeModal}>
          <p className="modal__body">
            JSON Hero is a lightweight browser-based tool for formatting,
            validating and minifying JSON.
          </p>
          <p className="modal__subtitle">Features:</p>
          <ul className="modal__checks">
            <li>✓ Format JSON</li>
            <li>✓ Validate JSON</li>
            <li>✓ Minify JSON</li>
            <li>✓ Copy Output</li>
            <li>✓ Responsive Design</li>
            <li>✓ Dark and Light Theme</li>
            <li>✓ Privacy Friendly</li>
          </ul>
          <p className="modal__footer-note">Built by <strong>Sameer Rai</strong></p>
        </Modal>
      )}

      {activeModal === 'privacy' && (
        <Modal title="Privacy Policy" onClose={closeModal}>
          <div className="modal__privacy-icon" aria-hidden="true">🛡️</div>
          <ul className="modal__checks">
            <li>✓ JSON Hero runs entirely inside your browser.</li>
            <li>✓ No JSON data is stored.</li>
            <li>✓ No JSON data is uploaded to any server.</li>
            <li>✓ No cookies are used except for saving your theme preference.</li>
            <li>✓ Your data never leaves your device.</li>
          </ul>
        </Modal>
      )}
    </>
  );
}
