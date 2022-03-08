import { usePluginQuery } from '@tkeel/console-hooks';

import { Properties } from '../useDeviceDetailQuery';

const method = 'GET';

type Item = {
  id: string;
  properties: Properties;
};

export interface ApiData {
  '@type': string;
  items: Item[];
}

export default function useHistoryQuery() {
  const url = '/core/v1/ts/';
  const { data, ...rest } = usePluginQuery<ApiData>({
    url,
    method,
  });
  const dataItems = data?.items;

  return { dataItems, ...rest };
}
