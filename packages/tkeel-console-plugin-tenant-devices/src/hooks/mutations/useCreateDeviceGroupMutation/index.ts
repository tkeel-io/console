import { usePluginMutation } from '@tkeel/console-hooks';

const url = '/tkeel-device/v1/groups';
const method = 'POST';

export interface ApiData {
  details?: unknown;
}
export interface RequestData {
  description?: string;
  name: string;
  parentId: string;
  ext: {
    [propName: string]: unknown;
  };
}

export default function useCreateDeviceGroupMutation({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  return usePluginMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
