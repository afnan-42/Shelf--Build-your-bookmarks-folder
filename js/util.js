export const ICON_CHECK = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2.5 6.3 5 8.8 9.5 3.5"/></svg>';
export const ICON_FOLDER = '<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M1.5 3.5A1.5 1.5 0 0 1 3 2h3l1.5 1.5H13A1.5 1.5 0 0 1 14.5 5v7A1.5 1.5 0 0 1 13 13.5H3A1.5 1.5 0 0 1 1.5 12z"/></svg>';

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };

/** Escapes text for safe use inside HTML text and attribute values. */
export const escapeHtml = (value) => String(value).replace(/[&<>"]/g, (c) => HTML_ESCAPES[c]);

/** Returns a stable hue (0-359) for a string, used to colour the letter tiles. */
export function hueFor(text) {
  let hue = 0;
  for (const ch of text) hue = (hue * 31 + ch.charCodeAt(0)) % 360;
  return hue;
}
