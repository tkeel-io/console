import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { get, merge } from 'lodash';

import { DEFAULT_EXTRAS } from './constants';
import instance from './instance';

type Extras = {
  isShowErrorMessage: boolean;
  errorMessage: string;
  isHandleNoAuth: boolean;
};

type Data = {
  code: number;
  msg: string;
  data: Record<string, any>;
};

type CustomError = {
  code?: number;
} & Error;

function request({
  extras,
  ...axiosRequestConfig
}: { extras?: Extras } & AxiosRequestConfig) {
  const { isShowErrorMessage, errorMessage, isHandleNoAuth } = merge(
    {},
    DEFAULT_EXTRAS,
    extras
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: Data = get(response, ['data']);
      const code = get(data, ['code']);

      if (code === 0) {
        return response;
      }

      const message = get(data, ['msg'], '');
      const error: CustomError = new Error(message);
      error.code = code;

      if (isShowErrorMessage) {
        alert(errorMessage || message);
      }

      if (code === 401 && isHandleNoAuth) {
        //
      }

      return Promise.reject(error);
    },
    (error: Error) => {
      const { message } = error;

      if (isShowErrorMessage) {
        alert(errorMessage || message);
      }

      return Promise.reject(error);
    }
  );

  return axios(axiosRequestConfig);
}

export default request;
