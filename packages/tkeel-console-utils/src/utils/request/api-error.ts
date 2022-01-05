import { AxiosResponseExtended } from './types';

export default class ApiError<
  TApiData = unknown,
  TRequestParams = unknown,
  TRequestData = unknown
> extends Error {
  readonly response: AxiosResponseExtended<
    TApiData,
    TRequestParams,
    TRequestData
  >;

  constructor({
    message,
    response,
  }: {
    message: string;
    response: AxiosResponseExtended<TApiData, TRequestParams, TRequestData>;
  }) {
    super(message);
    this.response = response;
  }
}
