'use client';

import { Blockquote } from '@astryxdesign/core/Blockquote';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
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
    <VStack as="article" className="home-section" gap={4} align="start">
      <Text type="supporting" color="secondary">
        {study.sector}
      </Text>
      <Heading level={1}>{displayName(study)}</Heading>
      <Text as="p">{study.summary}</Text>
      {study.sections.map((section) => (
        <VStack key={section.id} gap={2} align="start">
          <Heading level={2} id={section.id}>
            {section.heading}
          </Heading>
          {section.body.map((paragraph, index) => (
            <Text as="p" key={`${section.id}-${index}`}>
              {paragraph}
            </Text>
          ))}
        </VStack>
      ))}
      {study.pullquote ? <Blockquote>{study.pullquote}</Blockquote> : null}
      {study.techNote ? (
        <Text type="supporting" color="secondary">
          {study.techNote}
        </Text>
      ) : null}
      <Link
        href={withLang(next ? `/case-studies/${next.slug}` : '/case-studies', lang)}
        as={RouterLink}
        isStandalone
      >
        {next ? `Next case study: ${displayName(next)}` : 'All case studies'}
      </Link>
    </VStack>
  );
}
