import { useMutation } from '@tkeel/console-hooks';

const method = 'POST';
export interface ApiData {
  '@type': string;
}
export interface RequestData {
  id: string;
  name: string;
  description?: string;
}

export default function useUpdateGroupMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: () => void;
}) {
  const url = `/tkeel-device/v1/devices/${id}/configs/saveAsOtherTemplate`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
