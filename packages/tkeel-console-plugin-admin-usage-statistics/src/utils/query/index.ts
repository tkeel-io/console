import * as dayjs from 'dayjs';
import { find } from 'lodash';

import { getTimestamp } from '@tkeel/console-utils';

import type {
  FindQueryItemInResultsOptions,
  FindValueInResultsOptions,
  FindValueItemInResultsOptions,
  FindValueItemsInResultsOptions,
  GetQueryParamsLastTimesOptions,
} from './types';

function getQueryParamsLastTimes({
  unit,
  timeValue,
  step,
  endTimeType = 'now',
  startTimeType = 'fromEndTime',
}: GetQueryParamsLastTimesOptions) {
  const now = getTimestamp();
  let [et, endTimeForStartTime] = [0, 0];

  switch (endTimeType) {
    case 'now':
      et = now;
      break;
    case 'startOfNow':
      et = dayjs(now).startOf(unit).valueOf();
      break;
    case 'nextStartOfUnit':
      et = dayjs(now).endOf(unit).valueOf() + 1;
      break;
    default:
      et = now;
      break;
  }

  switch (startTimeType) {
    case 'fromEndTime':
      endTimeForStartTime = et;
      break;
    case 'fromStartOfEndTime':
      endTimeForStartTime = dayjs(et).startOf(unit).valueOf();
      break;
    case 'fromEndOfEndTime':
      endTimeForStartTime = dayjs(et).endOf(unit).valueOf();
      break;
    default:
      endTimeForStartTime = et;
      break;
  }

  const st = dayjs(endTimeForStartTime)
    .subtract(timeValue - 1, unit)
    .valueOf();

  return { st, et, step };
}

export function getQueryParamsLast24Hours() {
  return getQueryParamsLastTimes({
    unit: 'hour',
    timeValue: 24,
    step: '1h',
    startTimeType: 'fromStartOfEndTime',
  });
}

export function getQueryParamsLast24HoursPer5Mins() {
  return getQueryParamsLastTimes({
    unit: 'hour',
    timeValue: 24,
    step: '5m',
    startTimeType: 'fromStartOfEndTime',
  });
}

export function getQueryParamsLast7Days() {
  return getQueryParamsLastTimes({
    unit: 'day',
    timeValue: 7,
    step: '24h',
    endTimeType: 'nextStartOfUnit',
  });
}

function findQueryItemInResults({
  data,
  query,
}: FindQueryItemInResultsOptions) {
  return find(data, { query });
}

export function findValueItemsInResults({
  data,
  query,
  defaults = [],
}: FindValueItemsInResultsOptions) {
  const item = findQueryItemInResults({ data, query });

  return item?.result[0]?.values ?? defaults;
}

export function findValueItemInResults({
  data,
  query,
  defaults,
}: FindValueItemInResultsOptions) {
  const item = findQueryItemInResults({ data, query });

  return item?.result[0]?.value ?? defaults;
}

export function findValueInResults({
  data,
  query,
  defaults = 0,
}: FindValueInResultsOptions) {
  const item = findValueItemInResults({ data, query });

  return item?.value ?? defaults;
}
