import assert from 'node:assert/strict';
import test from 'node:test';
import { splitFaqAnswer } from './faq-answer.ts';

test('plain answers stay text', () => {
  assert.deepEqual(splitFaqAnswer('We are a studio.'), { before: 'We are a studio.' });
});

test('splits only the known mailto anchor', () => {
  const html = 'Email <a href="mailto:contact@onraven.ca">contact@onraven.ca</a> or write.';
  assert.deepEqual(splitFaqAnswer(html), {
    before: 'Email ',
    href: 'mailto:contact@onraven.ca',
    label: 'contact@onraven.ca',
    after: ' or write.',
  });
});

test('leaves any other anchor as text', () => {
  const html = 'Write <a href="mailto:other@example.com">other@example.com</a> now.';
  assert.deepEqual(splitFaqAnswer(html), { before: html });
});
