```html
<section id="about" class="nat-about" aria-label="NATExperience event formats">
  <article class="nat-about__item">
    <img
      class="nat-about__image"
      src="https://natexperience-assets.goodyboy-work.workers.dev/after-work-parties.jpg"
      alt="A performer sings into a microphone at an after-work party"
    />
    <div class="nat-about__copy">
      <span class="nat-about__label">After-work parties</span>
      <h2>
        When the workday wraps, step into a night of music, dancing, and good
        company.
      </h2>
      <span class="nat-about__detail">9–5 block parties</span>
    </div>
  </article>
  <article class="nat-about__item nat-about__item--reverse">
    <img
      class="nat-about__image"
      src="https://natexperience-assets.goodyboy-work.workers.dev/pool-parties.jpg"
      alt="A guest dancing at a party in a red hat and sunglasses"
    />
    <div class="nat-about__copy">
      <span class="nat-about__label">Pool parties</span>
      <h2>
        Make the most of the sunshine with refreshing poolside parties, great
        music, and your favorite people.
      </h2>
      <span class="nat-about__detail">DJs, music and a change of scene</span>
    </div>
  </article>
  <article class="nat-about__item">
    <img
      class="nat-about__image"
      src="https://natexperience-assets.goodyboy-work.workers.dev/all-white-parties.jpg"
      alt="Guests celebrating together at an all-white party"
    />
    <div class="nat-about__copy">
      <span class="nat-about__label">All-white parties</span>
      <h2>
        Show up in your best white, find your people, and dance together long
        after sunset.
      </h2>
      <span class="nat-about__detail">Music, DJs and room to connect</span>
    </div>
  </article>
</section>
```

```css
@import url("https://fonts.cdnfonts.com/css/helvetica-neue-55");
.nat-about,
.nat-about * {
  box-sizing: border-box;
}
.nat-about {
  display: grid;
  width: 100%;
  gap: 8px;
  margin: 0;
  padding: 0;
  background: #0d0f14;
  font-family: "Helvetica Neue", sans-serif;
}
.nat-about__item {
  display: grid;
  height: clamp(440px, 47vw, 700px);
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}
.nat-about__image {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 0;
  object-fit: cover;
}
.nat-about__copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: clamp(28px, 4vw, 64px);
  background: #fff4a6;
  color: #171717;
  text-align: center;
}
.nat-about__label,
.nat-about__detail {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  line-height: 1.4;
  text-transform: uppercase;
}
.nat-about__copy h2 {
  max-width: 680px;
  margin: auto 0;
  font-family: Georgia, serif;
  font-size: clamp(2rem, 3.25vw, 3.5rem);
  font-weight: 400;
  line-height: 1.18;
  letter-spacing: -0.035em;
}
.nat-about__item--reverse .nat-about__image {
  grid-column: 2;
  grid-row: 1;
}
.nat-about__item--reverse .nat-about__copy {
  grid-column: 1;
  grid-row: 1;
}
@media (max-width: 800px) {
  .nat-about__item {
    height: auto;
    grid-template-columns: 1fr;
  }
  .nat-about__image {
    height: 72vw;
    max-height: 520px;
  }
  .nat-about__copy {
    min-height: 360px;
    padding: 28px 24px;
  }
  .nat-about__item--reverse .nat-about__image,
  .nat-about__item--reverse .nat-about__copy {
    grid-column: 1;
    grid-row: auto;
  }
}
```

```js

```
