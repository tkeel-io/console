import { useMutation } from '@tkeel/console-hooks';

export interface ApiData {
  '@types': string;
}

type RequestParams = {
  devices_ids: string;
};

const url = '/rule-manager/v1/rules';
const method = 'DELETE';

export default function useDeleteDevicesMutation(ruleId: string) {
  return useMutation<ApiData, RequestParams>({
    url: `${url}/${ruleId}/devices`,
    method,
  });
}
