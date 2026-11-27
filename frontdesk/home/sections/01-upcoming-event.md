```html
<section
  id="next-event"
  class="nat-next zodiac-next"
  data-storefront-ref="01a1cf12-cd3f-72b5-b752-ea33209a16b8"
  aria-label="Project Sagittarius tickets"
>
  <div class="zodiac-next__tickets">
    <a
      class="zodiac-next__ticket"
      data-event-date="12-05"
      href="#"
      aria-disabled="true"
      tabindex="-1"
    >
      <span class="zodiac-next__stub" aria-hidden="true">
        <span class="zodiac-next__stub-brand">Zodiac Party</span>
        <span class="zodiac-next__stub-date">05 December</span>
      </span>
      <span class="zodiac-next__face">
        <span class="zodiac-next__title">Night One</span>
        <span class="zodiac-next__details">
          <strong>TRIB3 Lagos</strong>
          <span>288B Ajose Adeogun, Victoria Island</span>
          <span>Doors 8PM</span>
        </span>
        <span class="zodiac-next__date"
          >05 December <small>Project Sagittarius</small></span
        >
        <span class="zodiac-next__action">Get tickets</span>
        <span class="zodiac-next__art" aria-hidden="true"></span>
      </span>
    </a>
    <a
      class="zodiac-next__ticket zodiac-next__ticket--second"
      data-event-date="12-30"
      href="#"
      aria-disabled="true"
      tabindex="-1"
    >
      <span class="zodiac-next__stub" aria-hidden="true">
        <span class="zodiac-next__stub-brand">Zodiac Party</span>
        <span class="zodiac-next__stub-date">30 December</span>
      </span>
      <span class="zodiac-next__face">
        <span class="zodiac-next__title">Night Two</span>
        <span class="zodiac-next__details">
          <strong>TRIB3 Lagos</strong>
          <span>288B Ajose Adeogun, Victoria Island</span>
          <span>Doors 8PM</span>
        </span>
        <span class="zodiac-next__date"
          >30 December <small>Project Sagittarius</small></span
        >
        <span class="zodiac-next__action">Get tickets</span>
        <span class="zodiac-next__art" aria-hidden="true"></span>
      </span>
    </a>
  </div>
</section>
```

