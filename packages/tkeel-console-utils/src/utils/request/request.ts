import { get, merge } from 'lodash';

import { DEFAULT_EXTRAS } from './defaults';
import instance from './instance';
import {
  AxiosRequestConfigExtended,
  AxiosResponseExtended,
  RequestResult,
} from './types';

export default function request<TApiData, TRequestBody = undefined>(
  config: AxiosRequestConfigExtended<TRequestBody>
): Promise<RequestResult<TApiData, TRequestBody>> {
  const axiosRequestConfig: AxiosRequestConfigExtended<TRequestBody> = merge(
    {},
    { extras: DEFAULT_EXTRAS },
    config
  );

  return instance
    .request<
      TApiData,
      AxiosResponseExtended<TApiData, TRequestBody>,
      TRequestBody
    >(axiosRequestConfig)
    .then((response: AxiosResponseExtended<TApiData, TRequestBody>) => {
      const data: TApiData = get(response, ['data', 'data']);
      return Object.freeze({ data, response });
    });
}
