function rewriteUrl(value, fromOrigin, toOrigin) {
  try {
    const url = new URL(value);
    if (url.origin !== fromOrigin) return value;
    return `${toOrigin}${url.pathname}${url.search}${url.hash}`;
  } catch {
    return value;
  }
}

function rewriteCookies(headers) {
  const cookies = headers.getSetCookie?.();
  if (!cookies?.length) return;

  headers.delete("set-cookie");
  for (const cookie of cookies) {
    headers.append("set-cookie", cookie.replace(/;\s*Domain=[^;]*/i, ""));
  }
}

function rewriteAssetReferences(source, cdnOrigin, localOrigin) {
  if (!cdnOrigin || cdnOrigin.endsWith(".invalid")) return source;
  return source
    .split(cdnOrigin.replace(/\/$/, ""))
    .join(`${localOrigin}/custom-assets`);
}

function textResponse(source, headers, status = 200, statusText) {
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.set("content-encoding", "identity");
  return new Response(source, { status, statusText, headers });
}

function addNatSiteClass(html) {
  return html.replace(/<body\b([^>]*)>/i, (tag, attributes) => {
    if (/\bclass="[^"]*"/.test(attributes)) {
      return tag.replace(/class="([^"]*)"/, 'class="$1 nat-site"');
    }
    return `<body${attributes} class="nat-site">`;
  });
}

async function injectCustomMarkup(response, env, localOrigin) {
  if (!response.headers.get("content-type")?.includes("text/html")) {
    return response;
  }

  const [headResponse, bodyResponse, sectionsResponse, cssResponse] =
    await Promise.all([
      env.ASSETS.fetch(new Request("https://assets/head.html")),
      env.ASSETS.fetch(new Request("https://assets/body-end.html")),
      env.ASSETS.fetch(
        new Request("https://assets/custom-assets/local-sections.html"),
      ),
      env.ASSETS.fetch(new Request("https://assets/custom-assets/custom.css")),
    ]);
  const cdnOrigin = env.ASSET_CDN_ORIGIN?.replace(/\/$/, "");
  const customCss = cssResponse.ok
    ? rewriteAssetReferences(await cssResponse.text(), cdnOrigin, localOrigin)
    : "";
  const headMarkup = headResponse.ok
    ? rewriteAssetReferences(
        await headResponse.text(),
        cdnOrigin,
        localOrigin,
      ).replace(
        /<link rel="stylesheet" href="\/custom-assets\/custom\.css"\s*\/>/,
        `<style>${customCss}</style>`,
      )
    : "";
  const bodyMarkup = bodyResponse.ok
    ? rewriteAssetReferences(await bodyResponse.text(), cdnOrigin, localOrigin)
    : "";
  const localSections = sectionsResponse.ok
    ? await sectionsResponse.text()
    : "";
  if (!headMarkup && !bodyMarkup && !localSections) return response;

  const sections = [
    ...localSections.matchAll(/<template[^>]*>([\s\S]*?)<\/template>/g),
  ].map((match) => match[1].trim());
  const sectionsScript = `<script>window.__natPreviewSections=${JSON.stringify(sections)};</script>`;
  const html = addNatSiteClass(await response.text());
  const withHead =
    headMarkup || sections.length
      ? html.replace(/<\/head\s*>/i, `${headMarkup}${sectionsScript}</head>`)
      : html;
  const output = bodyMarkup
    ? withHead.replace(/<\/body\s*>/i, `${bodyMarkup}</body>`)
    : withHead;
  const headers = new Headers(response.headers);
  headers.delete("content-security-policy");
  headers.delete("content-security-policy-report-only");
  rewriteCookies(headers);

  return textResponse(output, headers, response.status, response.statusText);
}

export default {
  async fetch(request, env) {
    let storefront;
    try {
      storefront = new URL(env.FRONTDESK_ORIGIN);
      if (
        storefront.protocol !== "https:" ||
        storefront.hostname.endsWith(".invalid")
      ) {
        throw new Error();
      }
    } catch {
      return new Response(
        "Set FRONTDESK_ORIGIN in wrangler.toml to your Frontdesk storefront URL.",
        { status: 500 },
      );
    }

    const incoming = new URL(request.url);
    if (incoming.pathname === "/__preview/config") {
      if (!["localhost", "127.0.0.1"].includes(incoming.hostname)) {
        return new Response("Not found", { status: 404 });
      }
      const assetCdnOrigin = env.ASSET_CDN_ORIGIN?.replace(/\/$/, "");
      return Response.json({
        storefront: storefront.origin,
        assetCdnOrigin:
          assetCdnOrigin && !assetCdnOrigin.endsWith(".invalid")
            ? assetCdnOrigin
            : "Not configured",
      });
    }

    if (incoming.pathname.startsWith("/custom-assets/")) {
      const response = await env.ASSETS.fetch(
        new Request(
          `https://assets/${incoming.pathname.slice(1)}${incoming.search}`,
        ),
      );
      const contentType = response.headers.get("content-type") || "";
      if (!response.ok || !/(css|javascript)/i.test(contentType))
        return response;

      const cdnOrigin = env.ASSET_CDN_ORIGIN?.replace(/\/$/, "");
      const source = rewriteAssetReferences(
        await response.text(),
        cdnOrigin,
        incoming.origin,
      );
      const headers = new Headers(response.headers);
      return textResponse(
        source,
        headers,
        response.status,
        response.statusText,
      );
    }

    const localOrigin = incoming.origin;
    const upstream = new URL(
      `${incoming.pathname}${incoming.search}`,
      storefront.origin,
    );
    const headers = new Headers(request.headers);
    headers.delete("host");
    if (headers.has("origin")) headers.set("origin", storefront.origin);
    const referer = headers.get("referer");
    if (referer) {
      headers.set(
        "referer",
        rewriteUrl(referer, localOrigin, storefront.origin),
      );
    }

    const init = {
      method: request.method,
      headers,
      redirect: "manual",
    };
    if (request.method !== "GET" && request.method !== "HEAD") {
      init.body = request.body;
    }

    const upstreamResponse = await fetch(upstream, init);
    const responseHeaders = new Headers(upstreamResponse.headers);
    const location = responseHeaders.get("location");
    if (location) {
      responseHeaders.set(
        "location",
        rewriteUrl(location, storefront.origin, localOrigin),
      );
    }
    rewriteCookies(responseHeaders);

    const bodyForbidden =
      request.method === "HEAD" ||
      [204, 205, 304].includes(upstreamResponse.status);
    const response = new Response(
      bodyForbidden ? null : upstreamResponse.body,
      {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        headers: responseHeaders,
      },
    );

    return injectCustomMarkup(response, env, localOrigin);
  },
};