```css
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;500&family=Sora:wght@400;500&display=swap");

:root {
  font-size: max(50%, calc(100vw / 1512 * 10));
}

@media (max-width: 800px) {
  :root {
    font-size: 62.5%;
  }
}

.nat-next.zodiac-next,
.nat-next.zodiac-next * {
  box-sizing: border-box;
}

.nat-next.zodiac-next {
  position: relative;
  left: 50%;
  display: block;
  width: 100vw;
  min-height: 0;
  aspect-ratio: auto;
  transform: translateX(-50%);
  padding: 7rem 4rem 2rem;
  background: #0d0f14;
  font-family: "Outfit", sans-serif;
}

.nat-next.zodiac-next::before {
  display: none;
}

.zodiac-next__tickets {
  display: grid;
  width: min(100%, 144rem);
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.4rem;
  margin: 0 auto;
}

.nat-next .zodiac-next__ticket {
  --ticket-accent: #80abd2;
  --ticket-stock: #fff;
  --ticket-cut: radial-gradient(
    circle at center,
    #0d0f14 0.38rem,
    transparent 0.43rem
  );
  position: relative;
  display: grid;
  grid-template-columns: 26% minmax(0, 1fr);
  min-height: 28rem;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  color: #171717;
  text-align: left;
  font-weight: 400;
  text-decoration: none;
}

.nat-next .zodiac-next__ticket--second {
  --ticket-accent: #efa5a7;
}

.zodiac-next__stub,
.zodiac-next__face {
  align-self: stretch;
  border-radius: 2.4rem;
}

.zodiac-next__stub {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 2.2rem 2rem 2.2rem 1.6rem;
  background: var(--ticket-accent);
  color: #171717;
  font-size: 1.8rem;
  line-height: 1;
}

.zodiac-next__stub-brand,
.zodiac-next__stub-date {
  writing-mode: vertical-rl;
  text-transform: uppercase;
}

.zodiac-next__face {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 44%;
  grid-template-areas: "title artwork" "details artwork" "date artwork" "action artwork";
  align-content: space-between;
  align-items: start;
  gap: 1rem;
  padding: 1.6rem 5.8rem 1.6rem 1.8rem;
  background: var(--ticket-stock);
}

.zodiac-next__title {
  grid-area: title;
  font-size: 4.2rem;
  font-weight: 500;
  line-height: 0.89;
  letter-spacing: -0.05em;
  text-transform: uppercase;
}

.zodiac-next__details {
  grid-area: details;
  display: grid;
  gap: 0.3rem;
  font-size: 1.4rem;
  line-height: 1.2;
}

.zodiac-next__date {
  grid-area: date;
  font-size: 2rem;
  line-height: 1;
}

.zodiac-next__date small {
  display: block;
  margin-top: 0.4rem;
  font-size: 1.3rem;
}

.zodiac-next__action {
  grid-area: action;
  justify-self: start;
  font-size: 1.5rem;
  text-decoration: underline;
  text-underline-offset: 0.25em;
}

.zodiac-next__art {
  display: grid;
  grid-area: artwork;
  align-self: stretch;
  align-items: center;
  min-width: 0;
}

.zodiac-next__art::before {
  width: 100%;
  aspect-ratio: 1;
  background: #171717
    url("https://natexperience-assets.goodyboy-work.workers.dev/zodiac-party-hero-poster.jpg")
    center 57% / cover;
  mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20256%20256%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M%20108%200%20C%20119.046%200%20128%208.954%20128%2020%20L%20128.007%2019.483%20C%20128.281%208.676%20137.127%200%20148%200%20L%20236%200%20C%20247.046%200%20256%208.954%20256%2020%20L%20256%20108%20C%20256%20119.046%20247.046%20128%20236%20128%20C%20247.046%20128%20256%20136.954%20256%20148%20L%20256%20236%20C%20256%20247.046%20247.046%20256%20236%20256%20L%20148%20256%20C%20136.954%20256%20128%20247.046%20128%20236%20C%20128%20247.046%20119.046%20256%20108%20256%20L%2020%20256%20C%208.954%20256%200%20247.046%200%20236%20L%200%20148%20C%200%20137.127%208.676%20128.281%2019.483%20128.007%20L%2020%20128%20C%208.954%20128%200%20119.046%200%20108%20L%200%2020%20C%200%208.954%208.954%200%2020%200%20Z%20M%20128%2064%20C%20128%2099.346%2099.346%20128%2064%20128%20C%2099.346%20128%20128%20156.654%20128%20192%20C%20128%20156.654%20156.654%20128%20192%20128%20C%20156.654%20128%20128%2099.346%20128%2064%20Z%22/%3E%3C/svg%3E")
    center / contain no-repeat;
  content: "";
}

.zodiac-next__ticket--second .zodiac-next__art::before {
  background-position: 65% 72%;
  mask-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20256%20256%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M%2078%200%20C%20105.614%200%20128%2022.386%20128%2050%20C%20128%2022.386%20150.386%200%20178%200%20L%20256%200%20L%20256%2078%20C%20256%20105.614%20233.614%20128%20206%20128%20C%20233.614%20128%20256%20150.386%20256%20178%20L%20256%20256%20L%20178%20256%20C%20150.386%20256%20128%20233.614%20128%20206%20C%20128%20233.614%20105.614%20256%2078%20256%20L%200%20256%20L%200%20178%20C%200%20150.386%2022.386%20128%2050%20128%20C%2022.386%20128%200%20105.614%200%2078%20L%200%200%20Z%22/%3E%3C/svg%3E");
}

.zodiac-next__ticket::after {
  position: absolute;
  inset: 0 auto 0 26%;
  width: 1rem;
  transform: translateX(-50%);
  background: var(--ticket-cut) center / 1rem 1.4rem repeat-y;
  pointer-events: none;
  content: "";
}

.zodiac-next__stub::before,
.zodiac-next__face::after {
  position: absolute;
  inset-block: 22%;
  width: 3.2rem;
  background: repeating-linear-gradient(
    to bottom,
    currentColor 0 0.1rem,
    transparent 0.1rem 0.27rem,
    currentColor 0.27rem 0.5rem,
    transparent 0.5rem 0.83rem
  );
  opacity: 0.7;
  pointer-events: none;
  content: "";
}

.zodiac-next__stub::before {
  left: 3rem;
  color: #fff;
}
.zodiac-next__face::after {
  right: 1.8rem;
  width: 3.1rem;
}

.nat-next .zodiac-next__ticket:focus-visible {
  outline: 0.3rem solid var(--ticket-accent);
  outline-offset: 0.5rem;
}

.zodiac-next__ticket[aria-disabled="true"] {
  cursor: default;
}
.zodiac-next__ticket[aria-disabled="true"] .zodiac-next__action {
  visibility: hidden;
}

@media (max-width: 800px) {
  .nat-next.zodiac-next {
    padding: 3.2rem 1.6rem;
  }
  .zodiac-next__tickets {
    grid-template-columns: 1fr;
    gap: 2.8rem;
  }
  .nat-next .zodiac-next__ticket {
    min-height: 0;
  }
  .zodiac-next__stub,
  .zodiac-next__face {
    border-radius: 1.3rem;
  }
  .zodiac-next__stub {
    justify-content: center;
    padding: 1rem;
    font-size: 1.2rem;
  }
  .zodiac-next__face {
    display: flex;
    flex-direction: column;
    padding: 1rem 2.4rem 1rem 1rem;
    gap: 0.5rem;
  }
  .zodiac-next__title {
    font-size: 3rem;
    white-space: nowrap;
  }
  .zodiac-next__art,
  .zodiac-next__stub-date,
  .zodiac-next__ticket[aria-disabled="true"] .zodiac-next__action {
    display: none;
  }
  .zodiac-next__details {
    font-size: 1.2rem;
  }
  .zodiac-next__date {
    font-size: 1.4rem;
  }
  .zodiac-next__date small,
  .zodiac-next__action {
    font-size: 1.2rem;
  }
  .zodiac-next__stub::before {
    left: 1rem;
    width: 1.8rem;
  }
  .zodiac-next__face::after {
    right: 0.8rem;
    width: 1.1rem;
  }
}
```

