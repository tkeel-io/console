import { QueryKey, UseQueryResult } from 'react-query';
import { request, RequestResult } from '@tkeel/console-utils';
import { get, isNil, merge, omitBy } from 'lodash';

import { UseQueryOptions } from './types';

export function getUseQueryOptions<T>(options: UseQueryOptions) {
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
  const queryKey = key || [omitBy({ url, method, params, data }, isNil)];
  const config = merge(
    {},
    { url, method, params, data, extras },
    axiosRequestConfig
  );

  const queryFn = (): Promise<RequestResult<T>> => request(config);
  return merge({}, { queryKey, queryFn }, reactQueryOptions);
}

type TransformResultOptions<T> = {
  queryKey: QueryKey;
  result: UseQueryResult<RequestResult<T>>;
};

export function transformResult<T>({
  queryKey,
  result,
}: TransformResultOptions<T>) {
  const { data: ret, ...rest } = result;
  const d = get(ret, 'data');
  const response = get(ret, 'response');

  return { data: d, response, queryKey, ...rest };
}
