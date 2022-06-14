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
}: GetQueryParamsLastTimesOptions) {
  const current = getTimestamp();
  const et = dayjs(current).startOf(unit).valueOf();
  const st = dayjs(et)
    .subtract(timeValue - 1, unit)
    .valueOf();

  return { st, step };
}

export function getQueryParamsLast24Hours() {
  return getQueryParamsLastTimes({
    unit: 'hour',
    timeValue: 24,
    step: '1h',
  });
}

export function getQueryParamsLast24HoursPer5Mins() {
  /* const unit = 'hour';
  const timeValue = 24;
  const step = '5m';

  const current = getTimestamp();
  const et = current;
  const st = dayjs(et)
    .subtract(timeValue - 1, unit)
    .valueOf();

  return { st, step }; */

  return getQueryParamsLastTimes({
    unit: 'hour',
    timeValue: 24,
    step: '5m',
  });
}

export function getQueryParamsLast7Days() {
  return getQueryParamsLastTimes({ unit: 'day', timeValue: 7, step: '24h' });
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
