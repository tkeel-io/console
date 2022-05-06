import { useMutation } from '@tkeel/console-hooks';

export interface RequestData {
  name: string;
}

export interface ApiData {
  '@type': string;
}

const method = 'POST';

export default function useCreateNetworkMutation({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) {
  const url = `/rule-manager/v1/rules`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
