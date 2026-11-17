import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { escapeHtml, isValidEmail, parseContactBody } from './contact.ts';

describe('isValidEmail', () => {
  it('accepts simple emails', () => {
    assert.equal(isValidEmail('a@b.co'), true);
  });
  it('rejects garbage', () => {
    assert.equal(isValidEmail('nope'), false);
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
});
