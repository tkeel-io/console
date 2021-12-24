import { useMutation as useReactMutation } from 'react-query';
import {
  AxiosRequestConfigExtended,
  AxiosResponseExtended,
  request,
  RequestRet,
} from '@tkeel/console-utils';
import { get, merge } from 'lodash';

import { UseMutationOptions } from './types';

export default function useQuery<T>(options: UseMutationOptions) {
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
  ): Promise<RequestRet<T>> {
    return request(merge({}, config, variables));
  }

  const opts = merge({}, { mutationFn }, reactQueryOptions);
  const { data: ret, ...rest } = useReactMutation<unknown, unknown, any>(opts);
  const d: T | unknown = get(ret, 'data');
  const response: AxiosResponseExtended<T> | unknown = get(ret, 'response');

  return { data: d, response, ...rest };
}
