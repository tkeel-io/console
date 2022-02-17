import { useEffect } from 'react';
import { useWebSocket } from '@tkeel/console-hooks';

type Message = {
  rawData: {
    id: string;
  };
};

export default function WebSocketDemo() {
  const { lastJsonMessage, sendJsonMessage } = useWebSocket<Message>({
    url: '',
  });

  useEffect(() => {
    sendJsonMessage({ id: '1cb1750c-2b95-4f0b-9a38-43cfb6b13418' });
  }, [sendJsonMessage]);

  return lastJsonMessage;
}
