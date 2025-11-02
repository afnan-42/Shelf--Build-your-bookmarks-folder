import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildBookmarksHtml } from '../js/bookmarks.js';

const folders = [
  { name: 'AI & Tools', sites: [{ name: 'Example', domain: 'example.com' }, { name: 'Two', domain: 'two.org' }] },
  { name: 'Reading', sites: [{ name: 'Three', domain: 'three.net/path' }] },
];

test('writes a Netscape bookmarks file with every folder and link', () => {
  const html = buildBookmarksHtml(folders, { timestamp: 1 });
  assert.ok(html.startsWith('<!DOCTYPE NETSCAPE-Bookmark-file-1>'));
  assert.equal(html.match(/<A HREF=/g).length, 3);
  assert.ok(html.includes('<A HREF="https://three.net/path" ADD_DATE="1">Three</A>'));
});

test('escapes folder and site names', () => {
  const html = buildBookmarksHtml(folders, { timestamp: 1 });
  assert.ok(html.includes('AI &amp; Tools'));
  assert.ok(!html.includes('AI & Tools'));
});

test('marks the bookmarks bar folder only when asked', () => {
  assert.ok(buildBookmarksHtml(folders, { toolbar: true }).includes('PERSONAL_TOOLBAR_FOLDER="true"'));
  assert.ok(!buildBookmarksHtml(folders, { toolbar: false }).includes('PERSONAL_TOOLBAR_FOLDER'));
});

test('opening and closing list tags are balanced', () => {
  for (const toolbar of [true, false]) {
    const html = buildBookmarksHtml(folders, { toolbar });
    assert.equal(html.match(/<DL><p>/g).length, html.match(/<\/DL><p>/g).length);
  }
});
