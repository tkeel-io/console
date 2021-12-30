import { AxiosResponseExtended } from './types';

export default class ApiError extends Error {
  readonly response: AxiosResponseExtended;

  constructor({
    message,
    response,
  }: {
    message: string;
    response: AxiosResponseExtended;
  }) {
    super(message);
    this.response = response;
  }
}
