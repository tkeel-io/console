import { get, merge } from 'lodash';

import { DEFAULT_EXTRAS } from './defaults';
import instance from './instance';
import {
  AxiosRequestConfigExtended,
  AxiosResponseExtended,
  RequestResult,
} from './types';

export default function request<
  TApiData,
  TRequestParams = undefined,
  TRequestBody = undefined
>(
  config: AxiosRequestConfigExtended<TRequestParams, TRequestBody>
): Promise<RequestResult<TApiData, TRequestParams, TRequestBody>> {
  const axiosRequestConfig: AxiosRequestConfigExtended<
    TRequestParams,
    TRequestBody
  > = merge({}, { extras: DEFAULT_EXTRAS }, config);

  return instance
    .request<
      TApiData,
      AxiosResponseExtended<TApiData, TRequestParams, TRequestBody>,
      TRequestBody
    >(axiosRequestConfig)
    .then(
      (
        response: AxiosResponseExtended<TApiData, TRequestParams, TRequestBody>
      ) => {
        const data: TApiData = get(response, ['data', 'data']);
        return Object.freeze({ data, response });
      }
    );
}
