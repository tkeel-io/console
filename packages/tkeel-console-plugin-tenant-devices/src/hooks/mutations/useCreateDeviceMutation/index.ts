import useMutation from '@/tkeel-console-plugin-tenant-devices/hooks/useMutation';

const url = '/tkeel-device/v1/devices';
const method = 'POST';

export interface ApiData {
  '@type': string;
  deviceObject: object;
}
export interface RequestData {
  description?: string;
  name: string;
  directConnection: boolean;
  selfLearn: boolean;
  templateId?: string;
  parentId: string;
  ext: {
    [propName: string]: unknown;
  };
}

export default function useCreateDeviceMutation({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
