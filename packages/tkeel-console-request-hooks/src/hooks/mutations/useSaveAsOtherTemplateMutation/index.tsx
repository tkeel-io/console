import { useMutation } from '@tkeel/console-hooks';

const method = 'POST';
export interface ApiData {
  '@type': string;
}
export interface RequestData {
  name: string;
  description: string;
}

export default function useSaveAsOtherTemplateMutation({
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
