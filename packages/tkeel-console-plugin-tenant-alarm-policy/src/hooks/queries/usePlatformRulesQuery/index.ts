import { useQuery } from '@tkeel/console-hooks';

interface ApiData {
  list: {
    id: number;
    alarmDesc: string;
    promQl: string;
  }[];
}

export default function usePlatformRulesQuery() {
  const { data, ...rest } = useQuery<ApiData>({
    url: '/tkeel-alarm/v1/rule/platform',
    method: 'GET',
  });
  const platformRules = data?.list || [];

  return { platformRules, ...rest };
}
