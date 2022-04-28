import { useQuery } from '@tkeel/console-hooks';

import { DeviceObject } from './types';

const method = 'GET';
interface ApiData {
  '@type': string;
  deviceObject?: DeviceObject;
}

interface RequestData {
  id: string;
  enabled?: boolean;
}

export default function useDeviceDetailQuery({
  id,
  enabled = true,
}: RequestData) {
  const url = `/tkeel-device/v1/devices/${id}`;
  const { data, ...rest } = useQuery<ApiData>({
    url,
    method,
    reactQueryOptions: {
      enabled,
    },
  });
  const deviceObject = data?.deviceObject;

  return { deviceObject, ...rest };
}
