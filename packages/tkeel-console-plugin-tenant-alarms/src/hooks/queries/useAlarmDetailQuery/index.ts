import { useQuery } from '@tkeel/console-hooks';

import type { AlarmDetail as ApiData } from '@/tkeel-console-plugin-tenant-alarms/types';

interface RequestParams {
  ruleId: number;
}

export default function useAlarmDetailQuery(
  params: RequestParams,
  enabled?: boolean
) {
  return useQuery<ApiData, RequestParams>({
    params,
    url: '/tkeel-alarm/v1/rule/detail',
    method: 'GET',
    reactQueryOptions: {
      enabled,
    },
  });
}
