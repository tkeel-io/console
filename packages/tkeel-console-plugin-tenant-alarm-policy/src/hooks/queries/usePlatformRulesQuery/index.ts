import { useQuery } from '@tkeel/console-hooks';

interface ApiData {
  '@type': string;
  total: number;
}

export default function usePlatformRulesQuery() {
  const { data, ...rest } = useQuery<ApiData>({
    url: '/tkeel-alarm/v1/rule/platform',
    method: 'GET',
  });
  const platformRules = data || [];
  const total = data?.total || 0;

  return { platformRules, total, ...rest };
}
