import { QueryClientConfig } from './types';

export const DEFAULT_USE_QUERY_OPTIONS = {
  retry: false,
  staleTime: 0,
  cacheTime: 5 * 1000,
  refetchOnWindowFocus: false,
};

export const DEFAULT_USE_MUTATION_OPTIONS = {};

export const DEFAULT_QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: DEFAULT_USE_QUERY_OPTIONS,
    mutations: DEFAULT_USE_MUTATION_OPTIONS,
  },
};
