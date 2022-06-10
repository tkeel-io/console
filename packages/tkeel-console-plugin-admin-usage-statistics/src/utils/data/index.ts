import * as dayjs from 'dayjs';

import { getTimestamp } from '@tkeel/console-utils';

import type { ValueItem } from '@/tkeel-console-plugin-admin-usage-statistics/types/query';

interface FillDataLast7Days {
  data: ValueItem[];
}

export function fillDataLast7Days({ data }: FillDataLast7Days) {
  const count = 7;
  const current = getTimestamp();
  const today = dayjs(current).startOf('day').valueOf();
  const newData = [...data];

  if (newData.length >= count) {
    return newData;
  }

  if (newData.length === 0) {
    newData.unshift({ timestamp: today, value: 0 });
  }

  while (newData.length < 7) {
    const timestamp = dayjs(newData[0].timestamp).subtract(1, 'day').valueOf();
    newData.unshift({ timestamp, value: 0 });
  }

  return newData;
}
