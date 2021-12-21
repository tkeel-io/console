import { AxiosError } from 'axios';
import { get, merge } from 'lodash';

import { DEFAULT_BASE_EXTRAS } from './constants';
import instance from './instance';
import RequestError from './request-error';
import { RequestOptions, Response, ResponseData } from './types';

function baseRequest({
  extras,
  ...axiosRequestConfig
}: RequestOptions): Promise<Response> {
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: ResponseData = get(response, ['data']);
      const code = get(data, ['code']);

      if (code === 0) {
        return response;
      }

      const message = get(data, ['msg'], '');
      const error = new RequestError({ message, response });

      if (code === 401) {
        if (handleNoAuth === true) {
          // redirect to login page
        } else if (typeof handleNoAuth === 'function') {
          handleNoAuth(response);
        }
      }

      if (handleError === true) {
        // eslint-disable-next-line no-console
        console.error('handleError === true', errorMessage || message);
      } else if (typeof handleError === 'function') {
        handleError(response);
      }

      return Promise.reject(error);
    },
    (error: AxiosError) => {
      const { message } = error;

      if (handleAxiosError === true) {
        // eslint-disable-next-line no-console
        console.error(
          'handleAxiosError === true',
          axiosErrorMessage || message
        );
      } else if (typeof handleAxiosError === 'function') {
        handleAxiosError(error);
      }

      return Promise.reject(error);
    }
  );

  return instance(config).then((response) => {
    const data: unknown = get(response, ['data', 'data']);
    return { data, response };
  });
}

export default baseRequest;
