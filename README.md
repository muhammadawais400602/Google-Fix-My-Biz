# Xovra homepage

Homepage for [xovra.ai](https://www.xovra.ai). Copy comes from xovra.ai; the look and motion follow a monochrome, editorial agency style (big tight DM Sans headlines, rounded cards, grayscale palette, dark mode).

## Stack

- Next.js (App Router) + TypeScript
- GSAP + ScrollTrigger + SplitText for motion
- DM Sans via `@fontsource-variable/dm-sans`
- Icons from `lucide-react`

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

- `lib/content.ts` – all page copy (edit text here)
- `app/page.tsx` – page sections
- `app/globals.css` – theme tokens, layout, dark mode
- `components/Motion.tsx` – scroll animations, driven by `data-*` attributes
- `components/Dialer.tsx` – interactive dialer mockup (C call, H hang up, 1–6 log outcome)
- `components/FeatureRows.tsx` – feature list with cursor-follow image preview
- `scripts/render-images.mjs` – renders the 3D artwork in `public/images` with three.js (`npm run render:images`, needs Playwright)

## Motion

| Attribute | Effect |
| --- | --- |
| `data-split` | letters rise in |
| `data-reveal` | words fill from gray to ink on scroll |
| `data-scale` | headline scales up on enter |
| `data-fade` | fade up on enter |
| `data-parallax="N"` | image drifts N% |
| `data-stack` | sticky cards shrink as next card covers them |
| `data-zoom` | pinned section, image grows to full screen with marquee |

All motion is off when the visitor has reduced motion enabled.
