import { escapeHtml } from './util.js';

/**
 * Builds a Netscape bookmarks file, the format every browser can import.
 *
 * @param {{name: string, sites: {name: string, domain: string}[]}[]} folders
 * @param {{toolbar?: boolean, timestamp?: number}} [options]
 *   toolbar: wrap the folders in a bookmarks-bar folder (default true)
 *   timestamp: Unix time in seconds used for ADD_DATE (default: now)
 */
export function buildBookmarksHtml(folders, { toolbar = true, timestamp = Math.floor(Date.now() / 1000) } = {}) {
  const lines = [
    '<!DOCTYPE NETSCAPE-Bookmark-file-1>',
    '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">',
    '<TITLE>Bookmarks</TITLE>',
    '<H1>Bookmarks</H1>',
    '<DL><p>',
  ];
  if (toolbar) {
    lines.push(`<DT><H3 ADD_DATE="${timestamp}" PERSONAL_TOOLBAR_FOLDER="true">Bookmarks bar</H3>`, '<DL><p>');
  }
  for (const folder of folders) {
    lines.push(`<DT><H3 ADD_DATE="${timestamp}">${escapeHtml(folder.name)}</H3>`, '<DL><p>');
    for (const site of folder.sites) {
      lines.push(`<DT><A HREF="https://${escapeHtml(site.domain)}" ADD_DATE="${timestamp}">${escapeHtml(site.name)}</A>`);
    }
    lines.push('</DL><p>');
  }
  if (toolbar) lines.push('</DL><p>');
  lines.push('</DL><p>', '');
  return lines.join('\n');
}
