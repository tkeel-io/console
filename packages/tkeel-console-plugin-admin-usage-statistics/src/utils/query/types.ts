import type {
  Result,
  ValueItem,
} from '@/tkeel-console-plugin-admin-usage-statistics/types/query';

interface FindQueryItemInResultsOptions {
  data: Result[];
  query: string;
}

interface FindValueItemsInResultsOptions extends FindQueryItemInResultsOptions {
  defaults?: ValueItem[];
}

interface FindValueItemInResultsOptions extends FindQueryItemInResultsOptions {
  defaults?: ValueItem;
}

interface FindValueInResultsOptions extends FindQueryItemInResultsOptions {
  defaults?: number;
}

export type {
  FindQueryItemInResultsOptions,
  FindValueInResultsOptions,
  FindValueItemInResultsOptions,
  FindValueItemsInResultsOptions,
};
