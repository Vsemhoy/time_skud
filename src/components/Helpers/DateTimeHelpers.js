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
  if (
    !value
    || value === "0000-00-00"
    || value === "0000-00-00 00:00:00"
    || value === "Invalid date"
  ) {
    return null;
  }

  try {
    if (dayjs.isDayjs(value)) {
      const parsedValue = value.tz ? value.tz(MOSCOW_TIMEZONE) : dayjs.tz(value, MOSCOW_TIMEZONE);
      return parsedValue.isValid() ? parsedValue : null;
    }

    if (typeof value === "number") {
      const parsedValue = String(value).length <= 10
        ? dayjs.unix(value).tz(MOSCOW_TIMEZONE)
        : dayjs(value).tz(MOSCOW_TIMEZONE);
      return parsedValue.isValid() ? parsedValue : null;
    }

    if (typeof value === "string" && /^\d+$/.test(value)) {
      const parsedValue = value.length <= 10
        ? dayjs.unix(Number(value)).tz(MOSCOW_TIMEZONE)
        : dayjs(Number(value)).tz(MOSCOW_TIMEZONE);
      return parsedValue.isValid() ? parsedValue : null;
    }

    const normalizedValue = normalizeFractionalSeconds(value);

    if (typeof normalizedValue === "string" && hasExplicitTimezone(normalizedValue)) {
      const parsedValue = dayjs(normalizedValue).tz(MOSCOW_TIMEZONE);
      return parsedValue.isValid() ? parsedValue : null;
    }

    if (inputFormat) {
      const parsedValue = dayjs.tz(normalizedValue, inputFormat, MOSCOW_TIMEZONE);
      return parsedValue.isValid() ? parsedValue : null;
    }

    const parsedValue = dayjs.tz(normalizedValue, MOSCOW_TIMEZONE);
    return parsedValue.isValid() ? parsedValue : null;
  } catch (e) {
    console.log("Moscow date parse error", value, e);
    return null;
  }
};

export const formatMoscowDateTime = (value, format = "HH:mm", inputFormat) => {
  const parsedValue = moscowDateTime(value, inputFormat);

  return parsedValue?.isValid() ? parsedValue.format(format) : "";
};

export const formatMoscowUnix = (value, format = "DD-MM-YYYY") => {
  if (!value) {
    return "";
  }

  try {
    const parsedValue = dayjs.unix(Number(value)).tz(MOSCOW_TIMEZONE);
    return parsedValue.isValid() ? parsedValue.format(format) : "";
  } catch (e) {
    console.log("Moscow unix date parse error", value, e);
    return "";
  }
};
