import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

const method = 'POST';
export interface ApiData {
  '@type': string;
  templateObject?: {
    id: string;
  };
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
  onSuccess?: (data: RequestResult<ApiData, undefined, RequestData>) => void;
}) {
  const url = `/tkeel-device/v1/devices/${id}/configs/saveAsOtherTemplate`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
