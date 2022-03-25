import { useMutation } from '@tkeel/console-hooks';

export interface ApiData {
  '@types': string;
}

const method = 'DELETE';

type RequestParams = {
  devices_ids: string;
};

export default function useDeleteDevicesMutation(ruleId: string) {
  return useMutation<ApiData, RequestParams>({
    url: `/rules/${ruleId}/devices`,
    method,
  });
}
