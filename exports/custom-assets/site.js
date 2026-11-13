(() => {
  const shell = {
    header: document.querySelector(".nat-custom-header")?.outerHTML,
    footer: document.querySelector(".nat-custom-footer")?.outerHTML,
  };

  const ensureShell = () => {
    document
      .querySelectorAll("[data-frontdesk-widget]")
      .forEach((widget) => widget.remove());

    if (shell.header && !document.querySelector(".nat-custom-header")) {
      document.body.insertAdjacentHTML("afterbegin", shell.header);
    }
    if (shell.footer && !document.querySelector(".nat-custom-footer")) {
      document.body.insertAdjacentHTML("beforeend", shell.footer);
    }
  };

  const observeShell = () => {
    ensureShell();
    new MutationObserver(ensureShell).observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  observeShell();

  let menuCloseTimer;

  const closeMenus = (except) => {
    document.querySelectorAll(".nat-nav-item.is-open").forEach((item) => {
      if (item === except) return;
      const menu = item.querySelector(".nat-nav-menu");
      const header = item.closest(".nat-custom-header");
      if (menu) {
        header.dataset.navPanelHeight = String(
          menu.getBoundingClientRect().height,
        );
        menu.style.setProperty("--nat-nav-row-height", "0px");
        menu.inert = true;
        menu.setAttribute("aria-hidden", "true");
      }
      item.classList.remove("is-open");
      item
        .querySelector("button[aria-expanded]")
        ?.setAttribute("aria-expanded", "false");
    });
  };

  const setMenuOpen = (item, open) => {
    if (!item) return;
    const menu = item.querySelector(".nat-nav-menu");
    const header = item.closest(".nat-custom-header");
    if (open && item.classList.contains("is-open")) return;

    if (open && menu) {
      const activeMenu = document.querySelector(
        ".nat-nav-item.is-open > .nat-nav-menu",
      );
      const startHeight =
        activeMenu?.getBoundingClientRect().height ||
        Number(header.dataset.navPanelHeight) ||
        0;
      closeMenus(item);
      menu.style.setProperty("--nat-nav-row-height", `${startHeight}px`);
      item.classList.add("is-open");
      menu.inert = false;
      menu.setAttribute("aria-hidden", "false");
      requestAnimationFrame(() => {
        const inner = menu.querySelector(".nat-nav-menu__inner");
        const limit =
          window.innerHeight - header.getBoundingClientRect().height;
        const targetHeight = Math.min(inner.scrollHeight, limit);
        menu.style.setProperty("--nat-nav-row-height", `${targetHeight}px`);
        header.dataset.navPanelHeight = String(targetHeight);
      });
    } else {
      closeMenus();
    }

    item
      .querySelector("button[aria-expanded]")
      ?.setAttribute("aria-expanded", String(open));
  };

  document.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch") return;
    const item = event.target.closest?.(".nat-nav-item");
    if (!item) return;
    window.clearTimeout(menuCloseTimer);
    if (!item.contains(event.relatedTarget)) setMenuOpen(item, true);
  });
  document.addEventListener("pointerout", (event) => {
    if (event.pointerType === "touch") return;
    const item = event.target.closest?.(".nat-nav-item");
    if (!item || item.contains(event.relatedTarget)) return;
    window.clearTimeout(menuCloseTimer);
    menuCloseTimer = window.setTimeout(() => {
      if (!item.matches(":hover")) setMenuOpen(item, false);
    }, 220);
  });
  document.addEventListener("focusin", (event) => {
    const item = event.target.closest?.(".nat-nav-item");
    if (item) setMenuOpen(item, true);
  });
  document.addEventListener("focusout", (event) => {
    const item = event.target.closest?.(".nat-nav-item");
    if (item && !item.contains(event.relatedTarget)) setMenuOpen(item, false);
  });
  document.addEventListener("click", (event) => {
    const button = event.target.closest?.(".nat-nav-item > button");
    if (button) {
      const item = button.closest(".nat-nav-item");
      const shouldOpen = window.matchMedia("(hover: hover)").matches
        ? true
        : button.getAttribute("aria-expanded") !== "true";
      setMenuOpen(item, shouldOpen);
    } else if (!event.target.closest?.(".nat-custom-header")) {
      closeMenus();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const openItem = document.querySelector(".nat-nav-item.is-open");
    if (!openItem) return;
    setMenuOpen(openItem, false);
    openItem.querySelector("button")?.focus();
  });

  const setCopy = (path, value) => {
    const element = document.querySelector(`[data-edit-path="${path}"]`);
    if (element) element.textContent = value;
  };

  const updateCountdowns = () => {
    document
      .querySelectorAll(".nat-countdown[data-countdown-target]")
      .forEach((countdown) => {
        const target = Date.parse(countdown.dataset.countdownTarget);
        if (!Number.isFinite(target)) return;

        const remaining = Math.max(0, target - Date.now());
        const values = {
          days: Math.floor(remaining / 86400000),
          hours: Math.floor((remaining / 3600000) % 24),
          minutes: Math.floor((remaining / 60000) % 60),
          seconds: Math.floor((remaining / 1000) % 60),
        };
        Object.entries(values).forEach(([unit, value]) => {
          const output = countdown.querySelector(`[data-countdown-${unit}]`);
          if (output) output.textContent = String(value).padStart(2, "0");
        });
      });
  };

  const resizeOpenMenu = (menu) => {
    if (!menu?.closest(".nat-nav-item.is-open")) return;
    requestAnimationFrame(() => {
      const inner = menu.querySelector(".nat-nav-menu__inner");
      const header = menu.closest(".nat-custom-header");
      const height = Math.min(
        inner.scrollHeight,
        window.innerHeight - header.getBoundingClientRect().height,
      );
      menu.style.setProperty("--nat-nav-row-height", `${height}px`);
      header.dataset.navPanelHeight = String(height);
    });
  };

  const renderUpcomingEvents = (events, timezone) => {
    const list = document.querySelector("[data-upcoming-events]");
    if (!list) return;

    list.replaceChildren();
    if (!events.length) {
      const status = document.createElement("p");
      status.className = "nat-menu-status";
      status.textContent = "No upcoming events announced yet.";
      list.append(status);
      resizeOpenMenu(list.closest(".nat-nav-menu"));
      return;
    }

    events.slice(0, 3).forEach((event) => {
      const card = document.createElement("a");
      card.className = "nat-menu-card nat-menu-card--event";
      card.href = `/events/${encodeURIComponent(event.slug)}`;
      const title = document.createElement("strong");
      title.textContent = event.title;
      const date = document.createElement("time");
      date.dateTime = event.startAt;
      date.textContent = new Intl.DateTimeFormat("en-NG", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: event.timezone || timezone || "UTC",
      }).format(new Date(event.startAt));
      const action = document.createElement("span");
      action.className = "nat-event-row__action";
      const actionLabel = document.createElement("b");
      actionLabel.textContent = "View event";
      action.append(actionLabel);
      card.append(date, title, action);
      list.append(card);
    });
    resizeOpenMenu(list.closest(".nat-nav-menu"));
  };

  const renderEventArchive = (events, timezone) => {
    const list = document.querySelector("[data-upcoming-event-list]");
    if (!list) return;

    list.replaceChildren();
    if (!events.length) {
      const empty = document.createElement("li");
      empty.className = "nat-events__empty";
      empty.textContent = "No upcoming events announced yet.";
      list.append(empty);
      return;
    }

    events.forEach((event) => {
      const item = document.createElement("li");
      const row = document.createElement("a");
      row.className = "nat-events__row nat-events__row--upcoming";
      row.href = `/events/${encodeURIComponent(event.slug)}`;

      const date = document.createElement("time");
      date.dateTime = event.startAt;
      date.textContent = new Intl.DateTimeFormat("en-NG", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: event.timezone || timezone || "UTC",
      }).format(new Date(event.startAt));

      const title = document.createElement("strong");
      title.textContent = event.title;
      const action = document.createElement("span");
      action.textContent = "View event";
      row.append(date, title, action);
      item.append(row);
      list.append(item);
    });
  };

  const eventDrawer = document.querySelector("#nat-event-drawer");
  const eventFrame = eventDrawer?.querySelector("iframe");
  const eventTitle = eventDrawer?.querySelector("#nat-event-drawer-title");
  const eventFallback = eventDrawer?.querySelector(
    ".nat-event-drawer__fallback",
  );
  let eventOpener;

  const themeEventFrame = () => {
    try {
      const frameDocument = eventFrame.contentDocument;
      if (
        frameDocument?.head &&
        !frameDocument.querySelector("[data-nat-event-theme]")
      ) {
        const style = frameDocument.createElement("style");
        style.dataset.natEventTheme = "";
        style.textContent = `
          :root, body {
            color-scheme: dark !important;
            scrollbar-color: #50545e #111318 !important;
            scrollbar-width: thin !important;
          }
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: #111318; }
          ::-webkit-scrollbar-thumb {
            border: 2px solid #111318;
            border-radius: 8px;
            background: #50545e;
          }
        `;
        frameDocument.head.append(style);
      }
    } catch {}
    eventFrame.classList.add("is-ready");
  };

  eventFrame?.addEventListener("load", themeEventFrame);

  const openEventDrawer = (slug, title, opener) => {
    if (!eventDrawer || !eventFrame || !/^[a-z0-9-]+$/i.test(slug)) return;
    const url = new URL(`/events/${encodeURIComponent(slug)}`, location.origin);
    eventOpener = opener || document.activeElement;
    eventTitle.textContent = title || "Event details";
    eventFallback.href = url.href;
    eventFrame.classList.remove("is-ready");
    eventFrame.src = url.href;
    if (!eventDrawer.open) eventDrawer.showModal();
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest?.('a[href*="/events/"]');
    if (!link || link.target === "_blank") return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;
    const slug = url.pathname.match(new RegExp("^/events/([^/]+)"))?.[1];
    if (!slug) return;
    event.preventDefault();
    openEventDrawer(decodeURIComponent(slug), link.textContent.trim(), link);
  });

  window.addEventListener("message", (event) => {
    if (
      ![...document.querySelectorAll("iframe")].some(
        (frame) => frame.contentWindow === event.source,
      )
    )
      return;
    const data = event.data;
    if (data?.type === "nat:event-data" && Array.isArray(data.events)) {
      const events = data.events.filter(
        (item) =>
          item &&
          typeof item.slug === "string" &&
          /^[a-z0-9-]+$/i.test(item.slug) &&
          typeof item.title === "string" &&
          Number.isFinite(Date.parse(item.startAt)) &&
          Date.parse(item.startAt) > Date.now(),
      );
      renderUpcomingEvents(events, data.timezone);
      renderEventArchive(events, data.timezone);
      return;
    }
    if (
      !data ||
      data.type !== "nat:open-event" ||
      typeof data.slug !== "string"
    )
      return;
    if (typeof data.title !== "string") return;
    openEventDrawer(data.slug, data.title.slice(0, 200));
  });

  eventDrawer
    ?.querySelector("[data-event-drawer-close]")
    ?.addEventListener("click", () => {
      eventDrawer.close();
    });
  eventDrawer?.addEventListener("click", (event) => {
    if (event.target === eventDrawer) eventDrawer.close();
  });
  eventDrawer?.addEventListener("close", () => {
    eventFrame.classList.remove("is-ready");
    eventFrame.src = "about:blank";
    eventOpener?.focus();
  });

  const loadNextEvent = () => {
    document.querySelectorAll("iframe").forEach((frame) => {
      frame.contentWindow?.postMessage({ type: "nat:request-events" }, "*");
    });
  };

  updateCountdowns();
  window.setInterval(updateCountdowns, 1000);

  const placeNewsletterFaq = () => {
    const section = document.querySelector(".nat-newsletter-faq");
    if (!section) return;

    const store = document.querySelector("#store");
    const faq = document.querySelector("#faq");
    if (store && section.previousElementSibling !== store) {
      store.insertAdjacentElement("afterend", section);
    }
    faq?.classList.add("nat-faq-hidden");
  };

  const enhanceStorefront = () => {
    if (document.body.dataset.natEnhanced) return;

    const hero = document.querySelector("#hero");
    const store = document.querySelector("#store");
    const faq = document.querySelector("#faq");
    const footer = document.querySelector('[data-sf-part="footer"]');

    document.body.dataset.natEnhanced = "true";
    document.body.classList.add("nat-site");

    if (!hero || !store || !faq) {
      renderCustomSections();
      return;
    }
    if (!footer) return;

    setCopy(
      "blockSections.hero.blocks.hero-headline.html",
      "Nights out for people who work all week.",
    );
    const heroSubtitle = document.querySelector(
      '[data-edit-path="blockSections.hero.blocks.hero-subtitle.html"]',
    );
    if (heroSubtitle) {
      heroSubtitle.innerHTML =
        "Lagos after-work parties for 9-to-5ers and young creatives.<br>DJs, live music and room to connect.";
    }
    setCopy(
      "blockSections.hero.blocks.hero-buttons.buttons.hero-btn-browse.label",
      "Browse events",
    );

    setCopy("section.store.heading", "Choose your night");
    setCopy(
      "section.store.intro",
      "Book an experience or get in touch about a private event.",
    );

    setCopy("footer.brandText", "N.A.T Experience");
    setCopy(
      "footer.tagline",
      "Lagos parties, live shows and event management.",
    );

    hero.insertAdjacentHTML(
      "afterend",
      `
      <section class="nat-section nat-about" id="about" aria-label="NATExperience event formats">
        <article class="nat-about__item">
          <img class="nat-about__image" src="https://natexperience-assets.goodyboy-work.workers.dev/after-work-parties.jpg" alt="A performer sings into a microphone at an after-work party" />
          <div class="nat-about__copy"><span class="nat-about__label">After-work parties</span><h2>When the workday wraps, step into a night of music, dancing, and good company.</h2><span class="nat-about__detail">9-5 block parties</span></div>
        </article>
        <article class="nat-about__item nat-about__item--reverse">
          <img class="nat-about__image" src="https://natexperience-assets.goodyboy-work.workers.dev/pool-parties.jpg" alt="A guest dancing at a party in a red hat and sunglasses" />
          <div class="nat-about__copy"><span class="nat-about__label">Pool parties</span><h2>Make the most of the sunshine with refreshing poolside parties, great music, and your favorite people.</h2><span class="nat-about__detail">DJs, music and a change of scene</span></div>
        </article>
        <article class="nat-about__item">
          <img class="nat-about__image" src="https://natexperience-assets.goodyboy-work.workers.dev/all-white-parties.jpg" alt="Guests celebrating together at an all-white party" />
          <div class="nat-about__copy"><span class="nat-about__label">All-white parties</span><h2>Show up in your best white, find your people, and dance together long after sunset.</h2><span class="nat-about__detail">Music, DJs and room to connect</span></div>
        </article>
      </section>
      <section class="nat-section nat-events" id="events" aria-labelledby="nat-events-title">
        <h2 id="nat-events-title">Our Events</h2>
        <div class="nat-events__group">
          <h3>Upcoming</h3>
          <ol class="nat-events__list" data-upcoming-event-list aria-live="polite"><li class="nat-events__empty">Loading upcoming events…</li></ol>
        </div>
        <div class="nat-events__group">
          <h3>Past</h3>
          <ol class="nat-events__list">
            <li><a class="nat-events__row nat-events__row--past" href="https://www.youtube.com/channel/UCJqL2utf4_qrIGi4zscI88w/videos" target="_blank" rel="noopener noreferrer"><strong>Browse past editions on YouTube</strong><span>Watch videos</span></a></li>
          </ol>
        </div>
      </section>
      <section class="nat-newsletter-faq" id="newsletter-faq" aria-label="Newsletter and frequently asked questions">
        <div class="nat-newsletter">
          <h2 id="nat-newsletter-title">Stay in the loop.</h2>
          <p>Be first to hear about upcoming parties, ticket drops, and new experiences.</p>
          <div class="nat-newsletter__signup">
            <label for="nat-newsletter-email">Email address</label>
            <div class="nat-newsletter__controls">
              <input id="nat-newsletter-email" type="email" placeholder="Your email address" autocomplete="email" disabled aria-describedby="nat-newsletter-note" />
              <button type="button" disabled>Subscribe</button>
            </div>
            <p id="nat-newsletter-note">Sign-up functionality coming soon.</p>
          </div>
        </div>
        <div class="nat-faq-column">
          <h2 id="nat-faq-title">FAQs</h2>
          <p class="nat-faq-intro">Dates, venues, music and tickets—what to know before you go.</p>
          <details class="nat-faq-card"><summary>What kinds of parties does NATExperience host?</summary><p>We specialize in high-energy private group experiences like after-work 9–5 events, all-white parties, and pool parties. Every event features music, DJs, and a lively atmosphere designed to bring people together.</p></details>
          <details class="nat-faq-card"><summary>Can I book NATExperience for a private birthday party?</summary><p>Yes, we love hosting birthdays. Our pool party setups include fun touches like floats and birthday signs, and we can tailor the vibe to your group.</p></details>
          <details class="nat-faq-card"><summary>Do you provide a DJ and music?</summary><p>Absolutely. Music and DJs are core to every NATExperience event. We handle the sound so you can focus on enjoying the night.</p></details>
          <details class="nat-faq-card"><summary>How much does it cost to book an event?</summary><p>Pricing depends on the event type, group size, and any custom options you want. Contact us with your party details and we will give you a tailored quote.</p></details>
          <details class="nat-faq-card"><summary>How do I book an event with NATExperience?</summary><p>Reach out through our website or contact channels and tell us your event date, group size, and preferred vibe. We will get back to you with next steps and availability.</p></details>
        </div>
      </section>
    `,
    );

    document.querySelector(".nat-about").insertAdjacentHTML(
      "afterend",
      `
      <section class="nat-next" id="next-event" data-storefront-ref="01a1cf12-cd3f-72b5-b752-ea33209a16b8" aria-labelledby="nat-next-title">
        <div class="nat-next__content">
          <div class="nat-countdown" aria-label="Countdown to the next event" hidden>
            <div><strong data-countdown-days>--</strong><span>Days</span></div>
            <div><strong data-countdown-hours>--</strong><span>Hours</span></div>
            <div><strong data-countdown-minutes>--</strong><span>Minutes</span></div>
            <div><strong data-countdown-seconds>--</strong><span>Seconds</span></div>
          </div>
          <p id="nat-next-title">Loading the next event…</p>
          <a href="#" target="_top" hidden>Get your ticket</a>
        </div>
      </section>

    `,
    );
    placeNewsletterFaq();
    loadNextEvent();
  };

  const renderCustomSections = () => {
    const slots = Array.from(
      document.querySelectorAll('[data-sf-section^="custom_html-"]'),
    );
    const sections = window.__natPreviewSections || [];
    if (!sections.length) return;
    const hero = sections.find((content) =>
      content.includes('class="nat-hero'),
    );
    const contentSections = sections.filter((content) => content !== hero);

    if (slots.length >= contentSections.length) {
      if (hero && !document.querySelector(".nat-hero")) {
        slots[0].insertAdjacentHTML("beforebegin", hero);
      }
      contentSections.forEach((content, index) => {
        slots[index].innerHTML = content;
      });
      placeNewsletterFaq();
      loadNextEvent();
      return;
    }
    if (slots.length) return;

    const main = document.querySelector("main");
    if (!main || main.querySelector("[data-nat-preview-sections]")) return;

    const group = document.createElement("div");
    group.dataset.natPreviewSections = "";
    group.style.display = "contents";
    group.innerHTML = sections.join("");
    const footer = main.querySelector('[data-sf-part="footer"]');
    main.insertBefore(group, footer || null);
    placeNewsletterFaq();
    loadNextEvent();
  };

  const restoreSections = () => {
    const sections = window.__natPreviewSections || [];
    if (!sections.length) return;

    const hero = sections.find((content) =>
      content.includes('class="nat-hero'),
    );
    const contentSectionCount = sections.length - Number(Boolean(hero));
    const slots = Array.from(
      document.querySelectorAll('[data-sf-section^="custom_html-"]'),
    );
    const requiredSections = [
      ".nat-about",
      ".nat-next",
      ".nat-events",
      ".nat-newsletter-faq",
    ];
    const sectionsMissing =
      requiredSections.some((selector) => !document.querySelector(selector)) ||
      (hero && !document.querySelector(".nat-hero"));

    if (
      (slots.length >= contentSectionCount && sectionsMissing) ||
      (!slots.length && !document.querySelector("[data-nat-preview-sections]"))
    ) {
      renderCustomSections();
    }
  };

  new MutationObserver(restoreSections).observe(document.body, {
    childList: true,
    subtree: true,
  });
  window.setTimeout(() => {
    enhanceStorefront();
    restoreSections();
  }, 1200);
})();
