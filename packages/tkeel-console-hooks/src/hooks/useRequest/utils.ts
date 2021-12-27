import { QueryKey, UseQueryResult } from 'react-query';
import {
  AxiosRequestConfigExtended,
  request,
  RequestResult,
} from '@tkeel/console-utils';
import { get, isNil, merge, omitBy } from 'lodash';

import {
  UseCustomQueryOptions,
  UseQueryOptionsExtended,
  UseQueryResultExtended,
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
  // const key = reactQueryOptions?.queryKey;
  const queryKey: QueryKey = [omitBy({ url, method, params, data }, isNil)];
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

type TransformResultOptions<T, D> = {
  queryKey: QueryKey;
  result: UseQueryResult<RequestResult<T, D>>;
};

export function transformResult<T = unknown, D = unknown>({
  queryKey,
  result,
}: TransformResultOptions<T, D>): UseQueryResultExtended<T, D> {
  const { data: requestResult, ...rest } = result;
  const apiData = get(requestResult, 'data');
  const response = get(requestResult, 'response');

  return { data: apiData, response, queryKey, ...rest };
}
