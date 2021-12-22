import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse as AxiosBaseResponse,
} from 'axios';

export interface AxiosResponse<T> extends AxiosBaseResponse {
  data: ResponseData<T>;
}

export interface Extras {
  isWithToken?: boolean;
  handleNoAuth?: false | ((response: AxiosResponse<unknown>) => unknown);
  handleError?:
    | false
    | (({
        errorMessage,
        response,
      }: {
        errorMessage: string | undefined;
        response: AxiosResponse<unknown>;
      }) => unknown);
  errorMessage?: string | undefined;
  handleAxiosError?:
    | false
    | (({
        axiosErrorMessage,
        error,
      }: {
        axiosErrorMessage: string | undefined;
        error: AxiosError;
      }) => unknown);
  axiosErrorMessage?: string | undefined;
}

export interface RequestOptions extends AxiosRequestConfig {
  extras?: Extras;
}

export interface ResponseData<T = unknown> {
  code: number;
  msg: string;
  data: T;
}

export interface Response<T = unknown> {
  data: T;
  response: AxiosResponse<T>;
}
