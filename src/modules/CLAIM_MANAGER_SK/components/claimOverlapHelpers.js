export const checkClaimOverlaps = async (claims, request) => {
  const results = await Promise.all(claims.map(async (claim) => {
    const result = await request(claim);
    if (typeof result?.has_overlap !== 'boolean' || !Array.isArray(result.conflicts)
        || result.has_overlap !== (result.conflicts.length > 0)) {
      throw new Error('Invalid overlap check response');
    }
    return result.conflicts;
  }));
  return [...new Map(results.flat().map((claim) => [String(claim.id), claim])).values()];
};

export const describeClaimConflicts = (conflicts, users) => conflicts.map((claim) => {
  const user = users.find((item) => Number(item.id) === Number(claim.user_id));
  const name = user
    ? [user.surname, user.name, user.patronymic ?? user.secondname].filter(Boolean).join(' ')
    : `Сотрудник №${claim.user_id}`;
  return `${name}: заявка №${claim.id}, ${claim.start} — ${claim.end ?? 'без даты окончания'}`;
}).join('; ');
