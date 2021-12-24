import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AxiosRequestConfigExtended extends AxiosRequestConfig {
  extras?: RequestExtras;
}

export interface AxiosResponseExtended<T> extends AxiosResponse {
  config: AxiosRequestConfigExtended;
  data: ResponseData<T>;
}

export interface AxiosErrorExtended<T> extends AxiosError {
  config: AxiosRequestConfigExtended;
  response: AxiosResponseExtended<T>;
}

export interface RequestExtras {
  isWithToken?: boolean;
  handleNoAuth?: false | (<T>(response: AxiosResponseExtended<T>) => unknown);
  handleError?:
    | false
    | (<T>({
        errorMessage,
        response,
      }: {
        errorMessage: string | undefined;
        response: AxiosResponseExtended<T>;
      }) => unknown);
  errorMessage?: string | undefined;
  handleAxiosError?:
    | false
    | (<T>({
        axiosErrorMessage,
        error,
      }: {
        axiosErrorMessage: string | undefined;
        error: AxiosErrorExtended<T>;
      }) => unknown);
  axiosErrorMessage?: string | undefined;
}

export interface ResponseData<T = unknown> {
  code: number;
  msg: string;
  data: T;
}

export interface RequestResult<T = unknown> {
  data: T;
  response: AxiosResponseExtended<T>;
}
