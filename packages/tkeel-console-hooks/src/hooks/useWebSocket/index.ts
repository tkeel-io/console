import { merge } from 'lodash';
import useWebSocket, { Options } from 'react-use-websocket';

interface CustomOptions extends Options {
  url: string;
  connect?: boolean;
}

const defaultOptions = {
  url: '',
  retryOnError: true,
};

export default function useCustomWebSocket<T>(options: CustomOptions) {
  const opts = merge({}, defaultOptions, options);
  const { url, connect, ...rest } = opts;
  const protocol = window.location.protocol === 'https' ? 'wss' : 'ws';
  const baseURL = `${protocol}://${window.location.host}${GLOBAL_CONFIG.webSocket.basePath}`;
  const fullURL = `${baseURL}${url}`;
  const ret = useWebSocket(fullURL, rest, connect);
  const lastJsonMessage = ret.lastJsonMessage as T;

  return { ...ret, lastJsonMessage };
}
