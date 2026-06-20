import { useMemo } from 'react';
import { countStats } from '../utils/jsonUtils';

/**
 * StatsBar – displays character and line counts for the current editor content.
 * @param {string} value - editor text value
 */
export default function StatsBar({ value }) {
  const { chars, lines } = useMemo(() => countStats(value), [value]);

  return (
    <div className="stats-bar" role="status" aria-live="polite" aria-label="Editor statistics">
      <div className="stats-bar__item">
        <span className="stats-bar__label">Characters:</span>
        <span className="stats-bar__value">{chars.toLocaleString()}</span>
      </div>
      <div className="stats-bar__item">
        <span className="stats-bar__label">Lines:</span>
        <span className="stats-bar__value">{lines.toLocaleString()}</span>
      </div>
    </div>
  );
}
