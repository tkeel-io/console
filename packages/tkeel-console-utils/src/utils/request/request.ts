import { get, merge } from 'lodash';

import { DEFAULT_EXTRAS } from './defaults';
import instance from './instance';
import {
  ApiResponseData,
  AxiosRequestConfigExtended,
  AxiosResponseExtended,
  RequestConfigData,
  RequestResult,
} from './types';

export default function request<
  T extends ApiResponseData,
  D extends RequestConfigData
>(config: AxiosRequestConfigExtended<D>): Promise<RequestResult<T, D>> {
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
