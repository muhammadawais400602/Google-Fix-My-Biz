# googlefixmybiz

Marketing site for **googlefixmybiz**, a Google Business Profile recovery and local SEO service.
Static HTML, no framework. Live: https://google-fix-my-biz.vercel.app

## How it is built

Pages are authored in `src/pages/` and stitched together with the shared layout, header and footer by a
dependency-free script. The generated `.html` files in the repo root are what Vercel serves, so **commit both**.

```
python3 build.py                # rebuild every page + sitemap.xml + robots.txt
python3 dev-server.py 8000      # preview with clean URLs (/pricing -> pricing.html)
```

```
src/layout.html        <head>, scripts, page shell
src/partials/          sprite.html (SVG icons) · header.html · footer.html · banner.html
src/pages/**.html      one file per page  ->  built to the same path in the repo root
assets/site.css        shared design system (tokens, header, footer, components, motion)
assets/site.js         shared behavior (smooth scroll, reveals, filters, forms, rank grid, ...)
assets/home.css        styles used only by the home page
vercel.json            cleanUrls: /pricing serves pricing.html
```

Change the nav or footer in **one** place (`src/partials/`) and rebuild.

### Page file format

```html
<!--
title: Pricing                         (becomes "Pricing | googlefixmybiz")
description: One sentence for search results.
nav: pricing                           (which top-nav item is highlighted: services, pricing, case-studies, blog, about, contact, free-audit)
-->
<style> .pr-card{...} </style>          <!-- page-only CSS; prefix class names (pr-) to avoid collisions -->

<section class="phero"> ... </section>
<section class="sec"> ... </section>
<!-- scripts -->
<script> /* page JS: runs after site.js, GFMB helper is available */ </script>
```

Pages inside `src/pages/blog/` build to `blog/<slug>.html` and are served at `/blog/<slug>`.
Optional front matter: `css: home` (loads `assets/home.css`), `pre_header: banner`, `title_full:` (no suffix).

## Pages

`/` · `/services` · `/suspension-recovery` · `/pricing` · `/case-studies` · `/about` · `/blog` (+ `/blog/<slug>`) ·
`/free-audit` · `/contact` · `/faq` · `/privacy` · `/terms` · `404`

## Design system (assets/site.css)

**Palette** – Google's four colors only: blue `#4285F4` (primary: buttons, links, banners), red `#EA4335`,
yellow `#FBBC04`, green `#34A853`, with tints `--sky --lav --peach --mint` and deep navy `--forest` for dark sections.
Text is `--ink`, secondary text `--muted`. Fonts: Inter (body), Poppins (wordmark/quotes). Never add another font.

**Layout:** `.wrap` (max 1440, responsive gutters) · `.wrap.narrow` · `.sec` (+ `.sec--soft`, `.sec--dark`, `.sec--tight`) ·
`.sec-head` (+ `.left`) with `.pill`, `h2`, `p` · `.grid` + `.g2/.g3/.g4` · `.split2` (+ `.rev`) text/visual two-up ·
`.media` rounded image box.

**Inner-page hero:** `.phero` (+ `.wide`, `.left`) containing `.orbs`, `.crumbs`, `.pill`, `h1`, `p.lead`, `.acts`; `.phero-grid` for text + visual.

**Components:** `.btn` (+ `.btn-green` primary, `.btn-outline`, `.btn-white`, `.btn-ghost-w`, `.btn-dark`, sizes `.btn-sm/.btn-lg`) ·
`.pill` · `.tag` (+ `.red/.yellow/.green`) · `.fcard` (+ tint `.t-blue/.t-red/.t-yellow/.t-green/.t-soft/.t-cream/.t-dark`, with `.ico`) ·
`.card-line` · `.tq` testimonial card · `.checks` tick list · `.nums > .num` big-number cards · `.acc` FAQ accordion (`<details>`) ·
`.chips` filter buttons · `.form` / `.field` / `.row` / `.form-ok` · `.tbl-wrap > table.cmp` · `.prose` long-form text ·
`.cta-band` closing call to action · `.link-arrow`.

**Motion (all respect `prefers-reduced-motion`):**

