import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export const MOSCOW_TIMEZONE = "Europe/Moscow";

const hasExplicitTimezone = (value) => /(?:z|[+-]\d{2}:?\d{2})$/i.test(value.trim());

const normalizeFractionalSeconds = (value) => (
  typeof value === "string"
    ? value.replace(/\.(\d{3})\d+([zZ]|[+-]\d{2}:?\d{2})$/, ".$1$2")
    : value
);

export const moscowDateTime = (value, inputFormat) => {
  if (!value) {
    return null;
  }

  if (dayjs.isDayjs(value)) {
    return value.tz ? value.tz(MOSCOW_TIMEZONE) : dayjs.tz(value, MOSCOW_TIMEZONE);
  }

  if (typeof value === "number") {
    return String(value).length <= 10
      ? dayjs.unix(value).tz(MOSCOW_TIMEZONE)
      : dayjs(value).tz(MOSCOW_TIMEZONE);
  }

  if (typeof value === "string" && /^\d+$/.test(value)) {
    return value.length <= 10
      ? dayjs.unix(Number(value)).tz(MOSCOW_TIMEZONE)
      : dayjs(Number(value)).tz(MOSCOW_TIMEZONE);
  }

  const normalizedValue = normalizeFractionalSeconds(value);

  if (typeof normalizedValue === "string" && hasExplicitTimezone(normalizedValue)) {
    return dayjs(normalizedValue).tz(MOSCOW_TIMEZONE);
  }

  if (inputFormat) {
    return dayjs.tz(normalizedValue, inputFormat, MOSCOW_TIMEZONE);
  }

  return dayjs.tz(normalizedValue, MOSCOW_TIMEZONE);
};

export const formatMoscowDateTime = (value, format = "HH:mm", inputFormat) => {
  const parsedValue = moscowDateTime(value, inputFormat);

  return parsedValue?.isValid() ? parsedValue.format(format) : "";
};

export const formatMoscowUnix = (value, format = "DD-MM-YYYY") => {
  if (!value) {
    return "";
  }

  return dayjs.unix(Number(value)).tz(MOSCOW_TIMEZONE).format(format);
};
