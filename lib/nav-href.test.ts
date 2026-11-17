import assert from 'node:assert/strict';
import test from 'node:test';
import { withLang } from './nav-href.ts';

test('withLang leaves english hrefs alone', () => {
  assert.equal(withLang('/#faq', 'en'), '/#faq');
  assert.equal(withLang('/case-studies', 'en'), '/case-studies');
});

test('withLang keeps spanish on hash and path links', () => {
  assert.equal(withLang('/#faq', 'es'), '/?lang=es#faq');
  assert.equal(withLang('/case-studies', 'es'), '/case-studies?lang=es');
});
