import {
  DefaultOptions,
  MutationCache,
  QueryCache,
  UseMutationOptions,
  UseQueryOptions,
} from 'react-query';
import { RequestExtras, RequestResult } from '@tkeel/console-utils';
import { AxiosRequestConfig, Method } from 'axios';

export interface QueryClientConfig {
  queryCache?: QueryCache;
  mutationCache?: MutationCache;
  defaultOptions?: DefaultOptions;
}

export type UseQueryOptionsExtended<T = unknown, D = unknown> = UseQueryOptions<
  RequestResult<T, D>,
  unknown,
  RequestResult<T, D>
>;

export type UseMutationOptionsExtended<
  T = unknown,
  D = unknown
> = UseMutationOptions<RequestResult<T, D>, unknown, unknown>;

interface BaseOptions<D = unknown> {
  url: string;
  method?: Method;
  params?: unknown;
  data?: unknown;
  extras?: RequestExtras;
  axiosRequestConfig?: AxiosRequestConfig<D>;
}

export interface UseCustomQueryOptions<T = unknown, D = unknown>
  extends BaseOptions<D> {
  reactQueryOptions?: UseQueryOptionsExtended<T, D>;
}

export interface UseCustomMutationOptions<T = unknown, D = unknown>
  extends BaseOptions<D> {
  reactQueryOptions?: UseMutationOptionsExtended<T, D>;
}
