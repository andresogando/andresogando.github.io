import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { resolveLang } from './i18n-core.ts';

describe('resolveLang', () => {
  it('defaults to en', () => {
    assert.equal(resolveLang(undefined), 'en');
    assert.equal(resolveLang(null), 'en');
    assert.equal(resolveLang('fr'), 'en');
  });
  it('accepts es', () => {
    assert.equal(resolveLang('es'), 'es');
  });
});
