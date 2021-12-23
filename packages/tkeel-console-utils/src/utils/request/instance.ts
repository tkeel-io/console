import axios from 'axios';
import { get, merge } from 'lodash';

import { getLocalTokenData } from '../auth';
import { DEFAULT_AXIOS_REQUEST_CONFIG, DEFAULT_BASE_EXTRAS } from './defaults';
import RequestError from './request-error';
import {
  AxiosErrorExtended,
  AxiosRequestConfigExtended,
  AxiosResponseExtended,
  ResponseData,
} from './types';

const instance = axios.create(DEFAULT_AXIOS_REQUEST_CONFIG);

instance.interceptors.request.use((config: AxiosRequestConfigExtended) => {
  const extras = get(config, ['extras'], DEFAULT_BASE_EXTRAS);
  const { isWithToken } = extras;
  const { token_type: tokenType, access_token: accessToken } =
    getLocalTokenData();

  return isWithToken
    ? merge(
        {
          headers: {
            Authorization: `${tokenType} ${accessToken}`,
          },
        },
        config
      )
    : config;
});

instance.interceptors.response.use(
  <T>(response: AxiosResponseExtended<T>) => {
    const data: ResponseData<T> = get(response, ['data']);
    const code = get(data, ['code']);

    if (code === 200) {
      return response;
    }

    const { handleNoAuth, handleError, errorMessage } = get(
      response,
      ['config', 'extras'],
      DEFAULT_BASE_EXTRAS
    );

    if (code === 401 && typeof handleNoAuth === 'function') {
      handleNoAuth(response);
    }

    const message = get(data, ['msg'], '');
    const error = new RequestError({ message, response });

    if (typeof handleError === 'function') {
      handleError({ response, errorMessage });
    }

    return Promise.reject(error);
  },
  <T>(error: AxiosErrorExtended<T>) => {
    const { handleAxiosError, axiosErrorMessage } = get(
      error,
      ['config', 'extras'],
      DEFAULT_BASE_EXTRAS
    );

    if (typeof handleAxiosError === 'function') {
      handleAxiosError({ axiosErrorMessage, error });
    }

    return Promise.reject(error);
  }
);

export default instance;
