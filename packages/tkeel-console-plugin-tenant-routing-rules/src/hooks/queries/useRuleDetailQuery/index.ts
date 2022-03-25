import { useQuery } from '@tkeel/console-hooks';

export interface ApiData {
  '@type': string;
  id: string;
  name: string;
  desc: string;
  type: 1 | 2;
  status: 0 | 1;
  created_at: string;
  updated_at: string;
}

const url = '/rule-manager/v1/rules';
const method = 'GET';

export default function useRuleDetailQuery(id: string) {
  const { data, ...rest } = useQuery<ApiData>({
    url: `${url}/${id}`,
    method,
    reactQueryOptions: {
      enabled: id !== '',
    },
  });

  return { data, ...rest };
}