| Markup | Effect |
| --- | --- |
| `class="rv"` (+ `d1..d4` delay) / `rv-l` / `rv-r` / `rv-s` | fade/slide/scale in when scrolled into view |
| `data-split` on a heading | words rise into place, staggered |
| `data-count="1200" data-suffix="+"` (`data-prefix`, `data-dec="1"`) | number counts up |
| `data-tilt` | subtle 3D tilt following the pointer (pair with `rv`) |
| `data-mag` | magnetic button |
| `data-speed=".08"` | parallax on an element (parent clips it) |
| `.tl > .tl-step` (`.n`, `h3`, `p`) | vertical timeline whose line draws as you scroll |
| `.marq > .marq-track > span…` | infinite logo/name marquee |
| `.orbs > i×4` | drifting Google-color blurred orbs (needs a `position:relative; overflow:hidden` parent) |
| `.ripple` + `<svg><use href="#pinlogo"/></svg>` | pin that drops with ripple rings |
| `.float` | gentle floating |
| `.rg` with `data-rank="auto"` (`data-loop`, `data-n="5"`) | animated map-pack rank heat map; `data-rank="before|after"` for static; buttons `data-rank-set="before|after" data-rank-for="#id"` toggle it |
| `[data-carousel]` > `.track`, `[data-prev]`, `[data-next]` | scroll-snap carousel controls |
| `[data-filters="#grid"]` > `button[data-filter="x"]`; items `data-cat="x y"` | category filter; honors `#x` in the URL |
| `form[data-form]` | validates, then shows its `.form-ok` message (front end only, see below) |

Icons: inline SVG sprite symbols `#spark #gG #pinlogo #chev` via `<svg><use href="#spark"/></svg>`.

## Photos

Stock photos come from Unsplash: `https://images.unsplash.com/photo-<ID>?auto=format&fit=crop&q=75&w=900&h=600`
(add `crop=faces` for portraits). IDs already verified to load:

| ID | Subject |
| --- | --- |
| `1556740738-b6a63e27c4df` | woman at a cafe counter taking a card payment |
| `1551836022-d5d88e9218df` | two women planning at a laptop |
| `1573164713988-8665fc963095` | woman reviewing a tablet in a server corridor |
| `1507003211169-0a1dd7228f2d` | man portrait, white tee, smiling |
| `1560250097-0b93528c311a` | man portrait, glasses and blazer |
| `1519085360753-af0119f7cbe7` | man portrait, dark suit |
| `1573497019940-1c28c88b4f3e` | woman portrait, striped blazer |
| `1580489944761-15a19d654956` | woman portrait, hair bun |
| `1573496359142-b8d87734a5a2` | woman portrait, grey blazer, warm background |
| `1556761175-5973dc0f32e7` | colleagues watching a presentation in a brick office |
| `1600880292203-757bb62b4baf` | two colleagues high-fiving |
| `1522071820081-009f0129c71c` | team working at laptops |
| `1521737604893-d14cc237f11d` | group working around a table |
| `1542744173-8e7e53415bb0` | boardroom meeting |
| `1551434678-e076c223a692` | two developers at monitors |
| `1556745757-8d76bdb6984b` | payment terminal close-up |

Any other ID must be checked (`curl -sI` returns 200) **and** looked at before use. Always set `alt` text and `loading="lazy"` below the fold.

## Company facts (keep every page consistent)

googlefixmybiz · founded 2019 · HQ 1801 E 6th St, Austin, TX 78702 · second office 325 Front St W, Toronto, ON ·
hello@googlefixmybiz.co · (512) 555-0142 (placeholder) · 40+ specialists · 1,200+ profiles recovered · 94% reinstatement rate ·
typical reinstatement 72 hours · 90-day reinstatement warranty · 4.9★ across 1,377 reviews · 42,000 newsletter subscribers.
Pricing: Suspension recovery from $499 one-time · Citations $2 each · Dashboard $31/mo per location · Managed local SEO from $499/mo ·
multi-location and agency plans are custom.

## Before you launch

* **Forms are front-end only.** Newsletter, contact and audit forms validate and show a success message but send nothing.
  Connect them to a form service (Formspree, Basin, a Vercel function) before relying on them.
* The phone number, street addresses, social links (they point at the platforms' home pages), client names,
  testimonials and statistics are placeholders. Replace them with real ones.
* Not affiliated with or endorsed by Google LLC; keep that line in the footer.
