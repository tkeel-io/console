import { get, merge } from 'lodash';

import { DEFAULT_EXTRAS } from './defaults';
import instance from './instance';
import {
  AxiosRequestConfigExtended,
  AxiosResponseExtended,
  RequestResult,
} from './types';

export default function request<T, D = undefined>(
  config: AxiosRequestConfigExtended<D>
): Promise<RequestResult<T, D>> {
  const axiosRequestConfig: AxiosRequestConfigExtended<D> = merge(
    {},
    { extras: DEFAULT_EXTRAS },
    config
  );

  return instance
    .request<T, AxiosResponseExtended<T, D>, D>(axiosRequestConfig)
    .then((response: AxiosResponseExtended<T, D>) => {
      const data: T = get(response, ['data', 'data']);
      return Object.freeze({ data, response });
    });
}
