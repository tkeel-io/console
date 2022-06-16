import { useQuery } from '@tkeel/console-hooks';

export interface NoticeItemData {
  deleted: number;
  emailAddress: string;
  groupName: string;
  noticeDesc: string;
  noticeId: number;
  tenantId: string;
}

export interface ApiData {
  '@type': string;
  total: number;
  page_num: number;
  page_size: number;
  list: NoticeItemData[];
}

const url = '/tkeel-alarm/v1/alarm/noticeGroup/query';
const method = 'GET';

interface Props {
  pageNum: number;
  pageSize: number;
  groupName: string;
  tenantId: string;
}

interface TRequestParams {
  pageNum: number;
  pageSize: number;
  groupName: string;
  tenantId: string;
}

export default function useNotificationQuery({
  pageNum,
  pageSize,
  groupName,
  tenantId,
}: Props) {
  const { data, ...rest } = useQuery<ApiData, TRequestParams>({
    url,
    method,
    params: {
      pageNum,
      pageSize,
      groupName,
      tenantId,
    },
  });
  const notificationData = data?.list || [];
  return { notificationData, data, ...rest };
}
