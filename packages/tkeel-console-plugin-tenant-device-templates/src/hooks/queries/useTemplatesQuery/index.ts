import { useQuery } from '@tkeel/console-hooks';

const method = 'POST';

type RequestParams = {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  key_words?: string;
};

export interface ApiData {
  '@type': string;
  templates?: unknown;
}

export default function useTemplatesQuery({
  params,
}: { params?: RequestParams } = {}) {
  const url = '/device/templates/search';

  return useQuery<ApiData, RequestParams>({
    url,
    method,
    params,
  });
}
