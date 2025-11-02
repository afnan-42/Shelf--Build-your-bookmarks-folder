/** Encodes a plain object into a URL-safe string (used for share links). */
export function encodeState(state) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(state))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/** Reverses encodeState. Throws if the text is not valid. */
export function decodeState(text) {
  const base64 = text.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(decodeURIComponent(escape(atob(base64))));
}
