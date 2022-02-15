import useMutation from '@/tkeel-console-plugin-tenant-devices/hooks/useMutation';

const url = '/tkeel-device/v1/groups';
const method = 'POST';

export interface ApiData {
  details?: unknown;
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

export default function useCreateTemplateMutation({
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
