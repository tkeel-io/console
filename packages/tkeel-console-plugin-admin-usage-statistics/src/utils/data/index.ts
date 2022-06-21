import * as dayjs from 'dayjs';
import { find } from 'lodash';

import { getTimestamp } from '@tkeel/console-utils';

import type { TimestampItem } from '@/tkeel-console-plugin-admin-usage-statistics/types/query';

import type {
  FillDataLastCommonTimes,
  FillDataLastTimes,
  FilterHourTimestampOptions,
  FormatTimestampItemOptions,
  FormatTimestampItemsOptions,
  GetHourTimestampOptions,
} from './types';

function fillDataLastTimes({
  data,
  unit,
  timeValue,
  endTimeType = 'startOfNow',
}: FillDataLastTimes) {
  const now = getTimestamp();
  let endTime = 0;

  switch (endTimeType) {
    case 'startOfNow':
      endTime = dayjs(now).startOf(unit).valueOf();
      break;
    case 'nextStartOfUnit':
      endTime = dayjs(now).endOf(unit).valueOf() + 1;
      break;
    default:
      endTime = dayjs(now).startOf(unit).valueOf();
      break;
  }

  return Array.from({ length: timeValue })
    .fill(1)
    .map((_, index) => {
      const timestamp = dayjs(endTime)
        .subtract(timeValue - index - 1, unit)
        .valueOf();
      const item = find(data, { timestamp });
      const value = item?.value ?? 0;

      return {
        timestamp,
        value,
      };
    });
}

export function fillDataLast24Hours({ data }: FillDataLastCommonTimes) {
  return fillDataLastTimes({
    data,
    unit: 'hour',
    timeValue: 24,
    endTimeType: 'startOfNow',
  });
}

export function fillDataLast7Days({ data }: FillDataLastCommonTimes) {
  return fillDataLastTimes({
    data,
    unit: 'day',
    timeValue: 7,
    endTimeType: 'nextStartOfUnit',
  });
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

export function getHourTimestamp({
  startTimestamp,
  endTimestamp = dayjs().valueOf(),
}: GetHourTimestampOptions) {
  const firstHour = dayjs(startTimestamp)
    .startOf('hour')
    .add(1, 'hour')
    .valueOf();
  const lastHour = dayjs(endTimestamp).startOf('hour').valueOf();

  if (firstHour > lastHour) {
    return [];
  }

  const result = [lastHour];

  while (firstHour < result[0]) {
    const prevHour = dayjs(result[0]).subtract(1, 'hour').valueOf();
    result.unshift(prevHour);
  }

  return result;
}
