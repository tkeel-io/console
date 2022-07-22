import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@types': string;
}

interface DefaultRequestData {
  type?: 1 | 2;
  host: string;
  value: string;
}

const baseRuleUrl = '/rule-manager/v1/rules';

interface Props<RequestData> {
  method?: 'POST' | 'PUT';
  ruleId: string;
  targetId?: string;
  onSuccess?: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
}

export default function useCreateRuleTargetMutation<
  RequestData = DefaultRequestData
>({ method = 'POST', ruleId, targetId = '', onSuccess }: Props<RequestData>) {
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
