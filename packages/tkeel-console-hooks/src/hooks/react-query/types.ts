import { Method } from 'axios';
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

export interface QueryClientConfig {
  queryCache?: QueryCache;
  mutationCache?: MutationCache;
  defaultOptions?: DefaultOptions;
}

export type UseQueryOptionsExtended<
  TApiData = unknown,
  TRequestParams = unknown,
  TRequestData = unknown
> = UseQueryOptions<
  RequestResult<TApiData, TRequestParams, TRequestData>,
  unknown,
  RequestResult<TApiData, TRequestParams, TRequestData>
>;

export type UseMutationOptionsExtended<
  TApiData = unknown,
  TRequestParams = unknown,
  TRequestData = unknown
> = UseMutationOptions<
  RequestResult<TApiData, TRequestParams, TRequestData>,
  unknown,
  unknown
>;

interface BaseOptions<TRequestParams = unknown, TRequestData = unknown> {
  url?: string;
  method?: Method;
  params?: TRequestParams;
  data?: TRequestData;
  extras?: RequestExtras;
  axiosRequestConfig?: AxiosRequestConfigExtended<TRequestParams, TRequestData>;
}

export interface UseCustomQueryOptions<
  TApiData = unknown,
  TRequestParams = unknown,
  TRequestData = unknown
> extends BaseOptions<TRequestParams, TRequestData> {
  reactQueryOptions?: UseQueryOptionsExtended<
    TApiData,
    TRequestParams,
    TRequestData
  >;
}

export interface UseCustomMutationOptions<
  TApiData = unknown,
  TRequestParams = unknown,
  TRequestData = unknown
> extends BaseOptions<TRequestParams, TRequestData> {
  reactQueryOptions?: UseMutationOptionsExtended<
    TApiData,
    TRequestParams,
    TRequestData
  >;
}
