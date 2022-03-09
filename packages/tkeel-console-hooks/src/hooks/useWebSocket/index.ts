import { merge } from 'lodash';
import useWebSocket, { Options } from 'react-use-websocket';

import { DEFAULT_WEBSOCKET_BASE_PATH } from '@tkeel/console-constants';
import { env, getGlobalPortalConfigCrossEnv } from '@tkeel/console-utils';

interface CustomOptions extends Options {
  url: string;
  connect?: boolean;
}

const defaultOptions = {
  url: '',
  retryOnError: true,
};

function getBaseURL() {
  const globalPortalConfigCrossEnv = getGlobalPortalConfigCrossEnv();
  const websocket = globalPortalConfigCrossEnv?.backend.websocket;
  const origin = websocket?.origin ?? '';
  const basePath = websocket?.basePath ?? DEFAULT_WEBSOCKET_BASE_PATH;

  let baseURL = basePath;

  if (env.isEnvDevelopment() && origin) {
    baseURL = `${origin}${basePath}`;
  } else {
    const protocol = window.location.protocol === 'https' ? 'wss' : 'ws';
    baseURL = `${protocol}://${window.location.host}${basePath}`;
  }

  return baseURL;
}

export default function useCustomWebSocket<T>(options: CustomOptions) {
  const opts = merge({}, defaultOptions, options);
  const { url, connect, ...rest } = opts;
  const baseURL = getBaseURL();
  const fullURL = `${baseURL}${url}`;
  const ret = useWebSocket(fullURL, rest, connect);
  const lastJsonMessage = ret.lastJsonMessage as T;

  return { ...ret, lastJsonMessage };
}
