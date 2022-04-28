import { useMutation } from '@tkeel/console-hooks';

const basicUrl = '/tkeel-device/v1/devices';
const method = 'PUT';
export interface ApiData {
  '@type': string;
}
export interface RequestData {
  description?: string;
  directConnection?: boolean;
  ext: { [propName: string]: string };
  name: string;
  selfLearn: boolean;
  parentId: string;
  parentName: string;
  templateId?: string;
  templateName?: string;
}

export default function useUpdateDeviceMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: () => void;
}) {
  return useMutation<ApiData, undefined, RequestData>({
    url: `${basicUrl}/${id}`,
    method,
    reactQueryOptions: { onSuccess },
  });
}
