import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AxiosRequestConfigExtended<
  TRequestParams = unknown,
  TRequestBody = unknown
> extends AxiosRequestConfig<TRequestBody> {
  params?: TRequestParams;
  extras?: RequestExtras;
}

export interface AxiosResponseExtended<
  TApiData = unknown,
  TRequestParams = unknown,
  TRequestBody = unknown
> extends AxiosResponse<ApiResponse<TApiData>, TRequestBody> {
  config: AxiosRequestConfigExtended<TRequestParams, TRequestBody>;
}

export interface AxiosErrorExtended<
  TApiData = unknown,
  TRequestParams = unknown,
  TRequestBody = unknown
> extends AxiosError<ApiResponse<TApiData>, TRequestBody> {
  config: AxiosRequestConfigExtended<TRequestParams, TRequestBody>;
}

export interface RequestExtras<
  TApiData = unknown,
  TRequestParams = unknown,
  TRequestBody = unknown
> {
  isWithToken?: boolean;
  isSuccessFunction?: (
    response: AxiosResponseExtended<TApiData, TRequestParams, TRequestBody>
  ) => boolean;
  isNoAuthFunction?: (
    response: AxiosResponseExtended<TApiData, TRequestParams, TRequestBody>
  ) => boolean;
  handleNoAuth?:
    | false
    | ((
        response: AxiosResponseExtended<TApiData, TRequestParams, TRequestBody>
      ) => unknown);
  handleApiError?:
    | false
    | ((
        response: AxiosResponseExtended<TApiData, TRequestParams, TRequestBody>
      ) => unknown);
  getApiErrorMessage?: (
    response: AxiosResponseExtended<TApiData, TRequestParams, TRequestBody>
  ) => string;
  customApiErrorMessage?: string | undefined;
  handleAxiosError?:
    | false
    | ((
        error: AxiosErrorExtended<TApiData, TRequestParams, TRequestBody>
      ) => unknown);
  customAxiosErrorMessage?: string | undefined;
}

export interface RequestResult<
  TApiData = unknown,
  TRequestParams = undefined,
  TRequestBody = unknown
> {
  data: TApiData;
  response: AxiosResponseExtended<TApiData, TRequestParams, TRequestBody>;
}

// custom codes
export interface ApiResponse<TApiData = unknown> {
  code: number;
  msg: string;

  data: TApiData;
}
