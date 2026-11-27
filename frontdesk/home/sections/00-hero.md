```html
<section
  class="nat-hero"
  data-storefront-ref="01a1cf12-cd3f-72b5-b752-ea33209a16b8"
  aria-label="Zodiac Party"
>
  <div class="nat-hero__content">
    <p id="nat-hero-copy">
      Lagos’ monthly <strong>Afro EDM Glow in The Dark Rave</strong>. Each
      edition celebrates its zodiac sign. December is
      <strong>Project Sagittarius</strong>: two nights, one universe, curated by
      Maze x Mxtreme at TRIB3 Lagos. Come rave now.
    </p>
    <div class="nat-hero__equalizer" aria-hidden="true">
      <span></span><span></span><span></span><span></span> <span></span
      ><span></span><span></span><span></span>
    </div>
  </div>
  <div class="nat-hero__media">
    <video
      class="nat-hero__video"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      poster="https://natexperience-assets.goodyboy-work.workers.dev/zodiac-party-hero-poster.jpg"
      aria-hidden="true"
    >
      <source
        src="https://natexperience-assets.goodyboy-work.workers.dev/zodiac-party-hero.mp4"
        type="video/mp4"
      />
    </video>
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

.nat-hero,
.nat-hero * {
  box-sizing: border-box;
}
.nat-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  left: 50%;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  height: 100svh;
  min-height: 0;
  transform: translateX(-50%);
  overflow: hidden;
  margin: -8rem 0 0;
  background: #0d0f14;
  color: #f2f0ed;
  font-family: "Outfit", sans-serif;
  text-align: left;
}
.nat-hero__content {
  position: relative;
  display: flex;
  min-width: 0;
  flex-direction: column;
  justify-content: center;
  padding: 9.6rem 9.6rem 17.6rem;
  background: #0d0f14;
}

.nat-hero__content > p {
  max-width: 65.8rem;
  margin: 0;
  color: #f2f0ed;
  font-family: "Sora", sans-serif !important;
  font-size: 4.34rem;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.045em;
}

.nat-hero__equalizer {
  position: absolute;
  inset: auto 2.4rem 0 4rem;
  display: grid;
  height: 8rem;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 1.2rem;
  pointer-events: none;
}

.nat-hero__equalizer span {
  overflow: hidden;
}

.nat-hero__equalizer span::before {
  display: block;
  height: 100%;
  background: repeating-linear-gradient(
      to top,
      #f05a9d 0 72%,
      transparent 72% 100%
    )
    0 100% / 100% 25%;
  content: "";
  transform: translateY(var(--nat-equalizer-rest, 0%));
}

.nat-hero__equalizer span:nth-child(2),
.nat-hero__equalizer span:nth-child(4),
.nat-hero__equalizer span:nth-child(5) {
  --nat-equalizer-rest: 50%;
}

.nat-hero__equalizer span:nth-child(3n) {
  --nat-equalizer-rest: 25%;
}

@media (prefers-reduced-motion: no-preference) {
  .nat-hero__equalizer span::before {
    animation: nat-hero-equalizer 1.2s steps(1) infinite;
  }

  .nat-hero__equalizer span:nth-child(2n)::before {
    animation-delay: -380ms;
  }

  .nat-hero__equalizer span:nth-child(3n)::before {
    animation-delay: -710ms;
  }

  .nat-hero__equalizer span:nth-child(5n)::before {
    animation-delay: -930ms;
  }
}

@keyframes nat-hero-equalizer {
  0%,
  51% {
    transform: translateY(50%);
  }
  13%,
  64% {
    transform: translateY(0);
  }
  27%,
  79% {
    transform: translateY(25%);
  }
  38%,
  93% {
    transform: translateY(75%);
  }
}

.nat-hero__media {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: #0d0f14;
}
.nat-hero__video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media (max-width: 600px) {
  .nat-hero {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
  }
  .nat-hero__content {
    min-height: 0;
    padding: 3.6rem 2.4rem 6.4rem;
  }
  .nat-hero__equalizer {
    inset: auto 1.2rem 1.2rem 2.4rem;
    height: 3.6rem;
    gap: 0.6rem;
  }
  .nat-hero__content > p {
    font-size: 1.87rem;
    line-height: 1.35;
  }

  .nat-hero__media {
    width: 100%;
    min-height: 0;
  }
}

.nat-hero__content strong {
  color: #fff;
  font-weight: 500;
}
```

```js
const hero = document.querySelector(".nat-hero[data-storefront-ref]");
if (hero) {
  const heroVideo = hero.querySelector(".nat-hero__video");
  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const syncHeroVideo = () => {
    if (motionPreference.matches) heroVideo.pause();
    else heroVideo.play().catch(() => {});
  };

  syncHeroVideo();
  motionPreference.addEventListener("change", syncHeroVideo);

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
  };

  window.addEventListener("message", (event) => {
    if (event.data?.type === "nat:request-events") publishEvents();
  });
  publishEvents();
}
```
