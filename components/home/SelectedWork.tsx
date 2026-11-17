'use client';

import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { HStack } from '@astryxdesign/core/HStack';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { caseStudies } from '../../content/case-studies';
import { useLang } from '../../lib/i18n';
import { withLang } from '../../lib/nav-href';
import { RouterLink } from './RouterLink';

export function SelectedWork() {
  const { copy, lang } = useLang();
  return (
    <VStack as="section" className="home-section" gap={4}>
      <HStack justify="between" align="center" wrap="wrap" gap={2}>
        <Heading level={2}>{copy.selectedWork.title}</Heading>
        <Link href={withLang('/case-studies', lang)} as={RouterLink} isStandalone>
          {copy.selectedWork.seeAll}
        </Link>
      </HStack>
      <Grid columns={{ minWidth: 260, max: 3 }} gap={4}>
        {caseStudies.slice(0, 6).map((study) => (
          <Card key={study.slug}>
            <VStack gap={2} align="start">
              <Text type="supporting" color="secondary">
                {study.sector}
              </Text>
              <Heading level={3}>
                <Link href={withLang(`/case-studies/${study.slug}`, lang)} as={RouterLink} type="inherit">
                  {study.title}
                </Link>
              </Heading>
              <Text as="p">{study.summary}</Text>
            </VStack>
          </Card>
        ))}
      </Grid>
    </VStack>
  );
}
