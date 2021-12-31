import {
  DefaultOptions,
  MutationCache,
  QueryCache,
  UseMutationOptions,
  UseQueryOptions,
} from 'react-query';
import {
  AxiosRequestConfigExtended,
  RequestExtras,
  RequestResult,
} from '@tkeel/console-utils';
import { Method } from 'axios';

export interface QueryClientConfig {
  queryCache?: QueryCache;
  mutationCache?: MutationCache;
  defaultOptions?: DefaultOptions;
}

export type UseQueryOptionsExtended<
  TApiData = unknown,
  TRequestParams = unknown,
  TRequestBody = unknown
> = UseQueryOptions<
  RequestResult<TApiData, TRequestParams, TRequestBody>,
  unknown,
  RequestResult<TApiData, TRequestParams, TRequestBody>
>;

export type UseMutationOptionsExtended<
  TApiData = unknown,
  TRequestParams = unknown,
  TRequestBody = unknown
> = UseMutationOptions<
  RequestResult<TApiData, TRequestParams, TRequestBody>,
  unknown,
  unknown
>;

interface BaseOptions<TRequestParams = unknown, TRequestBody = unknown> {
  url: string;
  method?: Method;
  params?: TRequestParams;
  data?: TRequestBody;
  extras?: RequestExtras;
  axiosRequestConfig?: AxiosRequestConfigExtended<TRequestParams, TRequestBody>;
}

export interface UseCustomQueryOptions<
  TApiData = unknown,
  TRequestParams = unknown,
  TRequestBody = unknown
> extends BaseOptions<TRequestParams, TRequestBody> {
  reactQueryOptions?: UseQueryOptionsExtended<
    TApiData,
    TRequestParams,
    TRequestBody
  >;
}

export interface UseCustomMutationOptions<
  TApiData = unknown,
  TRequestParams = unknown,
  TRequestBody = unknown
> extends BaseOptions<TRequestParams, TRequestBody> {
  reactQueryOptions?: UseMutationOptionsExtended<
    TApiData,
    TRequestParams,
    TRequestBody
  >;
}
