import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AxiosRequestConfigExtended<TRequestBody = unknown>
  extends AxiosRequestConfig<TRequestBody> {
  extras?: RequestExtras;
}

export interface AxiosResponseExtended<
  TApiData = unknown,
  TRequestBody = unknown
> extends AxiosResponse<ApiResponse<TApiData>, TRequestBody> {
  config: AxiosRequestConfigExtended<TRequestBody>;
}

export interface AxiosErrorExtended<TApiData = unknown, TRequestBody = unknown>
  extends AxiosError<ApiResponse<TApiData>, TRequestBody> {
  config: AxiosRequestConfigExtended<TRequestBody>;
}

export interface RequestExtras<TApiData = unknown, TRequestBody = unknown> {
  isWithToken?: boolean;
  handleNoAuth?:
    | false
    | ((response: AxiosResponseExtended<TApiData, TRequestBody>) => unknown);
  handleError?:
    | false
    | (({
        errorMessage,
        response,
      }: {
        errorMessage: string | undefined;
        response: AxiosResponseExtended<TApiData, TRequestBody>;
      }) => unknown);
  errorMessage?: string | undefined;
  handleAxiosError?:
    | false
    | (({
        axiosErrorMessage,
        error,
      }: {
        axiosErrorMessage: string | undefined;
        error: AxiosErrorExtended<TApiData, TRequestBody>;
      }) => unknown);
  axiosErrorMessage?: string | undefined;
}

// custom codes
export interface ApiResponse<TApiData = unknown> {
  code: number;
  msg: string;
  data: TApiData;
}

export interface RequestResult<TApiData = unknown, TRequestBody = unknown> {
  data: TApiData;
  response: AxiosResponseExtended<TApiData, TRequestBody>;
}
