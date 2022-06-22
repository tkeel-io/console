import { useQuery } from '@tkeel/console-hooks';

export interface NoticeItemData {
  deleted: number;
  emailAddress: string;
  groupName: string;
  noticeDesc: string;
  noticeId: number;
  tenantId: string;
}

interface ApiData {
  '@type': string;
  total: number;
  page_num: number;
  page_size: number;
  list: NoticeItemData[];
}

const url = '/tkeel-alarm/v1/alarm/noticeGroup/query';
const method = 'GET';

interface RequestParams {
  pageNum?: number;
  pageSize?: number;
  groupName?: string;
}

export default function useNotificationQuery({
  pageNum = 1,
  pageSize = 20,
  groupName,
}: RequestParams) {
  const { data, ...rest } = useQuery<ApiData, RequestParams>({
    url,
    method,
    params: {
      pageNum,
      pageSize,
      groupName,
    },
  });
  const notificationData = data?.list || [];
  return { notificationData, data, ...rest };
}
