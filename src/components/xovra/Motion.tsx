'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);
ScrollTrigger.config({ ignoreMobileResize: true });

// The CSS preloader covers the page for this long; the hero intro starts after it.
const INTRO_DELAY = 1.55;

/*
  Homepage motion, driven by data attributes:
  [data-intro]          hero card opening (clip + image zoom + items rise)
  [data-split]          letters rise in (on load, or when scrolled into view)
  [data-reveal]         letters fade/slide in as you scroll (scrubbed)
  [data-scale]          headline scales up while it enters
  [data-fade]           fades in from a direction (data-from = bottom|left|right|top)
  [data-row]            feature rows rise while scrolled into place
  [data-parallax=N]     image drifts N%
  [data-scale-img]      image zooms from 1.5 to 1 as it scrolls through
  [data-stack]          pinned stack: next card slides up, previous card shrinks
  [data-zoom]           pinned; image opens from a small window to full screen
  [data-gallery]        horizontal track moves with vertical scroll
  .wave                 letters lift on hover
*/
export default function Motion() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    const splits: SplitText[] = [];
    const cleanups: (() => void)[] = [];

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      cleanups.push(() => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      });

      // Hero card opening.
      const intro = document.querySelector<HTMLElement>('[data-intro]');
      if (intro) {
        const tl = gsap.timeline({ delay: INTRO_DELAY, defaults: { ease: 'expo.out' } });
        tl.from(intro, { clipPath: 'inset(10% 8% 10% 8% round 32px)', duration: 1.5 })
          .from(intro.querySelectorAll('[data-intro-img]'), { scale: 1.4, duration: 1.8 }, 0)
          .from(intro.querySelectorAll('[data-intro-item]'), { y: 28, opacity: 0, stagger: 0.08, duration: 1.1 }, 0.3);
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
          stagger: 0.022,
          delay: onLoad ? INTRO_DELAY + 0.2 : 0,
          scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 85%' },
        });
      });

      // Scrubbed reveal (reference values). Headings go letter by letter;
      // paragraphs go word by word, which is far fewer elements to animate.
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        const byWord = el.tagName === 'P';
        const split = SplitText.create(el, { type: byWord ? 'words' : 'words,chars' });
        splits.push(split);
        const parts = byWord ? split.words : split.chars;
        gsap.set(parts, { opacity: 0.4, x: -7, willChange: 'transform, opacity' });
        gsap.to(parts, {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: byWord ? 0.1 : 0.2,
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 20%', scrub: 1 },
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

      // Directional fades.
      gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((el) => {
        const from = el.dataset.from || 'bottom';
        const off = Number(el.dataset.offset || 40);
        gsap.fromTo(
          el,
          { opacity: 0, x: from === 'left' ? -off : from === 'right' ? off : 0, y: from === 'top' ? -off : from === 'bottom' ? off : 0 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            delay: Number(el.dataset.delay || 0),
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        );
      });

      // Feature rows rise into place.
      gsap.utils.toArray<HTMLElement>('[data-row]').forEach((el) => {
        gsap.fromTo(el, { y: 60, opacity: 0.2 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 98%', end: 'top 65%', scrub: 1 } });
      });

      // Parallax.
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const amt = Number(el.dataset.parallax || 12);
        gsap.fromTo(
          el,
          { yPercent: -amt / 2 },
          { yPercent: amt / 2, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });

      // Image zoom 1.5 -> 1 (desktop, like the reference).
      mm.add('(min-width: 1200px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-scale-img]').forEach((el) => {
          gsap.fromTo(el, { scale: 1.5, willChange: 'transform' }, { scale: 1, ease: 'sine', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'center center', scrub: true } });
        });
      });

      // Pinned stacks: next card slides up from below, previous shrinks to 0.9.
      mm.add('(min-width: 1024px)', () => {
        document.querySelectorAll<HTMLElement>('[data-stack]').forEach((stack) => {
          const cards = Array.from(stack.children) as HTMLElement[];
          if (cards.length < 2) return;
          stack.classList.add('is-pinned');
          cards.forEach((c, i) => gsap.set(c, { zIndex: i + 1, yPercent: i ? 110 : 0, transformOrigin: '50% 0%' }));
          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: stack,
              // Pin just below the fixed header.
              start: () => `top ${(document.querySelector('.header')?.getBoundingClientRect().height ?? 80) + 24}px`,
              end: () => `+=${60 * cards.length}%`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
          cards.forEach((c, i) => {
            const next = cards[i + 1];
            if (!next) return;
            tl.fromTo(c, { scale: 1 }, { scale: 0.9 }).to(next, { yPercent: 0 }, '<');
          });
          cleanups.push(() => {
            stack.classList.remove('is-pinned');
            gsap.set(cards, { clearProps: 'all' });
          });
        });
      });

      // Scroll zoom: clip-path opens from a 200x100 window to full screen.
      document.querySelectorAll<HTMLElement>('[data-zoom]').forEach((sec) => {
        const media = sec.querySelector<HTMLElement>('.zoom-media');
        const marquee = sec.querySelector<HTMLElement>('.zoom-marquee');
        const logo = sec.querySelector<HTMLElement>('.zoom-logo');
        const logoMark = sec.querySelector<HTMLElement>('.zoom-logo-mark');
        const logoWord = sec.querySelector<HTMLElement>('.zoom-logo-word');
        const logoText = sec.querySelector<HTMLElement>('.zoom-logo-word > span');
        const caption = sec.querySelector<HTMLElement>('.zoom-caption');
        if (!media) return;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sec, start: 'top top', end: '+=150%', pin: true, scrub: 1, invalidateOnRefresh: true },
        });
        tl.fromTo(
          media,
          {
            clipPath: () => {
              const { width, height } = media.getBoundingClientRect();
              const y = Math.max((height - 100) / 2, 0);
              const x = Math.max((width - 200) / 2, 0);
              // Four explicit values so they tween one-to-one with the end state.
              return `inset(${y}px ${x}px ${y}px ${x}px round 4px)`;
            },
          },
          { clipPath: 'inset(0px 0px 0px 0px round 42px)', duration: 1, ease: 'none' },
          0,
        )
          .fromTo(media.querySelector('img'), { scale: 1.25 }, { scale: 1, duration: 1, ease: 'none' }, 0)
          .fromTo(marquee, { opacity: 1 }, { opacity: 0, duration: 0.6, ease: 'none' }, 0)
          // Logo: pill pops in, mark spins into place, then the wordmark slides out.
          .fromTo(logo, { opacity: 0, scale: 0.4, yPercent: 30 }, { opacity: 1, scale: 1, yPercent: 0, duration: 0.18, ease: 'back.out(1.6)' }, 0.7)
          .fromTo(logoMark, { rotate: -120 }, { rotate: 0, duration: 0.18, ease: 'power3.out' }, 0.7)
          .fromTo(logoWord, { width: 0 }, { width: 'auto', duration: 0.16, ease: 'power3.out' }, 0.82)
          .fromTo(logoText, { yPercent: 110 }, { yPercent: 0, duration: 0.14, ease: 'power3.out' }, 0.86)
          .fromTo(caption, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.2, ease: 'none' }, 0.92);
      });

      // Horizontal gallery.
      document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((g) => {
        const track = g.firstElementChild as HTMLElement | null;
        if (!track) return;
        gsap.to(track, {
          x: () => -Math.max(0, track.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: { trigger: g, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
        });
      });

      // Letters lift on hover (desktop pointers only).
      mm.add('(hover: hover) and (pointer: fine)', () => {
        document.querySelectorAll<HTMLElement>('.xv .wave').forEach((el) => {
          const split = SplitText.create(el, { type: 'chars', charsClass: 'wave-char' });
          splits.push(split);
          const host = el.closest('a, button') ?? el;
          const chars = split.chars as HTMLElement[];
          const enter = () =>
            gsap.to(chars, { keyframes: [{ scaleY: 1.5, y: '-20%' }, { scaleY: 1, y: 0 }], duration: 0.5, ease: 'sine.inOut', stagger: 0.025, overwrite: true });
          host.addEventListener('mouseenter', enter);
          cleanups.push(() => host.removeEventListener('mouseenter', enter));
        });
      });
    });

    // Fonts can shift line breaks; recalc once they are ready.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cleanups.forEach((c) => c());
      splits.forEach((s) => s.revert());
      mm.revert();
    };
  }, []);

  return null;
}
