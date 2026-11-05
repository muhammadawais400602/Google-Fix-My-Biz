import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Activity,
  Ban,
  BarChart3,
  Bot,
  Check,
  Crosshair,
  Hash,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from 'lucide-react';
import AudienceTabs from '@/components/xovra/AudienceTabs';
import Dialer from '@/components/xovra/Dialer';
import FeatureRows from '@/components/xovra/FeatureRows';
import Motion from '@/components/xovra/Motion';
import {
  aiCalling,
  audiences,
  campaigns,
  compliance,
  cta,
  features,
  hero,
  images,
  integrations,
  leadSourcing,
  links,
  steps,
  teams,
  testimonials,
} from '@/lib/xovra-content';

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

function Checks({ items }: { items: string[] }) {
  return (
    <ul className="checks">
      {items.map((b, i) => (
        <li key={b} data-fade data-from="left" data-offset="24" data-delay={String(i * 0.06)}>
          <Check aria-hidden />
          {b}
        </li>
      ))}
    </ul>
  );
}

const pillarIcons = [MapPin, Phone, Bot];
const teamIcons = [Users, Hash, BarChart3, Ban];

export default function Home() {
  return (
    <div className="xv home">
      <div className="loader" aria-hidden>
        <div className="loader-inner">
          <p className="loader-title">{hero.title}</p>
          <span className="loader-rule" />
        </div>
      </div>
      <Motion />

      {/* Hero */}
      <section className="card hero" data-intro aria-labelledby="hero-title">
        <div className="hero-side">
          <div className="hero-thumb" data-intro-item>
            <Image src={images.heroThumb} alt="" width={1200} height={900} priority data-intro-img />
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
          <h1 id="hero-title" className="display">
            <span data-split="load" style={{ display: 'block' }}>
              {hero.title}
            </span>
          </h1>
          <div className="hero-foot" data-intro-item>
            <strong>{hero.titleTop}</strong>
            <div className="btns">
              <Link className="btn btn-pill" href={links.access}>
                <span className="wave">Get Early Access</span> <Arrow />
              </Link>
              <Link className="btn btn-pill" href={links.demo}>
                <span className="wave">Book a Demo</span> <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hero bullets as an icon row */}
      <ul className="pillars">
        {hero.bullets.map((b, i) => {
          const Icon = pillarIcons[i];
          return (
            <li className="pillar" key={b} data-fade data-delay={String(i * 0.1)}>
              <Icon aria-hidden />
              {b}
            </li>
          );
        })}
      </ul>

      {/* Dark stage: audience tabs, heading and the dialer mockup */}
      <section className="card stage on-dark" aria-labelledby="stage-title">
        <div className="stage-bg">
          <Image src={images.stage} alt="" fill sizes="100vw" data-parallax="16" />
        </div>
        <AudienceTabs />
        <div className="stage-body">
          <div className="stage-copy">
            <h2 id="stage-title" className="display h-lg" data-split>
              {audiences.eyebrow}
            </h2>
          </div>
          <Dialer />
        </div>
      </section>

      {/* How it works */}
      <section className="section wrap" aria-labelledby="how-title" style={{ paddingTop: 'clamp(48px, 6vw, 96px)' }}>
        <div className="sec-head">
          <p className="eyebrow">{steps.eyebrow}</p>
          <h2 id="how-title" className="display h-xl" data-split>
            {steps.title}
          </h2>
        </div>
        <div className="stack" data-stack>
          {steps.items.map((s, i) => (
            <article className="step" key={s.n}>
              <div>
                <p className="step-num">{s.n}</p>
                <h3 className="display">{s.title}</h3>
                <p>{s.body}</p>
              </div>
              <div className="step-media">
                <Image src={images.steps[i]} alt="" width={1600} height={1200} sizes="(max-width: 1023px) 100vw, 50vw" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section wrap" aria-labelledby="features-title" style={{ paddingTop: 0 }}>
        <div className="sec-head">
          <p className="eyebrow">{features.eyebrow}</p>
          <div>
            <h2 id="features-title" className="display h-xl" data-reveal>
              {features.title}
            </h2>
            <div className="sec-head-foot">
              <p className="lead" data-fade>
                {features.body}
              </p>
            </div>
          </div>
        </div>
        <FeatureRows />
      </section>

      {/* Lead sourcing */}
      <section className="section wrap" aria-labelledby="lead-title" style={{ paddingTop: 0 }}>
        <div className="split">
          <div>
            <p className="eyebrow">{leadSourcing.eyebrow}</p>
            <h2 id="lead-title" className="display h-lg" data-split>
              {leadSourcing.title}
            </h2>
            <p className="lead" data-reveal>
              {leadSourcing.body}
            </p>
            <Checks items={leadSourcing.bullets} />
            <Link className="btn btn-pill" href={leadSourcing.href}>
              <span className="wave">{leadSourcing.cta}</span> <Arrow />
            </Link>
          </div>
          <div className="angles" data-fade data-from="right">
            <div className="angles-img scale-wrap">
              <Image src={images.leadSourcing} alt="" width={1600} height={1200} sizes="(max-width: 960px) 100vw, 50vw" data-scale-img />
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
          <div data-fade data-from="left">
            <div className="ai-wave scale-wrap">
              <Image src={images.aiCalling} alt="" width={2000} height={1200} sizes="(max-width: 960px) 100vw, 50vw" data-scale-img />
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
          <div>
            <p className="eyebrow">{aiCalling.eyebrow}</p>
            <h2 id="ai-title" className="display h-lg" data-split>
              {aiCalling.title}
            </h2>
            <p className="lead" data-reveal>
              {aiCalling.body}
            </p>
            <Checks items={aiCalling.bullets} />
            <Link className="btn btn-pill" href={aiCalling.href}>
              <span className="wave">{aiCalling.cta}</span> <Arrow />
            </Link>
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
            <Checks items={campaigns.bullets} />
            <Link className="btn btn-pill" href={campaigns.href}>
              <span className="wave">{campaigns.cta}</span> <Arrow />
            </Link>
          </div>
          <div className="script" data-fade data-from="right">
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
            <p className="lead" style={{ marginTop: 24 }} data-fade>
              {teams.body}
            </p>
          </div>
        </div>
        <div className="team-grid">
          {teams.items.map((t, i) => {
            const Icon = teamIcons[i];
            return (
              <article className="team-card" key={t.title} data-fade data-delay={String(i * 0.08)}>
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
                <Hash aria-hidden style={{ width: 36, height: 36, strokeWidth: 1.3 }} />
              </div>
              <div>
                <h3 className="display h-md">{teams.pool.title}</h3>
                <p className="lead" style={{ marginTop: 18 }}>
                  {teams.pool.body}
                </p>
              </div>
            </div>
            <div className="pool-media scale-wrap">
              <Image src={images.pool} alt="" width={1600} height={1600} sizes="(max-width: 760px) 100vw, 50vw" data-scale-img />
            </div>
          </article>
        </div>
      </section>

      {/* Integrations: scroll zoom */}
      <section className="zoom" data-zoom aria-labelledby="int-title" style={{ marginTop: 'clamp(80px, 10vw, 160px)' }}>
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
                {hero.title.split(', ').map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="zoom-media">
          <Image src={images.zoom} alt="" width={1600} height={1600} sizes="100vw" />
        </div>
        <span className="zoom-logo" aria-hidden>
          <span className="zoom-logo-mark">
            <Activity />
          </span>
          <span className="zoom-logo-word">
            <span>Xovra</span>
          </span>
        </span>
        <div className="zoom-caption">
          <div>
            <p className="eyebrow" style={{ color: '#cfcfcf', marginBottom: 14 }}>
              {integrations.eyebrow}
            </p>
            <h2 id="int-title" className="display h-lg">
              {integrations.title}
            </h2>
          </div>
          <p>{integrations.body}</p>
        </div>
      </section>

      <section className="wrap" aria-label={integrations.eyebrow}>
        <div className="int-grid">
          {integrations.items.map((it, i) => (
            <Link className="int" key={it.name} href={links.integrations} data-fade data-delay={String(i * 0.08)}>
              <h3>{it.name}</h3>
              <p>{it.body}</p>
            </Link>
          ))}
        </div>
        <p style={{ marginTop: 24, textAlign: 'right' }}>
          <Link className="link-arrow" href={links.integrations}>
            <span className="wave">{integrations.cta}</span> <Arrow />
          </Link>
        </p>
      </section>

      {/* Image gallery (decorative) */}
      <div className="gallery" data-gallery aria-hidden style={{ marginTop: 'clamp(48px, 6vw, 96px)' }}>
        <div className="gallery-track">
          {images.gallery.map((src, i) => (
            <div className="gallery-item" key={i}>
              <Image src={src} alt="" width={1200} height={1200} sizes="(max-width: 760px) 70vw, 30vw" />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <section className="section wrap" aria-labelledby="quotes-title">
        <div className="sec-head">
          <p className="eyebrow">{testimonials.eyebrow}</p>
          <h2 id="quotes-title" className="display h-xl" data-split>
            {testimonials.title}
          </h2>
        </div>
        <div className="quotes">
          {testimonials.items.map((q, i) => (
            <figure className="quote" key={q.role} data-fade data-delay={String(i * 0.12)}>
              <blockquote>&ldquo;{q.quote}&rdquo;</blockquote>
              <figcaption className="quote-role">{q.role}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Compliance */}
      <section className="wrap" style={{ paddingBottom: 'clamp(56px, 7vw, 100px)' }} aria-labelledby="comp-title">
        <div className="note" data-fade>
          <ShieldCheck aria-hidden />
          <div>
            <h3 id="comp-title">{compliance.title}</h3>
            <p>{compliance.body}</p>
          </div>
          <Link className="btn btn-pill" href={links.compliance}>
            <span className="wave">{compliance.cta}</span> <Arrow />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="card cta on-dark" aria-labelledby="cta-title" style={{ marginBottom: 'var(--inset)' }}>
        <div className="cta-bg">
          <Image src={images.cta} alt="" fill sizes="100vw" data-parallax="20" />
        </div>
        <p className="eyebrow">{cta.eyebrow}</p>
        <h2 id="cta-title" className="display h-xxl" data-scale="50% 50%">
          {cta.title}
        </h2>
        <p>{cta.body}</p>
        <div className="btns">
          <Link className="btn btn-solid" href={links.access}>
            Get Early Access <Arrow />
          </Link>
          <Link className="btn btn-pill" href={links.demo}>
            <span className="wave">Book a Demo</span> <Arrow />
          </Link>
        </div>
      </section>
    </div>
  );
}
