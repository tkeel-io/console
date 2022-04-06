import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface RequestData {
  ids: string[];
}

export interface ApiData {
  '@type': string;
  faildDelTemplate?: { id: string; reason: string }[];
}

type Props = {
  // onSuccess?: () => void;
  onSuccess?: (data: RequestResult<ApiData, undefined, RequestData>) => void;
};

const method = 'post';

export default function useDeleteTemplateMutation({ onSuccess }: Props) {
  const url = `/tkeel-device/v1/templates/delete `;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
