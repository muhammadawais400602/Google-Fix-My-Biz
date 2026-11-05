'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { audiences } from '@/lib/xovra-content';

// Audience tabs cycle on their own; hovering or focusing one picks it.
export default function AudienceTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % audiences.items.length), 2800);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div className="tabs" onMouseLeave={() => setPaused(false)}>
      {audiences.items.map((label, i) => (
        <button
          key={label}
          className={`tab${active === i ? ' is-active' : ''}`}
          onMouseEnter={() => {
            setActive(i);
            setPaused(true);
          }}
          onFocus={() => {
            setActive(i);
            setPaused(true);
          }}
          onBlur={() => setPaused(false)}
        >
          {label} <ArrowUpRight aria-hidden />
        </button>
      ))}
    </div>
  );
}
