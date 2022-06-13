import * as dayjs from 'dayjs';

import { getTimestamp } from '@tkeel/console-utils';

import type { FillDataLastCommonTimes, FillDataLastTimes } from './types';

function fillDataLastTimes({ data, unit, timeValue }: FillDataLastTimes) {
  const current = getTimestamp();
  const today = dayjs(current).startOf(unit).valueOf();
  const newData = [...data];

  if (newData.length >= timeValue) {
    return newData;
  }

  if (newData.length === 0) {
    newData.unshift({ timestamp: today, value: 0 });
  }

  while (newData.length < timeValue) {
    const timestamp = dayjs(newData[0].timestamp).subtract(1, unit).valueOf();
    newData.unshift({ timestamp, value: 0 });
  }

  return newData;
}

export function fillDataLast24Hours({ data }: FillDataLastCommonTimes) {
  return fillDataLastTimes({ data, unit: 'hour', timeValue: 24 });
}

export function fillDataLast7Days({ data }: FillDataLastCommonTimes) {
  return fillDataLastTimes({ data, unit: 'day', timeValue: 7 });
}
