import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@types': string;
}

const method = 'DELETE';
const url = '/rule-manager/v1/rules';

type Props = {
  ruleId: string;
  onSuccess: (
    data: RequestResult<ApiData, undefined, undefined>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useDeleteErrorActionMutation({
  ruleId,
  onSuccess,
}: Props) {
  return useMutation<ApiData>({
    url: `${url}/${ruleId}/subscribe/error`,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
