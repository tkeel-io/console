import { AxiosRequestConfig } from 'axios';
import { inRange } from 'lodash';

import { Extras } from './types';

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
  handleNoAuth: true,
  handleError: true,
  errorMessage: '',
  handleAxiosError: true,
  axiosErrorMessage: '',
};
