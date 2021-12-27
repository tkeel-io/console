import { AxiosResponseExtended } from './types';

class RequestError extends Error {
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

export default RequestError;
