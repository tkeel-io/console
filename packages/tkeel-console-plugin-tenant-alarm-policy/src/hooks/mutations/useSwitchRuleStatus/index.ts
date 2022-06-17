import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@types': string;
}

export interface RequestData {
  enable: number;
  ruleId: number;
}

interface Props {
  onSuccess?: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
}

export default function useSwitchRuleStatus({ onSuccess }: Props) {
  return useMutation<ApiData, undefined, RequestData>({
    url: '/tkeel-alarm/v1/rule/setEnable',
    method: 'PUT',
    reactQueryOptions: {
      onSuccess,
    },
  });
}
