import { usePluginQuery } from '@tkeel/console-hooks';

import { DeviceObject } from './types';

const method = 'GET';
interface ApiData {
  '@type': string;
  deviceObject?: DeviceObject;
}

export default function useDeviceDetailQuery({ id }: { id: string }) {
  const url = `/tkeel-device/v1/devices/${id}`;
  const { data, ...rest } = usePluginQuery<ApiData>({
    url,
    method,
  });
  const deviceObject = data?.deviceObject;

  return { deviceObject, ...rest };
}
