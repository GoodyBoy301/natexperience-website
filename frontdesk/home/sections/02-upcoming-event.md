```html
<section
  id="next-event"
  class="nat-next"
  data-storefront-ref="01a1cf12-cd3f-72b5-b752-ea33209a16b8"
  aria-labelledby="nat-next-title"
>
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
```

```css
@import url("https://fonts.cdnfonts.com/css/helvetica-neue-55");
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&display=swap");
.nat-next,
.nat-next * {
  box-sizing: border-box;
}
.nat-next {
  position: relative;
  left: 50%;
  display: grid;
  width: 100vw;
  max-width: 100vw;
  aspect-ratio: 839 / 514;
  transform: translateX(-50%);
  place-items: center;
  overflow: hidden;
  padding: clamp(132px, 19vh, 190px) 7% clamp(80px, 13vh, 130px);
  background: transparent;
  color: #fff;
  font-family: "Helvetica Neue", sans-serif;
  text-align: center;
}
.nat-next::before {
  position: absolute;
  inset: -64px 0 0;
  background: url("https://natexperience-assets.goodyboy-work.workers.dev/countdown-bg.svg")
    center / 100% 100% no-repeat;
  content: "";
}
.nat-next__content {
  position: relative;
  z-index: 1;
  width: min(100%, 1120px);
}
.nat-countdown {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(10px, 2vw, 34px);
  padding-bottom: 34px;
  border-bottom: 1px solid rgb(255 255 255 / 24%);
  font-variant-numeric: tabular-nums;
}
.nat-countdown[hidden],
.nat-next a[hidden] {
  display: none;
}
.nat-countdown > div {
  display: grid;
  gap: 12px;
}
.nat-countdown strong {
  font-family: "Oswald", "Arial Narrow", sans-serif !important;
  font-size: clamp(4rem, 11vw, 10rem);
  font-weight: 700;
  line-height: 0.95;
}
.nat-countdown > div:not(:last-child) {
  position: relative;
}
.nat-countdown > div:not(:last-child)::after {
  position: absolute;
  top: 0;
  right: calc(clamp(10px, 2vw, 34px) / -2);
  transform: translateX(50%);
  font-family: "Oswald", "Arial Narrow", sans-serif;
  font-size: clamp(4rem, 11vw, 10rem);
  font-weight: 700;
  line-height: 0.95;
  content: ":";
}
.nat-countdown span {
  font-size: clamp(0.75rem, 1.1vw, 1rem);
  opacity: 0.85;
}
.nat-next p {
  margin: 20px 0 8px;
  font-size: clamp(0.8rem, 1.2vw, 1rem);
  font-weight: 600;
  text-transform: uppercase;
}

.nat-next a {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  padding: 0 24px;
  border: 1px solid rgb(255 255 255 / 75%);
  color: #fff;
  font-weight: 700;
  text-decoration: none;
}
.nat-next a:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 4px;
}
@media (max-width: 800px) {
  .nat-next {
    min-height: max(100svh, 680px);
    padding-inline: 7%;
  }
  .nat-countdown {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 34px 12px;
  }
  .nat-countdown > div:nth-child(2)::after {
    display: none;
  }
  .nat-countdown > div:not(:last-child)::after {
    right: -6px;
    font-size: clamp(3rem, 16vw, 6rem);
  }
  .nat-countdown strong {
    font-size: clamp(4rem, 18vw, 7rem);
  }
}
```

```js
const section = document.querySelector(".nat-next[data-storefront-ref]");
if (section) {
  const countdown = section.querySelector(".nat-countdown");
  const name = section.querySelector("#nat-next-title");
  const link = section.querySelector("a");
  const update = () => {
    const remaining = Math.max(
      0,
      Date.parse(countdown.dataset.countdownTarget) - Date.now(),
    );
    const values = {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor((remaining / 3600000) % 24),
      minutes: Math.floor((remaining / 60000) % 60),
      seconds: Math.floor((remaining / 1000) % 60),
    };
    Object.entries(values).forEach(([unit, value]) => {
      countdown.querySelector(`[data-countdown-${unit}]`).textContent = String(
        value,
      ).padStart(2, "0");
    });
  };

  fetch(
    `https://api.frontdesk.africa/v1/storefront/${encodeURIComponent(section.dataset.storefrontRef)}`,
    {
      headers: { Accept: "application/json" },
      cache: "no-store",
    },
  )
    .then((response) => {
      if (!response.ok) throw new Error("Event request failed");
      return response.json();
    })
    .then(({ data }) => {
      const now = Date.now();
      const event = (Array.isArray(data?.events) ? data.events : [])
        .filter(
          (item) =>
            item.publishedAt &&
            item.title &&
            item.slug &&
            Number.isFinite(Date.parse(item.startAt)) &&
            Date.parse(item.startAt) > now,
        )
        .sort((a, b) => Date.parse(a.startAt) - Date.parse(b.startAt))[0];
      if (!event) {
        name.textContent = "NO UPCOMING EVENT ANNOUNCED";

        return;
      }

      name.textContent = `UNTIL ${event.title}`;
      countdown.dataset.countdownTarget = event.startAt;
      countdown.hidden = false;
      link.href = `/events/${encodeURIComponent(event.slug)}`;
      link.hidden = false;
      update();
      window.setInterval(update, 1000);
    })
    .catch(() => {
      name.textContent = "EVENT DETAILS UNAVAILABLE";
    });
}
```
