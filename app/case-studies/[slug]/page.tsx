import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '../../../content/case-studies';
import { CaseArticle } from '../../../components/case-studies/CaseArticle';

// Partial prefetch rejects a params read unless this route is allowed to block.
export const instant = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: study.title, description: study.summary };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseArticle study={study} />;
}
