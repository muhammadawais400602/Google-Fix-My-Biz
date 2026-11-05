'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Bot, Hash, MapPin, Megaphone, MessageSquare, Phone, ShieldCheck, Zap } from 'lucide-react';
import { features, images } from '@/lib/xovra-content';

// Same icons the original homepage used for each feature.
const icons = [MapPin, Phone, Bot, Zap, Megaphone, MessageSquare, ShieldCheck, Hash];

// Feature list. On hover, a preview image follows the cursor.
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
        {features.items.map((f, i) => {
          const Icon = icons[i];
          return (
          <li key={f.title} className="row" data-row onMouseEnter={() => setHovered(i)}>
            <span className="row-n" aria-hidden>
              <Icon />
            </span>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
            <Link className="link-arrow" href={f.href}>
              <span className="wave">{f.cta}</span> <ArrowUpRight aria-hidden />
            </Link>
          </li>
          );
        })}
      </ul>
      <div className="row-float" ref={floatRef} aria-hidden>
        {images.features.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt="" style={{ opacity: hovered === i ? 1 : 0 }} />
        ))}
      </div>
    </>
  );
}
