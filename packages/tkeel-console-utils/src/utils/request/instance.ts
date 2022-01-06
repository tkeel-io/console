import axios from 'axios';
import { merge } from 'lodash';

import ApiError from './api-error';
import { requestInterceptors } from './custom';
import { DEFAULT_AXIOS_REQUEST_CONFIG, DEFAULT_EXTRAS } from './defaults';
import { AxiosErrorExtended, AxiosResponseExtended } from './types';

const instance = axios.create(
  merge({}, DEFAULT_AXIOS_REQUEST_CONFIG, DEFAULT_EXTRAS)
);

instance.interceptors.request.use(requestInterceptors);

instance.interceptors.response.use(
  (response: AxiosResponseExtended) => {
    const extras = response?.config?.extras;
    const isSuccessFunction = extras?.isSuccessFunction;

    if (
      typeof isSuccessFunction === 'function' &&
      isSuccessFunction(response)
    ) {
      return response;
    }

    const isNoAuthFunction = extras?.isNoAuthFunction;
    const handleNoAuth = extras?.handleNoAuth;
    const handleApiError = extras?.handleApiError;
    const getApiErrorMessage = extras?.getApiErrorMessage;
    const customApiErrorMessage = extras?.customApiErrorMessage;
    const message =
      typeof getApiErrorMessage === 'function'
        ? getApiErrorMessage(response)
        : customApiErrorMessage || '';
    const error = new ApiError({ message, response });

    if (
      typeof isNoAuthFunction === 'function' &&
      isNoAuthFunction(response) &&
      typeof handleNoAuth === 'function'
    ) {
      handleNoAuth(response);
    } else if (typeof handleApiError === 'function') {
      handleApiError(response);
    }

    return Promise.reject(error);
  },
  (error: AxiosErrorExtended) => {
    const extras = error?.config?.extras;
    const handleAxiosError = extras?.handleAxiosError;

    if (typeof handleAxiosError === 'function') {
      handleAxiosError(error);
    }

    return Promise.reject(error);
  }
);

export default instance;
