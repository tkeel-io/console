import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { TokenInfo } from '@tkeel/console-types';

export interface AxiosRequestConfigExtended<
  TRequestParams = unknown,
  TRequestData = unknown
> extends AxiosRequestConfig<TRequestData> {
  params?: TRequestParams;
  extras?: RequestExtras;
}

export interface AxiosResponseExtended<
  TApiData = unknown,
  TRequestParams = unknown,
  TRequestData = unknown
> extends AxiosResponse<ApiResponse<TApiData>, TRequestData> {
  config: AxiosRequestConfigExtended<TRequestParams, TRequestData>;
}

export interface AxiosErrorExtended<
  TApiData = unknown,
  TRequestParams = unknown,
  TRequestData = unknown
> extends AxiosError<ApiResponse<TApiData>, TRequestData> {
  config: AxiosRequestConfigExtended<TRequestParams, TRequestData>;
}

export interface RequestExtras<
  TApiData = unknown,
  TRequestParams = unknown,
  TRequestData = unknown
> {
  isWithToken?: boolean;
  // custom codes
  tokenInfo?: TokenInfo;
  isSuccessFunction?: (
    response: AxiosResponseExtended<TApiData, TRequestParams, TRequestData>
  ) => boolean;
  isNoAuthFunction?: (
    response: AxiosResponseExtended<TApiData, TRequestParams, TRequestData>
  ) => boolean;
  handleNoAuth?:
    | false
    | ((
        response: AxiosResponseExtended<TApiData, TRequestParams, TRequestData>
      ) => unknown);
  handleApiError?:
    | false
    | ((
        response: AxiosResponseExtended<TApiData, TRequestParams, TRequestData>
      ) => unknown);
  getApiErrorMessage?: (
    response: AxiosResponseExtended<TApiData, TRequestParams, TRequestData>
  ) => string;
  customApiErrorMessage?: string | undefined;
  handleAxiosError?:
    | false
    | ((
        error: AxiosErrorExtended<TApiData, TRequestParams, TRequestData>
      ) => unknown);
  customAxiosErrorMessage?: string | undefined;
}

export interface RequestResult<
  TApiData = unknown,
  TRequestParams = undefined,
  TRequestData = unknown
> {
  data: TApiData;
  response: AxiosResponseExtended<TApiData, TRequestParams, TRequestData>;
}

// custom codes
export interface ApiResponse<TApiData = unknown> {
  // TODO: tmp
  code: string | number;
  msg: string;

  data: TApiData;
}
