import { useQuery } from '@tkeel/console-hooks';

type RequestParams = {
  page_num: number;
  page_size: number;
  key_words: string;
};

export interface Target {
  id: string;
  type: 1 | 2;
  host: string;
  value: string;
  ext: string;
}

export interface ApiData {
  '@type': string;
  data: Target[];
}

const url = '/rule-manager/v1/rules';
const method = 'GET';

export default function useRuleTargetsQuery(ruleId: string) {
  const { data, ...rest } = useQuery<ApiData, RequestParams>({
    url: `${url}/${ruleId}/target`,
    method,
    params: {
      page_num: 1,
      page_size: 100_000,
      key_words: '',
    },
    reactQueryOptions: {
      enabled: !!ruleId,
    },
  });
  const targets = data?.data || [];

  return { targets, data, ...rest };
}
