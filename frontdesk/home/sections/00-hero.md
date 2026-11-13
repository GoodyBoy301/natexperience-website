```html
<section
  class="nat-hero"
  data-storefront-ref="01a1cf12-cd3f-72b5-b752-ea33209a16b8"
  aria-labelledby="nat-hero-title"
>
  <img
    class="nat-hero__image"
    src="https://natexperience-assets.goodyboy-work.workers.dev/hero-party.jpg"
    alt=""
    aria-hidden="true"
  />
  <div class="nat-hero__content">
    <h1 id="nat-hero-title">Nights out for people who work all week.</h1>
    <p>
      Lagos after-work parties for 9-to-5ers and young creatives. DJs, live
      music and room to connect.
    </p>

    <div class="nat-hero__actions">
      <a class="nat-hero__primary" data-next-event-link href="#next-event"
        >Get tickets</a
      >
      <a class="nat-hero__secondary" href="#about">What to expect</a>
    </div>
  </div>
</section>
```

```css
@import url("https://fonts.cdnfonts.com/css/helvetica-neue-55");
.nat-hero,
.nat-hero * {
  box-sizing: border-box;
}
.nat-hero {
  position: relative;
  display: grid;
  left: 50%;
  width: 100vw;
  max-width: 100vw;
  min-height: max(680px, calc(100svh - 80px));
  transform: translateX(-50%);
  place-items: center;
  overflow: hidden;
  margin: 0;
  border-radius: 0;
  background: #090a0d;
  color: #fff;
  font-family: "Helvetica Neue", sans-serif;
  text-align: center;
}
.nat-hero__image,
.nat-hero::after {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.nat-hero__image {
  object-fit: cover;
  filter: brightness(0.42) saturate(0.78);
}
.nat-hero::after {
  background: linear-gradient(
    90deg,
    rgb(0 0 0 / 42%),
    rgb(0 0 0 / 22%) 52%,
    rgb(0 0 0 / 38%)
  );
  content: "";
}
.nat-hero__content {
  position: relative;
  z-index: 1;
  width: min(100% - 40px, 920px);
  padding: 64px 0;
}
.nat-hero h1 {
  margin: 0;
  font-size: clamp(3.2rem, 6.3vw, 6rem);
  font-weight: 750;
  line-height: 1.02;
  letter-spacing: -0.055em;
}

.nat-hero__content > p {
  max-width: 620px;
  margin: 24px auto 0;
  color: rgb(255 255 255 / 78%);
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.55;
}

.nat-hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-top: 32px;
}
.nat-hero__actions a {
  display: inline-flex;
  min-height: 54px;
  align-items: center;
  justify-content: center;
  padding: 0 28px;
  border: 1px solid rgb(255 255 255 / 50%);
  border-radius: 999px;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  transition:
    transform 160ms ease,
    background-color 160ms ease;
}
.nat-hero__actions a:hover {
  transform: translateY(-2px);
}
.nat-hero__actions .nat-hero__primary {
  border-color: #fff;
  background: #fff;
  color: #111;
}
.nat-hero__actions .nat-hero__secondary {
  background: rgb(0 0 0 / 24%);
}
.nat-hero__actions a:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 4px;
}
@media (max-width: 600px) {
  .nat-hero {
    min-height: max(700px, calc(100svh - 72px));
    width: 100vw;
    max-width: 100vw;
    border-radius: 0;
  }
  .nat-hero h1 {
    font-size: clamp(2.8rem, 12vw, 4rem);
  }
  .nat-hero__actions {
    align-items: stretch;
    flex-direction: column;
  }
}
```

```js
const hero = document.querySelector(".nat-hero[data-storefront-ref]");
if (hero) {
  const ticketLink = hero.querySelector("[data-next-event-link]");

  fetch(
    `https://api.frontdesk.africa/v1/storefront/${encodeURIComponent(hero.dataset.storefrontRef)}`,
    {
      headers: { Accept: "application/json" },
      cache: "no-store",
    },
  )
    .then((response) => {
      if (!response.ok) throw new Error("Storefront request failed");
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
      if (!event) return;

      ticketLink.href = `/events/${encodeURIComponent(event.slug)}`;
    })
    .catch(() => {});
}
```
