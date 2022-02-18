import useMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/useMutation';

export interface ApiData {
  '@type': string;
}

const method = 'DELETE';

export default function useDeleteSubscriptionMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess: () => void;
}) {
  const url = `/core-broker/v1/subscribe/${id}`;

  return useMutation<ApiData, undefined, undefined>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
