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
@import url("https://fonts.cdnfonts.com/css/helvetica-neue-55");
.nat-events,
.nat-events * {
  box-sizing: border-box;
}
.nat-events {
  width: 100%;
  padding: clamp(24px, 3vw, 40px) max(24px, calc((100% - 1440px) / 2));
  background: #0d0f14;
  color: #fff;
  font-family: "Helvetica Neue", sans-serif;
}
.nat-events h2 {
  margin: 0 0 40px;
  font-size: clamp(3rem, 7vw, 6rem) !important;
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.06em;
  text-align: center !important;
}
.nat-events__group + .nat-events__group {
  margin-top: 40px;
}
.nat-events__group h3 {
  margin: 0 0 18px;
  font-size: clamp(1.8rem, 3.5vw, 2.8rem) !important;
  font-weight: 650;
  letter-spacing: -0.04em;
  text-align: left !important;
}
.nat-events__list {
  display: grid;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.nat-events__row {
  display: grid;
  min-height: 70px;
  grid-template-columns: minmax(160px, 0.75fr) minmax(0, 1.5fr) auto;
  align-items: center;
  gap: 16px;
  padding: 12px 18px;
  border-radius: 9px;
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
  font-size: 0.9rem;
  white-space: nowrap;
}
.nat-events__row strong {
  justify-self: center;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  font-weight: 550;
  text-align: center;
}
.nat-events__row > span {
  padding: 10px 13px;
  border: 1px solid rgb(255 255 255 / 22%);
  border-radius: 6px;
  color: rgb(255 255 255 / 84%);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}
.nat-events__row:hover,
.nat-events__row:focus-visible {
  filter: brightness(1.08);
}
.nat-events__row:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}
.nat-events__empty {
  padding: 18px;
  border-radius: 9px;
  background: #34363b;
  color: rgb(255 255 255 / 72%);
}
@media (max-width: 700px) {
  .nat-events {
    padding-inline: 20px;
  }
  .nat-events__row {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px 12px;
    padding: 12px;
  }
  .nat-events__row time {
    grid-column: 1 / -1;
  }
  .nat-events__row strong {
    justify-self: start;
    text-align: left;
  }
  .nat-events__row > span {
    padding: 8px 10px;
    font-size: 0.62rem;
  }
}
```

```js

```
