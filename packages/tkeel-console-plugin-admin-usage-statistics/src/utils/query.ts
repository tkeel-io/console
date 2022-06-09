import * as dayjs from 'dayjs';
import { find } from 'lodash';

import { getTimestamp } from '@tkeel/console-utils';

import type {
  QueryItem,
  ValueItem,
} from '@/tkeel-console-plugin-admin-usage-statistics/types/query';

export function getQueryParamsLast7Days() {
  const et = getTimestamp();
  const st = dayjs(et).subtract(6, 'day').startOf('day').valueOf();
  const step = '24h';
  return { et, st, step };
}

interface FindQueryOptions {
  data: QueryItem[];
  query: string;
}

export function findQueryItem({ data, query }: FindQueryOptions) {
  return find(data, { query });
}

interface FindValueOptions extends FindQueryOptions {
  defaultValue?: number;
}

export function findValue({ data, query, defaultValue = 0 }: FindValueOptions) {
  const item = findQueryItem({ data, query });

  return item?.result[0]?.value?.value ?? defaultValue;
}

interface FindValuesOptions extends FindQueryOptions {
  defaultValue?: ValueItem[];
}

export function findValues({
  data,
  query,
  defaultValue = [],
}: FindValuesOptions) {
  const item = findQueryItem({ data, query });

  return item?.result[0]?.values ?? defaultValue;
}
