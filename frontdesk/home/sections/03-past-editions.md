```html
<section id="events" class="nat-events" aria-labelledby="nat-events-title">
  <h2
    id="nat-events-title"
    data-fd-field="events.heading"
    data-fd-label="Events heading"
  >
    Our Events
  </h2>
  <div class="nat-events__group">
    <h3>Upcoming</h3>
    <ol class="nat-events__list" data-upcoming-event-list aria-live="polite">
      <li class="nat-events__empty">Loading upcoming events…</li>
    </ol>
  </div>
  <div class="nat-events__group">
    <h3>Past</h3>
    <ol class="nat-events__list">
      <li>
        <a
          class="nat-events__row nat-events__row--past"
          href="https://www.youtube.com/channel/UCJqL2utf4_qrIGi4zscI88w/videos"
          target="_blank"
          rel="noopener noreferrer"
          ><strong>Browse past editions on YouTube</strong
          ><span>Watch videos</span></a
        >
      </li>
    </ol>
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

.nat-events,
.nat-events * {
  box-sizing: border-box;
}
.nat-events {
  width: 100%;
  padding: 4rem max(2.4rem, calc((100% - 144rem) / 2));
  background: #0d0f14;
  color: #fff;
  font-family: "Outfit", sans-serif;
}
.nat-events h2 {
  margin: 0 0 4rem;
  font-size: 9.6rem !important;
  font-weight: 500;
  line-height: 0.98;
  letter-spacing: -0.06em;
  text-align: center !important;
}
.nat-events__group + .nat-events__group {
  margin-top: 4rem;
}
.nat-events__group h3 {
  margin: 0 0 1.8rem;
  font-size: 4.48rem !important;
  font-weight: 500;
  letter-spacing: -0.04em;
  text-align: left !important;
}
.nat-events__list {
  display: grid;
  gap: 0.9rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.nat-events__row {
  display: grid;
  min-height: 7rem;
  grid-template-columns: minmax(16rem, 0.75fr) minmax(0, 1.5fr) auto;
  align-items: center;
  gap: 1.6rem;
  padding: 1.2rem 1.8rem;
  border-radius: 0.9rem;
  color: #fff;
  text-decoration: none;
}
.nat-events__row--upcoming {
  background: #3549ed;
}
.nat-events__row--past {
  background: #34363b;
}
.nat-events__row time {
  color: rgb(255 255 255 / 72%);
  font-size: 1.44rem;
  white-space: nowrap;
}
.nat-events__row strong {
  justify-self: center;
  font-size: 1.92rem;
  font-weight: 500;
  text-align: center;
}
.nat-events__row > span {
  padding: 1rem 1.3rem;
  border: 1px solid rgb(255 255 255 / 22%);
  border-radius: 0.6rem;
  color: rgb(255 255 255 / 84%);
  font-size: 1.088rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}
.nat-events__row:hover,
.nat-events__row:focus-visible {
  filter: brightness(1.08);
}
.nat-events__row:focus-visible {
  outline: 0.2rem solid #fff;
  outline-offset: 0.3rem;
}
.nat-events__empty {
  padding: 1.8rem;
  border-radius: 0.9rem;
  background: #34363b;
  color: rgb(255 255 255 / 72%);
}
@media (max-width: 700px) {
  .nat-events h2 {
    font-size: 4.68rem !important;
  }
  .nat-events {
    padding-inline: 2rem;
  }
  .nat-events__row {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.8rem 1.2rem;
    padding: 1.2rem;
  }
  .nat-events__row time {
    grid-column: 1 / -1;
  }
  .nat-events__row strong {
    justify-self: start;
    text-align: left;
  }
  .nat-events__row > span {
    padding: 0.8rem 1rem;
    font-size: 0.992rem;
  }
}

.nat-events :is(h1, h2, h3) {
  font-family: "Sora", sans-serif;
}
```

```js
const list = document.querySelector("[data-upcoming-event-list]");
const getUpcomingEvents = () =>
  (Array.isArray(window.FD?.events) ? window.FD.events : [])
    .filter(
      (event) =>
        event.title &&
        event.slug &&
        Number.isFinite(Date.parse(event.startAt)) &&
        Date.parse(event.startAt) > Date.now(),
    )
    .sort((a, b) => Date.parse(a.startAt) - Date.parse(b.startAt));

const publishEvents = () => {
  const events = getUpcomingEvents();
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
    const link = document.createElement("a");
    link.className = "nat-events__row nat-events__row--upcoming";
    link.href = `/events/${encodeURIComponent(event.slug)}`;
    link.addEventListener("click", (click) => {
      click.preventDefault();
      window.parent.postMessage(
        { type: "nat:open-event", slug: event.slug, title: event.title },
        "*",
      );
    });
    const date = document.createElement("time");
    date.dateTime = event.startAt;
    date.textContent = new Intl.DateTimeFormat("en-NG", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Africa/Lagos",
    }).format(new Date(event.startAt));
    const title = document.createElement("strong");
    title.textContent = event.title;
    const action = document.createElement("span");
    action.textContent = "View event";
    link.append(date, title, action);
    item.append(link);
    list.append(item);
  });
};

window.addEventListener("message", (event) => {
  if (event.data?.type === "nat:request-events") publishEvents();
});
publishEvents();
```
