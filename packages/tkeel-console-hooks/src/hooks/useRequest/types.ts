import { UseMutationOptions, UseQueryOptions } from 'react-query';
import { RequestExtras, RequestResult } from '@tkeel/console-utils';
import { AxiosRequestConfig, Method } from 'axios';

interface BaseOptions {
  url: string;
  method?: Method;
  params?: unknown;
  data?: unknown;
  extras?: RequestExtras;
  axiosRequestConfig?: AxiosRequestConfig;
}

export interface UseCustomQueryOptions<T> extends BaseOptions {
  reactQueryOptions?: UseQueryOptions<
    RequestResult<T>,
    Error,
    RequestResult<T>
  >;
}

export interface UseCustomMutationOptions extends BaseOptions {
  reactQueryOptions?: UseMutationOptions;
}
