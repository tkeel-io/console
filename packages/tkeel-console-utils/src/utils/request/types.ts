import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AxiosRequestConfigExtended<D = unknown>
  extends AxiosRequestConfig<D> {
  extras?: RequestExtras;
}

export interface AxiosResponseExtended<TApiData = unknown, D = unknown>
  extends AxiosResponse<ApiResponse<TApiData>, D> {
  config: AxiosRequestConfigExtended<D>;
}

export interface AxiosErrorExtended<TApiData = unknown, D = unknown>
  extends AxiosError<ApiResponse<TApiData>, D> {
  config: AxiosRequestConfigExtended<D>;
}

export interface RequestExtras<TApiData = unknown, D = unknown> {
  isWithToken?: boolean;
  handleNoAuth?:
    | false
    | ((response: AxiosResponseExtended<TApiData, D>) => unknown);
  handleError?:
    | false
    | (({
        errorMessage,
        response,
      }: {
        errorMessage: string | undefined;
        response: AxiosResponseExtended<TApiData, D>;
      }) => unknown);
  errorMessage?: string | undefined;
  handleAxiosError?:
    | false
    | (({
        axiosErrorMessage,
        error,
      }: {
        axiosErrorMessage: string | undefined;
        error: AxiosErrorExtended<TApiData, D>;
      }) => unknown);
  axiosErrorMessage?: string | undefined;
}

// custom codes
export interface ApiResponse<TApiData = unknown> {
  code: number;
  msg: string;
  data: TApiData;
}

export interface RequestResult<TApiData = unknown, D = unknown> {
  data: TApiData;
  response: AxiosResponseExtended<TApiData, D>;
}
