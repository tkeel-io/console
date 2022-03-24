import { useQuery } from '@tkeel/console-hooks';

export interface ApiData {
  '@type': string;
}

const url = '/rule-manager/v1/rules';
const method = 'GET';

type RequestParams = {
  page_num: number;
  page_size: number;
  key_words: string;
};

type Props = {
  id: string;
  pageNum: number;
  pageSize: number;
  keywords: string;
};

export default function useRuleDevicesQuery({
  id,
  pageNum,
  pageSize,
  keywords,
}: Props) {
  const { data, ...rest } = useQuery<ApiData, RequestParams>({
    url: `${url}/${id}/devices`,
    method,
    params: {
      page_num: pageNum,
      page_size: pageSize,
      key_words: keywords,
    },
    reactQueryOptions: {
      enabled: id !== '',
    },
  });

  return { data, ...rest };
}
