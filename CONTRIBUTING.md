# Contributing

Thanks for helping improve the catalog. The easiest way to contribute is to open an issue with the "Suggest a site" form. If you are comfortable with Git, send a pull request.

## What belongs in the catalog

- Websites people open in a browser tab, such as web apps, tools, references and services. Browser extensions and desktop apps are out of scope, except through their web pages when that is how people use them.
- **General tab:** popular, useful sites that people use daily.
- **Privacy tab:** sites and services that respect user privacy. Say why a site qualifies (open source, audited, jurisdiction, business model). Sites with a real trade-off can still be listed if the reason is clear.
- No affiliate links, no sponsored entries, no tracking parameters in URLs.

## How the catalog is written

The catalog lives in `data/catalog.js`:

```
#g|Category name         starts a category (g = General, p = Privacy)
Site name|domain.com     one site per line
Site name|domain.in|IN   optional region: IN, US or UK
```

Use the bare domain (with a path only when needed). To add a site to a starter pack, also add its domain to that pack in `data/packs.js`.

## Testing a change

1. Run `npm test`. It catches duplicate domains and packs that point to missing sites.
2. Start a local server (`python -m http.server 8080`) and check that your site shows up in the right place.
3. Run `npm run check-links` to check the links.

## Pull requests

Keep each pull request small and focused, and describe what you changed and why.
