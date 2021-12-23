import { AxiosResponseExtended } from './types';

class RequestError extends Error {
  readonly response: AxiosResponseExtended<unknown>;

  constructor({
    message,
    response,
  }: {
    message: string;
    response: AxiosResponseExtended<unknown>;
  }) {
    super(message);
    this.response = response;
  }
}

export default RequestError;
