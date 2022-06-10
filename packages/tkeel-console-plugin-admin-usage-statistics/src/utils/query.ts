import * as dayjs from 'dayjs';
import { find } from 'lodash';

import { getTimestamp } from '@tkeel/console-utils';

import type {
  QueryItem,
  ValueItem,
} from '@/tkeel-console-plugin-admin-usage-statistics/types/query';

export function getQueryParamsLast7Days() {
  const current = getTimestamp();
  const et = dayjs(current).startOf('day').valueOf();
  const st = dayjs(et).subtract(7, 'day').valueOf();
  const step = '24h';

  return { st, step };
}

interface FindQueryItemInQueryItemsOptions {
  data: QueryItem[];
  query: string;
}

export function findQueryItemInQueryItems({
  data,
  query,
}: FindQueryItemInQueryItemsOptions) {
  return find(data, { query });
}

interface FindValueItemsInQueryItemsOptions
  extends FindQueryItemInQueryItemsOptions {
  defaults?: ValueItem[];
}

export function findValueItemsInQueryItems({
  data,
  query,
  defaults = [],
}: FindValueItemsInQueryItemsOptions) {
  const item = findQueryItemInQueryItems({ data, query });

  return item?.result[0]?.values ?? defaults;
}

interface FindValueItemInQueryItemsOptions
  extends FindQueryItemInQueryItemsOptions {
  defaults?: ValueItem;
}

export function findValueItemInQueryItems({
  data,
  query,
  defaults,
}: FindValueItemInQueryItemsOptions) {
  const item = findQueryItemInQueryItems({ data, query });

  return item?.result[0]?.value ?? defaults;
}

interface FindValueInQueryItemsOptions
  extends FindQueryItemInQueryItemsOptions {
  defaults?: number;
}

export function findValueInQueryItems({
  data,
  query,
  defaults = 0,
}: FindValueInQueryItemsOptions) {
  const item = findValueItemInQueryItems({ data, query });

  return item?.value ?? defaults;
}
