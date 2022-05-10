import { useQuery } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

const method = 'POST';

type RequestData = {
  page_num: number;
  page_size: number;
  key_words: string;
  order_by?: string;
  is_descending?: boolean;
};

export type Device = {
  ID: string;
  group: string;
  name: string;
  status: string;
  template: string;
  updated_at: string;
};

export interface ApiData {
  '@type': string;
  page_num: number;
  page_size: number;
  total: number;
  data: Device[];
}

type Props = {
  id: string;
  pageNum: number;
  pageSize: number;
  keywords: string;
  onSuccess?: (data: RequestResult<ApiData, undefined, RequestData>) => unknown;
};

export default function useNetworkListQuery({
  id,
  pageNum,
  pageSize,
  keywords,
  onSuccess,
}: Props) {
  const url = `/core-broker/v1/subscribe/${id}/entities/list`;

  const { data, ...rest } = useQuery<ApiData, undefined, RequestData>({
    url,
    method,
    data: {
      page_num: pageNum,
      page_size: pageSize,
      key_words: keywords,
      order_by: 'created_at',
      is_descending: true,
    },
    reactQueryOptions: { onSuccess, enabled: !!id },
  });
  const entities = data?.data ?? [];

  return { entities, data, ...rest };
}
