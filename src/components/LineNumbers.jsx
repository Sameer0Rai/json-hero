import { useMemo } from 'react';

/**
 * LineNumbers – renders line number gutter in sync with a textarea's line count.
 * @param {string} value – current editor value
 */
export default function LineNumbers({ value }) {
  const count = useMemo(() => {
    if (!value) return 1;
    return value.split('\n').length;
  }, [value]);

  return (
    <div className="line-numbers" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i + 1}>{i + 1}</span>
      ))}
    </div>
  );
}
