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

export function getUseQueryOptions<TApiData, TRequestBody>(
  options: UseCustomQueryOptions<TApiData, TRequestBody>
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
  const config: AxiosRequestConfigExtended<TRequestBody> = merge(
    {},
    { url, method, params, data, extras },
    axiosRequestConfig
  );

  function queryFn() {
    return request<TApiData, TRequestBody>(config);
  }

  return merge({}, { queryFn, queryKey }, reactQueryOptions);
}

export function getUseMutationOptions<TApiData, TRequestBody>(
  options: UseCustomMutationOptions<TApiData, TRequestBody>
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
  const config: AxiosRequestConfigExtended<TRequestBody> = merge(
    {},
    { url, method, params, data, extras },
    axiosRequestConfig
  );

  function mutationFn(variables: AxiosRequestConfig<TRequestBody>) {
    return request<TApiData, TRequestBody>(merge({}, config, variables));
  }

  return merge({}, { mutationKey, mutationFn }, reactQueryOptions);
}

type TransformUseQueryResultOptions<TApiData, TRequestBody> = {
  queryKey: QueryKey;
  result: UseQueryResult<RequestResult<TApiData, TRequestBody>>;
};

export function transformUseQueryResult<
  TApiData = unknown,
  TRequestBody = unknown
>({
  queryKey,
  result,
}: TransformUseQueryResultOptions<TApiData, TRequestBody>) {
  const { data: requestResult, ...rest } = result;
  const apiData = get(requestResult, 'data');
  const response = get(requestResult, 'response');

  return { queryKey, data: apiData, response, ...rest };
}

type TransformUseMutationResultOptions<TApiData, TRequestBody> = {
  mutationKey: MutationKey;
  result: UseMutationResult<
    RequestResult<TApiData, TRequestBody>,
    unknown,
    AxiosRequestConfig<TRequestBody>
  >;
};

export function transformUseMutationResult<
  TApiData = unknown,
  TRequestBody = unknown
>({
  mutationKey,
  result,
}: TransformUseMutationResultOptions<TApiData, TRequestBody>) {
  const { data: requestResult, ...rest } = result;
  const apiData = get(requestResult, 'data');
  const response = get(requestResult, 'response');

  return { mutationKey, data: apiData, response, ...rest };
}
