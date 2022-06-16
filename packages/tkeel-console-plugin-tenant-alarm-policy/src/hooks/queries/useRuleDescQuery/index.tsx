import { useQuery } from '@tkeel/console-hooks';

import type {
  Operator,
  Polymerize,
  RequestTelemetryType,
  Time,
} from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useCreatePolicyMutation';

export interface RuleDesc {
  alarmSourceObject: number | null;
  operator: Operator | null;
  platRuleId: string | null;
  polymerize: Polymerize | null;
  ruleId: number | null;
  telemetryId: string | null;
  telemetryName: string | null;
  telemetryType: RequestTelemetryType | null;
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
