import { useMutation } from '@tkeel/console-hooks';

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

export default function useAddAttributeMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: () => void;
}) {
  const url = `/tkeel-device/v1/devices/${id}/attribute/set`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
