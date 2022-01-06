import { RequestExtras } from './types';

export const DEFAULT_EXTRAS: RequestExtras = {
  isWithToken: false,
  isSuccessFunction: () => true,
  isNoAuthFunction: () => false,
  handleNoAuth: false,
  handleApiError: false,
  getApiErrorMessage: () => '',
  customApiErrorMessage: '',
  handleAxiosError: false,
  customAxiosErrorMessage: '',
};

export { DEFAULT_AXIOS_REQUEST_CONFIG, DEFAULT_CUSTOM_EXTRAS } from './custom';
