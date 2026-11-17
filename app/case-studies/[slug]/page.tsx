import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '../../../content/case-studies';
import { CaseArticle } from '../../../components/case-studies/CaseArticle';
import { JsonLd } from '../../../components/JsonLd';
import { articleJsonLd, ogImage } from '../../../lib/jsonld';

// Partial prefetch rejects a params read unless this route is allowed to block.
export const instant = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const url = `/case-studies/${study.slug}`;
  const socialTitle = `${study.title} | Raven Platforms`;
  return {
    title: study.title,
    description: study.summary,
    keywords: study.tags,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      siteName: 'Raven Platforms Inc.',
      locale: 'en_CA',
      title: socialTitle,
      description: study.summary,
      url,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: study.summary,
      images: [{ url: ogImage.url, alt: ogImage.alt }],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return (
    <>
      <JsonLd data={articleJsonLd(study)} />
      <CaseArticle study={study} />
    </>
  );
}
