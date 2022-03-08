import { useMutation } from '@tkeel/console-hooks';

interface RequestData {
  title: string;
  description: string;
}

export interface ApiData {
  '@type': string;
}

const method = 'POST';

export default function useCreateSubscribeMutation({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) {
  const url = `/core-broker/v1/subscribe`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
