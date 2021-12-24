import {
  UseMutationOptions as MutationOptions,
  UseQueryOptions as QueryOptions,
} from 'react-query';
import { RequestExtras } from '@tkeel/console-utils';
import { AxiosRequestConfig, Method } from 'axios';

interface BaseOptions {
  url: string;
  method?: Method;
  params?: unknown;
  data?: unknown;
  extras?: RequestExtras;
  axiosRequestConfig?: AxiosRequestConfig;
}

export interface UseQueryOptions extends BaseOptions {
  reactQueryOptions?: QueryOptions;
}

export interface UseMutationOptions extends BaseOptions {
  reactQueryOptions?: MutationOptions;
}
