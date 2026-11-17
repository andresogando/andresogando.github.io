import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { escapeHtml, isAllowedContactOrigin, isValidEmail, parseContactBody } from './contact.ts';

describe('isValidEmail', () => {
  it('accepts simple emails', () => {
    assert.equal(isValidEmail('a@b.co'), true);
  });
  it('rejects garbage', () => {
    assert.equal(isValidEmail('nope'), false);
  });
  it('rejects emails longer than 254 characters before the regex', () => {
    const atLimit = `${'a'.repeat(249)}@b.co`;
    const tooLong = `${'a'.repeat(250)}@b.co`;
    assert.equal(atLimit.length, 254);
    assert.equal(tooLong.length, 255);
    assert.equal(isValidEmail(atLimit), true);
    assert.equal(isValidEmail(tooLong), false);
  });
});

describe('isAllowedContactOrigin', () => {
  const server = 'https://ai.onraven.ca';
  const allowed = 'https://ai.onraven.ca';

  it('allows any origin when the allowlist is unset', () => {
    assert.equal(isAllowedContactOrigin('https://evil.example', undefined, server), true);
  });
  it('allows a missing origin and the server origin', () => {
    assert.equal(isAllowedContactOrigin('', allowed, server), true);
    assert.equal(isAllowedContactOrigin(server, allowed, server), true);
  });
  it('allows a matching allowlist origin', () => {
    assert.equal(isAllowedContactOrigin(allowed, allowed, 'https://preview.example'), true);
  });
  it('rejects a mismatched origin', () => {
    assert.equal(isAllowedContactOrigin('https://evil.example', allowed, server), false);
  });
});

describe('escapeHtml', () => {
  it('escapes brackets and quotes', () => {
    assert.equal(escapeHtml('<b>"x"&'), '&lt;b&gt;&quot;x&quot;&amp;');
  });
});

describe('parseContactBody', () => {
  it('requires fields', () => {
    const r = parseContactBody({ name: '', email: '', message: '' });
    assert.equal(r.ok, false);
  });
  it('rejects long messages', () => {
    const r = parseContactBody({ name: 'A', email: 'a@b.co', message: 'x'.repeat(5001) });
    assert.equal(r.ok, false);
  });
  it('accepts valid payloads', () => {
    const r = parseContactBody({ name: 'A', email: 'a@b.co', message: 'Hi' });
    assert.equal(r.ok, true);
  });
  it('rejects emails longer than 254 characters', () => {
    const r = parseContactBody({ name: 'A', email: `${'a'.repeat(251)}@b.co`, message: 'Hi' });
    assert.equal(r.ok, false);
  });
});
