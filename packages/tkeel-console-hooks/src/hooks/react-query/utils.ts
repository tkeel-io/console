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
import { merge } from 'lodash';

import { UseCustomMutationOptions, UseCustomQueryOptions } from './types';

export function getUseQueryOptions<TApiData, TRequestParams, TRequestData>(
  options: UseCustomQueryOptions<TApiData, TRequestParams, TRequestData>
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
  const config: AxiosRequestConfigExtended<TRequestParams, TRequestData> =
    merge({}, { url, method, params, data, extras }, axiosRequestConfig);

  function queryFn() {
    return request<TApiData, TRequestParams, TRequestData>(config);
  }

  return merge({}, { queryFn, queryKey }, reactQueryOptions);
}

export function getUseMutationOptions<TApiData, TRequestParams, TRequestData>(
  options: UseCustomMutationOptions<TApiData, TRequestParams, TRequestData>
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
  const config: AxiosRequestConfigExtended<TRequestParams, TRequestData> =
    merge({}, { url, method, params, data, extras }, axiosRequestConfig);

  function mutationFn(
    variables: AxiosRequestConfigExtended<TRequestParams, TRequestData>
  ) {
    return request<TApiData, TRequestParams, TRequestData>(
      merge({}, config, variables)
    );
  }

  return merge({}, { mutationKey, mutationFn }, reactQueryOptions);
}

type TransformUseQueryResultOptions<TApiData, TRequestParams, TRequestData> = {
  queryKey: QueryKey;
  result: UseQueryResult<RequestResult<TApiData, TRequestParams, TRequestData>>;
};

export function transformUseQueryResult<
  TApiData,
  TRequestParams,
  TRequestData
>({
  queryKey,
  result,
}: TransformUseQueryResultOptions<TApiData, TRequestParams, TRequestData>) {
  const { data: requestResult, ...rest } = result;
  const apiData = requestResult?.data;
  const response = requestResult?.response;

  return { queryKey, data: apiData, response, ...rest };
}

type TransformUseMutationResultOptions<TApiData, TRequestParams, TRequestData> =
  {
    mutationKey: MutationKey;
    result: UseMutationResult<
      RequestResult<TApiData, TRequestParams, TRequestData>,
      unknown,
      AxiosRequestConfigExtended<TRequestParams, TRequestData>
    >;
  };

export function transformUseMutationResult<
  TApiData,
  TRequestParams,
  TRequestData
>({
  mutationKey,
  result,
}: TransformUseMutationResultOptions<TApiData, TRequestParams, TRequestData>) {
  const { data: requestResult, ...rest } = result;
  const apiData = requestResult?.data;
  const response = requestResult?.response;

  return { mutationKey, data: apiData, response, ...rest };
}
