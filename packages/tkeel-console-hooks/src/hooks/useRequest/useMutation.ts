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
  const fn = reactQueryOptions?.mutationFn;
  const config = merge(
    {},
    { url, method, params, data, extras },
    axiosRequestConfig
  );
  const func: (
    variables: AxiosRequestConfigExtended | T
  ) => Promise<RequestRet<T>> = (
    variables: AxiosRequestConfigExtended
  ): Promise<RequestRet<T>> => request(merge({}, config, variables));
  const mutationFn = fn || func;
  const opts = merge({}, { mutationFn }, reactQueryOptions);
  const { data: ret, ...rest } = useReactMutation(opts);
  const d: T | unknown = get(ret, 'data');
  const response: AxiosResponseExtended<T> | unknown = get(ret, 'response');

  return { data: d, response, ...rest };
}
