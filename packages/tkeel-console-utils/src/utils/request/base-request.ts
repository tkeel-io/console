import { AxiosError } from 'axios';
import { get, merge } from 'lodash';

import { DEFAULT_BASE_EXTRAS } from './constants';
import instance from './instance';
import RequestError from './request-error';
import { RequestOptions, Response, ResponseData } from './types';

function baseRequest<T>({
  extras,
  ...axiosRequestConfig
}: RequestOptions): Promise<Response<T>> {
  const {
    isWithToken,
    handleNoAuth,
    handleError,
    errorMessage,
    handleAxiosError,
    axiosErrorMessage,
  } = merge({}, DEFAULT_BASE_EXTRAS, extras);
  const config = isWithToken
    ? merge(
        {
          headers: {
            Authorization: `Bearer 123`,
          },
        },
        axiosRequestConfig
      )
    : axiosRequestConfig;

  instance.interceptors.response.use(
    (response) => {
      const data: ResponseData<T> = get(response, ['data']);
      const code = get(data, ['code']);

      if (code === 0) {
        return response;
      }

      const message = get(data, ['msg'], '');
      const error = new RequestError({ message, response });

      if (code === 401 && typeof handleNoAuth === 'function') {
        handleNoAuth(response);
      }

      if (typeof handleError === 'function') {
        handleError({ response, errorMessage });
      }

      return Promise.reject(error);
    },
      (error: AxiosError) => {
        if (typeof handleAxiosError === 'function') {
          handleAxiosError({ axiosErrorMessage, error });
        }

        return Promise.reject(error);
      };
  );

  return instance(config).then((response) => {
    const data: T = get(response, ['data', 'data']);
    return { data, response };
  });
}

export default baseRequest;
