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
  TRequestBody = unknown
> = UseQueryOptions<
  RequestResult<TApiData, TRequestBody>,
  unknown,
  RequestResult<TApiData, TRequestBody>
>;

export type UseMutationOptionsExtended<
  TApiData = unknown,
  TRequestBody = unknown
> = UseMutationOptions<RequestResult<TApiData, TRequestBody>, unknown, unknown>;

interface BaseOptions<TRequestBody = unknown> {
  url: string;
  method?: Method;
  params?: unknown;
  data?: unknown;
  extras?: RequestExtras;
  axiosRequestConfig?: AxiosRequestConfig<TRequestBody>;
}

export interface UseCustomQueryOptions<
  TApiData = unknown,
  TRequestBody = unknown
> extends BaseOptions<TRequestBody> {
  reactQueryOptions?: UseQueryOptionsExtended<TApiData, TRequestBody>;
}

export interface UseCustomMutationOptions<
  TApiData = unknown,
  TRequestBody = unknown
> extends BaseOptions<TRequestBody> {
  reactQueryOptions?: UseMutationOptionsExtended<TApiData, TRequestBody>;
}
