import { CATALOG } from '../data/catalog.js';
import { PACKS } from '../data/packs.js';
import { parseCatalog, parsePack } from './catalog.js';
import { buildBookmarksHtml } from './bookmarks.js';
import { encodeState, decodeState } from './share.js';
import { escapeHtml as esc, hueFor, ICON_CHECK, ICON_FOLDER } from './util.js';

const { categories, sites } = parseCatalog(CATALOG);
const REGIONS = ['IN', 'US', 'UK'];
const TABS = [['g', 'General'], ['p', 'Privacy']];

const state = {
  tab: 'g',
  region: '',
  query: '',
  toolbar: true,
  selected: new Set(),   // domains the user ticked
  overrides: {},         // domain -> folder name chosen by the user
  dragging: null,        // domain currently being dragged
};

const $ = (selector) => document.querySelector(selector);
const say = (text) => { $('#msg').textContent = text; };
const isVisible = (site) => !site.region || site.region === state.region;
const matchesQuery = (site) => !state.query || `${site.name} ${site.domain}`.toLowerCase().includes(state.query);
const visibleSites = (category) => category.sites.filter((s) => isVisible(s) && matchesQuery(s));
const packSites = (name) => parsePack(PACKS[state.tab][name], sites);

/** Groups selected sites by folder: the category name, unless the user renamed or moved them. */
function groupSelected() {
  const groups = new Map();
  for (const category of categories) {
    for (const site of category.sites) {
      if (!state.selected.has(site.domain)) continue;
      const folder = state.overrides[site.domain] || category.name;
      if (!groups.has(folder)) groups.set(folder, []);
      groups.get(folder).push(site);
    }
  }
  return groups;
}

// ---------- Rendering ----------

function siteRow(site) {
  const on = state.selected.has(site.domain);
  return `<button class="row${on ? ' on' : ''}" data-t="${esc(site.domain)}" aria-pressed="${on}">`
    + `<span class="tile" style="--h:${hueFor(site.domain)}">${esc(site.name[0])}</span>`
    + `<span class="nm">${esc(site.name)}<small>${esc(site.domain)}</small></span>`
    + `<span class="ck">${ICON_CHECK}</span></button>`;
}

function renderTabs() {
  $('#tabs').innerHTML = TABS.map(([key, label]) =>
    `<button role="tab" data-tab="${key}" aria-selected="${state.tab === key}">${label}</button>`).join('');
}

function renderPacks() {
  $('#packs').innerHTML = Object.keys(PACKS[state.tab]).map((name) => {
    const domains = packSites(name);
    const all = domains.every((d) => state.selected.has(d));
    return `<button class="pk${all ? ' on' : ''}" data-pk="${esc(name)}" aria-pressed="${all}">${esc(name)}<span>${domains.length}</span></button>`;
  }).join('');
}

function renderCatalog() {
  const shown = state.query ? categories : categories.filter((c) => c.tab === state.tab);
  let html = '';
  for (const category of shown) {
    const list = visibleSites(category);
    if (!list.length) continue;
    const all = list.every((s) => state.selected.has(s.domain));
    html += `<section class="cat"><h2>${esc(category.name)}`
      + `<button class="lnk" data-all="${categories.indexOf(category)}">${all ? 'Clear' : 'Select all'}</button></h2>`
      + `<div class="grid">${list.map(siteRow).join('')}</div></section>`;
  }
  $('#cat').innerHTML = html || `<p class="empty">Nothing matches “${esc(state.query)}”. Try a shorter name or a domain.</p>`;
}

function renderPreview() {
  const groups = groupSelected();
  const count = state.selected.size;
  $('#count').textContent = count
    ? `${count} site${count > 1 ? 's' : ''} in ${groups.size} folder${groups.size > 1 ? 's' : ''}`
    : 'Nothing selected yet';
  $('#dl').disabled = !count;

  const chips = [...groups.keys()].map((name) => `<span class="bc">${ICON_FOLDER}${esc(name)}</span>`).join('');
  $('#bar').innerHTML = (state.toolbar ? '' : '<span class="bc muted">Other bookmarks:</span>')
    + (chips || '<span class="bc muted">Your bookmarks bar</span>');

  let tree = '';
  groups.forEach((list, name) => {
    tree += `<section class="fold" data-f="${esc(name)}"><div class="fh">${ICON_FOLDER}`
      + `<input value="${esc(name)}" data-rn="${esc(name)}" aria-label="Folder name" style="width:${Math.max(8, name.length + 1)}ch"></div><ul>`
      + list.map((s) => `<li draggable="true" data-d="${esc(s.domain)}"><span class="tile sm" style="--h:${hueFor(s.domain)}">${esc(s.name[0])}</span>`
        + `<span class="nm">${esc(s.name)}</span><button class="x" data-rm="${esc(s.domain)}" aria-label="Remove ${esc(s.name)}">×</button></li>`).join('')
      + '</ul></section>';
  });
  if (count) tree += '<div class="fold nf" data-f="New folder">Drag a site here to start a new folder</div>';
  $('#tree').innerHTML = tree || '<p class="empty">Pick a pack or tick a few sites. Each category becomes a folder you can rename here.</p>';
}

