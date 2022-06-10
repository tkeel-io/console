import * as dayjs from 'dayjs';
import { find } from 'lodash';

import { getTimestamp } from '@tkeel/console-utils';

import type {
  FindQueryItemInResultsOptions,
  FindValueInResultsOptions,
  FindValueItemInResultsOptions,
  FindValueItemsInResultsOptions,
} from './types';

export function getQueryParamsLast7Days() {
  const current = getTimestamp();
  const et = dayjs(current).startOf('day').valueOf();
  const st = dayjs(et).subtract(7, 'day').valueOf();
  const step = '24h';

  return { st, step };
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
