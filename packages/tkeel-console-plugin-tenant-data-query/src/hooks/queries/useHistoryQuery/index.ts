import { useQuery } from '@tkeel/console-hooks';
import { DeviceItem } from '@tkeel/console-request-hooks';

const method = 'GET';

export interface ApiData {
  '@type': string;
  items: DeviceItem[];
}

export default function useHistoryQuery() {
  const url = '/core/v1/ts/';
  const { data, ...rest } = useQuery<ApiData>({
    url,
    method,
  });
  const history = data?.items ?? [];

  return { history, ...rest };
}
