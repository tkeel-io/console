import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Extras {
  isWithToken?: boolean;
  handleNoAuth?: boolean | ((response: AxiosResponse) => unknown);
  handleError?: boolean | ((response: AxiosResponse) => unknown);
  errorMessage?: string;
  handleAxiosError?: boolean | ((error: AxiosError) => unknown);
  axiosErrorMessage?: string;
}

export interface RequestOptions extends AxiosRequestConfig {
  extras?: Extras;
}

export interface ResponseData {
  code: number;
  msg: string;
  data: unknown;
}

export interface Response {
  data: unknown;
  response: AxiosResponse;
}
