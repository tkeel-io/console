import { usePluginMutation } from '@tkeel/console-hooks';

const basicUrl = '/tkeel-device/v1/devices';
const method = 'PUT';
export interface ApiData {
  '@type': string;
}
export interface RequestData {
  description: string;
  directConnection: boolean;
  ext: { [propName: string]: any };
  name: string;
  parentId: string;
  selfLearn: boolean;
  templateId: string;
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
