// Checks every site in the catalog and reports links that look dead.
// Usage: node scripts/check-links.mjs         (needs Node 18 or newer)
//        node scripts/check-links.mjs --list  (only prints how many sites would be checked)
import { CATALOG } from '../data/catalog.js';
import { parseCatalog } from '../js/catalog.js';

const sites = Object.values(parseCatalog(CATALOG).sites).map((s) => ({ name: s.name, url: `https://${s.domain}` }));

if (process.argv.includes('--list')) {
  console.log(`${sites.length} sites found`);
  process.exit(0);
}

// Many sites block bots. These statuses mean "alive but not letting us in".
const ALIVE = new Set([401, 403, 405, 429, 999]);

async function check({ name, url }) {
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, {
        method,
        redirect: 'follow',
        signal: AbortSignal.timeout(15000),
        headers: { 'user-agent': 'Mozilla/5.0 (compatible; ShelfLinkCheck/1.0)' },
      });
      if (res.ok || ALIVE.has(res.status)) return null;
      if (method === 'GET') return `${name} (${url}) returned ${res.status}`;
    } catch (err) {
      if (method === 'GET') return `${name} (${url}) failed: ${err.cause?.code || err.message}`;
    }
  }
  return null;
}

const problems = [];
const queue = [...sites];
await Promise.all(
  Array.from({ length: 10 }, async () => {
    while (queue.length) {
      const result = await check(queue.shift());
      if (result) problems.push(result);
    }
  })
);

console.log(`Checked ${sites.length} sites.`);
if (problems.length) {
  console.log(`\n${problems.length} possible problem(s):`);
  problems.sort().forEach((p) => console.log(' - ' + p));
  process.exit(1);
}
console.log('No problems found.');
