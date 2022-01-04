import { AxiosResponseExtended } from './types';

export default class ApiError<
  TApiData = unknown,
  TRequestParams = unknown,
  TRequestBody = unknown
> extends Error {
  readonly response: AxiosResponseExtended<
    TApiData,
    TRequestParams,
    TRequestBody
  >;

  constructor({
    message,
    response,
  }: {
    message: string;
    response: AxiosResponseExtended<TApiData, TRequestParams, TRequestBody>;
  }) {
    super(message);
    this.response = response;
  }
}
