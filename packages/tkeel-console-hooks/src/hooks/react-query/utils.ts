import { MutationKey, QueryKey, UseQueryResult } from 'react-query';
import {
  AxiosRequestConfigExtended,
  request,
  RequestResult,
} from '@tkeel/console-utils';
import { get, merge } from 'lodash';

import {
  UseCustomMutationOptions,
  UseCustomQueryOptions,
  UseMutationOptionsExtended,
  UseQueryOptionsExtended,
} from './types';

export function getUseQueryOptions<T, D>(
  options: UseCustomQueryOptions<T, D>
): UseQueryOptionsExtended<T> {
  const {
    url,
    method,
    params,
    data,
    extras,
    axiosRequestConfig,
    reactQueryOptions,
  } = options;
  const key = reactQueryOptions?.queryKey;
  const queryKey: QueryKey = key || [url, method, params, data];
  const config: AxiosRequestConfigExtended<D> = merge(
    {},
    { url, method, params, data, extras },
    axiosRequestConfig
  );

  function queryFn() {
    return request<T, D>(config);
  }

  return merge({}, { queryKey, queryFn }, reactQueryOptions);
}

export function getUseMutationOptions<T, D>(
  options: UseCustomMutationOptions<T, D>
): UseMutationOptionsExtended<T> {
  const {
    url,
    method,
    params,
    data,
    extras,
    axiosRequestConfig,
    reactQueryOptions,
  } = options;
  const key = reactQueryOptions?.mutationKey;
  const mutationKey: MutationKey = key || [url, method, params, data];
  const config: AxiosRequestConfigExtended<D> = merge(
    {},
    { url, method, params, data, extras },
    axiosRequestConfig
  );

  function mutationFn(variables: AxiosRequestConfigExtended) {
    return request<T, D>(merge({}, config, variables));
  }

  return merge({}, { mutationKey, mutationFn }, reactQueryOptions);
}

type TransformResultOptions<T, D> = {
  keyName: 'queryKey' | 'mutationKey';
  key: QueryKey | MutationKey;
  result: UseQueryResult<RequestResult<T, D>>;
};

export function transformResult<T = unknown, D = unknown>({
  keyName,
  key,
  result,
}: TransformResultOptions<T, D>) {
  const { data: requestResult, ...rest } = result;
  const apiData = get(requestResult, 'data');
  const response = get(requestResult, 'response');

  return { [keyName]: key, data: apiData, response, ...rest };
}
