import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

export type TimeValue = string | number | dayjs.Dayjs | Date | null | undefined;

export const timeout = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

export const getMoment = (time?: TimeValue) => dayjs(time);