function render() {
  document.body.dataset.tab = state.tab;
  renderTabs();
  renderPacks();
  renderCatalog();
  renderPreview();
}

// ---------- Selection ----------

function setAll(domains, on) {
  for (const domain of domains) on ? state.selected.add(domain) : state.selected.delete(domain);
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  const data = button.dataset;
  let focusKey = null;

  if ('tab' in data) {
    state.tab = data.tab;
    focusKey = 'tab';
  } else if ('pk' in data) {
    const domains = packSites(data.pk);
    setAll(domains, !domains.every((d) => state.selected.has(d)));
    focusKey = 'pk';
  } else if ('t' in data) {
    setAll([data.t], !state.selected.has(data.t));
    focusKey = 't';
  } else if ('all' in data) {
    const domains = visibleSites(categories[data.all]).map((s) => s.domain);
    setAll(domains, !domains.every((d) => state.selected.has(d)));
    focusKey = 'all';
  } else if ('rm' in data) {
    state.selected.delete(data.rm);
    delete state.overrides[data.rm];
  } else {
    return;
  }

  render();
  if (focusKey) document.querySelector(`[data-${focusKey}="${CSS.escape(data[focusKey])}"]`)?.focus();
});

$('#q').addEventListener('input', (e) => { state.query = e.target.value.trim().toLowerCase(); render(); });
$('#rg').addEventListener('change', (e) => { state.region = e.target.value; render(); });
$('#tb').addEventListener('change', (e) => { state.toolbar = e.target.checked; renderPreview(); });

// ---------- Folder editing ----------

$('#tree').addEventListener('change', (e) => {
  const oldName = e.target.dataset.rn;
  if (oldName === undefined) return;
  const newName = e.target.value.trim().slice(0, 60) || oldName;
  (groupSelected().get(oldName) || []).forEach((s) => { state.overrides[s.domain] = newName; });
  render();
});

document.addEventListener('dragstart', (e) => {
  const item = e.target.closest?.('li[data-d]');
  if (!item) return;
  state.dragging = item.dataset.d;
  e.dataTransfer.setData('text/plain', state.dragging);
});
$('#tree').addEventListener('dragover', (e) => {
  const folder = e.target.closest('.fold');
  if (folder && state.dragging) { e.preventDefault(); folder.classList.add('over'); }
});
$('#tree').addEventListener('dragleave', (e) => e.target.closest('.fold')?.classList.remove('over'));
$('#tree').addEventListener('drop', (e) => {
  const folder = e.target.closest('.fold');
  if (!folder || !state.dragging) return;
  e.preventDefault();
  state.overrides[state.dragging] = folder.dataset.f;
  state.dragging = null;
  render();
});

// ---------- Export, save and share ----------

function download(text, filename) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  say(`Saved ${filename}`);
}

$('#dl').addEventListener('click', () => {
  const folders = [...groupSelected()].map(([name, list]) => ({ name, sites: list }));
  download(buildBookmarksHtml(folders, { toolbar: state.toolbar }), 'bookmarks.html');
});

const snapshot = () => ({ v: 1, s: [...state.selected], o: state.overrides, b: state.toolbar, r: state.region });

function restore(saved) {
  state.selected.clear();
  Object.keys(state.overrides).forEach((k) => delete state.overrides[k]);
  (saved.s || []).forEach((d) => { if (sites[d]) state.selected.add(d); });
  Object.entries(saved.o || {}).forEach(([d, name]) => {
    if (sites[d] && state.selected.has(d) && typeof name === 'string') state.overrides[d] = name.slice(0, 60);
  });
  state.toolbar = saved.b !== false;
  state.region = REGIONS.includes(saved.r) ? saved.r : '';
  $('#tb').checked = state.toolbar;
  $('#rg').value = state.region;
  render();
}

$('#cp').addEventListener('click', async () => {
  const link = `${location.href.split('#')[0]}#${encodeState(snapshot())}`;
  const box = $('#lk');
  box.value = link;
  box.style.display = 'block';
  box.select();
  try {
    await navigator.clipboard.writeText(link);
    say('Link copied. It holds your picks and nothing else.');
  } catch {
    say('Copy the link above.');
  }
});

$('#sv').addEventListener('click', () => download(JSON.stringify(snapshot(), null, 1), 'shelf-settings.json'));

$('#op').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    restore(JSON.parse(await file.text()));
    say('Settings loaded.');
  } catch {
    say('That file is not a Shelf settings file.');
  }
  e.target.value = '';
});

// ---------- Start ----------

const hash = location.hash.slice(1);
try {
  if (hash.length > 8) restore(decodeState(hash)); else render();
} catch {
  render();
}
