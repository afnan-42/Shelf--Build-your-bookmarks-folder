import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CATALOG } from '../data/catalog.js';
import { PACKS } from '../data/packs.js';
import { parseCatalog, parsePack } from '../js/catalog.js';

const { categories, sites } = parseCatalog(CATALOG);
const siteLines = CATALOG.split('\n').filter((l) => l && l[0] !== '#');

test('every catalog line becomes exactly one site (no duplicate domains)', () => {
  assert.equal(Object.keys(sites).length, siteLines.length);
});

test('categories belong to a known tab and are not empty', () => {
  for (const category of categories) {
    assert.ok(['g', 'p'].includes(category.tab), `${category.name} has an unknown tab`);
    assert.ok(category.sites.length > 0, `${category.name} is empty`);
  }
});

test('regions are one of IN, US or UK when present', () => {
  for (const site of Object.values(sites)) {
    assert.ok(['', 'IN', 'US', 'UK'].includes(site.region), `${site.domain} has region ${site.region}`);
  }
});

test('every domain in every pack exists in the catalog', () => {
  for (const [tab, packs] of Object.entries(PACKS)) {
    for (const [name, definition] of Object.entries(packs)) {
      const listed = definition.split(' ');
      assert.equal(parsePack(definition, sites).length, listed.length, `pack "${name}" (${tab}) has an unknown domain`);
    }
  }
});

test('domains look like hostnames', () => {
  for (const domain of Object.keys(sites)) {
    assert.match(domain, /^[a-z0-9.-]+\.[a-z]{2,}(\/[\w./-]*)?$/i, `${domain} looks wrong`);
  }
});
