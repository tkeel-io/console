import { merge } from 'lodash';

import { DEFAULT_CUSTOM_EXTRAS } from './defaults';
import instance from './instance';
import {
  AxiosRequestConfigExtended,
  AxiosResponseExtended,
  RequestResult,
} from './types';

export default function request<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(
  config: AxiosRequestConfigExtended<TRequestParams, TRequestData>
): Promise<RequestResult<TApiData, TRequestParams, TRequestData>> {
  const axiosRequestConfig: AxiosRequestConfigExtended<
    TRequestParams,
    TRequestData
  > = merge({}, { extras: DEFAULT_CUSTOM_EXTRAS }, config);

  return instance
    .request<
      TApiData,
      AxiosResponseExtended<TApiData, TRequestParams, TRequestData>,
      TRequestData
    >(axiosRequestConfig)
    .then(
      (
        response: AxiosResponseExtended<TApiData, TRequestParams, TRequestData>
      ) => {
        const data: TApiData = response?.data?.data;
        return { data, response };
      }
    );
}
