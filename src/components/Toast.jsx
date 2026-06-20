/**
 * Toast – single animated toast notification
 * @param {string}  message
 * @param {'success'|'error'|'info'} type
 * @param {boolean} exiting – triggers exit animation
 */
export default function Toast({ message, type, exiting }) {
  const iconMap = { success: '✓', error: '✗', info: 'ℹ' };

  return (
    <div
      className={`toast toast--${type}${exiting ? ' toast--exiting' : ''}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <span className="toast__icon" aria-hidden="true">{iconMap[type] ?? 'ℹ'}</span>
      <span className="toast__msg">{message}</span>
    </div>
  );
}
