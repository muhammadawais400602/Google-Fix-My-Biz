'use client';

import { useEffect, useRef, useState } from 'react';
import { Phone, PhoneOff } from 'lucide-react';
import { dialer } from '@/lib/content';

// Interactive version of the dialer mockup from xovra.ai.
// Keys: C to call, H to hang up, 1-6 to log an outcome (only while it is on screen).
export default function Dialer() {
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState('');
  const [live, setLive] = useState(false);
  const [secs, setSecs] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  // Type the rebuttal out once the card is visible.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
    if (!live) return;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [live]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === 'c') call();
      else if (k === 'h') hang();
      else if (/^[1-6]$/.test(k)) setPicked(Number(k) - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible]);

  const call = () => {
    setSecs(0);
    setPicked(null);
    setLive(true);
  };
  const hang = () => setLive(false);
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');

  return (
    <div className="dialer" ref={ref} data-fade>
      <div className="dialer-top">
        <span>{dialer.label}</span>
        <span>{dialer.badge}</span>
      </div>
      <div className="dialer-lead">
        <div>
          <h3>{dialer.business}</h3>
          <p>{dialer.meta}</p>
        </div>
        <span className="chip">{dialer.angle}</span>
      </div>

      <p className="dialer-label">Enrichment</p>
      <ul className="enrich">
        {dialer.enrichment.map((e) => (
          <li key={e.text} className={e.bad ? '' : 'ok'}>
            {e.text}
          </li>
        ))}
      </ul>

      <p className="dialer-label">AI rebuttal draft</p>
      <p className="rebuttal" aria-label={dialer.rebuttal}>
        <span aria-hidden>{typed}</span>
        {typed.length < dialer.rebuttal.length && <span className="caret" aria-hidden />}
      </p>

      <p className="dialer-label">Log outcome</p>
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
          <span>
            <kbd>C</kbd> Call
          </span>
          <span>
            <kbd>H</kbd> Hang up
          </span>
          <span>
            <kbd>1-6</kbd> Log outcome
          </span>
        </div>
        <button className={`call-btn${live ? ' is-live' : ''}`} onClick={live ? hang : call}>
          {live ? <PhoneOff aria-hidden /> : <Phone aria-hidden />}
          {live ? <span className="call-timer">{`${mm}:${ss}`}</span> : 'Call'}
        </button>
      </div>
    </div>
  );
}
