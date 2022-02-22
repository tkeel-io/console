import { useEffect } from 'react';
import { useWebSocket } from '@tkeel/console-hooks';

export interface RawData {
  id: string;
  mark: 'upstream' | 'downstream' | 'connecting';
  path: string;
  ts: number;
  type: string;
  values: string;
}

type Message = {
  rawData: RawData;
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

  return lastJsonMessage?.rawData;
}

export default useDeviceDetailSocket;
