/**
 * parseJSON – safely parse a JSON string.
 * Returns { ok: true, value } or { ok: false, error: string }
 */
export function parseJSON(input) {
  const trimmed = (input ?? '').trim();
  if (!trimmed) {
    return { ok: false, error: 'Please enter JSON' };
  }
  try {
    const value = JSON.parse(trimmed);
    return { ok: true, value };
  } catch (err) {
    return { ok: false, error: humanizeJsonError(err.message, trimmed) };
  }
}

/**
 * humanizeJsonError – make native JSON parse errors more readable.
 */
function humanizeJsonError(nativeMsg, raw) {
  // Try to extract position info from native error
  const posMatch = nativeMsg.match(/position (\d+)/i);
  if (posMatch) {
    const pos = parseInt(posMatch[1], 10);
    const line = (raw.substring(0, pos).match(/\n/g) || []).length + 1;
    return `${nativeMsg} (line ${line})`;
  }
  return nativeMsg;
}

/**
 * countStats – return character count and line count for a string.
 */
export function countStats(str) {
  if (!str) return { chars: 0, lines: 0 };
  const lines = str.split('\n').length;
  return { chars: str.length, lines };
}
