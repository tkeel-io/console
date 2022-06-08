import { find } from 'lodash';

import type { QueryItem } from '@/tkeel-console-plugin-admin-usage-statistics/types/query';

interface FindQueryOptions {
  data: QueryItem[];
  query: string;
}

export function findQueryItem({ data, query }: FindQueryOptions) {
  return find(data, { query });
}
