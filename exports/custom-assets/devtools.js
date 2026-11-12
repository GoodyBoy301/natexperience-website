if (["localhost", "127.0.0.1"].includes(location.hostname)) {
  const panel = document.createElement("section");
  panel.id = "fd-preview-panel";
  panel.className = "fd-preview-panel";
  panel.hidden = true;
  panel.setAttribute("aria-labelledby", "fd-preview-title");
  panel.innerHTML = `
    <h2 id="fd-preview-title">Local preview</h2>
    <dl>
      <dt>Storefront</dt><dd data-storefront>Loading…</dd>
      <dt>Asset CDN</dt><dd data-cdn></dd>
      <dt>Page</dt><dd data-page></dd>
      <dt>Viewport</dt><dd data-viewport></dd>
      <dt>Headings</dt><dd data-headings></dd>
    </dl>
    <button type="button" data-refresh>Reload preview</button>
  `;

  const toggle = document.createElement("button");
  toggle.className = "fd-preview-toggle";
  toggle.type = "button";
  toggle.textContent = "Preview tools";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", panel.id);
  toggle.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    toggle.setAttribute("aria-expanded", String(!panel.hidden));
    if (!panel.hidden) {
      panel.querySelector("[data-page]").textContent = location.pathname;
      panel.querySelector("[data-viewport]").textContent =
        `${innerWidth} × ${innerHeight}`;
      panel.querySelector("[data-headings]").textContent =
        document.querySelectorAll("h1, h2, h3, h4, h5, h6").length;
      fetch("/__preview/config")
        .then((response) => response.json())
        .then(({ storefront, assetCdnOrigin }) => {
          panel.querySelector("[data-storefront]").textContent = storefront;
          panel.querySelector("[data-cdn]").textContent = assetCdnOrigin;
        })
        .catch(() => {
          panel.querySelector("[data-storefront]").textContent = "Unavailable";
        });
    }
  });
  panel
    .querySelector("[data-refresh]")
    .addEventListener("click", () => location.reload());

  document.body.append(toggle, panel);
}
