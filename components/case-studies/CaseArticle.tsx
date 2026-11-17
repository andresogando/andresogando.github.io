'use client';

import { Blockquote } from '@astryxdesign/core/Blockquote';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { getCaseStudy, type CaseStudy } from '../../content/case-studies';
import { useLang } from '../../lib/i18n';
import { withLang } from '../../lib/nav-href';
import { RouterLink } from '../home/RouterLink';

function displayName(study: Pick<CaseStudy, 'title' | 'fictional'>) {
  return study.fictional ? `${study.title}**` : study.title;
}

export function CaseArticle({ study }: { study: CaseStudy }) {
  const { lang } = useLang();
  const next = study.nextSlug ? getCaseStudy(study.nextSlug) : undefined;
  return (
    <article className="case-shell">
      <p className="section-kicker">{study.sector}</p>
      <Heading level={1}>{displayName(study)}</Heading>
      <p className="section-lead">{study.summary}</p>
      <div className="prose-stack">
        {study.sections.map((section) => (
          <section key={section.id}>
            <Heading level={2} id={section.id}>
              {section.heading}
            </Heading>
            {section.body.map((paragraph, index) => (
              <Text as="p" key={`${section.id}-${index}`}>
                {paragraph}
              </Text>
            ))}
          </section>
        ))}
      </div>
      {study.pullquote ? (
        <div className="section-stack">
          <Blockquote>{study.pullquote}</Blockquote>
        </div>
      ) : null}
      {study.techNote ? (
        <Text type="supporting" color="secondary">
          {study.techNote}
        </Text>
      ) : null}
      <div className="section-stack">
        <Link
          href={withLang(next ? `/case-studies/${next.slug}` : '/case-studies', lang)}
          as={RouterLink}
          isStandalone
        >
          {next ? `Next case study: ${displayName(next)}` : 'All case studies'}
        </Link>
      </div>
    </article>
  );
}
