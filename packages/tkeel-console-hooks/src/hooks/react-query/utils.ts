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

export function getUseQueryOptions<TApiData, D>(
  options: UseCustomQueryOptions<TApiData, D>
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
  const key = reactQueryOptions?.queryKey;
  const queryKey: QueryKey = key || [url, method, params, data];
  const config: AxiosRequestConfigExtended<D> = merge(
    {},
    { url, method, params, data, extras },
    axiosRequestConfig
  );

  function queryFn() {
    return request<TApiData, D>(config);
  }

  return merge({}, { queryFn, queryKey }, reactQueryOptions);
}

export function getUseMutationOptions<TApiData, D>(
  options: UseCustomMutationOptions<TApiData, D>
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
    return request<TApiData, D>(merge({}, config, variables));
  }

  return merge({}, { mutationKey, mutationFn }, reactQueryOptions);
}

type TransformUseQueryResultOptions<TApiData, D> = {
  queryKey: QueryKey;
  result: UseQueryResult<RequestResult<TApiData, D>>;
};

export function transformUseQueryResult<TApiData = unknown, D = unknown>({
  queryKey,
  result,
}: TransformUseQueryResultOptions<TApiData, D>) {
  const { data: requestResult, ...rest } = result;
  const apiData = get(requestResult, 'data');
  const response = get(requestResult, 'response');

  return { queryKey, data: apiData, response, ...rest };
}

type TransformUseMutationResultOptions<TApiData, D> = {
  mutationKey: MutationKey;
  result: UseMutationResult<
    RequestResult<TApiData, D>,
    unknown,
    AxiosRequestConfig<D>
  >;
};

export function transformUseMutationResult<TApiData = unknown, D = unknown>({
  mutationKey,
  result,
}: TransformUseMutationResultOptions<TApiData, D>) {
  const { data: requestResult, ...rest } = result;
  const apiData = get(requestResult, 'data');
  const response = get(requestResult, 'response');

  return { mutationKey, data: apiData, response, ...rest };
}
