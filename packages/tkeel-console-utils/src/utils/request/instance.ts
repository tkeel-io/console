import axios from 'axios';
import { get, isString, merge } from 'lodash';

import { getLocalTokenData } from '../auth';
import ApiError from './api-error';
import { DEFAULT_AXIOS_REQUEST_CONFIG, DEFAULT_BASE_EXTRAS } from './defaults';
import {
  AxiosErrorExtended,
  AxiosRequestConfigExtended,
  AxiosResponseExtended,
} from './types';

const instance = axios.create(DEFAULT_AXIOS_REQUEST_CONFIG);

instance.interceptors.request.use((config: AxiosRequestConfigExtended) => {
  const extras = get(config, ['extras'], DEFAULT_BASE_EXTRAS);
  const { isWithToken } = extras;
  const tokenData = getLocalTokenData();
  // custom codes
  const tokenType = get(tokenData, ['token_type']);
  const accessToken = get(tokenData, ['access_token']);

  return isString(accessToken) && accessToken.trim() && isWithToken
    ? merge(
        {
          headers: {
            // custom codes
            Authorization: `${tokenType} ${accessToken}`,
          },
        },
        config
      )
    : config;
});

instance.interceptors.response.use(
  (response: AxiosResponseExtended) => {
    const data = get(response, ['data']);
    const code = get(data, ['code']);

    // custom codes
    if (code === 200) {
      return response;
    }

    const { handleNoAuth, handleError, errorMessage } = get(
      response,
      ['config', 'extras'],
      DEFAULT_BASE_EXTRAS
    );

    // custom codes
    if (code === 401 && typeof handleNoAuth === 'function') {
      handleNoAuth(response);
    }

    const message = get(data, ['msg'], '');
    const error = new ApiError({ message, response });

    if (typeof handleError === 'function') {
      handleError({ response, errorMessage });
    }

    return Promise.reject(error);
  },
  (error: AxiosErrorExtended) => {
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
