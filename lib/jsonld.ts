import type { CaseStudy } from '../content/case-studies';
import { site } from '../content/site';
import homeGraphJson from '../content/home-graph.json';
import { splitFaqAnswer } from './faq-answer';

export const SITE_ORIGIN = 'https://ai.onraven.ca';

export const ogImage = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Raven Platforms, mission-control hero with wireframe planet over a starfield',
};

function faqAnswerText(answerHtml: string) {
  const parts = splitFaqAnswer(answerHtml);
  if (!parts.label) return parts.before;
  return `${parts.before}${parts.label}${parts.after ?? ''}`;
}

const faqMainEntity = site.en.faq.items.map((item) => ({
  '@type': 'Question' as const,
  name: item.question,
  acceptedAnswer: {
    '@type': 'Answer' as const,
    text: faqAnswerText(item.answerHtml),
  },
}));

export const homeGraph = {
  ...homeGraphJson,
  '@graph': homeGraphJson['@graph'].map((node) =>
    node['@type'] === 'FAQPage' ? { ...node, mainEntity: faqMainEntity } : node,
  ),
};

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
