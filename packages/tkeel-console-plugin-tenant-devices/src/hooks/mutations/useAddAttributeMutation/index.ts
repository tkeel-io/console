import { useMutation } from '@tkeel/console-hooks';

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
    [propName: string]: string;
  };
}

export default function useAddAttributeMutation({
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
