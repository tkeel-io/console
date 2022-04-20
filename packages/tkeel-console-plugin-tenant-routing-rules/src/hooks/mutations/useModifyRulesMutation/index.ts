import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface RequestData {
  name: string;
  type: number;
  desc: string;
  model_id: string;
  model_name: string;
}

export interface ApiData {
  '@type': string;
}

const method = 'PUT';

type Props = {
  id: string;
  onSuccess: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useModifyRulesMutation({ id, onSuccess }: Props) {
  const url = `/rule-manager/v1/rules/${id}`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
