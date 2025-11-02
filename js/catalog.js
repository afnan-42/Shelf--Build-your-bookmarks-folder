/**
 * Parses the catalog text into categories and a lookup of sites by domain.
 * See data/catalog.js for the line format.
 */
export function parseCatalog(text) {
  const categories = [];
  const sites = {};
  for (const line of text.split('\n')) {
    if (!line) continue;
    if (line[0] === '#') {
      const [tab, name] = line.slice(1).split('|');
      categories.push({ tab, name, sites: [] });
      continue;
    }
    const [name, domain, region = ''] = line.split('|');
    const category = categories[categories.length - 1];
    const site = { name, domain, region, category };
    sites[domain] = site;
    category.sites.push(site);
  }
  return { categories, sites };
}

/** Turns a space-separated pack definition into the list of known domains. */
export function parsePack(definition, sites) {
  return definition.split(' ').filter((domain) => sites[domain]);
}
