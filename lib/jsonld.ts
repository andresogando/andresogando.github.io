import type { CaseStudy } from '../content/case-studies';
import homeGraphJson from '../content/home-graph.json';

export const SITE_ORIGIN = 'https://ai.onraven.ca';

export const ogImage = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Raven Platforms, mission-control hero with wireframe planet over a starfield',
};

export const homeGraph = homeGraphJson;

export function articleJsonLd(study: Pick<CaseStudy, 'slug' | 'title' | 'summary' | 'tags'>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.summary,
    keywords: study.tags.join(', '),
    author: { '@type': 'Organization', name: 'Raven Platforms Inc.' },
    publisher: {
      '@type': 'Organization',
      name: 'Raven Platforms Inc.',
      url: `${SITE_ORIGIN}/`,
    },
    mainEntityOfPage: `${SITE_ORIGIN}/case-studies/${study.slug}`,
  };
}
