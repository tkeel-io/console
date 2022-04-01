import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@types': string;
}

type RequestData = {
  subscribe_id: string;
};

const url = '/rule-manager/v1/rules';

type Props = {
  method?: 'POST' | 'PUT';
  ruleId: string;
  onSuccess: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useAddErrorActionMutation({
  method = 'POST',
  ruleId,
  onSuccess,
}: Props) {
  return useMutation<ApiData, undefined, RequestData>({
    url: `${url}/${ruleId}/subscribe/error`,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
