import { useQuery } from '@tkeel/console-hooks';

export type PublishedFields = {
  t_field: {
    name: string;
    type: string;
  };
  m_field: {
    name: string;
    type: string;
  };
};

type RequestParams = {
  page_num: number;
  page_size: number;
  key_words: string;
};

export interface Target {
  id: string;
  type: 1 | 2;
  endpoint: string;
  host: string;
  value: string;
  ext: string;
  sink_type: string;
  fields: PublishedFields[] | [];
  database: string;
  table_name: string;
  org?: string;
  bucket?: string;
  tags?: Record<string, string>;
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
