import { useMutation } from '@tkeel/console-hooks';

export interface ApiData {
  '@type': string;
}

const method = 'DELETE';

export default function useDeleteProxyMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess: () => void;
}) {
  const url = `/fluxswitch/v1/proxy/${id}`;

  return useMutation<ApiData, undefined, undefined>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
