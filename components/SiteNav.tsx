'use client';

import NextLink from 'next/link';
import type { ComponentProps } from 'react';
import { Button } from '@astryxdesign/core/Button';
import { Link } from '@astryxdesign/core/Link';
import { TopNav, TopNavHeading, TopNavItem } from '@astryxdesign/core/TopNav';
import { useLang } from '../lib/i18n';
import { withLang } from '../lib/nav-href';

function RouterLink({ to, href, ...props }: ComponentProps<typeof NextLink> & { to?: string }) {
  return <NextLink {...props} href={href ?? to ?? '/'} />;
}

export function SiteNav() {
  const { copy, lang, setLang } = useLang();
  return (
    <header>
      <TopNav
        label="Primary"
        heading={<TopNavHeading heading="Raven Platforms" headingHref={withLang('/', lang)} as={RouterLink} />}
        startContent={
          <>
            <TopNavItem label={copy.nav.services} href={withLang('/#services', lang)} as={RouterLink} />
            <TopNavItem label={copy.nav.clients} href={withLang('/#work', lang)} as={RouterLink} />
            <TopNavItem label={copy.nav.cases} href={withLang('/case-studies', lang)} as={RouterLink} />
            <TopNavItem label={copy.nav.faq} href={withLang('/#faq', lang)} as={RouterLink} />
          </>
        }
        endContent={
          <>
            <Link href="https://onraven.com" isExternalLink isStandalone color="secondary">
              OnRaven
            </Link>
            <Link href="https://prevsi.com" isExternalLink isStandalone color="secondary">
              Prevsi
            </Link>
            <div role="group" aria-label="Language">
              <Button
                type="button"
                label="EN"
                size="sm"
                variant={lang === 'en' ? 'secondary' : 'ghost'}
                aria-pressed={lang === 'en'}
                onClick={() => setLang('en')}
              />
              <Button
                type="button"
                label="ES"
                size="sm"
                variant={lang === 'es' ? 'secondary' : 'ghost'}
                aria-pressed={lang === 'es'}
                onClick={() => setLang('es')}
              />
            </div>
            <Button label={copy.nav.cta} href={withLang('/#contact', lang)} as={RouterLink} variant="primary" />
          </>
        }
      />
    </header>
  );
}
