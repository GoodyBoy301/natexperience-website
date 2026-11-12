# Frontdesk Forge

A ready-to-run local workspace for developing and debugging Frontdesk storefront customizations. Wrangler runs the same proxy Worker for every route: the live storefront provides its normal pages and data, while files in `exports/` are layered on locally. No framework runtime or project-specific section IDs are required.

## Start here

1. `wrangler.toml` is preconfigured to use the demo storefront at `https://starter.pv.pro`. Change `FRONTDESK_ORIGIN` there when using a different store.
2. Install and start the local Worker:

   ```sh
   bun install
   bun run dev
   ```

3. Open `http://localhost:8787`. Wrangler live reload is enabled.

The `Preview tools` button appears on local pages only. It shows the storefront, asset CDN, current route, viewport size, and heading count, and lets you reload the preview. `/__preview/config` is only available on localhost.

## Publish assets to Cloudflare

The `exports/custom-assets/` directory is also a standalone Cloudflare Worker static-asset site. Deploy it with a logged-in Cloudflare account:

```sh
bun run deploy:assets
```

Wrangler prints the deployed `workers.dev` URL. Use that origin to list copy-ready URLs for every file:

```sh
bun run assets:urls -- https://frontdesk-forge-assets.ACCOUNT_SUBDOMAIN.workers.dev
```

Set `ASSET_CDN_ORIGIN` in `wrangler.toml` to that origin. Use the printed absolute URLs for images in markup and `url(...)` references in CSS, or script `src`/`href` attributes. The asset Worker applies CDN cache headers; rename an asset or add a query version when you need to invalidate a cached URL.

During local preview, the proxy rewrites URLs from `ASSET_CDN_ORIGIN` back to the matching local file in `exports/custom-assets/`. This means edits are visible immediately without re-uploading. The Preview tools panel reports whether the CDN origin is configured.

## Customize the storefront

- `exports/head.html` is inserted before `</head>` on HTML pages.
- `exports/body-end.html` is inserted before `</body>` on HTML pages.
- `exports/custom-assets/` contains files served locally by the preview Worker and published by `bun run deploy:assets`.

`custom.css` contains reusable starter tokens and scoped classes; `devtools.js` and `devtools.css` provide the local toolbar. The starter classes (`fd-starter-container`, `fd-starter-heading`, `fd-starter-card`, and `fd-starter-button`) are opt-in and don’t restyle the storefront by themselves. Because custom code runs against the live storefront, inspect the target page's DOM before adding selectors or page-specific behavior. Storefront data and backend actions continue to use Frontdesk, so previewing requires an internet connection and a working storefront.

## Debugging

Run `bun run dev` in a terminal and use Wrangler's request logs and local inspector for Worker issues. The toolbar is a quick page-level check; use browser DevTools for network requests, DOM inspection, and console errors.
