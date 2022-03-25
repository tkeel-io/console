import { useQuery } from '@tkeel/console-hooks';

export interface ApiData {
  '@type': string;
  devices_ids: string[];
}

const url = '/rule-manager/v1/rules';
const method = 'GET';

export default function useRuleDevicesIdArrayQuery(ruleId: string) {
  const { data, ...rest } = useQuery<ApiData>({
    url: `${url}/${ruleId}/devices_id_array`,
    method,
    reactQueryOptions: {
      enabled: !!ruleId,
    },
  });

  const deviceIds = data?.devices_ids ?? [];

  return { deviceIds, ...rest };
}
