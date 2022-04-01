import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@types': string;
}

type RequestParams = {
  devices_ids: string;
};

const url = '/rule-manager/v1/rules';
const method = 'DELETE';

type Props = {
  ruleId: string;
  onSuccess: (
    data: RequestResult<ApiData, RequestParams, undefined>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useDeleteDevicesMutation({ ruleId, onSuccess }: Props) {
  return useMutation<ApiData, RequestParams>({
    url: `${url}/${ruleId}/devices`,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
