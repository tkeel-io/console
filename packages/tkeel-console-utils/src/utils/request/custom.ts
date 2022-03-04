import { AxiosRequestConfig } from 'axios';
import { inRange, merge } from 'lodash';

import { toast } from '@tkeel/console-components';
import { DEFAULT_API_BASE_PATH } from '@tkeel/console-constants';

import { getGlobalConfig } from '../global-config';
import { AxiosRequestConfigExtended, RequestExtras } from './types';

export const DEFAULT_AXIOS_REQUEST_CONFIG: AxiosRequestConfig = {
  baseURL: getGlobalConfig()?.api?.basePath ?? DEFAULT_API_BASE_PATH,
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
  const tokenInfo = extras?.tokenInfo;
  const tokenType = tokenInfo?.token_type ?? '';
  const accessToken = tokenInfo?.access_token ?? '';

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
