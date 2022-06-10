import * as dayjs from 'dayjs';
import { find } from 'lodash';

import { getTimestamp } from '@tkeel/console-utils';

import type {
  FindQueryItemInQueryItemsOptions,
  FindValueInQueryItemsOptions,
  FindValueItemInQueryItemsOptions,
  FindValueItemsInQueryItemsOptions,
} from './types';

export function getQueryParamsLast7Days() {
  const current = getTimestamp();
  const et = dayjs(current).startOf('day').valueOf();
  const st = dayjs(et).subtract(7, 'day').valueOf();
  const step = '24h';

  return { st, step };
}

function findQueryItemInQueryItems({
  data,
  query,
}: FindQueryItemInQueryItemsOptions) {
  return find(data, { query });
}

export function findValueItemsInQueryItems({
  data,
  query,
  defaults = [],
}: FindValueItemsInQueryItemsOptions) {
  const item = findQueryItemInQueryItems({ data, query });

  return item?.result[0]?.values ?? defaults;
}

export function findValueItemInQueryItems({
  data,
  query,
  defaults,
}: FindValueItemInQueryItemsOptions) {
  const item = findQueryItemInQueryItems({ data, query });

  return item?.result[0]?.value ?? defaults;
}

export function findValueInQueryItems({
  data,
  query,
  defaults = 0,
}: FindValueInQueryItemsOptions) {
  const item = findValueItemInQueryItems({ data, query });

  return item?.value ?? defaults;
}
