import useMutation from '@/tkeel-console-plugin-tenant-devices/hooks/useMutation';

const method = 'POST';

export interface ApiData {
  '@type': string;
}

function useCancelSubscribeMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: () => void;
}) {
  return useMutation<ApiData, undefined, object>({
    url: `/core-broker/v1/subscribe/${id}/entities/delete`,
    method,
    reactQueryOptions: { onSuccess },
  });
}

export default useCancelSubscribeMutation;
