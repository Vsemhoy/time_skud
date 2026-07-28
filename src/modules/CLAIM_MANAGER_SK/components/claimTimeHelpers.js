export const formatSecondsAsTime = (value, fallback = '-') => {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }

  const totalSeconds = Number(value);

  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return fallback;
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return [
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0'),
  ].join(':');
};
