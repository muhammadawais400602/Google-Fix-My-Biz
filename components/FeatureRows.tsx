'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { features } from '@/lib/content';

// Numbered feature list. On hover, a preview image follows the cursor.
export default function FeatureRows() {
  const floatRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const el = floatRef.current;
    if (!el) return;
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    const move = (e: MouseEvent) => {
      x(e.clientX);
      y(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const el = floatRef.current;
    if (!el) return;
    gsap.to(el, {
      opacity: hovered === null ? 0 : 1,
      scale: hovered === null ? 0.6 : 1,
      rotate: hovered === null ? -6 : 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  }, [hovered]);

  return (
    <>
      <ul className="rows" onMouseLeave={() => setHovered(null)}>
        {features.items.map((f, i) => (
          <li key={f.title} className="row" data-fade onMouseEnter={() => setHovered(i)}>
            <span className="row-n">{String(i + 1).padStart(2, '0')}</span>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
            <a className="link-arrow" href={f.href}>
              {f.cta} <ArrowUpRight aria-hidden />
            </a>
          </li>
        ))}
      </ul>
      <div className="row-float" ref={floatRef} aria-hidden>
        {features.items.map((f, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={f.title} src={f.image} alt="" style={{ opacity: hovered === i ? 1 : 0 }} />
        ))}
      </div>
    </>
  );
}
