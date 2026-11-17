'use client';

import Link from 'next/link';
import { useLang } from '../../lib/i18n';
import { withLang } from '../../lib/nav-href';

export function Hero() {
  const { copy, lang } = useLang();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <img
          src="/media/hero-docks.jpg"
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="hero-copy">
        <p className="hero-brand">Raven Platforms</p>
        <h1 id="hero-title" className="hero-title">
          {copy.hero.title}
        </h1>
        <p className="hero-desc">{copy.hero.description}</p>
        <div className="hero-actions">
          <Link className="cta cta-primary" href={withLang('/#contact', lang)}>
            {copy.hero.cta}
          </Link>
          <Link className="cta cta-ghost" href={withLang('/case-studies', lang)}>
            {copy.nav.cases}
          </Link>
        </div>
      </div>
    </section>
  );
}
