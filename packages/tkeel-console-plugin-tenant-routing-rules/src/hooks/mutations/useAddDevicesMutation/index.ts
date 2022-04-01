import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@types': string;
}

type RequestData = {
  devices_ids: string[];
};

const method = 'POST';
const url = '/rule-manager/v1/rules';

type Props = {
  ruleId: string;
  onSuccess: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useAddDevicesMutation({ ruleId, onSuccess }: Props) {
  return useMutation<ApiData, undefined, RequestData>({
    url: `${url}/${ruleId}/devices`,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
