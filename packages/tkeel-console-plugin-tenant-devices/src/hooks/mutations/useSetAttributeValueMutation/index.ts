import { useMutation } from '@tkeel/console-hooks';

const method = 'POST';

export interface ApiData {
  '@type': string;
  value?: unknown;
}
export interface RequestData {
  id: string;
  value: any;
}

export default function useSetAttributeMutation({
  id,
  onSuccess,
}: {
  id: string;
  // data: RequestData;
  onSuccess?: () => void;
}) {
  const url = `/tkeel-device/v1/devices/${id}/attribute/set`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    // data,
    reactQueryOptions: { onSuccess },
  });
}
