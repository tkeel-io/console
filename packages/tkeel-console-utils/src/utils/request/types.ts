import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export type ApiResponseData = Record<string, unknown>;

export type DefaultApiResponseData = Record<string, unknown>;

export type RequestConfigData = undefined | null | Record<string, unknown>;

export type DefaultRequestConfigData = undefined;

export interface AxiosRequestConfigExtended<
  D extends RequestConfigData = DefaultRequestConfigData
> extends AxiosRequestConfig<D> {
  extras?: RequestExtras;
}

export interface AxiosResponseExtended<
  T extends ApiResponseData = DefaultApiResponseData,
  D extends RequestConfigData = DefaultRequestConfigData
> extends AxiosResponse<ApiResponse<T>, D> {
  config: AxiosRequestConfigExtended<D>;
}

export interface AxiosErrorExtended<
  T extends ApiResponseData = DefaultApiResponseData,
  D extends RequestConfigData = DefaultRequestConfigData
> extends AxiosError<ApiResponse<T>, D> {
  config: AxiosRequestConfigExtended<D>;
}

export interface RequestExtras<
  T extends ApiResponseData = DefaultApiResponseData,
  D extends RequestConfigData = DefaultRequestConfigData
> {
  isWithToken?: boolean;
  handleNoAuth?: false | ((response: AxiosResponseExtended<T, D>) => unknown);
  handleError?:
    | false
    | (({
        errorMessage,
        response,
      }: {
        errorMessage: string | undefined;
        response: AxiosResponseExtended<T, D>;
      }) => unknown);
  errorMessage?: string | undefined;
  handleAxiosError?:
    | false
    | (({
        axiosErrorMessage,
        error,
      }: {
        axiosErrorMessage: string | undefined;
        error: AxiosErrorExtended<T, D>;
      }) => unknown);
  axiosErrorMessage?: string | undefined;
}

export interface ApiResponse<
  T extends ApiResponseData = DefaultApiResponseData
> {
  code: number;
  msg: string;
  data: T;
}

export interface RequestResult<
  T extends ApiResponseData = DefaultApiResponseData,
  D extends RequestConfigData = DefaultRequestConfigData
> {
  data: T;
  response: AxiosResponseExtended<T, D>;
}
