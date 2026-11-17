'use client';

import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { caseStudies } from '../../content/case-studies';
import { useLang } from '../../lib/i18n';
import { withLang } from '../../lib/nav-href';
import { RouterLink } from './RouterLink';

export function SelectedWork() {
  const { copy, lang } = useLang();
  return (
    <section className="home-section">
      <div className="section-head">
        <div>
          <p className="section-kicker">Case studies</p>
          <Heading level={2}>{copy.selectedWork.title}</Heading>
        </div>
        <Link href={withLang('/case-studies', lang)} as={RouterLink} isStandalone>
          {copy.selectedWork.seeAll}
        </Link>
      </div>
      <div className="plate-grid">
        {caseStudies.slice(0, 6).map((study) => (
          <article key={study.slug} className="ink-plate">
            <p className="ink-plate-meta">{study.sector}</p>
            <Heading level={3}>
              <Link href={withLang(`/case-studies/${study.slug}`, lang)} as={RouterLink} type="inherit">
                {study.title}
              </Link>
            </Heading>
            <Text as="p">{study.summary}</Text>
          </article>
        ))}
      </div>
    </section>
  );
}
