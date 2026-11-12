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

The starter CSS tokens and classes in `custom.css` are opt-in. Inspect the target storefront DOM before writing page-specific selectors or behavior.

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

## Debugging

Run `bun run dev` in a terminal and use Wrangler's output and local inspector for Worker issues. Use browser DevTools for network requests, DOM inspection, and console errors. This is a connected preview: storefront data and backend actions still come from Frontdesk, so an internet connection and working storefront are required.
