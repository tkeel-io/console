import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';
import {
  AxiosResponseExtended,
  RequestExtras,
  RequestResult,
} from '@tkeel/console-utils';
import { AxiosRequestConfig, Method } from 'axios';

export type UseQueryOptionsExtended<T = unknown> = UseQueryOptions<
  RequestResult<T>,
  unknown,
  RequestResult<T>
>;

export type UseQueryResultExtended<T = unknown, D = unknown> = UseQueryResult<
  RequestResult<T, D>
> & {
  queryKey: QueryKey;
  data: T;
  response: AxiosResponseExtended<T, D>;
};

export type UseMutationOptionsExtended<T = unknown> = UseMutationOptions<
  RequestResult<T>,
  unknown,
  unknown
>;

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
  reactQueryOptions?: UseQueryOptionsExtended<T>;
}

export interface UseCustomMutationOptions<T = unknown, D = unknown>
  extends BaseOptions<D> {
  reactQueryOptions?: UseMutationOptionsExtended<T>;
}
