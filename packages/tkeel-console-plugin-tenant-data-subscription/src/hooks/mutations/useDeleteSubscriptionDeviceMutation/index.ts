import useMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/useMutation';

export interface ApiData {
  '@type': string;
}

const method = 'POST';

export default function useDeleteSubscriptionDeviceMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess: () => void;
}) {
  const url = `/core-broker/v1/subscribe/${id}/entities/delete`;

  return useMutation<ApiData, undefined, undefined>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
