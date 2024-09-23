import dayjs, { type OptionType } from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

export type TimeValue = string | number | dayjs.Dayjs | Date | null | undefined;

export const getMoment = (time?: TimeValue, format?: OptionType) => dayjs(time, format);

export const timeout = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
