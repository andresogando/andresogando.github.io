import assert from 'node:assert/strict';
import test from 'node:test';
import { articleJsonLd, homeGraph } from './jsonld.ts';

test('home graph keeps the archived entity types', () => {
  const types = homeGraph['@graph'].map((node) => node['@type']);
  assert.deepEqual(types, ['Organization', 'ProfessionalService', 'WebSite', 'WebPage', 'FAQPage']);
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
