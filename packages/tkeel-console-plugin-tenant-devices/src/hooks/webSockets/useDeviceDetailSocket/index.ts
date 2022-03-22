/* eslint-disable no-console */
import { useEffect, useMemo } from 'react';

import { useWebSocket } from '@tkeel/console-hooks';

import {
  Attributes,
  ConnectInfo,
  RawData,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';

type Message = {
  rawData: RawData;
  attributes: Attributes;
  connectInfo: ConnectInfo;
  [propName: string]: any;
};

type Props = {
  id: string;
};

function useDeviceDetailSocket({ id }: Props) {
  const options = useMemo(
    () => ({
      shouldReconnect: () => true,
      retryOnError: true,
      reconnectAttempts: 10,
      reconnectInterval: 3000,
    }),
    []
  );
  const { lastJsonMessage, sendJsonMessage, readyState } =
    useWebSocket<Message>({
      url: '',
      ...options,
    });
  useEffect(() => {
    sendJsonMessage({ id });
  }, [sendJsonMessage, id, readyState]);

  const rawData = lastJsonMessage?.rawData || {};
  const connectInfo = lastJsonMessage?.connectInfo;
  const attributes = lastJsonMessage?.attributes || {};
  return { rawData, connectInfo, attributes };
}

export default useDeviceDetailSocket;
