import * as dayjs from 'dayjs';

import { getTimestamp } from '@tkeel/console-utils';

import type { TimestampItem } from '@/tkeel-console-plugin-admin-usage-statistics/types/query';

import type {
  FillDataLastCommonTimes,
  FillDataLastTimes,
  FilterHourTimestampOptions,
  FormatTimestampItemOptions,
  FormatTimestampItemsOptions,
} from './types';

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

export function formatTimestampItem({
  data,
  formatter,
}: FormatTimestampItemOptions) {
  const { timestamp, ...rest } = data;
  const newData: TimestampItem = { timestamp };
  Object.entries(rest).forEach(([key, value]) => {
    newData[key] = formatter(value);
  });

  return newData;
}

export function formatTimestampItems({
  data,
  formatter,
}: FormatTimestampItemsOptions) {
  return data.map((item) => formatTimestampItem({ data: item, formatter }));
}

export function filterHourTimestamp({ data }: FilterHourTimestampOptions) {
  return data.filter((timestamp) => {
    const minute = dayjs(timestamp).get('minute');
    const second = dayjs(timestamp).get('second');
    const millisecond = dayjs(timestamp).get('millisecond');

    return minute === 0 && second === 0 && millisecond === 0;
  });
}
