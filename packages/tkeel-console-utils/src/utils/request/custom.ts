import { AxiosRequestConfig } from 'axios';
import { inRange, merge } from 'lodash';
import { NavigateFunction } from 'react-router-dom';

import { toast } from '@tkeel/console-components';

import {
  getLocalTokenInfo,
  removeLocalTokenInfo,
} from '@/tkeel-console-utils/utils/auth';

import { AxiosRequestConfigExtended, RequestExtras } from './types';

export const DEFAULT_AXIOS_REQUEST_CONFIG: AxiosRequestConfig = {
  baseURL:
    GLOBAL_PLUGIN_CONFIG?.api?.basePath ??
    GLOBAL_PORTAL_CONFIG?.api?.basePath ??
    '/apis',
  validateStatus: (status: number) => !inRange(status, 300, 400),
};

export const DEFAULT_CUSTOM_EXTRAS: RequestExtras = {
  isWithToken: true,
  isSuccessFunction(response) {
    const code = response?.data?.code;
    // TODO: tmp
    return ['io.tkeel.SUCCESS', 200].includes(code);
  },
  isNoAuthFunction(response) {
    const { status } = response;
    return [401, 403].includes(status);
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
  const tokenInfo = getLocalTokenInfo();
  const tokenType = tokenInfo?.token_type;
  const accessToken = tokenInfo?.access_token;

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
  navigate,
  redirectPath = '/',
}: {
  navigate: NavigateFunction;
  redirectPath?: string;
}) {
  return function handleNoAuth() {
    removeLocalTokenInfo();
    navigate(redirectPath, { replace: true });
  };
}
