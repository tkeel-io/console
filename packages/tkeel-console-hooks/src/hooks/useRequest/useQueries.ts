import { useQuery as useReactQuery } from 'react-query';
import {
  AxiosResponseExtended,
  request,
  RequestResult,
} from '@tkeel/console-utils';
import { get, isNil, merge, omitBy } from 'lodash';

import { UseQueryOptions } from './types';

export default function useQuery<T>(options: UseQueryOptions) {
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
  const opts = merge({}, { queryKey, queryFn }, reactQueryOptions);
  const { data: ret, ...rest } = useReactQuery(opts);
  const d: T | unknown = get(ret, 'data');
  const response: AxiosResponseExtended<T> | unknown = get(ret, 'response');

  return { data: d, response, queryKey: opts.queryKey, ...rest };
}
