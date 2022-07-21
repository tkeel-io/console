import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@types': string;
}

type RequestData = {
  id: number;
  select_expr: string;
  where_expr: string;
};

const method = 'PUT';
const url = '/rule-manager/v1/rules';

interface Props {
  ruleId: string;
  onSuccess: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
}

export default function useEditSQLMutation({ ruleId, onSuccess }: Props) {
  return useMutation<ApiData, undefined, RequestData>({
    url: `${url}/${ruleId}/sql`,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
