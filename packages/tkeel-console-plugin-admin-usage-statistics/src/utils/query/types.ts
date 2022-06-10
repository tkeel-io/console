import type {
  QueryItem,
  ValueItem,
} from '@/tkeel-console-plugin-admin-usage-statistics/types/query';

interface FindQueryItemInQueryItemsOptions {
  data: QueryItem[];
  query: string;
}

interface FindValueItemsInQueryItemsOptions
  extends FindQueryItemInQueryItemsOptions {
  defaults?: ValueItem[];
}

interface FindValueItemInQueryItemsOptions
  extends FindQueryItemInQueryItemsOptions {
  defaults?: ValueItem;
}

interface FindValueInQueryItemsOptions
  extends FindQueryItemInQueryItemsOptions {
  defaults?: number;
}

export type {
  FindQueryItemInQueryItemsOptions,
  FindValueInQueryItemsOptions,
  FindValueItemInQueryItemsOptions,
  FindValueItemsInQueryItemsOptions,
};
