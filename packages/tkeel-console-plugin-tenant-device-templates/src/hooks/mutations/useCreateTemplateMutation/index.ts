import { useMutation } from '@tkeel/console-hooks';

export interface RequestData {
  name: string;
  description: string;
}

export interface ApiData {
  '@type': string;
}

type Props = {
  onSuccess?: () => void;
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
