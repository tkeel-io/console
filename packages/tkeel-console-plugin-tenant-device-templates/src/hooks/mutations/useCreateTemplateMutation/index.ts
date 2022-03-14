import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface RequestData {
  name: string;
  description: string;
  id?: string;
}

export interface ApiData {
  '@type': string;
  templateObject: {
    id: string;
  };
}

type Props = {
  // onSuccess?: () => void;
  onSuccess?: (data: RequestResult<ApiData, undefined, RequestData>) => void;
};

const method = 'POST';

export default function useCreateTemplateMutation({ onSuccess }: Props) {
  const url = `/tkeel-device/v1/templates`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
