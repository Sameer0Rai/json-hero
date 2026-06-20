/**
 * Modal – reusable accessible modal overlay.
 * Props:
 *   title    – modal heading
 *   onClose  – close callback
 *   children – modal body content
 */
import { useEffect, useRef } from 'react';

export default function Modal({ title, onClose, children }) {
  const dialogRef = useRef(null);

  /* Trap focus & close on Escape */
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    el.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  /* Prevent scroll on body while open */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={dialogRef}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="modal__header">
          <h2 id="modal-title" className="modal__title">{title}</h2>
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close modal"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal__body-wrap">
          {children}
        </div>
      </div>
    </div>
  );
}
