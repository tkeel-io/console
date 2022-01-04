import { Location, NavigateFunction } from 'react-router-dom';
import { toast } from '@tkeel/console-components';
import { AxiosRequestConfig } from 'axios';
import { inRange, merge } from 'lodash';

import { getLocalTokenData } from '@/tkeel-console-utils/utils/auth';

import { AxiosRequestConfigExtended, RequestExtras } from './types';

export const DEFAULT_AXIOS_REQUEST_CONFIG: AxiosRequestConfig = {
  baseURL: process.env.API_PATHNAME || '/apis',
  validateStatus: (status: number) => !inRange(status, 300, 400),
};

export const DEFAULT_CUSTOM_EXTRAS: RequestExtras = {
  isWithToken: true,
  isSuccessFunction(response) {
    const code = response?.data?.code;
    return code === 200;
  },
  isNoAuthFunction(response) {
    const code = response?.data?.code;
    return [401, 403].includes(code);
  },
  handleNoAuth() {
    // custom codes
  },
  handleApiError(response) {
    const customApiErrorMessage =
      response?.config?.extras?.customApiErrorMessage;
    const msg = response?.data?.msg;
    toast({ title: customApiErrorMessage || msg || '', status: 'error' });
  },
  getApiErrorMessage(response) {
    const customApiErrorMessage =
      response?.config?.extras?.customApiErrorMessage;
    const msg = response?.data?.msg;
    return customApiErrorMessage || msg || '';
  },
  customApiErrorMessage: '',
  handleAxiosError(error) {
    const { message, config } = error;
    const customAxiosErrorMessage = config?.extras?.customAxiosErrorMessage;
    toast({ title: customAxiosErrorMessage || message || '', status: 'error' });
  },
  customAxiosErrorMessage: '',
};

export function requestInterceptors(config: AxiosRequestConfigExtended) {
  const extras = config?.extras ?? DEFAULT_CUSTOM_EXTRAS;
  const isWithToken = extras?.isWithToken;
  const tokenData = getLocalTokenData();
  const tokenType = tokenData?.token_type;
  const accessToken = tokenData?.access_token;

  return typeof accessToken === 'string' && accessToken.trim() && isWithToken
    ? merge(
        {},
        {
          headers: {
            Authorization: `${tokenType} ${accessToken}`,
          },
        },
        config
      )
    : config;
}

export function createHandleNoAuth({
  location,
  navigate,
  basePath = '',
}: {
  location: Location;
  navigate: NavigateFunction;
  basePath?: string;
}) {
  const { pathname, search, hash } = location;
  const url = `${basePath}${pathname}${search}${hash}`;

  return function handleNoAuth() {
    const redirect = encodeURIComponent(url);
    navigate(`/auth/login?redirect=${redirect}`, { replace: true });
  };
}
