import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface RequestData {
  name: string;
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

export default function useModifyNetworkMutation({ id, onSuccess }: Props) {
  const url = `/rule-manager/v1/rules/${id}`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
