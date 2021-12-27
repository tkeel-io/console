import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

type TType = Record<string, unknown>;
type DefaultT = Record<string, unknown>;
type DType = undefined | null | Record<string, unknown>;
type DefaultD = undefined;

export interface AxiosRequestConfigExtended<D extends DType = DefaultD>
  extends AxiosRequestConfig<D> {
  extras?: RequestExtras;
}

export interface AxiosResponseExtended<
  T extends TType = DefaultT,
  D extends DType = DefaultD
> extends AxiosResponse<ResponseData<T>, D> {
  config: AxiosRequestConfigExtended<D>;
}

export interface AxiosErrorExtended<
  T extends TType = DefaultT,
  D extends DType = DefaultD
> extends AxiosError<ResponseData<T>, D> {
  config: AxiosRequestConfigExtended<D>;
}

export interface RequestExtras<
  T extends TType = DefaultT,
  D extends DType = DefaultD
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

export interface ResponseData<T extends TType = DefaultT> {
  code: number;
  msg: string;
  data: T;
}

export interface RequestResult<
  T extends TType = DefaultT,
  D extends DType = DefaultD
> {
  data: T;
  response: AxiosResponseExtended<T, D>;
}
