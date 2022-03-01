import { usePluginMutation } from '@tkeel/console-hooks';

const basicUrl = '/tkeel-device/v1/group';
const method = 'PUT';
export interface ApiData {
  '@type': string;
}
export interface RequestData {
  description: string;
  ext: { [propName: string]: any };
  name: string;
  parentId: string;
}

export default function useUpdateDeviceMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: () => void;
}) {
  return usePluginMutation<ApiData, undefined, RequestData>({
    url: `${basicUrl}/${id}`,
    method,
    reactQueryOptions: { onSuccess },
  });
}
