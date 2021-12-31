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
  handleNoAuth?:
    | false
    | ((
        response: AxiosResponseExtended<TApiData, TRequestParams, TRequestBody>
      ) => unknown);
  handleError?:
    | false
    | (({
        errorMessage,
        response,
      }: {
        errorMessage: string | undefined;
        response: AxiosResponseExtended<TApiData, TRequestParams, TRequestBody>;
      }) => unknown);
  errorMessage?: string | undefined;
  handleAxiosError?:
    | false
    | (({
        axiosErrorMessage,
        error,
      }: {
        axiosErrorMessage: string | undefined;
        error: AxiosErrorExtended<TApiData, TRequestParams, TRequestBody>;
      }) => unknown);
  axiosErrorMessage?: string | undefined;
}

// custom codes
export interface ApiResponse<TApiData = unknown> {
  code: number;
  msg: string;
  data: TApiData;
}

export interface RequestResult<
  TApiData = unknown,
  TRequestParams = undefined,
  TRequestBody = unknown
> {
  data: TApiData;
  response: AxiosResponseExtended<TApiData, TRequestParams, TRequestBody>;
}
