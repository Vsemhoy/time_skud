import {test} from 'node:test';
import assert from 'node:assert/strict';
import {findScheduleConflicts, findScheduleBreaks} from './schedulePeriods.mjs';

const schedules = [
    {id: 1, start: '2025-01-10', end: '2025-01-20 23:59:59'},
    {id: 2, start: '2025-02-01', end: null},
];

test('past free periods and adjacent days are allowed', () => {
    assert.deepEqual(findScheduleConflicts(schedules, '2025-01-01', '2025-01-09'), []);
    assert.deepEqual(findScheduleConflicts(schedules, '2025-01-21', '2025-01-31'), []);
});
test('inclusive boundaries, contained and enclosing periods conflict', () => {
    for (const [start, end] of [
        ['2025-01-01', '2025-01-10'],
        ['2025-01-20', '2025-01-21'],
        ['2025-01-12', '2025-01-14'],
        ['2025-01-01', '2025-01-31'],
        ['2025-01-10', '2025-01-10'],
    ]) assert.deepEqual(findScheduleConflicts(schedules, start, end).map(item => item.id), [1]);
});
test('open periods overlap future assignments but allow earlier closed periods', () => {
    assert.equal(findScheduleConflicts(schedules, '2025-01-21', null)[0].id, 2);
    assert.equal(findScheduleConflicts(schedules, '2026-01-01', null)[0].id, 2);
    assert.equal(findScheduleConflicts(schedules, '2025-01-01', null).length, 2);
});
test('editing excludes only its own assignment; synthetic gaps do not conflict', () => {
    assert.deepEqual(findScheduleConflicts(schedules, '2025-01-10', '2025-01-20', 1), []);
    assert.equal(findScheduleConflicts(schedules, '2025-01-10', null, 1)[0].id, 2);
    assert.deepEqual(findScheduleConflicts([{isBreak: true, start: '2025-01-01', end: '2025-01-31'}], '2025-01-10', null), []);
});
test('gaps are chronological, count actual free days and exclude adjacent days', () => {
    const result = findScheduleBreaks(schedules);
    assert.equal(result[1].breakDays, 11);
    assert.equal(result[1].start, '2025-01-21');
    assert.equal(result[1].end, '2025-01-31');
    assert.equal(findScheduleBreaks([schedules[0], {id: 3, start: '2025-01-21', end: null}]).length, 2);
});
