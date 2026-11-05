import Image from 'next/image';
import {
  ArrowUpRight,
  Bot,
  Check,
  Crosshair,
  FileSpreadsheet,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  Hash,
  Ban,
} from 'lucide-react';
import Header, { Logo } from '@/components/Header';
import Dialer from '@/components/Dialer';
import AudienceTabs from '@/components/AudienceTabs';
import FeatureRows from '@/components/FeatureRows';
import Motion from '@/components/Motion';
import {
  aiCalling,
  campaigns,
  compliance,
  cta,
  features,
  footer,
  hero,
  integrations,
  leadSourcing,
  links,
  site,
  steps,
  teams,
  testimonials,
  audiences,
} from '@/lib/content';

const Arrow = () => <ArrowUpRight aria-hidden />;

// Renders {placeholder} tokens as highlighted chips.
function Script({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\{[a-z]+\})/g).map((part, i) =>
        /^\{[a-z]+\}$/.test(part) ? (
          <span className="ph" key={i}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

const pillarIcons = [MapPin, Phone, Bot];
const teamIcons = [Users, Hash, Wallet, Ban];
const driftIcons = [Phone, FileSpreadsheet, Sparkles, FileSpreadsheet];
const poolNumbers = [
  { n: '+1 (512) •••-0142', r: 41 },
  { n: '+1 (512) •••-0388', r: 34 },
  { n: '+1 (737) •••-0915', r: 27 },
];

export default function Home() {
  return (
    <>
      <Header />
      <Motion />
      <main>
        {/* Hero */}
        <section className="card hero" data-intro aria-labelledby="hero-title">
          <div className="hero-side">
            <div className="hero-thumb" data-intro-item>
              <Image src="/images/hero-glass.png" alt="" width={1200} height={900} priority data-intro-img />
            </div>
            <div data-intro-item>
              <Crosshair className="spark" aria-hidden />
              <p>{hero.body}</p>
            </div>
          </div>
          <div className="hero-main">
            <p className="eyebrow" data-intro-item>
              {hero.eyebrow}
            </p>
            <h1 id="hero-title" className="display" data-split="load">
              {hero.title}
            </h1>
            <div className="hero-foot" data-intro-item>
              <strong>{hero.subtitle}.</strong>
              <div className="btns">
                <a className="btn btn-pill" href={links.access}>
                  Get Early Access <Arrow />
                </a>
                <a className="btn btn-pill" href={links.demo}>
                  Book a Demo <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>

        <ul className="pillars">
          {hero.bullets.map((b, i) => {
            const Icon = pillarIcons[i];
            return (
              <li className="pillar" key={b} data-fade>
                <Icon aria-hidden />
                {b}
              </li>
            );
          })}
        </ul>

        {/* Dark stage: audiences + dialer */}
        <section className="card stage on-dark" aria-label={audiences.eyebrow}>
          <div className="stage-bg">
            <Image src="/images/ribbon-dark.png" alt="" fill sizes="100vw" data-parallax="16" />
          </div>
          <AudienceTabs />
          <div className="stage-body">
            <div className="stage-copy">
              <p className="eyebrow">{audiences.eyebrow}</p>
              <h2 className="display h-lg" data-split>
                Find, call, qualify.
              </h2>
              <ul>
                {hero.bullets.map((b) => (
                  <li key={b} data-fade>
                    <Check aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <Dialer />
          </div>
        </section>

        {/* How it works */}
        <section className="section wrap" id="how" aria-labelledby="how-title">
          <div className="sec-head">
            <p className="eyebrow">{steps.eyebrow}</p>
            <h2 id="how-title" className="display h-xl" data-split>
              {steps.title}
            </h2>
          </div>
          <div className="steps" data-stack>
            {steps.items.map((s) => (
              <article className="step" key={s.n}>
                <div>
                  <p className="step-num">{s.n}</p>
                  <h3 className="display">{s.title}</h3>
                  <p data-reveal>{s.body}</p>
                </div>
                <div className="step-media">
                  <Image src={s.image} alt="" width={1600} height={1200} sizes="(max-width: 860px) 100vw, 50vw" data-parallax="10" />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="section wrap" id="features" aria-labelledby="features-title" style={{ paddingTop: 0 }}>
          <div className="sec-head">
            <p className="eyebrow">{features.eyebrow}</p>
            <div>
              <h2 id="features-title" className="display h-xl" data-reveal>
                {features.title}
              </h2>
              <div className="sec-head-foot">
                <p className="lead">{features.body}</p>
                <a className="link-arrow" href={links.features}>
                  See all features <Arrow />
                </a>
              </div>
            </div>
          </div>
          <FeatureRows />
        </section>

        {/* Scroll zoom: integrations */}
        <section className="zoom" data-zoom aria-labelledby="int-title">
          <div className="zoom-marquee" aria-hidden>
            <div className="marquee-row">
              {[0, 1].map((k) => (
                <div className="marquee-track" key={k}>
                  {integrations.items.map((it) => (
                    <span key={it.name}>{it.name}</span>
                  ))}
                </div>
              ))}
            </div>
            <div className="marquee-row ghost reverse">
              {[0, 1].map((k) => (
                <div className="marquee-track" key={k}>
                  {['Find', 'Call', 'Qualify', 'Track'].map((w) => (
                    <span key={w}>{w}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="zoom-media">
            <Image src="/images/rings-dark.png" alt="" width={1600} height={1600} sizes="100vw" />
          </div>
          <div className="zoom-caption">
            <h2 id="int-title" className="display h-lg">
              {integrations.title}
            </h2>
            <p>{integrations.body}</p>
          </div>
        </section>

        <section className="wrap" aria-label="Integrations list">
          <div className="int-grid">
            {integrations.items.map((it) => (
              <a className="int" key={it.name} href={links.integrations} data-fade>
                <h3>{it.name}</h3>
                <p>{it.body}</p>
              </a>
            ))}
          </div>
          <p style={{ marginTop: 24, textAlign: 'right' }}>
            <a className="link-arrow" href={links.integrations}>
              {integrations.cta} <Arrow />
            </a>
          </p>
        </section>

        {/* Lead sourcing */}
        <section className="section wrap" aria-labelledby="lead-title">
          <div className="split">
            <div>
              <p className="eyebrow">{leadSourcing.eyebrow}</p>
              <h2 id="lead-title" className="display h-lg" data-split>
                {leadSourcing.title}
              </h2>
              <p className="lead" data-reveal>
                {leadSourcing.body}
              </p>
              <ul className="checks">
                {leadSourcing.bullets.map((b) => (
                  <li key={b} data-fade>
                    <Check aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              <a className="btn btn-pill" href={leadSourcing.href}>
                {leadSourcing.cta} <Arrow />
              </a>
            </div>
            <div className="angles" data-fade>
              <div className="angles-img">
                <Image src="/images/pins-dark.png" alt="" width={1600} height={1200} sizes="(max-width: 960px) 100vw, 50vw" data-parallax="20" />
              </div>
              <div className="angles-body">
                <div className="angles-head">
                  <span className="eyebrow" style={{ color: '#fff' }}>
                    {leadSourcing.anglesLabel}
                  </span>
                  <span>{leadSourcing.anglesSub}</span>
                </div>
                {leadSourcing.angles.map((a) => (
                  <div className="angle" key={a.code}>
                    <span className="chip">{a.code}</span>
                    <span>{a.body}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI calling */}
        <section className="card ai on-dark section" aria-labelledby="ai-title">
          <div className="wrap split" style={{ alignItems: 'start' }}>
            <div>
              <p className="eyebrow">{aiCalling.eyebrow}</p>
              <h2 id="ai-title" className="display h-lg" data-split>
                {aiCalling.title}
              </h2>
              <p className="lead" data-reveal>
                {aiCalling.body}
              </p>
              <ul className="checks">
                {aiCalling.bullets.map((b) => (
                  <li key={b} data-fade>
                    <Check aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              <a className="btn btn-pill" href={aiCalling.href}>
                {aiCalling.cta} <Arrow />
              </a>
            </div>
            <div data-fade>
              <div className="ai-wave">
                <Image src="/images/wave-light.png" alt="" width={2000} height={1200} sizes="(max-width: 960px) 100vw, 50vw" />
              </div>
              <p className="report-label">{aiCalling.reportLabel}</p>
              <dl className="report">
                {aiCalling.report.map((r) => (
                  <div key={r.k}>
                    <dt>{r.k}</dt>
                    <dd>{r.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="report-note">{aiCalling.reportNote}</p>
            </div>
          </div>
        </section>

        {/* Campaigns */}
        <section className="section wrap" aria-labelledby="camp-title">
          <div className="split">
            <div>
              <p className="eyebrow">{campaigns.eyebrow}</p>
              <h2 id="camp-title" className="display h-lg" data-split>
                {campaigns.title}
              </h2>
              <p className="lead" data-reveal>
                {campaigns.body}
              </p>
              <ul className="checks">
                {campaigns.bullets.map((b) => (
                  <li key={b} data-fade>
                    <Check aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              <a className="btn btn-pill" href={campaigns.href}>
                {campaigns.cta} <Arrow />
              </a>
            </div>
            <div className="script" data-fade>
              <p className="eyebrow">{campaigns.scriptLabel}</p>
              <blockquote>
                <Script text={campaigns.script} />
              </blockquote>
              <p className="eyebrow muted">{campaigns.placeholdersLabel}</p>
              <div className="ph-list">
                {campaigns.placeholders.map((p) => (
                  <span className="chip" key={p}>
                    {p}
                  </span>
                ))}
              </div>
              <div className="tags">
                {campaigns.tags.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Teams */}
        <section className="wrap" aria-labelledby="teams-title">
          <hr className="rule" />
          <div className="sec-head" style={{ paddingTop: 'clamp(64px, 8vw, 120px)' }}>
            <p className="eyebrow">{teams.eyebrow}</p>
            <div>
              <h2 id="teams-title" className="display h-xl" data-scale>
                {teams.title}
              </h2>
              <p className="lead" style={{ marginTop: 24 }}>
                {teams.body}
              </p>
            </div>
          </div>
          <div className="team-grid">
            {teams.items.map((t, i) => {
              const Icon = teamIcons[i];
              return (
                <article className="team-card" key={t.title} data-fade>
                  <Icon aria-hidden />
                  <div>
                    <h3>{t.title}</h3>
                    <p>{t.body}</p>
                  </div>
                </article>
              );
            })}
            <article className="pool" data-fade>
              <div className="pool-copy">
                <div>
                  <h3 className="display h-md">{teams.pool.title}</h3>
                  <p className="lead" style={{ marginTop: 18 }}>
                    {teams.pool.body}
                  </p>
                </div>
                <div className="pool-stats" aria-hidden>
                  {poolNumbers.map((p) => (
                    <div className="pool-stat" key={p.n}>
                      <span>{p.n}</span>
                      <span className="pool-bar">
                        <i data-bar={p.r} style={{ transform: `scaleX(${p.r / 100})` }} />
                      </span>
                      <span data-count={p.r} data-suffix="%">
                        {p.r}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pool-media">
                <Image src="/images/knot-light.png" alt="" width={1600} height={1600} sizes="(max-width: 760px) 100vw, 50vw" data-parallax="14" />
              </div>
            </article>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section wrap" aria-labelledby="quotes-title">
          <div className="sec-head">
            <p className="eyebrow">{testimonials.eyebrow}</p>
            <h2 id="quotes-title" className="display h-xl" data-split>
              {testimonials.title}
            </h2>
          </div>
          <div className="quotes">
            {testimonials.items.map((q) => (
              <figure className="quote" key={q.role} data-fade style={{ margin: 0 }}>
                <blockquote>{q.quote}</blockquote>
                <footer>
                  <i aria-hidden>{q.role[0]}</i>
                  {q.role}
                </footer>
              </figure>
            ))}
          </div>
        </section>

        <div className="drift" aria-hidden>
          <div className="drift-track">
            {[0, 1, 2].flatMap((k) =>
              [...integrations.items.map((i) => i.name), ...audiences.items].map((name, i) => {
                const Icon = driftIcons[i % driftIcons.length] ?? MessageSquare;
                return (
                  <span key={`${k}-${name}`}>
                    <Icon aria-hidden />
                    {name}
                  </span>
                );
              }),
            )}
          </div>
        </div>

        {/* Compliance */}
        <section className="wrap section" style={{ paddingBlock: 'clamp(56px, 7vw, 100px)' }} aria-labelledby="comp-title">
          <div className="note" data-fade>
            <ShieldCheck aria-hidden />
            <div>
              <h3 id="comp-title">{compliance.title}</h3>
              <p>{compliance.body}</p>
            </div>
            <a className="btn btn-pill" href={links.compliance}>
              {compliance.cta} <Arrow />
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="card cta on-dark" aria-labelledby="cta-title">
          <div className="cta-bg">
            <Image src="/images/ribbon-dark.png" alt="" fill sizes="100vw" data-parallax="20" />
          </div>
          <p className="eyebrow">{cta.eyebrow}</p>
          <h2 id="cta-title" className="display h-xxl" data-scale="50% 50%">
            {cta.title}
          </h2>
          <p>{cta.body}</p>
          <div className="btns">
            <a className="btn btn-solid" href={links.access}>
              Get Early Access
            </a>
            <a className="btn btn-pill" href={links.demo}>
              Book a Demo <Arrow />
            </a>
          </div>
        </section>
      </main>

      <footer className="footer wrap">
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
                    <a href={href === '#' ? '#' : `${site.base}${href}`}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-word" aria-hidden data-scale="50% 100%">
          xovra
        </div>
        <div className="footer-bottom">
          <span>{footer.copyright}</span>
          <span className="status">{footer.status}</span>
        </div>
      </footer>
    </>
  );
}
