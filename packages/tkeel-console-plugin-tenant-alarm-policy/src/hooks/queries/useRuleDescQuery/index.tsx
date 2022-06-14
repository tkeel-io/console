import { useQuery } from '@tkeel/console-hooks';

import type {
  Polymerize,
  Time,
} from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useCreatePolicyMutation';

interface RuleDesc {
  alarmSourceObject: number | null;
  operator: number | null;
  platRuleId: string | null;
  polymerize: Polymerize | null;
  ruleId: number | null;
  telemetryId: string | null;
  telemetryName: string | null;
  time: Time | null;
  value: string | null;
}

interface ApiData {
  list: RuleDesc[];
}

interface RequestParams {
  ruleId: number;
}

export default function useRuleDescQuery({
  ruleId,
  enabled,
}: RequestParams & {
  enabled: boolean;
}) {
  const { data, ...rest } = useQuery<ApiData, RequestParams>({
    url: '/tkeel-alarm/v1/ruleDesc/query',
    method: 'GET',
    params: {
      ruleId,
    },
    reactQueryOptions: {
      enabled,
    },
  });
  const ruleDescList = data?.list || [];

  return { ruleDescList, ...rest };
}
