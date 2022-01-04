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
import { get, merge } from 'lodash';

import { UseCustomMutationOptions, UseCustomQueryOptions } from './types';

export function getUseQueryOptions<TApiData, TRequestParams, TRequestBody>(
  options: UseCustomQueryOptions<TApiData, TRequestParams, TRequestBody>
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
  const config: AxiosRequestConfigExtended<TRequestParams, TRequestBody> =
    merge({}, { url, method, params, data, extras }, axiosRequestConfig);

  function queryFn() {
    return request<TApiData, TRequestParams, TRequestBody>(config);
  }

  return merge({}, { queryFn, queryKey }, reactQueryOptions);
}

export function getUseMutationOptions<TApiData, TRequestParams, TRequestBody>(
  options: UseCustomMutationOptions<TApiData, TRequestParams, TRequestBody>
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
  const config: AxiosRequestConfigExtended<TRequestParams, TRequestBody> =
    merge({}, { url, method, params, data, extras }, axiosRequestConfig);

  function mutationFn(
    variables: AxiosRequestConfigExtended<TRequestParams, TRequestBody>
  ) {
    return request<TApiData, TRequestParams, TRequestBody>(
      merge({}, config, variables)
    );
  }

  return merge({}, { mutationKey, mutationFn }, reactQueryOptions);
}

type TransformUseQueryResultOptions<TApiData, TRequestParams, TRequestBody> = {
  queryKey: QueryKey;
  result: UseQueryResult<RequestResult<TApiData, TRequestParams, TRequestBody>>;
};

export function transformUseQueryResult<
  TApiData,
  TRequestParams,
  TRequestBody
>({
  queryKey,
  result,
}: TransformUseQueryResultOptions<TApiData, TRequestParams, TRequestBody>) {
  const { data: requestResult, ...rest } = result;
  const apiData = get(requestResult, 'data');
  const response = get(requestResult, 'response');

  return { queryKey, data: apiData, response, ...rest };
}

type TransformUseMutationResultOptions<TApiData, TRequestParams, TRequestBody> =
  {
    mutationKey: MutationKey;
    result: UseMutationResult<
      RequestResult<TApiData, TRequestParams, TRequestBody>,
      unknown,
      AxiosRequestConfigExtended<TRequestParams, TRequestBody>
    >;
  };

export function transformUseMutationResult<
  TApiData,
  TRequestParams,
  TRequestBody
>({
  mutationKey,
  result,
}: TransformUseMutationResultOptions<TApiData, TRequestParams, TRequestBody>) {
  const { data: requestResult, ...rest } = result;
  const apiData = get(requestResult, 'data');
  const response = get(requestResult, 'response');

  return { mutationKey, data: apiData, response, ...rest };
}
