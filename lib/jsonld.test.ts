import assert from 'node:assert/strict';
import test from 'node:test';
import { articleJsonLd, homeGraph } from './jsonld.ts';

test('home graph keeps the archived entity types', () => {
  const types = homeGraph['@graph'].map((node) => node['@type']);
  assert.deepEqual(types, ['Organization', 'ProfessionalService', 'WebSite', 'WebPage', 'FAQPage']);
});

test('home FAQ JSON-LD matches the visible English FAQ', () => {
  const faq = homeGraph['@graph'].find((node) => node['@type'] === 'FAQPage');
  assert.ok(faq && 'mainEntity' in faq);
  assert.deepEqual(
    faq.mainEntity.map((question) => question.name),
    [
      'What does Raven Platforms do?',
      'Where is Raven Platforms located?',
      'What services do you offer?',
      'How do I start a project?',
      'Do you take on audits, DevOps or freelance projects?',
    ],
  );
  assert.equal(
    faq.mainEntity[3].acceptedAnswer.text,
    'Email contact@onraven.ca or use the contact form below. We typically reply within one business day.',
  );
});

test('article json-ld uses the next case study url', () => {
  const data = articleJsonLd({
    slug: 'prevsi',
    title: 'Prevsi',
    summary: 'A healthcare platform.',
    tags: ['Privacy-first', 'Three languages'],
  });
  assert.equal(data['@type'], 'Article');
  assert.equal(data.headline, 'Prevsi');
  assert.equal(data.keywords, 'Privacy-first, Three languages');
  assert.equal(data.mainEntityOfPage, 'https://ai.onraven.ca/case-studies/prevsi');
});
