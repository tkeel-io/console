import { useQuery } from '@tkeel/console-hooks';

import type { AlarmDetail as ApiData } from '@/tkeel-console-plugin-tenant-alarms/types';

interface RequestParams {
  noticeId?: string;
}

export default function useAlarmNoticeQuery(
  params: RequestParams,
  enabled?: boolean
) {
  return useQuery<ApiData, RequestParams>({
    params,
    url: '/tkeel-alarm/v1/alarm/noticeGroup/queryNoticeGroupByIds',
    method: 'GET',
    reactQueryOptions: {
      enabled,
    },
  });
}
