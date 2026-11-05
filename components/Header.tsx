'use client';

import { useEffect, useState } from 'react';
import { Activity, ChevronDown, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { links, nav } from '@/lib/content';

export function Logo() {
  return (
    <a href="/" className="logo" aria-label="Xovra home">
      <span className="logo-mark">
        <Activity aria-hidden />
      </span>
      <span className="logo-word">
        xovra<i>.</i>
      </span>
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const stored = document.documentElement.dataset.theme;
    setDark(stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const toggleTheme = () => {
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('xovra-theme', next);
    } catch {}
    setDark(!dark);
  };

  return (
    <>
      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="header-inner">
          <Logo />
          <nav className="nav" aria-label="Main">
            {nav.map((item) =>
              'children' in item ? (
                <div className="nav-item" key={item.label}>
                  <button className="nav-link" aria-haspopup="true">
                    {item.label} <ChevronDown aria-hidden />
                  </button>
                  <div className="nav-menu">
                    {item.children.map((c) => (
                      <a key={c.label} href={c.href}>
                        {c.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="nav-item" key={item.label}>
                  <a className="nav-link" href={item.href}>
                    {item.label}
                  </a>
                </div>
              ),
            )}
          </nav>
          <div className="header-actions">
            <a className="icon-btn" href={links.features} aria-label="Search features">
              <Search aria-hidden />
            </a>
            <button className="icon-btn" onClick={toggleTheme} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>
              {dark ? <Sun aria-hidden /> : <Moon aria-hidden />}
            </button>
            <a className="login" href={links.login}>
              Login
            </a>
            <a className="btn btn-solid" href={links.trial}>
              Start Free Trial
            </a>
            <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">
              {open ? <X aria-hidden /> : <Menu aria-hidden />}
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-nav${open ? ' is-open' : ''}`} aria-hidden={!open}>
        {nav.map((item) =>
          'children' in item ? (
            <details key={item.label}>
              <summary>{item.label}</summary>
              {item.children.map((c) => (
                <a key={c.label} href={c.href}>
                  {c.label}
                </a>
              ))}
            </details>
          ) : (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ),
        )}
        <a href={links.login}>Login</a>
        <a href={links.trial}>Start Free Trial</a>
      </div>
    </>
  );
}
