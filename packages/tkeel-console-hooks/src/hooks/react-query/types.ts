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

export type UseQueryOptionsExtended<
  TApiData = unknown,
  D = unknown
> = UseQueryOptions<
  RequestResult<TApiData, D>,
  unknown,
  RequestResult<TApiData, D>
>;

export type UseMutationOptionsExtended<
  TApiData = unknown,
  D = unknown
> = UseMutationOptions<RequestResult<TApiData, D>, unknown, unknown>;

interface BaseOptions<D = unknown> {
  url: string;
  method?: Method;
  params?: unknown;
  data?: unknown;
  extras?: RequestExtras;
  axiosRequestConfig?: AxiosRequestConfig<D>;
}

export interface UseCustomQueryOptions<TApiData = unknown, D = unknown>
  extends BaseOptions<D> {
  reactQueryOptions?: UseQueryOptionsExtended<TApiData, D>;
}

export interface UseCustomMutationOptions<TApiData = unknown, D = unknown>
  extends BaseOptions<D> {
  reactQueryOptions?: UseMutationOptionsExtended<TApiData, D>;
}
