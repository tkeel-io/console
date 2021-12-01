import { useEffect, useState } from 'react';
import {
  AxiosRequestConfig,
  AxiosResponse,
  request,
} from '@tkeel/console-utils';

function useRequest(config: AxiosRequestConfig) {
  const [resp, setResp] = useState<AxiosResponse | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await request(config);
        setResp(r);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return resp;
}

export default useRequest;
