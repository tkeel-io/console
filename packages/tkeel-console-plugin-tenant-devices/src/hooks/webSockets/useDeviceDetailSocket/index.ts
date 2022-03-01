import { useEffect } from 'react';

import { useWebSocket } from '@tkeel/console-hooks';

import {
  ConnectInfo,
  RawData,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';

type Message = {
  rawData: RawData;
  connectInfo: ConnectInfo;
  [propName: string]: any;
};

type Props = {
  id: string;
};

function useDeviceDetailSocket({ id }: Props) {
  const { lastJsonMessage, sendJsonMessage } = useWebSocket<Message>({
    url: '',
  });

  useEffect(() => {
    sendJsonMessage({ id });
  }, [sendJsonMessage, id]);
  const rawData = lastJsonMessage?.rawData || {};
  const connectInfo = lastJsonMessage?.connectInfo;
  // eslint-disable-next-line no-console
  console.log(lastJsonMessage);
  return { rawData, connectInfo };
}

export default useDeviceDetailSocket;
