'use client';

import { useEffect, useRef, useState } from 'react';
import { Phone, PhoneOff } from 'lucide-react';
import { dialer } from '@/lib/xovra-content';

// Interactive version of the homepage dialer mockup.
// While it is on screen: C calls, H hangs up, 1-6 logs an outcome.
export default function Dialer() {
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState('');
  const [live, setLive] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Type the rebuttal out once the card is visible.
  useEffect(() => {
    if (!visible || typed.length >= dialer.rebuttal.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(dialer.rebuttal);
      return;
    }
    const t = setTimeout(() => setTyped(dialer.rebuttal.slice(0, typed.length + 2)), 22);
    return () => clearTimeout(t);
  }, [visible, typed]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === 'c') {
        setPicked(null);
        setLive(true);
      } else if (k === 'h') setLive(false);
      else if (/^[1-6]$/.test(k)) setPicked(Number(k) - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible]);

  return (
    <div className="dialer" ref={ref} data-fade>
      <div className="dialer-top">
        <span>{dialer.label}</span>
        <span>{dialer.badge}</span>
      </div>
      <div className="dialer-grid">
        <div>
          <div className="dialer-lead">
            <div>
              <h3>{dialer.business}</h3>
              <p>{dialer.meta}</p>
            </div>
            <span className="chip">{dialer.angle}</span>
          </div>
          <p className="dialer-label">{dialer.enrichmentLabel}</p>
          <ul className="enrich">
            {dialer.enrichment.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <p className="dialer-label">{dialer.rebuttalLabel}</p>
          <p className="rebuttal">
            <span className="sr-only">{dialer.rebuttal}</span>
            <span aria-hidden>{typed}</span>
            {typed.length < dialer.rebuttal.length && <span className="caret" aria-hidden />}
          </p>
        </div>
        <div>
          <p className="dialer-label" style={{ marginTop: 0 }}>
            {dialer.outcomesLabel}
          </p>
          <div className="outcomes">
            {dialer.outcomes.map((o, i) => (
              <button key={o} className={`outcome${picked === i ? ' is-picked' : ''}`} onClick={() => setPicked(i)}>
                <kbd>{i + 1}</kbd>
                {o}
              </button>
            ))}
          </div>
          <div className="dialer-keys">
            <div>
              {dialer.shortcuts.map((s) => (
                <span key={s.key}>
                  <kbd>{s.key}</kbd> {s.action}
                </span>
              ))}
            </div>
            <button className={`call-btn${live ? ' is-live' : ''}`} onClick={() => setLive(!live)} aria-pressed={live}>
              {live ? <PhoneOff aria-hidden /> : <Phone aria-hidden />}
              {live ? dialer.shortcuts[1].action : dialer.shortcuts[0].action}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
