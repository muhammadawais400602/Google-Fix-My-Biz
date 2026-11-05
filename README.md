# Xovra (ringlessai)

Marketing site for Xovra, built with Next.js.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Homepage redesign

- `src/app/page.tsx` – homepage sections
- `src/lib/xovra-content.ts` – all homepage, header and footer copy (taken verbatim from the previous site; edit text here)
- `src/app/xovra.css` – homepage, header and footer styles, all scoped under `.xv` so inner pages keep their Tailwind styles
- `src/components/xovra/` – Header, Footer, Dialer (interactive mockup: C call, H hang up, 1–6 log outcome), FeatureRows, Motion (GSAP)

### Swapping images

Images live in `public/images/xovra/`. The `images` map at the bottom of `src/lib/xovra-content.ts` says which file each section uses. Replace a file with the same name, or point the map at a new file.

### Motion

GSAP + ScrollTrigger + SplitText, driven by `data-*` attributes (see the comment at the top of `src/components/xovra/Motion.tsx`): CSS preloader, hero reveal, scrubbed letter reveals, pinned card stacks, clip-path scroll zoom, horizontal gallery, image zooms, directional fades, and hover letter waves. All motion turns off when the visitor prefers reduced motion.
