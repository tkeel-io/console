import { get, merge } from 'lodash';

import { DEFAULT_EXTRAS } from './defaults';
import instance from './instance';
import {
  AxiosRequestConfigExtended,
  AxiosResponseExtended,
  RequestResult,
} from './types';

export default function request<TApiData, D = undefined>(
  config: AxiosRequestConfigExtended<D>
): Promise<RequestResult<TApiData, D>> {
  const axiosRequestConfig: AxiosRequestConfigExtended<D> = merge(
    {},
    { extras: DEFAULT_EXTRAS },
    config
  );

  return instance
    .request<TApiData, AxiosResponseExtended<TApiData, D>, D>(
      axiosRequestConfig
    )
    .then((response: AxiosResponseExtended<TApiData, D>) => {
      const data: TApiData = get(response, ['data', 'data']);
      return Object.freeze({ data, response });
    });
}
