# Shelf

<!-- Add a screenshot at docs/screenshot.png, then remove this line and the closing marker: ![Shelf screenshot](docs/screenshot.png) -->

Build a browser bookmarks file from a curated list of websites. Pick a starter pack or tick sites one by one, organise them into folders, and download a single file you can import into any browser.

No account, no tracking, no backend. Everything runs in your browser, and the file is built on your device.

## Features

- General and Privacy catalogs with about 235 sites
- Starter packs (Student, Creator, Developer, Office, Gamer, Everyday basics, plus privacy packs)
- Search across the whole catalog, "Select all" per category
- Region filter for shopping, news and finance
- Live preview of your bookmarks bar and folders
- Rename folders, remove sites, drag sites between folders
- Export as a standard Netscape bookmarks file (`bookmarks.html`)
- Save and restore your picks with a settings file or a share link, no login needed

## Run it locally

The app uses ES modules, so browsers will not run it straight from a file. There is no build step. Start the built-in server and open the address it prints:

```
npm start        # then open http://localhost:8080
```

## Tests

Requires Node 18 or newer (no dependencies to install).

```
npm test              # unit tests for the catalog, export file and share links
npm run check-links   # checks that every catalog link still responds
```

Tests also run automatically on every push through GitHub Actions.

## Deploy on GitHub Pages

1. Push this repository to GitHub.
2. Go to Settings, Pages, and choose the `main` branch, root folder.
3. Your site appears at `https://<username>.github.io/<repo>/`.

## Importing the file

- Chrome, Edge, Brave and other Chromium browsers: Settings, Import bookmarks, choose "Bookmarks HTML file". If your bookmarks bar already has items, the browser places everything inside an "Imported" folder. Empty the bar first, or drag the folders out afterwards.
- Firefox: Bookmarks, Manage bookmarks, Import and Backup, Import Bookmarks from HTML.
- Safari: File, Import From, Bookmarks HTML File.

## Editing the catalog

The catalog is plain data in `data/catalog.js`:

```
#g|Category name        <- starts a category (g = General tab, p = Privacy tab)
Site name|domain.com    <- one site per line
Site name|domain.in|IN  <- optional region code: IN, US or UK
```

Starter packs are listed in `data/packs.js` as space-separated domains. Run `npm test` after editing: it fails if a domain is duplicated or a pack refers to a site that is not in the catalog.

## Project structure

```
index.html                     page markup
css/styles.css                 styles, with light and dark themes
js/app.js                      user interface and state
js/catalog.js                  parses the catalog text
js/bookmarks.js                builds the bookmarks file (pure function, unit tested)
js/share.js                    encodes and decodes share links
js/util.js                     small helpers (HTML escaping, icons)
data/catalog.js                the site catalog
data/packs.js                  starter packs
tests/                         unit tests (node:test)
scripts/check-links.mjs        checks every catalog link
.github/workflows/             tests on every push, link check monthly
.github/ISSUE_TEMPLATE/        forms for suggesting sites and reporting broken links
```

## Contributing

Suggestions and fixes are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md), or open an issue with the "Suggest a site" form.

## Privacy

The page loads no third-party scripts, fonts or analytics. Your selection stays in the page until you download or share it. The share link stores your picks in the part of the address after `#`, which browsers never send to a server.

## License

MIT, see `LICENSE`.
