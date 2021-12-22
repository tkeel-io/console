import { AxiosRequestConfig } from 'axios';
import { get, inRange } from 'lodash';

import { Extras, ResponseData } from './types';

export const DEFAULT_AXIOS_REQUEST_CONFIG: AxiosRequestConfig = {
  baseURL: process.env.API_PATHNAME || '/apis',
  validateStatus: (status: number) => !inRange(status, 300, 400),
};

export const DEFAULT_BASE_EXTRAS: Extras = {
  isWithToken: false,
  handleNoAuth: false,
  handleError: false,
  errorMessage: '',
  handleAxiosError: false,
  axiosErrorMessage: '',
};

export const DEFAULT_EXTRAS: Extras = {
  isWithToken: true,
  handleNoAuth() {
    // redirect to login page
  },
  handleError({ errorMessage, response }) {
    const data: ResponseData = get(response, ['data']);
    const message = get(data, ['msg'], '');
    // eslint-disable-next-line no-console
    console.error('handleError', errorMessage || message);
  },
  errorMessage: '',
  handleAxiosError({ axiosErrorMessage, error }) {
    const { message } = error;
    // eslint-disable-next-line no-console
    console.error('handleAxiosError', axiosErrorMessage || message);
  },
  axiosErrorMessage: '',
};
