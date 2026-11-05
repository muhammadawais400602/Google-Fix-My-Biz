'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Activity, ArrowUpRight, ChevronDown, Menu, Moon, Sun, User, X } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { links, nav } from '@/lib/xovra-content';

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Xovra home">
      <span className="logo-mark">
        <Activity aria-hidden />
      </span>
      <span className="logo-word">Xovra</span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <div className="xv">
      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="header-inner">
          <Logo />
          <nav className="nav" aria-label="Main">
            {nav.map((item) =>
              'children' in item ? (
                <div className="nav-item" key={item.label}>
                  <button className={`nav-link${isActive(item.href) ? ' is-active' : ''}`} aria-haspopup="true">
                    <span className="wave">{item.label}</span> <ChevronDown aria-hidden />
                  </button>
                  <div className="nav-menu">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="nav-item" key={item.label}>
                  <Link className={`nav-link${isActive(item.href) ? ' is-active' : ''}`} href={item.href}>
                    <span className="wave">{item.label}</span>
                  </Link>
                </div>
              ),
            )}
          </nav>
          <div className="header-actions">
            <button className="icon-btn" onClick={toggle} aria-label="Toggle theme">
              {theme === 'light' ? <Moon aria-hidden /> : <Sun aria-hidden />}
            </button>
            <Link className="login" href={links.login} prefetch={false}>
              <span className="wave">Login</span>
            </Link>
            <Link className="btn btn-solid" href={links.trial}>
              Start Free Trial <ArrowUpRight aria-hidden />
            </Link>
            <span className="avatar" aria-hidden>
              <User />
            </span>
            <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle Navigation Menu">
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
                <Link key={c.href} href={c.href}>
                  {c.label}
                </Link>
              ))}
            </details>
          ) : (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ),
        )}
        <Link href={links.login} prefetch={false}>
          Login
        </Link>
        <Link href={links.trial}>Start Free Trial</Link>
      </div>
    </div>
  );
}
