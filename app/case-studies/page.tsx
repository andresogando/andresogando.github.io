import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import type { Metadata } from 'next';
import { CaseCard } from '../../components/case-studies/CaseCard';
import { caseStudies } from '../../content/case-studies';
import { ogImage } from '../../lib/jsonld';

const description =
  'Explore how Raven Platforms designed and engineered healthcare, fintech, transportation, hospitality, membership, and AI forecasting products.';

export const metadata: Metadata = {
  title: 'Case Studies',
  description,
  alternates: { canonical: '/case-studies' },
  openGraph: {
    type: 'website',
    siteName: 'Raven Platforms Inc.',
    locale: 'en_CA',
    title: 'Case Studies | Raven Platforms',
    description: 'Inside the products, platforms, and systems we have built for ambitious teams.',
    url: '/case-studies',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies | Raven Platforms',
    description,
    images: [{ url: ogImage.url, alt: ogImage.alt }],
  },
};

export default function CaseStudiesPage() {
  return (
    <section className="home-section">
      <p className="section-kicker">Selected client work</p>
      <Heading level={1}>Systems built for the real world</Heading>
      <p className="section-lead">
        Seven field reports on turning ambitious ideas into software people can trust, operate, and grow.
      </p>
      <div className="plate-grid">
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
      </div>
      <Text type="supporting" color="secondary">
        ** Fictional client names used per NDA clauses.
      </Text>
    </section>
  );
}
