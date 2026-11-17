import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import type { Metadata } from 'next';
import { CaseCard } from '../../components/case-studies/CaseCard';
import { caseStudies } from '../../content/case-studies';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Explore how Raven Platforms designed and engineered healthcare, fintech, transportation, hospitality, membership, and AI forecasting products.',
};

export default function CaseStudiesPage() {
  return (
    <VStack className="home-section" gap={4}>
      <Text type="supporting" color="secondary">
        Selected client work
      </Text>
      <Heading level={1}>Systems built for the real world</Heading>
      <Text as="p">
        Seven field reports on turning ambitious ideas into software people can trust, operate, and grow.
      </Text>
      <Grid columns={{ minWidth: 260, max: 2 }} gap={4}>
        {caseStudies.map((study) => (
          <CaseCard
            key={study.slug}
            slug={study.slug}
            sector={study.sector}
            title={study.title}
            summary={study.summary}
            tags={study.tags}
            fictional={study.fictional}
          />
        ))}
      </Grid>
      <Text type="supporting" color="secondary">
        ** Fictional client names used per NDA clauses.
      </Text>
    </VStack>
  );
}
