```html
<section
  class="nat-newsletter-faq"
  aria-label="Newsletter and frequently asked questions"
>
  <div class="nat-newsletter">
    <h2
      id="nat-newsletter-title"
      data-fd-field="newsletter.heading"
      data-fd-label="Newsletter heading"
    >
      Stay in the loop.
    </h2>
    <p
      data-fd-field="newsletter.description"
      data-fd-label="Newsletter description"
    >
      Be first to hear about upcoming parties, ticket drops, and new
      experiences.
    </p>
    <div class="nat-newsletter__signup">
      <label for="nat-newsletter-email">Email address</label>
      <div class="nat-newsletter__controls">
        <input
          id="nat-newsletter-email"
          type="email"
          placeholder="Your email address"
          autocomplete="email"
          disabled
          aria-describedby="nat-newsletter-note"
        />
        <button type="button" disabled>Subscribe</button>
      </div>
      <p id="nat-newsletter-note">Sign-up functionality coming soon.</p>
    </div>
  </div>
  <div class="nat-faq-column">
    <h2
      id="nat-faq-title"
      data-fd-field="faq.heading"
      data-fd-label="FAQ heading"
    >
      FAQs
    </h2>
    <p class="nat-faq-intro">
      Dates, venues, music and tickets—what to know before you go.
    </p>
    <details class="nat-faq-card">
      <summary>What kinds of parties does NATExperience host?</summary>
      <p>
        We specialize in high-energy private group experiences like after-work
        9–5 events, all-white parties, and pool parties. Every event features
        music, DJs, and a lively atmosphere designed to bring people together.
      </p>
    </details>
    <details class="nat-faq-card">
      <summary>Can I book NATExperience for a private birthday party?</summary>
      <p>
        Yes, we love hosting birthdays. Our pool party setups include fun
        touches like floats and birthday signs, and we can tailor the vibe to
        your group.
      </p>
    </details>
    <details class="nat-faq-card">
      <summary>Do you provide a DJ and music?</summary>
      <p>
        Absolutely. Music and DJs are core to every NATExperience event. We
        handle the sound so you can focus on enjoying the night.
      </p>
    </details>
    <details class="nat-faq-card">
      <summary>How much does it cost to book an event?</summary>
      <p>
        Pricing depends on the event type, group size, and any custom options
        you want. Contact us with your party details and we will give you a
        tailored quote.
      </p>
    </details>
    <details class="nat-faq-card">
      <summary>How do I book an event with NATExperience?</summary>
      <p>
        Reach out through our website or contact channels and tell us your event
        date, group size, and preferred vibe. We will get back to you with next
        steps and availability.
      </p>
    </details>
  </div>
</section>
```

```css
@import url("https://fonts.cdnfonts.com/css/helvetica-neue-55");
.nat-newsletter-faq,
.nat-newsletter-faq * {
  box-sizing: border-box;
}
.nat-newsletter-faq {
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: stretch;
  gap: clamp(24px, 4vw, 56px);
  padding: clamp(32px, 5vw, 72px) max(24px, calc((100% - 1440px) / 2));
  background: #0d0f14;
  color: #fff;
  font-family: "Helvetica Neue", sans-serif;
}
.nat-newsletter,
.nat-faq-column {
  min-width: 0;
}
.nat-newsletter {
  display: flex;
  flex-direction: column;
  align-self: end;
  margin-top: 0;
  padding: clamp(24px, 3vw, 40px);
  border-radius: 9px;
  background: #fff4a6;
  color: #171717;
}
.nat-newsletter h2,
.nat-faq-column h2 {
  margin: 0;
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.05em;
}
.nat-newsletter > p {
  margin: 16px 0 30px;
  color: rgb(23 23 23 / 76%);
  line-height: 1.55;
}
.nat-newsletter__signup {
  margin-top: auto;
}
.nat-newsletter__signup label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.8rem;
  font-weight: 600;
}
.nat-newsletter__controls {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
}
.nat-newsletter__controls input,
.nat-newsletter__controls button {
  min-width: 0;
  min-height: 48px;
  border: 1px solid rgb(23 23 23 / 24%);
  border-radius: 6px;
  font: inherit;
}
.nat-newsletter__controls input {
  padding: 0 12px;
  background: #fff;
  color: #171717;
}
.nat-newsletter__controls input::placeholder {
  color: #777;
}
.nat-newsletter__controls button {
  padding: 0 16px;
  background: #171717;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
}
.nat-newsletter__controls input:disabled,
.nat-newsletter__controls button:disabled {
  opacity: 1;
  cursor: default;
}
.nat-newsletter__signup > p {
  margin: 10px 0 0;
  color: rgb(23 23 23 / 72%);
  font-size: 0.75rem;
}
.nat-faq-column h2 {
  margin-bottom: 12px;
}
.nat-faq-intro {
  margin: 0 0 24px;
  color: #b8bac2;
  line-height: 1.5;
}
.nat-faq-card {
  margin: 0 0 10px;
  border-radius: 9px;
  background: #34363b;
  color: #fff;
}
.nat-faq-card summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  cursor: pointer;
  font-weight: 650;
  list-style: none;
}
.nat-faq-card summary::-webkit-details-marker {
  display: none;
}
.nat-faq-card summary::after {
  content: "+";
  color: rgb(255 255 255 / 70%);
  font-size: 1.25rem;
}
.nat-faq-card[open] summary::after {
  content: "−";
}
.nat-faq-card p {
  margin: 0;
  padding: 0 20px 18px;
  color: rgb(255 255 255 / 76%);
  line-height: 1.55;
}
.nat-faq-card summary:focus-visible {
  outline: 2px solid #fff;
  outline-offset: -4px;
}
@media (max-width: 800px) {
  .nat-newsletter-faq {
    grid-template-columns: 1fr;
    padding-inline: 24px;
  }
  .nat-newsletter {
    height: auto;
    margin-top: 0;
  }
}
@media (max-width: 520px) {
  .nat-newsletter__controls {
    grid-template-columns: 1fr;
  }
}
```

```js
const cards = [...document.querySelectorAll(".nat-faq-card")];
cards.forEach((card) => {
  card.addEventListener("toggle", () => {
    if (!card.open) return;
    cards.forEach((other) => {
      if (other !== card) other.open = false;
    });
  });
});
```
