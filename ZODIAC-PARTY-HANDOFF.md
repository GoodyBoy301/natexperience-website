# Zodiac Party — Thread Starter

Paste this brief into a new thread, then append one assignment from the bottom (or your own task and file ownership). If the thread has access to Zed skills and this repository, the short version is: **“Use `zodiac-party-context`, read `ZODIAC-PARTY-HANDOFF.md`, and take the [assignment] lane. My task is: [task].”**

## Project and goal

You are working on Zodiac Party, starting from the existing NATExperience FrontDesk storefront and preview tooling. The repo is `natexperience-website`, normally at `/Users/goody/Workspace/LiveLabs/natexperience-website`; the intended branch is `zodiac-party`. The first design task was a reference-inspired split-screen hero: a short introduction on the left and a muted autoplaying event video on the right, stacked on mobile. Do not assume the rest of the inherited site has been rebranded. The original design reference is not bundled with this brief; request it if a new task needs visual parity.

Read applicable `AGENTS.md` instructions if present. Use Bun. Make the smallest focused change, preserve existing behavior unless asked, reuse existing patterns, and avoid adding code comments or UI eyebrow/overline labels unless requested. State meaningful assumptions before acting. Run focused checks, not routine `npm run build` or `npm run prepare`. Do not commit, create branches, deploy, or save changes in FrontDesk unless requested.

## How the site works

- This is a FrontDesk customization, not a standalone frontend framework app. Keep booking, checkout, and native event product/FAQ behavior in FrontDesk unless the task explicitly changes that boundary.
- `frontdesk/home/sections/` holds ordered Custom HTML Markdown sources: `00-hero.md`, `01-about.md`, `02-upcoming-event.md`, `03-past-editions.md`, `04-newsletter-faq.md`. These contain HTML, CSS, and JS blocks for the saved FrontDesk sections. The README's older section count and hero description do not match the current files.
- `exports/head.html` and `exports/body-end.html` are shared HTML snippets. `exports/custom-assets/custom.css` and `site.js` supply shared styling and interactions. Keep the section CSS and any matching preview CSS consistent when changing a section; check the actual selectors and how each surface consumes them.
- `frontdesk-proxy.js` and `wrangler.toml` serve the local preview. `bun run dev` regenerates section HTML and starts Wrangler at `http://localhost:8787`; the preview still depends on the configured live storefront. `bun run sections:build` runs `scripts/build-local-sections.js`, which extracts **only HTML** into ignored `exports/custom-assets/local-sections.html`. Do not hand-edit the generated file or assume its preview exercises section scripts.
- `bun run deploy:assets` publishes the contents of `exports/custom-assets/` using `wrangler.assets.toml` and `assets-cdn-worker.js`. The configured Worker is still `https://natexperience-assets.goodyboy-work.workers.dev`; the preview storefront origin is still `https://35b3b165f8a896133d-nat-experience.sme.live`. Neither is proof of a dedicated Zodiac Party target. A local edit, a Worker asset deploy, and saving a section in FrontDesk are separate operations. Verify the destination before publishing anything.

## Last known state — verify at thread start

- `zodiac-party` was created from NATExperience. At the handoff check, `HEAD` was `2d4744f` (`fix(site): overlay event drawer header`) and matched `origin/zodiac-party` and `main`. The hero work was still local: modified `frontdesk/home/sections/00-hero.md` and `exports/custom-assets/custom.css`, plus untracked source MP4, optimized MP4, and poster. Read `git status --short --branch`, recent history, and relevant diffs before assuming any of this is still current. Protect every existing change.
- The hero uses a white/yellow split and the headline “One night. Every sign.” It keeps `.nat-hero` because `site.js` detects the section with it. The section script runs muted playback via `play()` rather than an `autoplay` attribute, pauses for `prefers-reduced-motion`, and preserves native event/ticket handoff. It reads future events from `window.FD.events` and communicates with the parent via `nat:scroll-page`, `nat:open-event`, `nat:event-data`, and `nat:request-events`. Inspect both ends before changing those hooks.
- The source attachment is the long-named `LADIES & GENTLEMEN it’s Decemberrrrr! 🎉 There’s no way, after everything we’ve been through thi.mp4` in `exports/custom-assets/` (66.6 s, 720×1280). The hero references `zodiac-party-hero.mp4` (FFmpeg H.264, 640×1138, 24 fps, silent, fast-start, 12,068,320 bytes) and `zodiac-party-hero-poster.jpg` (frame at about 3 s, with skyline, fireworks, branding and 18+ notice). The original upload is not the hero's delivery asset.
- `bun run sections:build` and `git diff --check` passed for the hero. The generated hero uses the new video/poster URLs and no longer contains `.nat-hero__image`. The asset deploy succeeded as Worker version `2a99663a-4d30-4ff1-b2fb-512b5f7762f3`; it also uploaded the raw MP4 because it was inside the deployed asset directory. No saved FrontDesk hero update or in-browser playback verification was confirmed. The copied site header/branding had not been converted.

## Asset cleanup is part of changing a section

When replacing section media or other assets, identify the superseded files and delete those confirmed unused. Check filenames and URLs in section blocks, shared snippets, CSS/JS, other pages, and generated output; check saved FrontDesk content and any sites sharing the Worker before deleting a published file. No repo match is not proof of no live consumer. Check `hero-party.jpg` and the raw source MP4 as candidates, not preapproved deletions. Keep any raw master that is still needed outside the public asset tree. Rebuild from source after changes; have the release owner publish replacements, switch their consumers, then remove old assets from the deployed set when safe. If live references cannot be checked, report exactly what remains and why.

## Working in four threads

Give each thread one actual task and one explicit write scope. The lanes below are suggestions, not authorization to implement every lane. In a shared checkout, one thread owns each file and one integrator owns shared outputs and releases. In separate worktrees, first agree how the dirty/untracked hero baseline gets carried over; a fresh worktree at the old commit will not have it. Never reset, stash, switch, or overwrite another thread's changes. If a task needs a file owned by another thread, send the required change to its owner. Do not run the section generator concurrently with another thread writing the same output in a shared checkout; coordinate with the integrator.

1. **Hero and media:** Own `00-hero.md` and hero-only media. Preserve FrontDesk hooks. Give matching shared CSS changes and any deletion candidates to the shared-assets owner.
2. **Brand and shared styling:** Own `exports/head.html`, `exports/body-end.html`, and `exports/custom-assets/custom.css`. Coordinate selector changes with the section owners. Confirm brand details and logo assets rather than inventing them.
3. **Content sections:** Own `01-about.md` through `04-newsletter-faq.md` only as needed for the assigned task. Keep native booking intact. Send shared CSS or script requirements to the corresponding owner.
4. **Integration and release:** Verify preview, event handoff, saved section parity, asset references, and target configuration. Own any explicitly assigned changes to `site.js`, proxy/config or scripts, and coordinate the generated output, asset deletions, and publication. Do not claim a live change or publish without authorization.

Append this to assign work:

```text
Lane: [one lane or your own]
Task and success criteria: [what should change and how we will know it works]
You may edit: [exact files or directories]
Do not edit: [shared files or work other threads own]
Baseline: [current shared checkout or approved worktree/commit]
Release: no deployment or saved FrontDesk edits unless explicitly requested
```

Finish by reporting files changed, exact checks run and outcomes, removed assets or deferred cleanup, and anything the other threads or the release owner need to apply. For section changes, verify the generated markup when relevant, run `git diff --check`, and distinguish local preview, deployed assets, and saved FrontDesk state.
