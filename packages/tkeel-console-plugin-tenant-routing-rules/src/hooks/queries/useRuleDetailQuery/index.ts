import { useQuery } from '@tkeel/console-hooks';

export enum RuleType {
  Msg = 1,
  Time = 2,
}

export enum RuleStatus {
  Stop,
  Start,
}

export interface ApiData {
  '@type': string;
  id: string;
  name: string;
  desc: string;
  type: RuleType;
  status: RuleStatus;
  devices_status: number;
  targets_status: number;
  select_expr: string;
  where_expr: string;
  sub_id: number;
  model_id: string;
  model_name: string;
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
