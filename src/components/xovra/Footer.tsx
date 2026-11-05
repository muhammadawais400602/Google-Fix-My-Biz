import Link from 'next/link';
import { Logo } from './Header';
import { footer } from '@/lib/xovra-content';

export default function Footer() {
  return (
    <div className="xv">
      <footer className="footer">
        <div className="wrap">
        <div className="footer-top">
          <div>
            <Logo />
            <p>{footer.tagline}</p>
          </div>
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>{footer.copyright}</span>
          <span className="status">{footer.status}</span>
        </div>
        </div>
      </footer>
    </div>
  );
}
