import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AxiosRequestConfigExtended<D = unknown>
  extends AxiosRequestConfig<D> {
  extras?: RequestExtras;
}

export interface AxiosResponseExtended<T = unknown, D = unknown>
  extends AxiosResponse<ApiResponse<T>, D> {
  config: AxiosRequestConfigExtended<D>;
}

export interface AxiosErrorExtended<T = unknown, D = unknown>
  extends AxiosError<ApiResponse<T>, D> {
  config: AxiosRequestConfigExtended<D>;
}

export interface RequestExtras<T = unknown, D = unknown> {
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

export interface ApiResponse<T = unknown> {
  code: number;
  msg: string;
  data: T;
}

export interface RequestResult<T = unknown, D = unknown> {
  data: T;
  response: AxiosResponseExtended<T, D>;
}
