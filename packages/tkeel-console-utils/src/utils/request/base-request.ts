import { AxiosError } from 'axios';
import { get, merge } from 'lodash';

import { DEFAULT_EXTRAS } from './constants';
import CustomError from './custom-error';
import instance from './instance';
import { RequestOptions, ResponseData } from './types';

function baseRequest({ extras, ...axiosRequestConfig }: RequestOptions) {
  const {
    isWithToken,
    handleNoAuth,
    handleError,
    errorMessage,
    handleAxiosError,
    axiosErrorMessage,
  } = merge({}, DEFAULT_EXTRAS, extras);
  const config = isWithToken
    ? merge(
        {
          headers: {
            token: '',
          },
        },
        axiosRequestConfig
      )
    : axiosRequestConfig;

  instance.interceptors.response.use(
    (response) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: ResponseData = get(response, ['data']);
      const code = get(data, ['code']);

      if (code === 0) {
        return response;
      }

      const message = get(data, ['msg'], '');
      const error = new CustomError({ message, response });

      if (code === 401) {
        if (handleNoAuth === true) {
          // redirect to login page
        } else if (typeof handleNoAuth === 'function') {
          handleNoAuth(response);
        }
      }

      if (handleError === true) {
        alert(errorMessage || message);
      } else if (typeof handleError === 'function') {
        handleError(response);
      }

      return Promise.reject(error);
    },
    (error: AxiosError) => {
      const { message } = error;

      if (handleAxiosError === true) {
        alert(axiosErrorMessage || message);
      } else if (typeof handleAxiosError === 'function') {
        handleAxiosError(error);
      }

      return Promise.reject(error);
    }
  );

  return instance(config);
}

export default baseRequest;
