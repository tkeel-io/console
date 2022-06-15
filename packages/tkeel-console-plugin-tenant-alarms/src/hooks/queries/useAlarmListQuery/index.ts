import { useQuery } from '@tkeel/console-hooks';

import type {
  AlarmItem,
  RequestParams,
} from '@/tkeel-console-plugin-tenant-alarms/types';

interface ApiData {
  // '@type': string;
  list: AlarmItem[];
  page_num: number;
  page_size: number;
  total: number;
}

export default function useAlarmListQuery(params: RequestParams) {
  const { data, ...rest } = useQuery<ApiData, RequestParams>({
    params,
    url: '/tkeel-alarm/v1/alarm/query',
    method: 'GET',
  });
  const list = data?.list || [];
  const total = data?.total || 0;

  return { list, total, ...rest };
}
