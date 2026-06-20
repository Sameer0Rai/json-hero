import Toast from './Toast';

/**
 * ToastContainer – renders all active toasts in the bottom-right corner.
 * @param {Array} toasts – array of { id, message, type, exiting }
 */
export default function ToastContainer({ toasts }) {
  if (!toasts.length) return null;

  return (
    <div className="toast-container" aria-label="Notifications">
      {toasts.map(t => (
        <Toast
          key={t.id}
          message={t.message}
          type={t.type}
          exiting={t.exiting}
        />
      ))}
    </div>
  );
}
