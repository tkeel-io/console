import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

interface RequestData {
  deleted: 1;
  ruleId: number;
}

interface Props {
  onSuccess?: (
    data: RequestResult<unknown, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
}

export default function useDeletePolicyMutation({ onSuccess }: Props) {
  return useMutation<unknown, undefined, RequestData>({
    url: '/tkeel-alarm/v1/rule/deleted',
    method: 'PUT',
    reactQueryOptions: {
      onSuccess,
    },
  });
}
