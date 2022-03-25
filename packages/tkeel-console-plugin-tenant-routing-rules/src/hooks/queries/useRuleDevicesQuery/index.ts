import { useQuery } from '@tkeel/console-hooks';

export interface DeviceItem {
  id: string;
  name: string;
  template: string;
  group_name: string;
  status: 'online' | 'offline';
}

export interface ApiData {
  '@type': string;
  data: DeviceItem[];
  total: number;
}

const url = '/rule-manager/v1/rules';
const method = 'GET';

type RequestParams = {
  page_num: number;
  page_size: number;
  key_words: string;
};

type Props = {
  ruleId: string;
  pageNum: number;
  pageSize: number;
  keywords: string;
};

export default function useRuleDevicesQuery({
  ruleId,
  pageNum,
  pageSize,
  keywords,
}: Props) {
  const { data, ...rest } = useQuery<ApiData, RequestParams>({
    url: `${url}/${ruleId}/devices`,
    method,
    params: {
      page_num: pageNum,
      page_size: pageSize,
      key_words: keywords,
    },
    reactQueryOptions: {
      enabled: !!ruleId,
    },
  });

  const deviceList = data?.data ?? [];
  const total = data?.total ?? 0;

  return { deviceList, total, ...rest };
}