```js
const section = document.querySelector(
  ".nat-next.zodiac-next[data-storefront-ref]",
);
if (section) {
  const cards = [...section.querySelectorAll("[data-event-date]")];
  const getEvents = () =>
    (Array.isArray(window.FD?.events) ? window.FD.events : []).filter(
      (event) =>
        event.title &&
        event.slug &&
        Number.isFinite(Date.parse(event.startAt)) &&
        Date.parse(event.startAt) > Date.now(),
    );
  const getEventDate = (value) => {
    const parts = new Intl.DateTimeFormat("en", {
      timeZone: "Africa/Lagos",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date(value));
    const month = parts.find((part) => part.type === "month").value;
    const day = parts.find((part) => part.type === "day").value;
    return `${month}-${day}`;
  };
  const publishEvents = () => {
    const events = getEvents();
    window.parent.postMessage(
      {
        type: "nat:event-data",
        timezone: "Africa/Lagos",
        events: events.map(({ slug, title, startAt }) => ({
          slug,
          title,
          startAt,
          timezone: "Africa/Lagos",
        })),
      },
      "*",
    );
    cards.forEach((card) => {
      const event = events.find(
        ({ startAt }) => getEventDate(startAt) === card.dataset.eventDate,
      );
      card.dataset.eventSlug = event?.slug || "";
      card.setAttribute("aria-disabled", String(!event));
      card.tabIndex = event ? 0 : -1;
    });
  };

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      if (!card.dataset.eventSlug) return;
      const matchedEvent = getEvents().find(
        ({ slug }) => slug === card.dataset.eventSlug,
      );
      if (!matchedEvent) return;
      window.parent.postMessage(
        {
          type: "nat:open-event",
          slug: matchedEvent.slug,
          title: matchedEvent.title,
        },
        "*",
      );
    });
  });

  window.addEventListener("message", (event) => {
    if (event.data?.type === "nat:request-events") publishEvents();
  });
  publishEvents();
}
```
