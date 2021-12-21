import { AxiosResponse } from 'axios';

class CustomError extends Error {
  readonly response: AxiosResponse;

  constructor({
    message,
    response,
  }: {
    message: string;
    response: AxiosResponse;
  }) {
    super(message);
    this.response = response;
  }
}

export default CustomError;
