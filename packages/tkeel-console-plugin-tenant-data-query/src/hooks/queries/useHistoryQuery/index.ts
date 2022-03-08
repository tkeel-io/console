import { usePluginQuery } from '@tkeel/console-hooks';

import { DeviceItem } from '../useDeviceListQuery';

const method = 'GET';

export interface ApiData {
  '@type': string;
  items: DeviceItem[];
}

export default function useHistoryQuery() {
  const url = '/core/v1/ts/';
  const { data, ...rest } = usePluginQuery<ApiData>({
    url,
    method,
  });
  const history = data?.items ?? [];

  return { history, ...rest };
}
