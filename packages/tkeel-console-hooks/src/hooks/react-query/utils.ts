import {
  MutationKey,
  QueryKey,
  UseMutationResult,
  UseQueryResult,
} from 'react-query';
import {
  AxiosRequestConfigExtended,
  request,
  RequestResult,
} from '@tkeel/console-utils';
import { AxiosRequestConfig } from 'axios';
import { get, merge } from 'lodash';

import { UseCustomMutationOptions, UseCustomQueryOptions } from './types';

export function getUseQueryOptions<T, D>(options: UseCustomQueryOptions<T, D>) {
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

  return merge({}, { queryFn, queryKey }, reactQueryOptions);
}

export function getUseMutationOptions<T, D>(
  options: UseCustomMutationOptions<T, D>
) {
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

  function mutationFn(variables: AxiosRequestConfig<D>) {
    return request<T, D>(merge({}, config, variables));
  }

  return merge({}, { mutationKey, mutationFn }, reactQueryOptions);
}

type TransformUseQueryResultOptions<T, D> = {
  queryKey: QueryKey;
  result: UseQueryResult<RequestResult<T, D>>;
};

export function transformUseQueryResult<T = unknown, D = unknown>({
  queryKey,
  result,
}: TransformUseQueryResultOptions<T, D>) {
  const { data: requestResult, ...rest } = result;
  const apiData = get(requestResult, 'data');
  const response = get(requestResult, 'response');

  return { queryKey, data: apiData, response, ...rest };
}

type TransformUseMutationResultOptions<T, D> = {
  mutationKey: MutationKey;
  result: UseMutationResult<
    RequestResult<T, D>,
    unknown,
    AxiosRequestConfig<D>
  >;
};

export function transformUseMutationResult<T = unknown, D = unknown>({
  mutationKey,
  result,
}: TransformUseMutationResultOptions<T, D>) {
  const { data: requestResult, ...rest } = result;
  const apiData = get(requestResult, 'data');
  const response = get(requestResult, 'response');

  return { mutationKey, data: apiData, response, ...rest };
}
