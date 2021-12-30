import { toast } from '@tkeel/console-components';
import { get, inRange } from 'lodash';

import {
  ApiResponse,
  AxiosRequestConfigExtended,
  RequestExtras,
} from './types';

export const DEFAULT_BASE_EXTRAS: RequestExtras = Object.freeze({
  isWithToken: false,
  handleNoAuth: false,
  handleError: false,
  errorMessage: '',
  handleAxiosError: false,
  axiosErrorMessage: '',
});

export const DEFAULT_AXIOS_REQUEST_CONFIG: AxiosRequestConfigExtended =
  Object.freeze({
    // custom codes
    baseURL: process.env.API_PATHNAME || '/apis',
    validateStatus: (status: number) => !inRange(status, 300, 400),
    extras: DEFAULT_BASE_EXTRAS,
  });

export const DEFAULT_EXTRAS: RequestExtras = Object.freeze({
  isWithToken: true,
  handleNoAuth() {
    // custom codes
  },
  handleError({ errorMessage, response }) {
    const data: ApiResponse = get(response, ['data']);
    const message = get(data, ['msg'], '');
    // custom codes
    toast({ title: errorMessage || message, status: 'error' });
  },
  errorMessage: '',
  handleAxiosError({ axiosErrorMessage, error }) {
    const { message } = error;
    // custom codes
    toast({ title: axiosErrorMessage || message, status: 'error' });
  },
  axiosErrorMessage: '',
});
