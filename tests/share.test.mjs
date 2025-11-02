import { test } from 'node:test';
import assert from 'node:assert/strict';
import { encodeState, decodeState } from '../js/share.js';

test('share codes round-trip, including non-ASCII folder names', () => {
  const state = { v: 1, s: ['github.com'], o: { 'github.com': 'Café ☕' }, b: true, r: 'IN' };
  assert.deepEqual(decodeState(encodeState(state)), state);
});

test('share codes are URL safe', () => {
  assert.match(encodeState({ text: '???>>>' }), /^[A-Za-z0-9_-]+$/);
});
