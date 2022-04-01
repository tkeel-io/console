import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@types': string;
}

type RequestData = {
  type?: 1 | 2;
  host: string;
  value: string;
};

const baseRuleUrl = '/rule-manager/v1/rules';

type Props = {
  method?: 'POST' | 'PUT';
  ruleId: string;
  targetId?: string;
  onSuccess?: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useCreateRuleTargetMutation({
  method = 'POST',
  ruleId,
  targetId = '',
  onSuccess,
}: Props) {
  let url = `${baseRuleUrl}/${ruleId}/target`;
  url = method === 'POST' ? url : `${url}/${targetId}`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
