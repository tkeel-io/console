import { find } from 'lodash';

import type {
  QueryItem,
  ValueItem,
} from '@/tkeel-console-plugin-admin-usage-statistics/types/query';

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
