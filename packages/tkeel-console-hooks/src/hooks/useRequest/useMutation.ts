import { useMutation } from 'react-query';
import {
  AxiosRequestConfigExtended,
  AxiosResponseExtended,
  request,
  RequestResult,
} from '@tkeel/console-utils';
import { get, merge } from 'lodash';

import { UseCustomMutationOptions } from './types';

export default function useCustomMutation<T>(
  options: UseCustomMutationOptions
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
  // const key = reactQueryOptions?.mutationKey;
  // const mutationKey = key || [omitBy({ url, method, params, data }, isNil)];
  const config = merge(
    {},
    { url, method, params, data, extras },
    axiosRequestConfig
  );

  function mutationFn(
    variables: AxiosRequestConfigExtended
  ): Promise<RequestResult<T>> {
    return request(merge({}, config, variables));
  }

  const opts = merge({}, { mutationFn }, reactQueryOptions);
  const { data: ret, ...rest } = useMutation<unknown, unknown, any>(opts);
  const d: T | unknown = get(ret, 'data');
  const response: AxiosResponseExtended<T> | unknown = get(ret, 'response');

  return { data: d, response, ...rest };
}
