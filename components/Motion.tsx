'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/*
  Page-wide scroll motion, driven by data attributes:
  [data-split]        headline letters rise in on load / on enter
  [data-reveal]       words go from gray to ink as you scroll
  [data-scale]        headline scales up while it enters
  [data-fade]         fades up when it enters (batched)
  [data-parallax=N]   image drifts N% while its section scrolls by
  [data-stack]        sticky cards shrink as the next one covers them
  [data-zoom]         pinned section; image grows to full screen, marquee rows slide
  [data-count]        number counts up
  [data-bar=N]        bar fills to N%
  [data-intro]        hero card opening reveal
*/
export default function Motion() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    const splits: SplitText[] = [];

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Hero card opening.
      const intro = document.querySelector<HTMLElement>('[data-intro]');
      if (intro) {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.from(intro, { clipPath: 'inset(8% 6% 8% 6% round 32px)', duration: 1.4 })
          .from(intro.querySelectorAll('[data-intro-img]'), { scale: 1.35, duration: 1.6 }, 0)
          .from(intro.querySelectorAll('[data-intro-item]'), { y: 24, opacity: 0, stagger: 0.08, duration: 1 }, 0.35);
      }

      // Letters rise.
      document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
        const split = SplitText.create(el, { type: 'lines,chars', linesClass: 'split-line', mask: 'lines' });
        splits.push(split);
        const onLoad = el.dataset.split === 'load';
        gsap.from(split.chars, {
          yPercent: 115,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.025,
          delay: onLoad ? 0.25 : 0,
          scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 85%' },
        });
      });

      // Gray to ink, word by word, tied to scroll.
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        el.classList.add('reveal-words');
        const split = SplitText.create(el, { type: 'words', wordsClass: 'word' });
        splits.push(split);
        const ink = getComputedStyle(el).color;
        gsap.to(split.words, {
          color: el.closest('.on-dark') ? '#ffffff' : ink,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 45%', scrub: 0.6 },
        });
      });

      // Headline scale.
      gsap.utils.toArray<HTMLElement>('[data-scale]').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.82, opacity: 0.2, transformOrigin: el.dataset.scale || '0% 50%' },
          { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 45%', scrub: 0.8 } },
        );
      });

      // Fade up.
      gsap.set('[data-fade]', { y: 48, opacity: 0 });
      ScrollTrigger.batch('[data-fade]', {
        start: 'top 90%',
        once: true,
        onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
      });

      // Parallax images.
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const amt = Number(el.dataset.parallax || 12);
        gsap.fromTo(
          el,
          { yPercent: -amt / 2 },
          {
            yPercent: amt / 2,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });

      // Stacked sticky cards (desktop only; mobile cards are not sticky).
      mm.add('(min-width: 861px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-stack] > *');
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.92,
            filter: 'brightness(0.95)',
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 15%', scrub: true },
          });
        });
      });

      // Scroll zoom with marquee.
      document.querySelectorAll<HTMLElement>('[data-zoom]').forEach((sec) => {
        const media = sec.querySelector<HTMLElement>('.zoom-media');
        const caption = sec.querySelector<HTMLElement>('.zoom-caption');
        const rows = sec.querySelectorAll<HTMLElement>('.marquee-row');
        if (!media) return;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sec, start: 'top top', end: '+=140%', scrub: 0.8, pin: true },
        });
        tl.to(media, { width: '100vw', height: '100vh', borderRadius: 0, ease: 'power2.inOut' }, 0)
          .to(media.querySelector('img'), { scale: 1.08, ease: 'none' }, 0)
          .to(rows[0] ?? {}, { xPercent: -18, ease: 'none' }, 0)
          .to(rows[1] ?? {}, { xPercent: 18, ease: 'none' }, 0)
          .to(caption, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.3 }, 0.7);
        gsap.set(caption, { y: 40 });
      });

      // Counters.
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const to = Number(el.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: to,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => (el.textContent = Math.round(obj.v).toString() + (el.dataset.suffix || '')),
        });
      });

      // Bars.
      gsap.utils.toArray<HTMLElement>('[data-bar]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: Number(el.dataset.bar) / 100,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          },
        );
      });

      // Placeholder chips in the script light up one after another.
      const phs = gsap.utils.toArray<HTMLElement>('.script .ph');
      if (phs.length) {
        gsap.from(phs, {
          backgroundColor: 'transparent',
          color: 'inherit',
          stagger: 0.18,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.script', start: 'top 70%', once: true },
        });
      }
    });

    // Fonts can shift line breaks; recalc once they are ready.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      splits.forEach((s) => s.revert());
      mm.revert();
    };
  }, []);

  return null;
}
