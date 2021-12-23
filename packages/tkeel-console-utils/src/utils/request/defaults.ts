import { get, inRange } from 'lodash';

import { AxiosRequestConfigExtended, Extras, ResponseData } from './types';

export const DEFAULT_BASE_EXTRAS: Extras = Object.freeze({
  isWithToken: false,
  handleNoAuth: false,
  handleError: false,
  errorMessage: '',
  handleAxiosError: false,
  axiosErrorMessage: '',
});

export const DEFAULT_AXIOS_REQUEST_CONFIG: AxiosRequestConfigExtended =
  Object.freeze({
    baseURL: process.env.API_PATHNAME || '/apis',
    validateStatus: (status: number) => !inRange(status, 300, 400),
    extras: DEFAULT_BASE_EXTRAS,
  });

export const DEFAULT_EXTRAS: Extras = Object.freeze({
  isWithToken: true,
  handleNoAuth() {
    // redirect to login page
  },
  handleError({ errorMessage, response }) {
    const data: ResponseData = get(response, ['data']);
    const message = get(data, ['msg'], '');
    // eslint-disable-next-line no-console
    console.warn('handleError', errorMessage || message);
  },
  errorMessage: '',
  handleAxiosError({ axiosErrorMessage, error }) {
    const { message } = error;
    // eslint-disable-next-line no-console
    console.warn('handleAxiosError', axiosErrorMessage || message);
  },
  axiosErrorMessage: '',
});
