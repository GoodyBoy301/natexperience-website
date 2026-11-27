```html
<section
  id="about"
  class="nat-about zodiac-about"
  aria-labelledby="zodiac-about-title"
>
  <div class="zodiac-about__inner">
    <div class="zodiac-about__intro">
      <p id="zodiac-about-title">
        Every month, a <strong>different sign</strong> sets the theme.
      </p>
    </div>
    <div class="zodiac-about__features">
      <article class="zodiac-about__feature">
        <h3>The Sound</h3>
        <p>Afro House, Amapiano, Gqom and Afro EDM.</p>
      </article>
      <article class="zodiac-about__feature">
        <h3>The Glow</h3>
        <p>Face paint and lasers set the scene.</p>
      </article>
      <article class="zodiac-about__feature">
        <h3>The Crowd</h3>
        <p>Ravers, not spectators. Everybody dances.</p>
      </article>
    </div>
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

.nat-about.zodiac-about,
.nat-about.zodiac-about * {
  box-sizing: border-box;
}

.nat-about.zodiac-about {
  position: relative;
  left: 50%;
  display: block;
  width: 100vw;
  max-width: 100vw;
  transform: translateX(-50%);
  margin: 0;
  padding: 4rem 4rem 7rem;
  background: #0d0f14;
  color: #f2f0ed;
  font-family: "Outfit", sans-serif;
  text-align: left;
}

.zodiac-about__inner {
  display: block;
  width: min(100%, 144rem);
  margin: 0 auto;
  text-align: left;
}

.zodiac-about__intro > p {
  max-width: none;
  margin: 0;
  color: #f2f0ed;
  font-family: "Sora", sans-serif;
  font-size: 4.34rem;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.045em;
  white-space: nowrap;
}

.zodiac-about__intro strong {
  color: #fff;
  font-weight: 500;
}

.zodiac-about__features {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 4rem;
  border-block: 0.1rem solid #41434a;
  counter-reset: about-feature;
}

.zodiac-about__feature {
  min-width: 0;
  padding: 2.8rem 3.2rem 3.2rem;
  counter-increment: about-feature;
}

.zodiac-about__feature + .zodiac-about__feature {
  border-inline-start: 0.1rem solid #41434a;
}

.zodiac-about__feature::before {
  display: grid;
  width: 2.8rem;
  height: 2.8rem;
  place-items: center;
  margin-bottom: 1.6rem;
  border-radius: 50%;
  background: #f05a9d;
  color: #0d0f14;
  font-size: 1.4rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  content: counter(about-feature) / "";
}

.zodiac-about__feature h3 {
  margin: 0 0 0.6rem;
  color: #f2f0ed;
  text-wrap: balance;
  font-family: "Sora", sans-serif;
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 1.2;
}

.zodiac-about__feature p {
  margin: 0;
  color: #d2d4da;
  font-size: 1.8rem;
  line-height: 1.45;
  text-wrap: pretty;
}

@media (max-width: 800px) {
  .nat-about.zodiac-about {
    padding: 3.2rem 1.6rem 5.6rem;
  }

  .zodiac-about__features {
    grid-template-columns: minmax(0, 1fr);
    margin-top: 3.2rem;
  }

  .zodiac-about__intro > p {
    font-size: 1.87rem;
    line-height: 1.35;
    white-space: normal;
    text-wrap: balance;
  }

  .zodiac-about__feature {
    padding: 2rem 1.6rem;
  }

  .zodiac-about__feature + .zodiac-about__feature {
    border-inline-start: 0;
    border-top: 0.1rem solid #41434a;
  }

  .zodiac-about__feature h3 {
    font-size: 1.8rem;
  }

  .zodiac-about__feature p {
    font-size: 1.6rem;
  }
}
```

```js

```
