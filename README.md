# NATExperience Website

Frontdesk storefront customizations and local preview tools for NATExperience. Wrangler proxies storefront requests to the configured live Frontdesk origin and layers files from `exports/` onto HTML responses.

## Start local development

1. Set `FRONTDESK_ORIGIN` in `wrangler.toml` to NATExperience's full HTTPS Frontdesk storefront origin.
2. Install dependencies and start the Worker:

   ```sh
   bun install
   bun run dev
   ```

3. Open `http://localhost:8787`. Wrangler live reload is enabled.

The `Preview tools` button appears on local pages and reports the storefront, asset CDN, current route, viewport size, and heading count. It also reloads the preview.

## Customize the storefront

- `exports/head.html` is inserted before `</head>` on HTML pages.
- `exports/body-end.html` is inserted before `</body>` on HTML pages.
- `exports/custom-assets/` contains styles, scripts, images, and other local assets.

`custom.css` contains the red, black, and white homepage styling. `site.js` adds the marketing sections around the native FrontDesk store, FAQ, and checkout flows. Keep storefront-owned booking behavior in the native page; use `exports/` for the visual layer and added content.

## Publish assets to Cloudflare

Deploy all files from `exports/custom-assets/` with a logged-in Cloudflare account:

```sh
bun run deploy:assets
```

Wrangler prints the deployed `workers.dev` origin. List copy-ready URLs for all assets with:

```sh
bun run assets:urls -- https://natexperience-assets.ACCOUNT_SUBDOMAIN.workers.dev
```

Set `ASSET_CDN_ORIGIN` in `wrangler.toml` to the deployed origin. During local preview, CDN references are rewritten to the matching local assets so edits appear without re-uploading. Rename an asset or add a query version to invalidate a cached URL.

## FrontDesk section exports

`frontdesk/home/sections/` contains seven independent Custom HTML sections, including a cinematic custom hero followed by six content sections. Each Markdown file has complete `html`, `css`, and `js` blocks so it can be copied into a FrontDesk section without relying on the proxy's shared stylesheet or JavaScript. Keep native event products, checkout, and FAQ sections native; place the custom sections around them as needed. The local preview generates `exports/custom-assets/local-sections.html` from these Markdown files before Wrangler starts, so the section files remain the single editable source of truth.

Suggested order: Hero, About, Upcoming Event, Past Editions, Experience, Event Formats, Event Management. The hero and upcoming-event sections use the storefront's public FrontDesk data: the hero displays its configured background image and the date and ticket link for the nearest future published event, while the upcoming-event section also builds a countdown from that event. Assign the native booking products and FAQ after Event Management if that matches the live page layout. Replace the About image with an approved NATExperience photo before publishing.

## Debugging

Run `bun run dev` in a terminal and use Wrangler's output and local inspector for Worker issues. Use browser DevTools for network requests, DOM inspection, and console errors. This is a connected preview: storefront data and backend actions still come from Frontdesk, so an internet connection and working storefront are required.
