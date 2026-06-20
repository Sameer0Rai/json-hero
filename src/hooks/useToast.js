import { useState, useCallback } from 'react';

let toastId = 0;

/**
 * useToast – lightweight toast notification hook
 * Returns { toasts, showToast }
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type, exiting: false }]);

    // Start exit animation after 2.5 s
    setTimeout(() => {
      setToasts(prev =>
        prev.map(t => (t.id === id ? { ...t, exiting: true } : t))
      );
      // Remove from DOM after animation (250 ms)
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 280);
    }, 2500);
  }, []);

  return { toasts, showToast };
}
