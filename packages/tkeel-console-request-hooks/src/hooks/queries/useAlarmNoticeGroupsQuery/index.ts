import { useQuery } from '@tkeel/console-hooks';

export interface AlarmNoticeGroup {
  noticeId: number;
  groupName: string;
  noticeDesc: string;
  emailAddress: string;
}

interface ApiData {
  list: AlarmNoticeGroup[];
}

interface RequestParams {
  noticeId?: string;
}

interface Props {
  noticeId: string;
  enabled?: boolean;
}

export default function useAlarmNoticeGroupsQuery({
  noticeId,
  enabled = true,
}: Props) {
  const { data, ...rest } = useQuery<ApiData, RequestParams>({
    params: {
      noticeId,
    },
    url: '/tkeel-alarm/v1/alarm/noticeGroup/queryNoticeGroupByIds',
    method: 'GET',
    reactQueryOptions: {
      enabled: !!noticeId && enabled,
    },
  });
  const alarmNoticeGroups = data?.list || [];

  return { alarmNoticeGroups, ...rest };
}
