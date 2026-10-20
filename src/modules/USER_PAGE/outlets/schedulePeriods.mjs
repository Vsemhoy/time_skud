import dayjs from 'dayjs';

// Both boundary dates belong to the assignment. A missing end means infinity.
export function findScheduleConflicts(schedules, start, end, excludedId = 0) {
    if (!start || !dayjs(start).isValid()) return [];
    const from = dayjs(start).startOf('day').valueOf();
    const to = end ? dayjs(end).endOf('day').valueOf() : Infinity;
    return schedules.filter(schedule => {
        if (schedule.isBreak || +schedule.id === +excludedId) return false;
        const existingStart = dayjs(schedule.start).startOf('day').valueOf();
        const existingEnd = schedule.end ? dayjs(schedule.end).endOf('day').valueOf() : Infinity;
        return from <= existingEnd && existingStart <= to;
    });
}

export function findScheduleBreaks(schedules) {
    const sorted = [...schedules].sort((a, b) => dayjs(b.start).valueOf() - dayjs(a.start).valueOf());
    return sorted.flatMap((schedule, index) => {
        const older = sorted[index + 1];
        if (!older?.end) return [schedule];
        const start = dayjs(older.end).startOf('day').add(1, 'day');
        const end = dayjs(schedule.start).startOf('day').subtract(1, 'day');
        return start.isAfter(end) ? [schedule] : [schedule, {
            id: `break-${older.id}-${schedule.id}`,
            isBreak: true,
            start: start.format('YYYY-MM-DD'),
            end: end.format('YYYY-MM-DD'),
            breakDays: end.diff(start, 'day') + 1,
        }];
    });
}
