import { AxiosResponse } from './types';

class RequestError extends Error {
  readonly response: AxiosResponse<unknown>;

  constructor({
    message,
    response,
  }: {
    message: string;
    response: AxiosResponse<unknown>;
  }) {
    super(message);
    this.response = response;
  }
}

export default RequestError;
