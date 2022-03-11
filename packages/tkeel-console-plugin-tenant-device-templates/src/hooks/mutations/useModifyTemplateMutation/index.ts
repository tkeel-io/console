import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface RequestData {
  name: string;
  description: string;
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
  id: string;
};

const method = 'PUT';

export default function useModifyTemplateMutation({ onSuccess, id }: Props) {
  const url = `/tkeel-device/v1/templates/${id} `;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
