import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('./claimOverlapHelpers.js', import.meta.url), 'utf8');
const { checkClaimOverlaps, describeClaimConflicts } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

test('checks every employee-specific period and deduplicates conflicts', async () => {
  const sent = [];
  const claims = [{ users: [7], start: '09:00' }, { users: [8], start: '10:00' }];
  const conflicts = await checkClaimOverlaps(claims, async (claim) => {
    sent.push(claim);
    return { has_overlap: true, conflicts: [{ id: 12, user_id: 8 }] };
  });
  assert.deepEqual(sent, claims);
  assert.deepEqual(conflicts, [{ id: 12, user_id: 8 }]);
});

test('allows only an explicitly successful check without conflicts', async () => {
  assert.deepEqual(await checkClaimOverlaps([{}], async () => ({ has_overlap: false, conflicts: [] })), []);
  for (const response of [{}, { has_overlap: false }, { has_overlap: true, conflicts: [] }, { has_overlap: false, conflicts: [{ id: 1 }] }]) {
    await assert.rejects(checkClaimOverlaps([{}], async () => response));
  }
});

test('failed request prevents proceeding even if another period was available', async () => {
  await assert.rejects(checkClaimOverlaps([{ users: [7] }, { users: [8] }], async ({ users }) => {
    if (users[0] === 8) throw new Error('unavailable');
    return { has_overlap: false, conflicts: [] };
  }), /unavailable/);
});

test('conflict message identifies employee, existing claim and period', () => {
  const description = describeClaimConflicts([{ id: 42, user_id: 7, start: '2026-10-26 09:00:00', end: null }], [{ id: 7, surname: 'Иванов', name: 'Иван' }]);
  assert.match(description, /Иванов Иван: заявка №42/);
  assert.match(description, /без даты окончания/);
});
