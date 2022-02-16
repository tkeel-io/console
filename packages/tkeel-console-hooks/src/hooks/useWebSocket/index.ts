import useWebSocket, { Options } from 'react-use-websocket';

interface CustomOptions extends Options {
  url: string;
  connect?: boolean;
}

export default function useCustomWebSocket(options: CustomOptions) {
  const { url, connect, ...rest } = options;
  const baseURL = `${GLOBAL_CONFIG.webSocket?.origin ?? ''}${
    GLOBAL_CONFIG.webSocket.basePath
  }`;
  const fullURL = `${baseURL}${url}`;
  return useWebSocket(fullURL, rest, connect);
}
