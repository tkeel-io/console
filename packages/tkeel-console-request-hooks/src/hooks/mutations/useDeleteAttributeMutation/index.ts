import { useMutation } from '@tkeel/console-hooks';

const method = 'POST';

export interface ApiData {
  '@type': string;
}
export interface RequestData {
  ids: string[];
}

export default function useDeleteAttributeMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: () => void;
}) {
  const url = `/tkeel-device/v1/templates/${id}/attribute/delete`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
